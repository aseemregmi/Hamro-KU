const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Token } = require('./token');

let StudentSchema = new mongoose.Schema({
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
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Group'
  },
  phoneNo: {
    type: String,
    unique: true
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  specialAuthority: {
    type: Boolean,
    default: false
  }
});

StudentSchema.methods.generateAuthToken = function() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = jwt.sign({ _id: this._id }, 'SANA').toString();
      const newToken = new Token({ userId: this._id, type: 'auth', token });
      const newTokenInDB = await newToken.save();
      resolve(newTokenInDB);
    } catch (err) {
      reject(err);
    }
  });
};

StudentSchema.pre('save', function(next) {
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

StudentSchema.methods.matchPassword = function(password) {
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

const Student = mongoose.model('Student', StudentSchema);

module.exports = {
  Student
};
