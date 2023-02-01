const express = require('express');
const { authenticate } = require('../../auth/middlewares');
const meController = require('./controller/meController');
const router = express.Router();

router.get('/',authenticate,meController.getMe);

router.delete('/',authenticate,meController.deleteMe);

router.patch('/',authenticate,meController.updateMe);

router.patch('/password',authenticate,meController.updatePassword);


module.exports = router;