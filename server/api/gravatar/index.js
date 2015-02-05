'use strict';

var express = require('express');
var gravatar = require('../../gravatar');

var router = express.Router();

router.post('/avatar', function (req, res) {
  //email is mandatory, params are optional
  if (!req.body.email) {
    return res.status(400).send('Invalid email.');
  }
  return gravatar.getAvatarUrl(
    req.body.email, req.body.params
  ).then(function(hash) {
    return res.send(hash);
  })
  .catch(function(error){
    return res.status(400).send(error.toString());
  })
});

module.exports = router;
