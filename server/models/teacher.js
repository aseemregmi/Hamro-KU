const mongoose = require('mongoose');

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
  verified: {
    type: Boolean,
    required: true
  }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = {
  Teacher
};
