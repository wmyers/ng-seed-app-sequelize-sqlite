var models  = require('../../sequelize/models');
var express = require('express');
var router  = express.Router();

router.post('/', function(req, res) {
  //create instance in the db
  models.User.create(
    {
      email: req.body.email,
      password: req.body.password
    }
  ).then(
    function(user) {
      res.send(user);
    },
    function(error) {
      res.status(400).send(error.toString());
    }
  )
});

router.delete('/:user_id', function(req, res) {
  models.User.find(
    {
      where: {id: req.param('user_id')}
    }
  ).then(
    function(user) {
      user.destroy().then(
        function() {
          res.send('User successfully deleted');
        }
      );
    },
    function(error) {
      res.status(400).send(error.toString());
    }
  );
});

module.exports = router;
