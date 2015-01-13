'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/things', controller.index);

module.exports = router;