const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const userRoute = require('./user');
const bookRoute = require('./book');
const cartRoute = require('./cart');
const orderRoute = require('./order');
const wishlistRoute = require('./wishlist');


router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/book', bookRoute);
router.use('/cart',cartRoute); 
router.use('/order',orderRoute);
router.use('/wishlist',wishlistRoute);

router.get('/', (req, res) => {
  res.send('Welcome to the Bookzone !');
});

module.exports = router;