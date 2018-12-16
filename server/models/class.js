const mongoose = require('mongoose');

let ClassSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Subject'
  },
  routine: [
    {
      day: {
        type: Number,
        required: true
      },
      startTime: {
        type: Number,
        required: true
      },
      duration: {
        type: Number,
        required: true
      }
    }
  ],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Group'
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher'
  }
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = {
  Class
};
