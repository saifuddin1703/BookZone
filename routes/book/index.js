const express = require('express');
const router = express.Router();
const { authenticate, restrictTo } = require('../auth/middlewares');
const bookController = require('./controller/bookController');


router.get('/', authenticate, bookController.getBooks);

router.post('/', authenticate, restrictTo(["admin"]), bookController.createBook);

router.get('/:id', authenticate, bookController.getBook);

router.get('/:category', authenticate, bookController.getBooksByCategory);


module.exports = router; 