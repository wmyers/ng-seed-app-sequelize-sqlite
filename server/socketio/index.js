module.exports = function(io){

  //auto create bigmouth namespace
  var bigmouth = io.of('/bigmouth').on('connection', function (socket) {

    //helper
    var getRoomClients = function(roomId) {
      return Object.keys(io.nsps['/bigmouth'].adapter.rooms[roomId]);
    }

    socket.on('joinRoom',function(data){

      console.log('$%$%$%$%$%$', data.userName, 'joined', data.roomId);

      // var avatarUrl = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});
      // socket.emit('img', socket.avatar);

      socket.join(data.roomId);
    });

    socket.on('sendMessage', function(data){
      console.log('$%$%$%$%$%$', data.userName, 'in', data.roomId, 'sent this message:', data.msg);
      bigmouth.to(data.roomId).emit('receiveMessage', {msg: data.msg, userName: data.userName});
    });

      // var usernames = [],
      // avatars = [];
      // usernames.push(chat.clients(data.id)[0].username);
      // usernames.push(chat.clients(data.id)[1].username);
      // avatars.push(chat.clients(data.id)[0].avatar);
      // avatars.push(chat.clients(data.id)[1].avatar);
      // chat.in(data.id).emit('startChat', {
      //   boolean: true,
      //   id: data.id,
      //   users: usernames,
      //   avatars: avatars
      // });


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
