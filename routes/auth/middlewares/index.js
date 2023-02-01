const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const AppError = require('../../../utils/AppError');
const { promisify } = require('util');

module.exports = {
    async authenticate(req, res, next) {
        try {
            if (!req.headers.authorization) {
                return next(new AppError('Please provide an authorization token'));
            }
            const token = req.headers.authorization.split(' ')[1];

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

            req.user = {
                id: user._id
            };
            console.log(user)
            // console.log(decoded.userId);
            next();
        } catch (error) {
            // console.log(error);
            return next(new AppError('Session Expires', 401));
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