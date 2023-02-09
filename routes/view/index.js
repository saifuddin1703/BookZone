const express = require('express');
const router = express.Router();
const viewController = require('./controller/viewController');
const { isLoggedIn } = require('../auth/middlewares');

router.get('/',isLoggedIn,viewController.getHomePage); 
router.get('/login',viewController.getLoginPage);
router.get('/signup',viewController.getSignupPage);

module.exports = router;