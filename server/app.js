var express = require('express');
var uncaught = require('uncaught');
uncaught.start();
uncaught.addListener(function (error) {
  console.log('Uncaught error or rejection: ', error.message);
});

var app = express();

var api = require('./api/api');
var config =require('./config/config');
var logger= require('./utils/logger');
var auth = require('./auth/routes');

app.set('json spaces', 2);

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

app.get('/', function (req, res) {
  // console.log(res.headersSent); // false
  res.status(200).send('200 OK');
  // console.log(res.headersSent); // true
});

app.get('/pro', function (req, res) {
  console.log(res.headersSent); // false
  res.status(200).send(process.env);
  console.log(res.headersSent); // true
});

// setup the apis
app.use('/api', api);

//Set up auth api
app.use('/auth',auth);


// set up global error handling
app.use((err,req,res,next) => {
  console.error(err.stack);
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(200).send('Sorry Error happened...' + err)
})



module.exports = app;