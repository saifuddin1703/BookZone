const express = require('express');
const { authenticate } = require('../auth/middlewares');
const router = express.Router();

const wishlistController = require('./controller/wishlistController');


router.get('/',authenticate,wishlistController.getWishlist);

router.post('/',authenticate,wishlistController.addToWishList);

router.delete('/',authenticate,wishlistController.removeFromWishList);

module.exports = router;