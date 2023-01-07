const express = require('express');
const router = express.Router();
const authController = require('./controller');

router.get('/', (req, res,next) => {
  return next(new Error('Get is not supported on /auth'));
});

router.post('/login', authController.login); 

router.post('/signup',authController.signup);

router.post('/forgetPassword', authController.forgetPassword);

router.post('/resetPassword', authController.resetPassword);

module.exports = router;
 