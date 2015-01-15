"use strict";

var bcrypt = require("bluebird").promisifyAll(require('bcrypt-nodejs'));
var validator = require('validator');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    }
  });
  //validate hook
  User.hook('beforeValidate', function(user, options) {
    if(!options.skipValidation){
      //TODO check the email does not already exist in the db
      var isValidEmail = validator.isEmail(user.email);
      var isPswdOneLetOneNum = /^[a-zA-Z][a-zA-Z0-9]*\d|\d[a-zA-Z0-9]*[a-zA-Z]$/.test(user.password);
      var isValidPassword = validator.isAlphanumeric(user.password) && isPswdOneLetOneNum;
      if(isValidEmail && isValidPassword){
        return sequelize.Promise.resolve(user);
      }else{
        return sequelize.Promise.reject('Validation Error: valid email:'+isValidEmail+', valid pswd:'+isValidPassword);
      }
    }
  });
  //hash the password hook
  User.hook('afterCreate', function(user, options) {
    bcrypt.genSaltAsync(10)
    .then(function(result){
      return bcrypt.hashAsync(user.password, result, null)
    })
    .then(function(hashedpswd){
      //set validation to skip when saving the
      //hashed password over the non-hashed password
      user.password = hashedpswd;
      return user.save({skipValidation:true});
    })
    .then(function(user){
      return sequelize.Promise.resolve(user);
    })
    .catch(function(error){
      return sequelize.Promise.reject(error.toString());
    });
  });
  return User;
};
