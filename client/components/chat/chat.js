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
.factory('chatSrvc',
[
  '$location',
  'socketFactory',
  function ($location, socketFactory) {

    //TODO - check this regexp : get room id from url
    var getRoomId = function(){
      return Number($location.path.match(/\/room\/(\d+)$/)[1]);
    };

    //generate a socket
    var socket = socketFactory();

    var roomId = 'room1';
    var userName = 'will';

    //request to join room
    socket.on('connect', function(){
      console.log('joinRoom:', roomId);
      socket.emit('joinRoom', {userName:userName, roomId:roomId});
    });

    //receive messages
    socket.on('receiveMessage', function(data){
      console.log('received chat data:', data);
      self.messages.push(data);
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
            socket:socket,
            roomId:roomId,
            userName:userName,
            messages:[]
          };

    return self;
}])
.controller('chatCtrl',
[
  '$scope',
  'chatSrvc',
  function($scope, chatSrvc){

    //expose chatSrvc to the view scope
    $scope.chatSrvc = chatSrvc;

    //Message input form submit
    $scope.submitMessage = function(){
      console.log('submitting message:', $scope.chatinputtext);
      chatSrvc.socket.emit('sendMessage',
      {
        userName:chatSrvc.userName,
        roomId:chatSrvc.roomId,
        msg: $scope.chatinputtext
      });
      //clear input text
      $scope.chatinputtext = '';
    };

    $scope.$on('$destroy', function (event) {
      chatSrvc.socket.removeAllListeners();
    });
}]);


    // chatForm.on('submit', function(e){
    //   e.preventDefault();
    //   // Create a new chat message and display it directly
    //   createChatMessage(textarea.val(), name, img, moment());
    //   scrollToBottom();
    //   // Send the message to the other people in the chat
    //   socket.emit('msg', {msg: textarea.val(), user: name, img: img});
    //   // Empty the textarea
    //   textarea.val("");
    // });

    //TODO Update the relative time stamps on the chat messages every minute
    // setInterval(function(){
    //
    //   messages.each(function(){
    //     var each = moment($(this).data('time'));
    //     $(this).text(each.fromNow());
    //   });
    //
    // },60000);
