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

        //TODO email field validation with $invalid allows an '@' without a '.' - maybe replace with regex

        scope.joinChat = function(){

          //apply any synchronous values to chatUserSrvc
          chatUserSrvc.username = scope.formData.username;
          chatUserSrvc.room = scope.formData.room.value;

          //get avatar url async from the child directive
          var gravatarForm = element.find('gravatar-form');
          var gfScope = gravatarForm.isolateScope();
          gfScope.getAvatarUrl().then(function(url){
            chatUserSrvc.avatarUrl = url;

            //TODO check if name already taken

            $state.go('dashboard.chat');
          }).catch(function(error){
            //if optional
            if(gfScope.isOptional){
              $state.go('dashboard.chat');
            }
          });
        };


      },
      templateUrl: './components/chat/chat-login.html'
    };
}]);
