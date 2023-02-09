const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const AppError = require('../../../utils/AppError');
const { promisify } = require('util');

module.exports = {
    async authenticate(req, res, next) {
        try {
            let token; 
            if (req.headers.authorization) {
                token = req.headers.authorization.split(' ')[1];
            }else if(req.cookies.jwt){
                token = req.cookies.jwt;
            }
            
            if(!token){
                return next(new AppError('Please provide an authorization token'));
            }

            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            // console.log(typeof(decoded.userId))
            const user = await User.findById(decoded.userId);
            if (!user) {
                return next(new AppError('User not found', 404));
            }

            if(user.changedPasswordAfter(decoded.iat)){
                return next(new AppError('User recently changed password', 401));
            }

            req.user = user;
            req.user.id = user._id;
            console.log(req.user)
            // console.log(decoded.userId);
            next();
        } catch (error) {
            // console.log(error);
            return next(new AppError('Session Expires', 401));
        }
    },

    async isLoggedIn(req, res, next) {
        try {
            if(req.cookies.jwt){
                token = req.cookies.jwt;
                
                const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
                // console.log(typeof(decoded.userId))
                const user = await User.findById(decoded.userId);
                if (!user) {
                    return next();
                }

                if(user.changedPasswordAfter(decoded.iat)){
                    return next();
                }

                res.locals.user = user;
                return next();
            }
            
            next();
        } catch (error) {
            // console.log(error);
            return next();
        }
    },

    restrictTo(...roles) {
        return async(req, res, next) => {
            const user = await User.findById(req.user.id);
            if (!roles.includes(user.role)) {
                return next(new AppError('You do not have permission to perform this action',403));
            }
            next();
        };
    }

};