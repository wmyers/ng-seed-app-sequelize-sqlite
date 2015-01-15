var models  = require('../../sequelize/models');
var express = require('express');
var router  = express.Router();

router.post('/', function(req, res) {
  //create instance in the db
  models.User.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(function(user) {
    return res.send(user);
  })
  .catch(function(error) {
    return res.status(400).send(error.toString());
  })
});

router.delete('/:user_id', function(req, res) {
  models.User.find({
    where: {id: req.param('user_id')}
  })
  .then(function(user) {
    return user.destroy();
  })
  .then(function(success) {
    return res.send('User successfully deleted');
  })
  .catch(function(error) {
    return res.status(400).send(error.toString());
  });
});

module.exports = router;
