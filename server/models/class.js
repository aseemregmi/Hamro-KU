const mongoose = require('mongoose');

let ClassSchema = new mongoose.Schema({
  subjectID: {
    type: mongoose.Types.ObjectId,
    required: true
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
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = {
  Class
};
