'use strict';

angular.module('dashMdul')
.config(function($stateProvider){
  $stateProvider
  .state('dashboard.chat', {
    url: '/chat-demo',
    templateUrl: './components/chat/chat.html',
    controller: 'chatCtrl'
  });
})
//modal demo ctrl
.controller('chatCtrl',
[
  '$scope',
  function (
    $scope
  ) {
    

    }]);
