const mongoose = require('mongoose');

mongoose.createConnection(
  'mongodb://localhost/Hamro-KU',
  { useNewUrlParser: true },
  () => {
    console.log('Connected to MongoDB Local Server');
  }
);
