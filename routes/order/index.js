const express = require('express');
const router = express.Router();
const {authenticate} = require('../auth/middlewares/index.js');
const orderController = require('./controller/orderController.js');


// get all order
router.get('/', authenticate, orderController.getOrders);

// get order by id
router.get('/:id', authenticate, orderController.getOrder);

// create order
router.post('/', authenticate, orderController.createOrder);


module.exports = router;