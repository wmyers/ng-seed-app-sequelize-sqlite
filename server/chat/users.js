var BBPromise = require('bluebird');

//a temp store of chat user data
//TODO create db model for chat users
var users = [];
var checkUserExists = function(username){
  if(users.indexOf(username) > -1){
    return true;
  }
  return false;
}

module.exports = {
  addUser : function(user){
    return new BBPromise(function(resolve, reject){
      if(checkUserExists(user.username)){
        resolve(true);
      }else{
        reject('username already taken');
      }
    })
  }
};
