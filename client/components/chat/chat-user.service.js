 'use strict';

angular.module('chatMdul')
.factory('chatUserSrvc', ['$q', function ($q) {

      var self = {
        username:'',
        avatarUrl:'',
        room:'',

        //currently just need user and room for validation
        getChatUserValidated: function(){
          var fields = ['username', 'room'];
          var msg = '';
          fields.map(function(prop){
            if(self[prop] === ''){
              msg += prop+' is not set. ';
            }
          });
          if(msg === ''){
            return $q.when(true);
          }
          return $q.reject(new Error(msg));
        }
      };

      return self;

}]);
