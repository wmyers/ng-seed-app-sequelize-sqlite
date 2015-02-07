'use strict';

angular.module('chatMdul')
.config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('dashboard.chat', {
    url: '/chat',
    templateUrl: './components/chat/chat.html',
    controller: 'chatCtrl',
    resolve: {
      auth: ['chatUserSrvc', '$state', function(chatUserSrvc, $state){
        return chatUserSrvc.getChatUserValidated()
        .catch(function(error){
          $state.go('dashboard.chat-login');
        });
      }]
    }
  })
  .state('dashboard.chat-login', {
    url: '/chat-login',
    template: '<chat-login/>'
  });
}]);
