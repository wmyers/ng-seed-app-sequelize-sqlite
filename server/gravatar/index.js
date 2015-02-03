var Promise = require('bluebird');
var crypto = require('crypto');
var querystring = require('query-string');

module.exports = {
  getImageUrl: function(email, parameters) {
    return new Promise(function(resolve, reject){
      if(email){
        var baseUrl = 'http://www.gravatar.com/avatar/';
        var result = "";
        var convertedQueryString = querystring.stringify(parameters);
        if (convertedQueryString !== ""){
          result = "?" + convertedQueryString;
        }
        resolve(baseUrl + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + result);
      }else{
        reject("Invalid email");
      }
    })
  }
};
