"use strict";

var bcrypt  = require('bcrypt-as-promised');
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
  //validate
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
  //hash the password
  User.hook('afterCreate', function(user, options) {
    bcrypt.hash(user.password, 10).then(
      function(hashedpswd){
        user.password = hashedpswd;
        //set validation to skip when saving the
        //hashed password over the non-hashed password
        user.save({skipValidation:true}).then(
          function(success){
            return sequelize.Promise.resolve(user);
          },
          function(error){
            return sequelize.Promise.reject(error.toString());
          }
        )
      },
      function(error){
        return sequelize.Promise.reject(error.toString());
      }
    );
  });
  return User;
};
