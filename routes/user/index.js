const express = require('express');
const router = express.Router();
const {authenticate, restrictTo} = require('../auth/middlewares/index.js');
const userController = require('./controller/userController.js');
const meRoute = require('./me/index.js');

router.use('/me', meRoute);

// get all user 
router.get('/', authenticate, userController.getAllUser);

// get user by id
router.get('/:id', authenticate, userController.getUserById);

//

module.exports = router;