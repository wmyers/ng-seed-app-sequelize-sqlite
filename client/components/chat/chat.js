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
    var roomId = Number($location.path.match(/\/room\/(\d+)$/)[1]);

    //generate a socket
    var socket = socketFactory();

    var avatarUrl;

    socket.addListener('connect', function(){
      socket.emit('joinRoom', roomId);
    });

    //gravatar url
    socket.addListener('avatarUrl', function(data){
      avatarUrl = data;
    });

    return {
            socket:socket,
            roomId:roomId,
            avatarUrl:avatarUrl
          };
}])
.controller('chatCtrl', ['$scope', 'chatSocket', function($scope, chatSocket){

    //Message input form submit
    $scope.submitMessage = function(){
      submitMessage();
    };

    var submitMessage = function(){
      chatSocket.socket.emit('message',
                            {
                              msg: $scope.chatinputtext,
                              avatarUrl:chatSocket.avatarUrl
                            }
      ).then();
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
