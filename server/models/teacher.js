const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Token } = require('./token');

let TeacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true,
    trim: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
});

TeacherSchema.methods.generateAuthToken = function() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await jwt.sign({ _id: this._id }, 'SANA').toString();
      const newToken = new Token({ userId: this._id, type: 'auth', token });
      const newTokenInDB = await newToken.save();
      resolve(newTokenInDB);
    } catch (err) {
      reject(err);
    }
  });
};

TeacherSchema.pre('save', function(next) {
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

TeacherSchema.methods.matchPassword = function(password) {
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

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = {
  Teacher
};
