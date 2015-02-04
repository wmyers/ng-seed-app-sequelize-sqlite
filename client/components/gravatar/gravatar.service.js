'use strict';

angular.module('gravatarMdul', []).
factory('gravatarSrvc', [
                          '$http',
                          '$q',
                          '$window',
                          function(
                            $http,
                            $q,
                            $window
                          ) {

      var self = {
        //store
        avatarUrls:[]
      };


      function getImageUrl(email, def, props){
        //request a gravatar url with just hashed email and default image param
        return $http.get('/api/gravatar/avatar')
        .then(function (result) {
          var avatarUrl = result.data;
          //create a new sub-array for this email if required
          var stored = self.avatarUrls[email];
          if(stored === undefined){
            stored = [];
          }
          stored.push(avatarUrl);
          return $q.when(self.avatarUrls);
        })
        .catch(function(error){
          return $q.reject('Unable to get gravatar url. '+error.data);
        });
      }

      function updateQueryString(email, props){
        var avatarUrl = self.avatarUrls[email];
        if(avatarUrl === undefined){
          return;
        }
        var hasQuery = avatarUrl.indexOf('?') === true;
        for(var p in props){
          avatarUrl += (hasQuery ? '&' : '?') + p + '=' + props[p];
          hasQuery = true;
        }
        self.avatarUrls[email] = avatarUrl;
      }


}]);
