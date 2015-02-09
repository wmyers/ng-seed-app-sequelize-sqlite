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

        scope.joinChat = function(){

          //apply any synchronous values to chatUserSrvc
          chatUserSrvc.username = scope.formData.username;
          chatUserSrvc.room = scope.formData.room.value;

          //get avatar url async from the child directive
          var gravatarForm = element.find('gravatar-form');
          var gfScope = gravatarForm.isolateScope();
          gfScope.getAvatarUrl({allowDefault:true}).then(function(url){
            chatUserSrvc.avatarUrl = url;

            //TODO check if name already taken

            $state.go('dashboard.chat', { room: chatUserSrvc.room });


          }).catch(function(error){

            //clean any dirty value in the srvc
            chatUserSrvc.avatarUrl = '';

          });
        };


      },
      templateUrl: './components/chat/chat-login.html'
    };
}]);
