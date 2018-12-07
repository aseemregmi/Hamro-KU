// Libraries
const express = require('express');
const cors = require('cors');
const path = require('path');
const socketIo = require('socket.io');

// Init express app
const app = express();

// Init http server
const http = require('http').Server(app);

// Init socketIO
const io = socketIo(http);

// Middlewares
// Cors
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + './../client/build'));

// Routes
const { kuNewsAndEvents } = require('./routes/api/kunewsandevents');

// Setup routes
app.use('/api/kunewsandevents', kuNewsAndEvents);

// React should be serve only at the end so that routes will not me mismatched
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + './../', 'client', 'build', 'index.html'));
// });

// Setup Port
const port = process.env.PORT || 5000;

// Listening in port
http.listen(port, () => console.log(`Listening in port ${port}`));

module.exports = {
  io
};

// Require chat module
require('./chatroom');
