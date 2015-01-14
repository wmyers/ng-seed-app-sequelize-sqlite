'use strict';

var express = require('express');
var jwt = require('jwt-simple');
// var bcrypt = require('bcrypt-as-promised');
var Promise = require("bluebird");
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var _ = require('underscore');
var moment = require('moment');
var auth = require('../../components/auth-middleware');
var models  = require('../../sequelize/models');
var router = express.Router();
var sessionSecret = process.env.SESSION_SECRET;

// Login as a user and receive a JWT access token.
router.post('/login', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Invalid email or password field.');
  }
  models.User.find({
      where: {email: req.body.email}
    })
  .then(function(user) {
    //if user === null the promise is still resolved
    //isn't that a bit pants?
    if(user){
      //user exists, check password
      bcrypt.compareAsync(req.body.password, user.password)
      .then(function (success){
        //all good
        var payload = {
          id: user.id,
          exp: Math.ceil(moment().add(5, 'days').format('X'))
        }
        var token = jwt.encode(payload, sessionSecret);
        return res.send(token);
      })
      .catch(function(error){
        return res.status(400).send(error.toString());
      });
    }else{
      return res.status(400).send('User does not exist');
    }
  })
  .catch(function(error){
      res.status(400).send(error.toString());
  })
});

// Retrieves own user information.
router.get('/me', auth.required, function (req, res, next) {
  models.User.find(
    {
      where: {id: req.auth.id}
    }
  ).then(
    function(user) {
      //TODO - Angular JSON vulnerability protection
      //if this is JSON then should prefix response with )]}',
      res.send(user);
    },
    function(error){
      res.status(400).send(error.toString());
    }
  )
});

module.exports = router;
