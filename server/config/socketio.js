module.exports = function(io){
  io.set('log level', 1);

  //TODO move this somewhere else
  io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
      io.sockets.emit('message', data);
    });
  });
};
