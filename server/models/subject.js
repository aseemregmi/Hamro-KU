const mongoose = require('mongoose');

let SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true
  },
  credit: {
    type: String,
    required: true
  }
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = {
  Subject
};
