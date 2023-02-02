const Review = require('../../../models/Review');
const catchAsync = require('../../../utils/catchAsync');
const ApiFeatures = require('../../../utils/apiFeatures');
const AppError = require('../../../utils/AppError');
const factory = require('../../../utils/handlerFactory');

module.exports = {

    setReviewBody : (req,res,next) =>{
        req.body.user = req.user.id;
        next(); 
    },

    createReview : factory.createOne(Review),

    getReviews : catchAsync(
        async (req, res, next) => {
            if(req.params.book){
                req.query.book = req.params.book; 
            }

            const apiFeatures = new ApiFeatures(Review.find(), req.query)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();

            const reviews = await apiFeatures.query;

            res.status(200).json(
                {
                    status : 'success',
                    data : reviews
                }
            );
        }
    ),

    getReview : catchAsync(
        async (req, res, next) => {
            const {id} = req.params;

            const review = await Review.findById(id);

            if(!review){
                return next(new AppError('Review not found',404));
            }   

            res.status(200).json(
                {
                    status : 'success',
                    data : review
                }
            );
        }
    ),

    updateReview : factory.updateOne(Review),
      
    deleteReview : factory.deleteOne(Review)
}
