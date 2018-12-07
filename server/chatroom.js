const { io } = require('./server');

console.log('Hey');

io.on('connection', socket => {
  console.log('A User Connected');

  socket.emit('newMessageFromServer', 'Welcome');

  socket.on('newMessageFromClient', (message, callback) => {
    callback();
    socket.emit('newMessageFromServer', { text: message.text });
  });
});
