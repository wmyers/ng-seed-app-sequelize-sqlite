'use strict';

var express = require('express');
var chatUsers = require('../../chat/users');

var router = express.Router();

//add chat user
router.post('/', function (req, res) {
  return chatUsers.addUser(
    req.body
  ).then(function(success) {
    return res.send(success);
  })
  .catch(function(error){
    return res.status(400).send(error.toString());
  })
});

module.exports = router;
