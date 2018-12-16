const mongoose = require('mongoose');

let AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  Date: {
    type: Date,
    required: true
  },
  Status: {
    type: Boolean,
    required: true
  }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = {
  Attendance
};
