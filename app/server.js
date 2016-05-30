var config = require('./config');
var app = require('./app');

console.log('community-service running on http://localhost:' + (process.env.PORT || config.port));
app.listen(process.env.PORT || config.port);