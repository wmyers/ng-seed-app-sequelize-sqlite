/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  //middleware routing
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/gravatar', require('./api/gravatar'));
  app.use('/api/chat-user', require('./api/chat-user'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
