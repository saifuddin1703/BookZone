const express = require('express');
const router = express.Router();
const {authenticate, restrictTo} = require('../auth/middlewares/index.js');
const userController = require('./controller/userController.js');
const meRoute = require('./me/index.js');

router.use('/me', meRoute);

// get all user 
router.get('/', 
    authenticate, 
    restrictTo('admin'), 
    userController.getAllUser
);

// get user by id
router.get('/:id', 
    authenticate,
    restrictTo('admin'),
    userController.getUserById
);

// create user
router.post('/',
    authenticate,
    restrictTo('admin'),
    userController.createUser
);

// update user
router.patch('/:id',
    authenticate,
    restrictTo('admin'),
    userController.updateUser
);

// delete user
router.delete('/:id',
    authenticate,
    restrictTo('admin'),
    userController.deleteUser
);

//

module.exports = router;