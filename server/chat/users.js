var BBPromise = require('bluebird');

//a temp store of chat user data
//TODO create db model for chat users
var users = [];
var checkUserExists = function(username){
  if(users.indexOf(username) > -1){
    return true;
  }
  users.push(username);
  return false;
}

module.exports = {
  addUser : function(userData){
    return new BBPromise(function(resolve, reject){
      if(!checkUserExists(userData.username)){
        resolve(true);
      }else{
        reject('Username already taken');
      }
    })
  }
};
