const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    image : {
        type : String,
        required : false
    },
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    format : {
        type : String,
        required : true,
        default : 'Paperback'
    },
    book_depository_stars : {
        type : Number,
        required : true,
        default : 4.5
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

bookSchema.virtual('reviews', {
    foreignField: 'book',
    localField: '_id',
    ref: 'Review'
});

bookSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'reviews',
        select: '-__v'
    }).select('-__v -id -createdAt -updatedAt');

    next();
});

module.exports = mongoose.model('Book', bookSchema);
