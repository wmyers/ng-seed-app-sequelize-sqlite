'use strict';

angular.module('chatMdul')
.factory('chatSocketSrvc',
[
  '$location',
  'socketFactory',
  'chatUserSrvc',
  function ($location, socketFactory, chatUserSrvc) {

    //generate a socket
    var socket = socketFactory();
    var srvc = chatUserSrvc;

    var joinRoom = function(){
      console.log('joinRoom:', srvc.room);

      socket.emit('subscribe', {username:srvc.username, room:srvc.room});
    };

    var leaveRoom = function(){
      console.log('leaveRoom:', srvc.room);

      socket.emit('unsubscribe', {username:srvc.username, room:srvc.room});
    };

    var sendMessage = function(msg){
      socket.emit('sendMessage',
      {
        username:srvc.username,
        room:srvc.room,
        avatarUrl:srvc.avatarUrl,
        msg: msg
      });
    };

    var disconnect = function(){
      socket.disconnect();
      self.connected = false;
    };

    var parseMessageTimestamps = function(){
      self.chatData.messages.map(function (message){
        message.moment = moment(message.timestamp).fromNow();
      });
    };

    //connection
    socket.on('connect', function(){
      console.log('chatSocketSrvc connected');
      self.connected = true;

      //join the pre-selected room immediately
      self.joinRoom();
    });

    //receive messages
    socket.on('receiveMessage', function(data){
      console.log('received chat data:', data);
      self.chatData.messages.push(data);
      parseMessageTimestamps();
    });

    //connection error handling
    //currently just fully disconnect
    socket.on('connect_error', function(e) {
      console.log('&*&*&*&*&*&* socket.io connection error detected in chat client');
    });

    var self = {
      connected:false,
      disconnect:disconnect,
      joinRoom:joinRoom,
      leaveRoom:leaveRoom,
      sendMessage:sendMessage,
      chatData:{
        room:srvc.room,
        username:srvc.username,
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
