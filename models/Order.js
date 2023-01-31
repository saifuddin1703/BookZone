const mongoose = require('mongoose');
const Book = require('./Book');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product : {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    total: {
        type : Number,
        default : 0
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Delivered', 'Cancelled']
    },
    address: {
        type: String,
        required: true
    },
    paymentid: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true,
        maxLenght: 10
    }
}, { timestamps: true });

orderSchema.pre('save', async function(next) {
    try {
        const products = await Promise.all(this.products.map(async product => {
            const book = await Book.findById(product.product);
            return {
                product: product.product,
                quantity: product.quantity,
                price: book.price
            }
        }));

        this.total = products.reduce((total, product) => total + product.price * product.quantity, 0);
        return next();
    } catch (error) {
        return next(error);
    }
});

module.exports = new mongoose.model('Order', orderSchema);

