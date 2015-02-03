'use strict';

var express = require('express');
var gravatar = require('../../gravatar');

var router = express.Router();

// Retrieves own user information.
router.get('/avatar', function (req, res) {
  return gravatar.getImageUrl(
    req.email, req.params
  ).then(function(hash) {
    return res.send(hash);
  })
  .catch(function(error){
    return res.status(400).send(error.toString());
  })
});

module.exports = router;
