const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

let SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true
  },
  credit: {
    type: String,
    required: true
  }
});

SubjectSchema.plugin(mongooseUniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = {
  Subject
};
