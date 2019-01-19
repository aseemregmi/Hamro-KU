const mongoose = require('mongoose');

let TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  userType: {
    type: String
  }
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = {
  Token
};
