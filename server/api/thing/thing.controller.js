/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([
  {
  name : 'Spree',
  info : 'Buy some stuff with your BFFs and save on postage'
  }, {
  name : 'Mass order / Group Buy / Non-spree',
  info : 'Buy some stuff with people you have never met and save on postage'
  }, {
  name : 'Collect from an organiser...',
  info : '...or get it delivered...for a price'
  }
  ]);
};
