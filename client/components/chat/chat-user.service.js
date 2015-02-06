'use strict';

angular.module('chatMdul')
.factory('chatUserSrvc', function () {

      var self = {
        username:'',
        avatarUrl:'',
        room:'',

        isUser: function(){
          return self.username !== '' && self.avatarUrl !== '' && self.room !== '';
        }
      };

      return self;

});
