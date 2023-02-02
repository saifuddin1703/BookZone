const {User} = require('../../../../models');
const AppError = require('../../../../utils/AppError');
const factory = require('../../../../utils/handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

module.exports = {
    setMeparams(req,res,next){
        req.params.id = req.user.id; 
        next(); 
    },
    
    async getMe(req, res, next) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return next(new AppError('User not found', 404));
            }
            return res.status(200).json({
                status : 'success',
                data : user
            });
        }
        catch (error) {
            return next(error);
        }
    },
    
    deleteMe : factory.deleteOne(User),

    async updatePassword(req, res, next) {
        try {
            const {oldPassword, newPassword} = req.body;

            const user = await User.findById(req.user.id).select('+password');

            if (!user) {
                return next(new AppError('User not found', 404));
            }

            const isValid = await user.isValidPassword(oldPassword, user.password);

            if (!isValid) {
                return next(new AppError('Invalid password', 400));
            }

            user.password = newPassword;
            await user.save();

            const token = await signJWT(user._id);

            return res.status(200).json({
                status : 'success',
                data : token 
            });

        }catch (error) {
            return next(error);
        }
    },

    async updateMe(req, res, next) {
        try {
          
            if(req.password) {  
                return next(new AppError('You cannot update password here', 400));
            }

            const filteredBody = filterObj(req.body, 'name', 'email','phone');

            const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {new : true, runValidators : true});

            return res.status(200).json({
                status : 'success',
                data : user
            });
        }
        catch (error) {
            return next(error);
        }
    }
    
}