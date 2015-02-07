var BBPromise = require('bluebird');
var crypto = require('crypto');
var querystring = require('query-string');

module.exports = {
  //returns one gravatar avatar url as a promise
  getAvatarUrl: function(email, parameters) {
    return new BBPromise(function(resolve, reject){
      var baseUrl = 'http://www.gravatar.com/avatar/';
      var result = '';
      var convertedQueryString = querystring.stringify(parameters);
      if (convertedQueryString !== ""){
        result = "?" + convertedQueryString;
      }
      var avatarUrl = baseUrl + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + result;
      resolve(avatarUrl);
    })
  }
};
