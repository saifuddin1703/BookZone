const express = require('express');
const { authenticate } = require('../../auth/middlewares');
const meController = require('./controller/meController');
const router = express.Router();

router.get('/',authenticate,meController.setMeparams,meController.getMe);

router.delete('/',authenticate,meController.deleteMe);

router.patch('/',
    authenticate,
    meController.blockFielsUpdate('password','role'),
    meController.setMeparams,
    meController.updateMe
);

router.patch('/password',authenticate,meController.updatePassword);


module.exports = router;