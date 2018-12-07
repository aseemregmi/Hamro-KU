const mongoose = require('mongoose');
// Require database
mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://localhost/HamroKU',
  { useNewUrlParser: true },
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log('Connected to MongoDB Server');
    }
  }
);
