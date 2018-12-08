const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Token } = require('./token');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

AdminSchema.methods.generateAdminToken = function() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = jwt.sign({ _id: this._id }, 'SANA').toString();
      const newToken = new Token({ userId: this._id, type: 'admin', token });
      const newTokenInDB = await newToken.save();
      resolve(newTokenInDB);
    } catch (err) {
      reject(err);
    }
  });
};

AdminSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

AdminSchema.methods.matchPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, res) => {
      if (res) {
        resolve();
      } else {
        reject('Password Not Matched');
      }
    });
  });
};

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = {
  Admin
};
