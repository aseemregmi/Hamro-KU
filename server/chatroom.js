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
      socket.emit('redirect', {});
    } else {
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

          // Push To Messages
          messages[group].push({ text: `${name} joined` });
        }
      });
    }

    socket.on('end', async () => {
      socket.disconnect(true);
    });

    socket.on('disconnect', async () => {
      socket.disconnect(true);

      const socketId = socket.id;
      let user = {};

      let newListOfUsers = [];
      await Promise.all(
        users.map(async userInside => {
          if (socketId == userInside.socketId) {
            user = userInside;
          } else {
            newListOfUsers.push(userInside);
          }
        })
      );

      users = newListOfUsers;

      if (user) {
        // Send Updated List To User
        io.in(user.group).emit('userList', {
          users
        });

        // Inform Everyone that he has left
        socket.broadcast.to(user.group).emit('newMessageFromServer', {
          text: user.name + ' has left'
        });

        messages[user.group].push({ text: user.name + ' left' });
      }
    });

    socket.on('newMessageFromClient', (message, callback) => {
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
