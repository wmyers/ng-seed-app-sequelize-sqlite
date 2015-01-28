/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./config/express')(app);
require('./config/socketio')(io);
require('./routes')(app);
require('./socketio')(io);

/**
* Sequelize - check db connect (auto-create for SQLite if necessary), then start the server
*/

var models = require("./sequelize/models");
models.sequelize.authenticate()
.complete(function(err) {
  if (err) {
    console.log('Unable to connect to the database:', err);
  } else {
    console.log('Connection with database has been established successfully.');
    models.sequelize.sync().then(function () {
      // Start server
      server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
      });
    });
  }
});

// Expose app
exports = module.exports = app;
