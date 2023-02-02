const express = require('express');
const router = express.Router({ mergeParams : true });

const { authenticate, restrictTo } = require('../auth/middlewares');
const reviewController = require('./controller/reviewController');


// create a review
router.post('/', authenticate, reviewController.setReviewBody, reviewController.createReview);

// get all reviews
router.get('/', authenticate, reviewController.getReviews);

// get a review
router.get('/:id', authenticate, reviewController.getReview);

// update a review
router.patch('/:id', authenticate, reviewController.updateReview);

// delete a review
router.delete('/:id', authenticate, reviewController.deleteReview);


module.exports = router;