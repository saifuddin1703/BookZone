const mongoose = require('mongoose');
const Book = require('./Book');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    }
});

cartItemSchema.pre('save', async function(next) {
    try {
        const book = await Book.findById(this.book);
        this.price = book.price * this.quantity;
        return next();
    } catch (error) {
        return next(error);   
    }
}); 

module.exports = new mongoose.model('CartItem', cartItemSchema);