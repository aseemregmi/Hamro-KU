const { io } = require('./server');
const { Group } = require('./models/group');

let users = [];
let messages = {};

(async () => {
  const groups = await Group.find({}, { _id: 1 });
  await Promise.all(
    groups.map(async group => {
      messages[group._id] = new Array();
    })
  );

  io.on('connection', async socket => {
    const { name, group, groupShortForm } = socket.handshake.query;

    // Check If User Already Exist
    let alreadyExist = false;
    await Promise.all(
      users.map(async user => {
        if (user.name === name) alreadyExist = true;
      })
    );

    if (alreadyExist) {
      console.log('Old User Re Joined');
      socket.emit('redirect', {});
    } else {
      console.log('New User Joined');
      socket.join(group, err => {
        if (err) {
          socket.emit('redirect', {});
        } else {
          // Add User To List
          users.push({ name: name, group: group, socketId: socket.id });

          // Send userListToAll
          io.in(group).emit('userList', {
            users: users.filter(user => user.group == group)
          });

          // Send previous messages
          socket.emit('recentMessages', {
            messages: messages[group]
          });

          // Send message to joining student
          socket.emit('newMessageFromServer', {
            text: `Welcome to ChatRoom of ${groupShortForm}`
          });

          // Inform all that someone recently joined chatroom
          socket.broadcast.to(group).emit('newMessageFromServer', {
            text: `${name} joined chat`
          });
        }
      });
    }

    socket.on('end', async () => {
      console.log(socket.id);
      socket.disconnect(true);
      console.log('User Left');
      const socketId = socket.id;
      let user = {};

      users = users.filter(userInside => {
        if (socketId == userInside.socketId) {
          console.log('ID Of leaving user matched');
          user = userInside;
          return false;
        } else {
          return true;
        }
      });

      if (user) {
        // Send Updated List To User
        io.in(user.group).emit('userList', {
          users
        });

        // Inform Everyone that he has left
        socket.broadcast.to(user.group).emit('newMessageFromServer', {
          text: user.name + ' has left'
        });
      }
    });

    socket.on('disconnect', async () => {
      console.log(socket.id);
      socket.disconnect(true);
      console.log('User Left');
      const socketId = socket.id;
      let user = {};

      users = users.filter(userInside => {
        if (socketId == userInside.socketId) {
          console.log('ID Of leaving user matched');
          user = userInside;
          return false;
        } else {
          return true;
        }
      });

      console.log('This Ran After');

      if (user) {
        // Send Updated List To User
        io.in(user.group).emit('userList', {
          users
        });

        // Inform Everyone that he has left
        socket.broadcast.to(user.group).emit('newMessageFromServer', {
          text: user.name + ' has left'
        });
      }
    });

    socket.on('newMessageFromClient', (message, callback) => {
      console.log(message);
      callback();
      socket.broadcast.to(message.to).emit('newMessageFromServer', {
        from: message.from,
        text: message.text
      });
      messages[message.to].push({
        from: message.from,
        text: message.text
      });
      if (messages[message.to].length >= 101) {
        messages[message.to].shift();
      }
    });
  });
})();
