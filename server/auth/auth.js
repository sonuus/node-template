var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
var config=require('../config/config');
var checkTokenJWT= expressJwt({secret: config.secrets.jwt});
var User = require('../api/user/userModel');
module.exports = {

    decodeToken(){
        // make it optional to place token on query string
        // if it is, place it on the headers where it should be
        // so checkToken can see it. See follow the 'Bearer 034930493' format
        // so checkToken can see it and decode it
        return function(req, res, next){
            if(req.query && req.query.hasOwnProperty('access_token')){
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            // this will call next if token is valid
            // and send error if its not. It will attached
            // the decoded token to req.user
            checkTokenJWT(req,res,next);
        };

    },
    getFreshUser(){
        return  async (req,res,next) => {
          try {
            var user= await User.findById(req.user._id);
            if(!user){
              res.status(401).send('Unauthorized');
              }else{
                  req.user = user;
                  next();
              }
          } catch (err) {
            next(err);
          }
            // User.findById(req.user._id)
            // .then((user) => {
            //     if(!user){
            //         res.status(401).send('Unauthorized');
            //     }else{
            //         req.user = user;
            //         next();
            //     }
            // },(err) => {
            //     next(err)
            // })      
            
        };
    },
    verifyUser(){
        return (req,res,next) => {
            var username= req.body.username;
            var password = req.body.password;

            if(!username || !password){
                res.status(400).send('You need to send a username and password');                
            }
            // look user up in the DB so we can check
            // if the passwords match for the username

            User.findOne({username:username})
            .then((user) => {
                if(!user){
                   res.status(401).send('No user with the given username');
                }else{
                    if(!user.authenticate){
                        res.status(401).send('Wrong password');
                    }else{
                        req.user = user;
                        next();
                    }
                }

            },(err) => {
                next(err);
            });
        }

    },
    // util method to sign tokens on signup
    signToken(id){
        return jwt.sign({_id:id},config.secrets.jwt,{expiresIn:config.expireTime})        
    }


}
