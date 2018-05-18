var router = require('express').Router();
var logger = require('../../utils/logger');
var controller= require('./categoryController');
var auth = require('../../auth/auth');


var checkUser = [auth.decodeToken(),auth.getFreshUser()];
// lock down the right routes :)
router.param('id',controller.params);

router.route('/')
    .get(checkUser,controller.get)
    .post(checkUser,controller.post)  

// router.route('/:id')
//     .get(controller.getOne)
//     .put(controller.put)
//     .delete(controller.delete)

module.exports = router;