// Libraries
const express = require('express');
const cors = require('cors');
const path = require('path');
const socketIo = require('socket.io');
const multer = require('multer');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: path.join('./public/uploads/'),
  filename: function(req, file, callback) {
    callback(
      null,
      file.originalname.replace(path.extname(file.originalname), '') +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, callback) {
    callback(null, true);
  }
}).single('file');

// Init express app
const app = express();

// Setup cors
app.use(cors());

// Init http server
const http = require('http').Server(app);

// Init socketIO
const io = socketIo(http);

require('./db/mongoose');

// Body Parser
app.use(express.json());

// Middlewares
// Cors
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + './../client/build'));

// Routes
const { kuNewsAndEvents } = require('./routes/api/kunewsandevents');
const { studentsApi } = require('./routes/api/student');
const { groupsApi } = require('./routes/api/group');
const { subjectsApi } = require('./routes/api/subject');
const { classesApi } = require('./routes/api/class');
const { teachersApi } = require('./routes/api/teacher');
const { departmentsApi } = require('./routes/api/department');
const { routinesApi } = require('./routes/api/routine');
const { adminsApi } = require('./routes/api/admin');
const { tokensApi } = require('./routes/api/token');
const { notesApi } = require('./routes/api/note');

// Setup routes
app.use('/api/kunewsandevents', kuNewsAndEvents);
app.use('/api/students', studentsApi);
app.use('/api/groups', groupsApi);
app.use('/api/subjects', subjectsApi);
app.use('/api/classes', classesApi);
app.use('/api/teachers', teachersApi);
app.use('/api/departments', departmentsApi);
app.use('/api/routines', routinesApi);
app.use('/api/admins', adminsApi);
app.use('/api/tokens', tokensApi);
app.use('/api/notes', notesApi);

app.post('/fileupload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.render('index', {
        msg: err
      });
    } else {
      if (!req.file) {
        res.render('index', {
          msg: 'Error No File Selected'
        });
      } else {
        res.send({
          data: {
            msg: 'File Uploaded',
            file: `uploads/${req.file.filename}`,
            link: `http://localhost:5000/uploads/${req.file.filename}`,
            type: req.file.mimeType
          },
          success: true,
          status: 200
        });
      }
    }
  });
});

// React should be serve only at the end so that routes will not me mismatched
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + './../', 'client', 'build', 'index.html'));
});

// Setup Port
const port = process.env.PORT || 5000;

// Listening in port
http.listen(port, () => console.log(`Listening in port ${port}`));

module.exports = {
  io
};

// Require chat module
require('./chatroom');
