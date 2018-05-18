var Category = require('./categoryModel');
var _ = require('lodash');

module.exports = {
    
params(req,res,next,id){
    Category.findOne(id)
    .then((category) => {
        if(!category){
            next(new Error('No Category found'));
        }else{
            req.category = category;
            next();
        }

    },(err) => {
        next(err);
    });
},
get(req,res,next){
    Category.find({})
    .then((categories) => {
        res.json(categories);
    },
    (err) => {
        next(err);
    })
},
post(req,res,next){
    var newcategory = req.body;
    Category.create(newcategory)
    .then((category) => {
        res.json(category);
    },(err) => {
        next(err);
    })



}
};