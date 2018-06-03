'use strict'
var router = require('express').Router();
var logger=require('morgan');
var awsController=require('./awsController');
var es6Controller=require('./es6Controller');


router.param("appName",function (req,res,next,appName) {
    if(appName ==='sss'){
        req.appName= {name:'sqs'} ;
    }else if(appName==='qqq'){
        req.appName = {name:'s3'} ;
    }
    else{
        req.appName = appName ;
    }
    next();
})

// router.route('/:appName')
// .get(awsController.get);

router.route('/amz')
.get(awsController.get);

router.route('/es6')
.get(es6Controller.get);



module.exports = router;