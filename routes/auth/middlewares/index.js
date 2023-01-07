const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const AppError = require('../../../utils/appError');
module.exports = {
    async authenticate(req, res, next) {
        try {
            if (!req.headers.authorization) {
                return next(new AppError('Please provide an authorization token'));
            }
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId);
            console.log(decoded.userId);
            next();
        } catch (error) {
            // console.log(error);
            return next(error);
        }
    },

    restrictTo(...roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new AppError('You do not have permission to perform this action'));
            }
            next();
        };
    }

};