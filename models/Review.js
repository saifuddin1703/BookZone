const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required : true
    },
    review: {
        type: String,
        minLength: 10,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name _id'
    }).select('-__v');
    
    next();
});
module.exports = mongoose.model('Review', reviewSchema);