module.exports = function(io){
  // io.sockets.on('connection', function (socket) {
  //   socket.emit('message', { message: 'welcome to the chat' });
  //   socket.on('send', function (data) {
  //     io.sockets.emit('message', data);
  //   });
  // });


  //auto create bigmouth namespace
  // var bigmouth = io.of('/bigmouth').on('connection', function (socket) {
  // var chat = io.on('connection', function (socket) {

    //helper
    // var getRoomClients = function(roomId) {
    //   return Object.keys(io.nsps['/bigmouth'].adapter.rooms[roomId]);
    // }

    // socket.on('joinRoom',function(data){
      // var username = data.user;
      // var roomId = data.roomId;

      // var avatarUrl = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});
      // socket.emit('img', socket.avatar);

      // socket.join(roomId);
    // });

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


    // socket.on('msg', function(data){
    //
    //   socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});
    // });
  // });
};
