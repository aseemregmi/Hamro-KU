const mongoose = require('mongoose');

let AttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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
