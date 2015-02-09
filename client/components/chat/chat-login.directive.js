'use strict';

angular.module('chatMdul')
.directive('chatLogin', ['$q', 'chatUserSrvc', '$state', function($q, chatUserSrvc, $state) {
  return {
      restrict: 'E',
      scope: {
        formData:'=?'
      },
      controller: function($scope){
      },
      link: function(scope, element, attrs) {
        scope.props = {
          rooms:[
                  {name:'Room 1', value:'Room1'},
                  {name:'Room 2', value:'Room2'}
                ]
        };

        scope.formData = {
          username:'',
          room: scope.props.rooms[0]
        };

        //get a reference to the username text input
        var usernameInput = element.find('input')[0];

        scope.joinChat = function(){
          var username = scope.formData.username;
          var room = scope.formData.room.value;

          //reset default validity message and fallback error message
          usernameInput.setCustomValidity('Please fill out this field.');
          scope.validationError = '';

          //return if no field input
          if(usernameInput.validity.valueMissing){
            scope.validationError = 'Please fill out this field.';
            return;
          }

          //firstly attempt to add the chat user to the backend
          chatUserSrvc.addChatUser({username:username, room:room}).then(function(result){

            chatUserSrvc.username = username;
            chatUserSrvc.room = room;

            //next get the gravatar url
            var gravatarForm = element.find('gravatar-form');
            var gfScope = gravatarForm.isolateScope();
            return gfScope.getAvatarUrl({allowDefault:true});

          },
          function(error){
            //set a custom validity message - do it here rather than in catch
            usernameInput.setCustomValidity(error);

            //fallback error display
            scope.validationError = error;

          }).then(function(url){

            chatUserSrvc.avatarUrl = url;

            $state.go('dashboard.chat', { room: chatUserSrvc.room });

          }).catch(function(error){

            //clean any dirty value in the srvc
            chatUserSrvc.avatarUrl = '';

            scope.validationError = error;
          });
        };

      },
      templateUrl: './components/chat/chat-login.html'
    };
}]);
