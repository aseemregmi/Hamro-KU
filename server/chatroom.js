const { io } = require('./server');
const { Group } = require('./models/group');

let users = {};
let messages = {};

(async () => {
  const groups = await Group.find({}, { _id: 1 });
  await Promise.all(
    groups.map(async group => {
      users[group._id] = new Array();
      messages[group._id] = new Array();
    })
  );

  io.on('connection', socket => {
    console.log('A User Connected');

    socket.on('join', (params, cb) => {
      cb();
      socket.join(params.group._id);

      // Check if user already exists
      if (users[params.group._id].indexOf(params.name) === -1) {
        users[params.group._id].push(params.name);

        socket.emit('newMessageFromServer', {
          text: `Welcome to ChatRoom of ${params.group.shortForm}`,
          from: 'Server'
        });

        socket.broadcast.to(params.group._id).emit('newMessageFromServer', {
          text: `${params.name} joined chat`,
          from: 'Server'
        });

        io.in(params.group._id).emit('userList', {
          users: users[params.group._id]
        });
      } else {
        // socket.join(params.group._id);
        console.log(socket.id);
        console.log(params.group._id);
        socket.emit('newMessageFromServer', {
          text: `Welcome to ChatRoom of ${params.group.shortForm}`,
          from: 'Server'
        });
        socket.emit('userList', { users: users[params.group._id] });
      }
    });

    socket.on('disconnect', () => console.log('Disconnected'));

    socket.on('end', (message, callback) => {
      console.log('User disconnected');
      users[message.to] = users[message.to].splice(
        users[message.to].indexOf(message.to),
        1
      );
      socket.disconnect(true);
      callback();
      socket.broadcast.to(message.to).emit('newMessageFromServer', {
        from: 'server',
        text: message.name + ' has left'
      });
      io.in(message.to).emit('userList', {
        users: users[message.to]
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
})();
