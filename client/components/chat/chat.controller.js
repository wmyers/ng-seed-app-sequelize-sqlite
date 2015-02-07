'use strict';

angular.module('chatMdul')
.controller('chatCtrl',
[
  '$scope',
  'chatSrvc',
  function($scope, chatSrvc){

    //expose chatSrvc to the view scope
    $scope.chatData = chatSrvc.chatData;

    //Message input form submit
    $scope.submitMessage = function(){
      chatSrvc.sendMessage($scope.chatinputtext);
      $scope.chatinputtext = '';
    };

    //attach a listener to the socket to launch an async digest
    chatSrvc.socket.on('receiveMessage', function(){
      //console.log('received chat data in controller');
      $scope.$evalAsync();
    });

    $scope.$on('$destroy', function (event) {
      chatSrvc.destroy();
    });
}]);
