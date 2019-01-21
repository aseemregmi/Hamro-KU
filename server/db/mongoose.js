const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let mongoURI = '';

if (process.env.NODE_ENV) {
  mongoURI = 'mongodb://aseem:aseem123@ds127704.mlab.com:27704/hamroku';
} else {
  mongoURI = 'mongodb://aseem:aseem123@ds127704.mlab.com:27704/hamroku';
  // mongoURI = 'mongodb://localhost/HamroKU';
}

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log('Connected to MongoDB Server');
    }
  }
);
