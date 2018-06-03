var config = require('./server/config/config');
var app = require('./server/app.js');
var logger= require('./server/utils/logger');

app.listen(config.port);

logger.log('listening on http://localhost:' + config.port);

