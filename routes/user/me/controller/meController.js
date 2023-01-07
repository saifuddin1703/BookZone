const {User} = require('../../../../models')


module.exports = {
    async getMe(req, res, next) {
        try {
            const user = await User.findById(req.userId);
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