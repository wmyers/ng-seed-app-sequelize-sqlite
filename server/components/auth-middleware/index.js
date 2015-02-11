'use strict';

var UnauthorizedError = require('./UnauthorizedError');
var jwt = require('jwt-simple');
var sessionSecret = process.env.SESSION_SECRET;

var authenticateToken = function(encodedToken, callback){
  var token;
  try {
    token = jwt.decode(encodedToken, sessionSecret);
  } catch (e) {
    return callback(new UnauthorizedError(400, e.toString()));
  }

  var now = new Date().getTime()/1000;
  if (now >= token.exp){
    return callback(new UnauthorizedError(401, 'Expired session.'));
  }

  return callback(null, token);
}

var getTokenFromHeader = function(req, callback){
  try{
    var authHeader = req.header('Authorization');
    var encodedToken = (/^Bearer (.*)$/i.exec(authHeader) || [])[1];
    if (!encodedToken) {
      return callback(new UnauthorizedError(403, 'Missing bearer token in Authorization header field.'));
    }

    authenticateToken(encodedToken, callback);

  }catch(error){
    callback(error);
  }
}

module.exports = {
  authenticateToken:authenticateToken,
  getTokenFromHeader:getTokenFromHeader,
  required: function required(req, res, next) {
    getTokenFromHeader(req, function(error, token){
      if(error){
        var code = error.code || 400;
        return res.status(code).send(error.message);
      }
      req.auth = token; // Store auth details as a request property.
      next();
    });
  }
}
