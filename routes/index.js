const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const userRoute = require('./user');
const bookRoute = require('./book');


router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/book', bookRoute);

router.get('/', (req, res) => {
  res.send('Welcome to the Bookzone !');
});

module.exports = router;