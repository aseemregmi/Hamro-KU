const mongoose = require('mongoose');

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
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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
    required: true
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = {
  Student
};
