const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartItem = require('./CartItem'); 
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    total: {
        type : Number,
        default : 0
    }
});

cartSchema.pre('save', async function(next) {
    try {
        const cartItems = await CartItem.find({ _id: { $in: this.items } });
        this.total = cartItems.reduce((total, item) => total + item.price, 0);
        return next();
    } catch (error) {
        return next(error);
    }
});

cartSchema.pre('remove', async function(next) {
    try {
        await CartItem.deleteMany({ _id: { $in: this.items } });
        return next();
    } catch (error) {
        return next(error);
    }
});

cartSchema.pre('update', async function(next) {
    try {
        const cartItems = await CartItem.find({ _id: { $in: this.items } });
        this.total = cartItems.reduce((total, item) => total + item.price, 0);
        return next();
    } catch (error) {
        return next(error);
    }
});

module.exports = new mongoose.model('Cart', cartSchema);