const { Class } = require('./../../models/class');
const router = require('express').Router();
const {
  checkIfStudentBelongsToThatGroupOrTeacherIdAndTokenOfTeacherMatches,
  checkIfStudentBelongsToTheSameGroupAndHasSpecialAuthority
} = require('./../../middlewares');

router.get(
  '/',
  checkIfStudentBelongsToThatGroupOrTeacherIdAndTokenOfTeacherMatches,
  async (req, res) => {
    try {
      const classes = await Class.find(req.query)
        .populate([
          { path: 'subject' },
          { path: 'group' },
          { path: 'teacher' },
          { path: 'routine' }
        ])
        .exec();
      res.send(classes);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// Only student can post
router.post(
  '/',
  checkIfStudentBelongsToTheSameGroupAndHasSpecialAuthority,
  async (req, res) => {
    try {
      const { subject, group, teacher } = req.body;
      const newClass = await new Class({
        subject,
        group,
        teacher
      }).save();
      res.send(newClass);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = {
  classesApi: router
};
