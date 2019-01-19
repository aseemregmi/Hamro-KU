const mongoose = require('mongoose');

const RoutineSchema = mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  classId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Routine = mongoose.model('Routine', RoutineSchema);

module.exports = {
  Routine
};
