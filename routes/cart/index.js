const express = require('express'); 
const { authenticate } = require('../auth/middlewares');
const router = express.Router(); 
const cartController = require('./controller/cartController');

// get cart 
router.get('/',authenticate,cartController.getCart);

// add to cart
router.post('/', authenticate, cartController.addToCart); 

// update cart
router.put('/:cartItem', authenticate, cartController.updateCartItem);

// delete from cart
router.delete('/:cartItem', authenticate, cartController.deleteCartItem);

module.exports = router;
