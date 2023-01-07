const { get } = require('mongoose');
const {User} = require('../../../models/');


module.exports = {
    
    async getAllUser(req, res, next) {
        try {
            const users = await User.find();
            return res.status(200).json({
                status : 'success',
                data : users
            });
        }
        catch (error) {
            return next(error);
        }
    },
    async getUserById(req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            return res.status(200).json({
                status : 'success',
                data : user
            });
        }
        catch (error) {
            return next(error);
        }
    },
    
}
