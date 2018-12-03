const mongoose = require('mongoose');

let NoticeSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  noticeDate: {
    type: Date,
    required: true
  }
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = {
  Notice
};
