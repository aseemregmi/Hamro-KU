const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  noteUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = {
  Note
};
