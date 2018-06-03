var express = require('express');
var uncaught = require('uncaught');
var AWSXRay = require('aws-xray-sdk');
var loggerW = require('winston');
var http = AWSXRay.captureHTTPs(require('http'));

console.log(`${__dirname}`);
AWSXRay.setLogger(loggerW);
AWSXRay.config([AWSXRay.plugins.ECSPlugin]);
//AWSXRay.middleware.setSamplingRules('./sampling-rules.json');
//AWSXRay.setDaemonAddress('daemonhost:8082');

const apiCNAME = process.env.API_CNAME || 'localhost';





uncaught.start();
uncaught.addListener(function (error) {
  console.log('Uncaught error or rejection: ', error.message);
});
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});


// Using a single function to handle multiple signals
function handle(signal) {
 // console.log(`Received ${signal}`);
}
//process.on('SIGINT', handle);
process.on('SIGTERM', handle);

var app = express();
var api = require('./api/api');
var config =require('./config/config');
var logger= require('./utils/logger');
var auth = require('./auth/routes');

app.set('json spaces', 2);

AWSXRay.middleware.enableDynamicNaming();
app.use(AWSXRay.express.openSegment('service-a'));

app.get('/health', function(req, res) {
  res.status(200).send("Healthy");
});

app.get('/connect-to-b', function(req, res) {
  var seg = AWSXRay.getSegment();
  seg.addAnnotation('service', 'service-b-request');

  console.log('Start service B request start ....');
  var reqData = ''; // queryString.stringify(req.body);

  var options = {
    host: 'www.google.com', // apiCNAME,
    port: '80',
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(reqData)
    }
  };

  // Set up the request
  var remoteReq = http.request(options, function(remoteRes) {
    var body = '';
    remoteRes.setEncoding('utf8');

    remoteRes.on('data', function(chunk) {
      body += chunk;
    });

    remoteRes.on('end', function() {
      res.status(200).send(body);
    });
  });

  remoteReq.on('error', function() {
    console.log('service-b request failed');
  });

  // post the data
  remoteReq.write(reqData);
  console.log('In service B request end ....');
  remoteReq.end();
});

app.use(AWSXRay.express.closeSegment());




app.use(AWSXRay.express.openSegment('MyApp'));


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

app.use(AWSXRay.express.closeSegment());

// set up global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }
  if (req.xhr) {
    logger.error(err.stack);
    res.status(200).send('Sorry AJAX Error happened...' + err)
  } else {
    logger.error(err.stack);
    res.status(200).send('Sorry Error happened...' + err)
  }

  
});



module.exports = app;