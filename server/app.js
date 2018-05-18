var express = require('express');

var app = express();

var api = require('./api/api');
var config =require('./config/config');
var logger= require('./utils/logger');
var auth = require('./auth/routes');

try {
  // db.url is different depending on NODE_ENV
 // require('mongoose').connect(config.db.url);
} catch (error) {
  
}


if(config.seed){
    require('./utils/seed');
}

// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the apis
app.use('/api', api);

//Set up auth api
app.use('/auth',auth);


// set up global error handling
app.use((err,req,res,next) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Sorry Error happened...' + err)
})

module.exports = app;