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
        req.params.id = req.user._id; 
        next(); 
    },

    blockFielsUpdate(...fields) {
        return (req,res,next)=>{
            fields.forEach(field=>{
                if(req.body[field]){
                    return next(new AppError(`You cannot update ${field} here`, 400));
                }
            })

            next(); 
        }
    },
    
    getMe : factory.getOne(User),

    updateMe : factory.updateOne(User),

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
    }    
}