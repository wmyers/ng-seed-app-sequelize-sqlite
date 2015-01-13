'use strict';

/**
 * Express middleware functions to help with authentication.
 */

var jwt = require('jwt-simple');

var sessionSecret = process.env.SESSION_SECRET;

module.exports = {
  required: function required(req, res, next) {
    var authHeader = req.header('Authorization');
    var encodedToken = (/^Bearer (.*)$/i.exec(authHeader) || [])[1];
    if (!encodedToken) {
      return res.status(403).send('Missing bearer token in Authorization header field.');
    }

    var token;
    try {
      token = jwt.decode(encodedToken, sessionSecret);
    } catch (e) {
      //console.log('**** auth.required jwt token error', e);
      return res.status(400).send(e.toString());
    }

    let now = new Date().getTime()/1000;
    if (now >= token.exp) return res.status(401).send('Expired session.');

    req.auth = token; // Store auth details as a request property.
    next();
  }
}
