const mongoose = require('mongoose');

const date = new Date().getDay();

let ClassSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Subject'
  },
  routine: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Routine'
    }
  ],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Group'
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher'
  }
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = {
  Class
};
