const { io } = require('./server');

io.on('connection', socket => {
  console.log('A User Connected');

  socket.on('join', (params, cb) => {
    socket.emit('newMessageFromServer', {
      text: `Welcome to ChatRoom of ${params.group.shortForm}`,
      from: 'Server'
    });

    socket.join(params.group._id);
    socket.broadcast.to(params.group._id).emit('newMessageFromServer', {
      text: `${params.name} joined chat`,
      from: 'Server'
    });
  });

  socket.on('newMessageFromClient', (message, callback) => {
    callback();
    socket.broadcast.to(message.to).emit('newMessageFromServer', {
      from: message.from,
      text: message.text
    });
  });
});
