'use strict';

angular.module('chatMdul')
.controller('chatCtrl',
[
  '$scope',
  'chatSocketSrvc',
  function($scope, chatSocketSrvc){

    //expose chatSocketSrvc chatData to the view scope
    $scope.chatData = chatSocketSrvc.chatData;

    //Message input form submit
    $scope.submitMessage = function(){
      chatSocketSrvc.sendMessage($scope.chatinputtext);
      $scope.chatinputtext = '';
    };

    //attach a listener to the socket to launch an async digest
    chatSocketSrvc.socket.on('receiveMessage', function(){
      //console.log('received chat data in controller');
      $scope.$evalAsync();
    });

    $scope.$on('$destroy', function (event) {
      chatSocketSrvc.destroy();
    });
}]);
