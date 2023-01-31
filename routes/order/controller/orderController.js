const Order = require('../../../models/Order');
const AppError = require('../../../utils/AppError');

module.exports = {
    async createOrder(req, res, next) {
        const user = req.user.id;
        const orderBody = {
            ...req.body,
            user : user
        };

        try {
            const order = await Order(orderBody).save();
            
            return res.status(200).json({
                status : 'success',
                data : order
            });
        }
        catch (error) {
            return next(error);
        }
    },
    async getOrders(req, res, next) {
        try {
            const orders = await Order.find({user : req.user.id})
                .populate('products.product');

            return res.status(200).json({
                status : 'success',
                data : orders
            });
        }
        catch (error) {
            return next(error);
        }
    },
    async getOrder(req, res, next) {
        try {
            const order = await Order.findById(req.params.id)
                .populate('products.product');

            return res.status(200).json({
                status : 'success',
                data : order
            });
        }
        catch (error) {
            return next(error);
        }
    }
}