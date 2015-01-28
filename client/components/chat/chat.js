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
  function ($scope) {

    // //get room id from url - chat1 etc
    // var roomId = Number($location.path.match(/\/chat\/(\d+)$/)[1]);
    //
    // //socket listeners/emitters
    // socket.on('connect', function(){
    //   //emit roomId join event
    //   socket.emit('joinRoom', roomId);
    // });
    //
    // //gravatar url
    // socket.on('avatarUrl', function(data){
    //   var avatarUrl = data;
    // });

    //TODO Submit the form on enter
    // textarea.keypress(function(e){
    //   if(e.which == 13) {
    //     e.preventDefault();
    //     chatForm.trigger('submit');
    //   }
    // });

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

}]);
