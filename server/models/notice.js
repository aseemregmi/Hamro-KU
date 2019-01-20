const mongoose = require('mongoose');

let NoticeSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  body: {
    type: String,
    required: true
  },
  noticeDate: {
    type: Date,
    required: true
  },
  noticeDeadline: {
    type: Date,
    required: true
  }
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = {
  Notice
};
