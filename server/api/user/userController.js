var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken

module.exports = {
    params(req, res, next, id){
        User.findById(id)
        .then((user) => {
            if(!user){
                next(new Error('No user with that ID..'));
            }else{
                req.user= user;
                next();
            }
        })
    },
    get(req, res, next){
        User.find({})
        .then(function(users){
             res.json(users);
             next();
            }, 
          function(err){
            next(err);
          });
    },
    getOne(req, res, next){
        var user = req.user;
        res.json(user);
    },
    put(req, res, next){
        var user = req.user;
        var update = req.body;
        
        _.merge(user, update);

        user.save(function(err, saved) {
            if (err) {
              next(err);
            } else {
              res.json(saved);
            }
          })
    },
    post(req, res, next){
        var newUser = new User(req.body);

        newUser.save((err, user)=> {
            if(err) {
                next(err);
            }  
            else{
                console.log(`${user}`);      
                var token = signToken(user._id);
                res.json({token: token});
            }
           
        });
    },
    delete(req, res, next){

    }
}