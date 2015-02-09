 'use strict';

angular.module('chatMdul')
.factory('chatUserSrvc', ['$q', '$http', function ($q, $http) {

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
        },

        addChatUser:function(userData){
          return $http.post('/api/chat-user/', userData)
          .then(function(result) {
            return $q.when(result);
          })
          .catch(function(error){
            return $q.reject('Unable to add chat user. '+error.data);
          });
        }
      };

      return self;

}]);
