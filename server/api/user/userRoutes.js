var router = require('express').Router();
var logger = require('../../utils/logger');
var controller = require('./userController')
var auth = require('../../auth/auth');

router.param('id',controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)  


module.exports = router;
