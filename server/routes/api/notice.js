const router = require('express').Router();
const { Notice } = require('./../../models/notice');

router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find(req.query).sort({
      noticeDeadline: 'ascending'
    });
    res.send(notices);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { noticeDeadline, body, classId } = req.body;
    const notice = await new Notice({
      noticeDeadline,
      body,
      class: classId,
      noticeDate: new Date()
    }).save();
    console.log(notice);
    res.send(notice);
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = {
  noticeApi: router
};
