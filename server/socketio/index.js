module.exports = function(io){

  //auto create bigmouth namespace
  var bigmouth = io.of('/bigmouth').on('connection', function (socket) {

    //helper
    var getRoomClients = function(roomId) {
      return Object.keys(io.nsps['/bigmouth'].adapter.rooms[roomId]);
    }

    socket.on('subscribe',function(data){

      // console.log('$%$%$%$%$%$', data.username, 'joined', data.room);

      socket.join(data.room);
    });

    socket.on('unsubscribe',function(data){

      // console.log('$%$%$%$%$%$', data.username, 'left', data.room);

      socket.leave(data.room);
    });

    socket.on('sendMessage', function(data){
      // console.log('$%$%$%$%$%$', data.username, 'in', data.roomId, 'sent this message:', data.msg);
      bigmouth.to(data.roomId).emit('receiveMessage',
                                    {
                                      msg: data.msg,
                                      username: data.username,
                                      avatarUrl: data.avatarUrl
                                    });
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
