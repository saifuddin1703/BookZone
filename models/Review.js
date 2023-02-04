const mongoose = require('mongoose');
const Book = require('./Book');
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


reviewSchema.statics.calcAverageRating = async function(bookId) {
    const stats = await this.aggregate([
        {
          '$match': {
            'book': bookId
          }
        }, 
        {
          '$group': {
            '_id': 'book', 
            'nRatings': {
              '$sum': 1
            }, 
            'avgRating': {
              '$avg': '$rating'
            }
          }
        }
      ])

      const book = await Book.findById(bookId); 
      if(stats.length > 0){
        book.book_depository_stars = stats[0].avgRating; 
        book.ratingsQuantity = stats[0].nRatings; 
      }else{
        book.book_depository_stars = 4.5; 
        book.ratingsQuantity = 0; 
    }
    await book.save(); 
}
 

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name _id'
    }).select('-__v');

    next();
});

//calculating average rating after the review is created 
reviewSchema.post('save',async function(){
    // this points to the current doc and this.constructor points to the Model 
    this.constructor.calcAverageRating(this.book); 
})

//calculating average rating after the review is updated or deleted
reviewSchema.post(/^findOneAnd/,async function(doc){
    // this points to the current query after the execution of findOne
    await doc.constructor.calcAverageRating(doc.book);
    console.log(doc);
});


// to set one user can review a book only once i.e user-book should be unique 
reviewSchema.index({ user : 1, book : 1 },{unique : true})
module.exports = mongoose.model('Review', reviewSchema);