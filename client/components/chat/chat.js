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
.factory('chatSocket',
[
  '$location',
  'socketFactory', function ($location, socketFactory) {

    //get room id from url - chat1 etc
    var getRoomId = function(){
      // return Number($location.path.match(/\/room\/(\d+)$/)[1]);
      return 'room1';
    };

    //generate a socket
    var socket = socketFactory();

    //request to join room
    socket.addListener('connect', function(){
      //socket.emit('joinRoom', getRoomId());
    });

    //receive gravatar url
    var avatarUrl;
    socket.addListener('avatarUrl', function(data){
      avatarUrl = data;
    });

    return {
            socket:socket,
            getRoomId:getRoomId,
            avatarUrl:avatarUrl
          };
}])
.controller('chatCtrl', ['$scope', 'chatSocket', function($scope, chatSocket){

    //Message input form submit
    $scope.submitMessage = function(){
      chatSocket.socket.emit('message',
      {
        msg: $scope.chatinputtext,
        avatarUrl:chatSocket.avatarUrl
      });
    };


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
