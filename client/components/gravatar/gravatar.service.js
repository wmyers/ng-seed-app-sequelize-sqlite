'use strict';

angular.module('gravatarMdul').
factory('gravatarSrvc', [
                          '$http',
                          '$q',
                          function(
                            $http,
                            $q
                          ) {

      var self = {
        //store
        avatarUrls:[],

        getImageUrl:getImageUrl,
        getBaseAvatarUrl:getBaseAvatarUrl,
        updateQueryString:updateQueryString
      };


      function getImageUrl(email, props){
        return self.getBaseAvatarUrl(email).then(function(baseAvatarUrl){
          var avatarUrl = self.updateQueryString(baseAvatarUrl, props);
          return $q.when(avatarUrl);
        });
      }

      function getBaseAvatarUrl(email){
        var baseAvatarUrl = self.avatarUrls[email];
        if(baseAvatarUrl !== undefined){
          return $q.when(baseAvatarUrl);
        }else{
          //request a gravatar url with just hashed email
          return $http.get('/api/gravatar/avatar').then(function (result) {
            baseAvatarUrl = result.data;
            self.avatarUrls[email] = baseAvatarUrl;
            return $q.when(baseAvatarUrl);
          })
          .catch(function(error){
            return $q.reject('Unable to get gravatar url. '+error.data);
          });
        }
      }

      function updateQueryString(url, props){
        var hasQuery = url.indexOf('?') === true;
        for(var p in props){
          url += ((hasQuery ? '&' : '?') + p + '=' + props[p]);
          hasQuery = true;
        }
        return url;
      }

      return self;
}]);
