const mongoose = require('mongoose');

let InternalExamMarksSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  obtainedMarks: {
    type: Number,
    required: true
  },
  fullMarks: {
    type: Number,
    required: true
  },
  examNo: {
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
