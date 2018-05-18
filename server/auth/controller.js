var User = require('../api/user/userModel');
var signToken = require('../auth/auth').signToken

module.exports = {
    signin(req,res,next){
        
        // req.user will be there from the middleware
        // verify user. Then we can just create a token
        // and send it back for the client to consume
        var token = signToken(req.user_id);
        res.json({token:token});

    }
}