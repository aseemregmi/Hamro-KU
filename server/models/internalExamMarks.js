const mongoose = require('mongoose');

let InternalExamMarksSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  obtainedMarks: {
    type: Number,
    required: true
  },
  fullMarks: {
    type: Number,
    required: true
  }
});

const InternalExamMarks = mongoose.model(
  'InternalExamMarks',
  InternalExamMarksSchema
);

module.exports = {
  InternalExamMarks
};
