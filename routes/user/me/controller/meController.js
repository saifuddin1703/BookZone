const {User} = require('../../../../models');
const AppError = require('../../../../utils/AppError');


module.exports = {
    async getMe(req, res, next) {
        try {
            const user = await User.findById(req.userId);
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
    
    async deleteMe(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.userId);
            return res.status(200).json({
                status : 'success',
                data : user
            });
        }
        catch (error) {
            return next(error);
        }
    },
    async updateMe(req, res, next) {
        try {
            const user = await User.findByIdAndUpdate(req.userId, req.body, {new : true});
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