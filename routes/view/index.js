const express = require('express');
const router = express.Router();
const viewController = require('./controller/viewController');

router.get('/',viewController.getHomePage); 
router.get('/login',viewController.getLoginPage);
router.get('/signup',viewController.getSignupPage);

module.exports = router;