const User = require('../../../models/User');
const Cart = require('../../../models/Cart');
const CartItem = require('../../../models/CartItem'); 
const AppError = require('../../../utils/AppError');

module.exports = {
    async getCart(req, res, next) {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return next(new AppError('User not found', 404));
            }

            const cart = await Cart.findOne({user : user._id})
                .populate({
                    path : 'items',
                    populate : {
                        path : 'book'
                    }
                }
            );

            if (!cart) {
                return res.status(200).json({
                    status : 'success',
                    data : {}
                });
            }

            
            return res.status(200).json({
                status : 'success',
                data : cart
            });
        }
        catch (error) {
            return next(error);
        }
    },

    async addToCart(req, res, next) {
        
        try {
            let cart = await Cart.findOne({user : req.user.id});

            const cartItemBody = {
                book : req.body.bookId,
                quantity : !req.body.quantity ? 1 : req.body.quantity,
            }; 

            const cartItem = await CartItem.create(cartItemBody);

            if (cart) {            
                cart.items.push(cartItem._id);
                cart.itemCount = cart.items.length; 
                cart = await cart.save();
            }else{
                const cartBody = {
                    user : req.user.id,
                    items : [cartItem],
                    itemCount : 1
                };

                cart = await Cart.create(cartBody);
            }

            return res.status(200).json({
                status : 'success',
                data : cart
            });

        }
        catch (error) {
            return next(error);
        }
    },

    async updateCartItem(req, res, next) {
        try {
            const cart = await Cart.findOne({user : req.user.id});

            if (!cart) {
                return next(new AppError('Cart not found', 404));
            }

            const cartItem = await CartItem.findById(req.params.cartItem);

            if (!cartItem) {
                return next(new AppError('Cart item not found', 404));
            }

            cartItem.quantity = req.body.quantity;
            await cartItem.save();

            await cart.save();
            return res.status(200).json({
                status : 'success',
                data : cart
            });
        }
        catch (error) {
            return next(error);
        }
    },

    async deleteCartItem(req, res, next) {
        try {
            const cart = await Cart.findOne({user : req.user.id});

            if (!cart) {
                return next(new AppError('Cart not found', 404));
            }

            // console.log(req.body.cartItem);
            const cartItem = await CartItem.findByIdAndDelete(req.params.cartItem);

            cart.items.pull(req.params.cartItem);
            cart.itemCount = cart.items.length;
            await cart.save();

            if (!cartItem) {
                return next(new AppError('Cart item not found', 404));
            }

            return res.status(200).json({
                status : 'success',
                data : cart
            });
        }
        catch (error) {
            return next(error);
        }
    },

    async deleteCart(req, res, next) {
        try {
            const cart = await Cart.findOne({user : req.user.id});

            if (!cart) {
                return next(new AppError('Cart not found', 404));
            }

            await cart.remove();

            return res.status(200).json({
                status : 'success',
                data : {}
            });
        }
        catch (error) {
            return next(error);
        }
    }
};
