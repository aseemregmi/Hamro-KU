const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

let GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  shortForm: {
    type: String,
    required: true,
    unique: true
  },
  school: {
    type: String,
    required: true
  }
});

GroupSchema.plugin(mongooseUniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = {
  Group
};
