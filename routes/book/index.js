const express = require('express');
const router = express.Router();
const { authenticate, restrictTo } = require('../auth/middlewares');
const bookController = require('./controller/bookController');
const upload = require('../../utils/uploadHandler');
const reviewRoute = require('../review');

router.use('/:book/review', reviewRoute);

router.get('/', authenticate, bookController.getBooks);

router.get('/:id', authenticate, bookController.getBook);

router.post('/', authenticate, restrictTo(['admin']), upload.single('file') ,bookController.createBooks);

router.put('/:id', authenticate, restrictTo(['admin']), bookController.updateBook);

router.delete('/:id', authenticate, restrictTo(['admin']), bookController.deleteBook);

module.exports = router; 
