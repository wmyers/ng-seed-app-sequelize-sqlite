'use strict';

angular.module('chatMdul')
.config(function($stateProvider){
  $stateProvider
  .state('dashboard.chat', {
    url: '/chat-demo',
    templateUrl: './components/chat/chat.html',
    controller: 'chatCtrl'
  });
})
.run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(ev, toS, toPs, fromS, fromPs, error) {
    // if (error.chatUserReady === false) {
    //   $state.go('dashboard.chatLogin');
    // }
  });
}])
.factory('chatSrvc',
[
  '$location',
  'socketFactory',
  function ($location, socketFactory) {

    //generate a socket
    var socket = socketFactory();
    var roomId = 'room1';
    var userName = 'will';

    //TODO - check this regexp : get room id from url
    var getRoomId = function(){
      return Number($location.path.match(/\/room\/(\d+)$/)[1]);
    };

    var sendMessage = function(msg){
      socket.emit('sendMessage',
      {
        userName:userName,
        roomId:roomId,
        msg: msg
      });
    };

    var destroy = function(){
      socket.removeAllListeners();
    };

    //request to join room
    socket.on('connect', function(){
      console.log('joinRoom:', roomId);
      socket.emit('joinRoom', {userName:userName, roomId:roomId});
    });

    //receive messages
    socket.on('receiveMessage', function(data){
      console.log('received chat data:', data);
      self.chatData.messages.push(data);
    });

    //connection error handling
    socket.on('connect_error', function(e) {
      console.log('&*&*&*&*&*&* socket.io connection error detected in client');
      socket.removeAllListeners();
      socket.disconnect();
    });

    //receive gravatar url
    var avatarUrl;
    socket.on('avatarUrl', function(data){
      avatarUrl = data;
    });

    var self = {
            sendMessage:sendMessage,
            destroy:destroy,
            chatData:{
              roomId:roomId,
              userName:userName,
              messages:[],
            },
            socket:socket
          };

    return self;
}])
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
      console.log('received chat data in controller');
      $scope.$evalAsync();
    });

    $scope.$on('$destroy', function (event) {
      chatSrvc.destroy();
    });
}]);

    //TODO Update the relative time stamps on the chat messages every minute
    // setInterval(function(){
    //
    //   messages.each(function(){
    //     var each = moment($(this).data('time'));
    //     $(this).text(each.fromNow());
    //   });
    //
    // },60000);
