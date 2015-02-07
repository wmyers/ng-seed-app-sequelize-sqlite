'use strict';

angular.module('chatMdul')
.factory('chatSrvc',
[
  '$location',
  'socketFactory',
  'chatUserSrvc',
  function ($location, socketFactory, chatUserSrvc) {

    //generate a socket
    var socket = socketFactory();
    var roomId = chatUserSrvc.room;
    var userName = chatUserSrvc.username;
    var avatarUrl = chatUserSrvc.avatarUrl;

    //TODO - check this regexp : get room id from url
    var getRoomId = function(){
      return Number($location.path.match(/\/room\/(\d+)$/)[1]);
    };

    var sendMessage = function(msg){
      socket.emit('sendMessage',
      {
        userName:userName,
        roomId:roomId,
        avatarUrl:avatarUrl,
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
    //currently just fully disconnect
    socket.on('connect_error', function(e) {
      console.log('&*&*&*&*&*&* socket.io connection error detected in chat client');
      socket.disconnect();
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
