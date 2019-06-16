const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let mongoURI = '';
mongoose.set('useCreateIndex', true);

if (process.env.NODE_ENV) {
  mongoURI = 'mongodb://aseem:aseem123@ds127704.mlab.com:27704/hamroku';
} else {
  mongoURI = 'mongodb://aseem:aseem123@ds127704.mlab.com:27704/hamroku';
  // mongoURI = 'mongodb://localhost/HamroKU';
}

mongoose.connect(mongoURI, { useNewUrlParser: true }, error => {
  if (error) {
    {
    }
  } else {
    {
    }
  }
});
