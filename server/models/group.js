const mongoose = require('mongoose');

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

const Group = mongoose.model('Group', GroupSchema);

module.exports = {
  Group
};
