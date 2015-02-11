var auth = require('../components/auth-middleware');
var _ = require('underscore');
var ns = '/bigmouth';

module.exports = function(io){

  var nsChat = io.of(ns).on('connection', function (socket) {

    //authenticate technique with JWT token sent in a message body
    //see: https://auth0.com/blog/2014/01/15/auth-with-socket-io/
    //and: https://facundoolano.wordpress.com/2014/10/11/better-authentication-for-socket-io-no-query-strings/
    //NB can only use middleware authentication approach if appending the token to the query string

    //confirm socket is not authenticated
    socket.auth = false;
    //temp delete socket from namespace connected map
    delete io.of(ns).connected[socket.id];
    //add listener for authenticate message from the client
    socket.on('authenticate', function(data){
      //check the auth data sent by the client
      auth.authenticateToken(data.token, function(err, success){
        if (!err && success){
          console.log("*&*&*&*&* Authenticated socket ", socket.id);
          socket.auth = true;
          //restore temporarily disabled connection
          io.of(ns).connected[socket.id] = socket;
          //dispatch authenticationSuccess message to the socket
          nsChat.to(socket.id).emit('authenticationSuccess');
        }
      });
    });

    setTimeout(function(){
      //If the socket didn't authenticate in 1 second, disconnect it
      if (!socket.auth) {
        console.log("*&*&*&*&* Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, 1000);


    //helper
    var getRoomClients = function(roomId) {
      return Object.keys(io.nss['/bigmouth'].adapter.rooms[roomId]);
    }

    //join/leave rooms
    socket.on('subscribe',function(data){
      //console.log('$%$%$%$%$%$', data.username, 'joined', data.room);
      socket.join(data.room);
    });

    socket.on('unsubscribe',function(data){
      // console.log('$%$%$%$%$%$', data.username, 'left', data.room);
      socket.leave(data.room);
    });

    //messages
    socket.on('sendMessage', function(data){
      // console.log('$%$%$%$%$%$', data.username, 'in', data.room, 'sent this message:', data.msg);
      var msgData = {
        msg: data.msg,
        username: data.username,
        avatarUrl: data.avatarUrl
      }
      //add timestamp
      msgData.timestamp = Date.now();

      nsChat.to(data.room).emit('receiveMessage',msgData);

    });




    // socket.on('disconnect', function() {
    //
    //   socket.broadcast.to(socket.room).emit('leave', {
    //     boolean: true,
    //     room: this.room,
    //     user: this.username,
    //     avatar: this.avatar
    //   });
    //
    //   socket.leave(socket.room);
    // });



  });
};
