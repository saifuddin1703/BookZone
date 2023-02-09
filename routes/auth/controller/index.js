const { User }  = require('../../../models');
const jwt = require('jsonwebtoken');
const { isEmail, sendEmail } = require('../../../utils');
const otpGenerator = require('otp-generator');
const OTP = require('../../../models/OTP');
const AppError = require('../../../utils/AppError');
const Email = require('../../../utils/email');

function signJWT(userId) {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
        };
        const secret = process.env.JWT_SECRET;
        const options = {
            expiresIn: '3d',
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });
}

module.exports = {

    createSendToken(req,res,next){
        const token = signJWT(req.user._id);
        res.cookie('jwt',token,{
            expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly : true,
            secure : true
        });
        return res.status(201).json({ 
            status : 'success',
            token : token,
         });
    },

    async signup(req, res,next) {
        try {
            if (!req.body.username || !req.body.password || !isEmail(req.body.username)) {
                return next(new AppError('Invalid username',400));
            }
            // checking if the user already exists
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                return next(new AppError('User already signed up, please login',400));
            }
            // creating a new user
            req.body.email = req.body.username;
            const newUser = new User(req.body);
            await newUser.save();

            console.log(newUser);

            const token = await signJWT(newUser._id);

            res.cookie('jwt',token,{
                expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly : true,
                secure : true
            });

            return res.status(201).json({ 
                status : 'success',
                token : token,
             });
        } catch (error) {
            return next(error);
        }
    },

    async login(req, res,next) {
        try {
            if (!req.body.username || !req.body.password) {
                return next(new AppError('Invalid username or password',400));
            }
            // checking if the user already exists
            const user = await User.findOne({ username: req.body.username }).select('+password');
            if (!user) {
                return next(new AppError('User not signed up, please signup',400));
            }

            // checking if the password is correct
            const isValid = await user.isValidPassword(req.body.password, user.password);
            if (!isValid) {
                return next(new AppError('Invalid password',400));
            }

            const token = await signJWT(user._id);

            res.cookie('jwt',token,{
                expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly : true,
                // secure : true
            });

            return res.status(200).json({
                status : 'success',
                token : token
            });
        }catch (error) {
            return next(error);
        }
    },

    logout(req, res,next) {
        res.cookie('jwt','loggedout',{
            expires : new Date(Date.now() + 10 * 1000),
            httpOnly : true,
            secure : true
        });
        return res.status(200).json({
            status : 'success',
            message : 'Logged out successfully'
        });
    },

    async forgetPassword(req, res,next) {
        try {
            if (!req.body.email || !isEmail(req.body.email)) {
                return next(new Error('Please enter a valid email'));
            }
            // checking if the user already exists
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return next(new Error(`User with email ${req.body.email} not found`));
            }

            // send email to user with a link to reset password
            const otp = otpGenerator.generate(6, { 
                 upperCase: false,
                 specialChars: false,
                 alphabets: false,
                 digits: true,
                 lowerCaseAlphabets: false,
            });

            const email = new Email(user);

            const newOTP = new OTP({
                userId : user._id,
                otp : otp,
            });

            await newOTP.save();

            console.log(req.body.email);
            await email.sendPassowrdResetMail(otp);
            
            return res.status(200).json({
                status : 'success',
                message : `Email sent to ${req.body.email}`
            });
        } catch (error) {
            return next(error);
        }
    },

    async resetPassword(req, res,next) {
        try {
            if (!req.body.otp || !req.body.password) {
                return next(new AppError('Invalid otp or password',400));
            }
            // checking if the user already exists
            const otp = await OTP.findOne({ otp: req.body.otp });

            if (!otp) {
                return next(new AppError('Invalid otp',400));
            }

            const user = await User.findOne({ _id: otp.userId });

            if (!user) {
                return next(new AppError('Invalid otp',400));
            }

            user.password = req.body.password;
            await user.save();

            await otp.remove();

            return res.status(200).json({
                status : 'success',
                message : 'Password reset successfully'
            });
        } catch (error) {
            return next(error);
        }
    }
};