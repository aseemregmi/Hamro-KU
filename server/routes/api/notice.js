const router = require('express').Router();
const { Notice } = require('./../../models/notice');
const {
  checkIfTeacherTeachesInThatClass,
  checkEitherStudentOrTeacherBelongsToTheClass
} = require('./../../middlewares');

router.get(
  '/',
  checkEitherStudentOrTeacherBelongsToTheClass,
  async (req, res) => {
    try {
      const notices = await Notice.find({ class: req.query.classId }).sort({
        noticeDeadline: 'ascending'
      });
      res.send(notices);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post('/', checkIfTeacherTeachesInThatClass, async (req, res) => {
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
