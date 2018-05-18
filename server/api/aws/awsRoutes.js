'use strict'
var router = require('express').Router();
var logger=require('morgan');
var cont=require('./awsController');


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

router.route('/:appName')
.get(cont.get);

router.route('/es6Trials')
.get(cont.get);



module.exports = router;