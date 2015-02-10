module.exports = function(io){

  //set authentication middleware
  // io.use(function(socket, next) {
  //   var handshakeData = socket.request;
  //   // make sure the handshake data looks good as before
  //   // if error do this:
  //   // next(new Error('not authorized');
  //   // else just call next
  //   next();
  // });
  // io.use(socketioJwt.authorize({
  //   secret: 'your secret or public key',
  //   handshake: true
  // }));

  //auto create bigmouth namespace
  var bigmouth = io.of('/bigmouth').on('connection', function (socket) {

    //helper
    var getRoomClients = function(roomId) {
      return Object.keys(io.nsps['/bigmouth'].adapter.rooms[roomId]);
    }

    socket.on('subscribe',function(data){

      console.log('$%$%$%$%$%$', data.username, 'joined', data.room);

      socket.join(data.room);
    });

    socket.on('unsubscribe',function(data){

      // console.log('$%$%$%$%$%$', data.username, 'left', data.room);

      socket.leave(data.room);
    });

    socket.on('sendMessage', function(data){
      // console.log('$%$%$%$%$%$', data.username, 'in', data.room, 'sent this message:', data.msg);

      var msgData = {
        msg: data.msg,
        username: data.username,
        avatarUrl: data.avatarUrl
      }
      //add timestamp
      msgData.timestamp = Date.now();

      bigmouth.to(data.room).emit('receiveMessage',msgData);

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
