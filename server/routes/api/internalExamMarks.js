const router = require('express').Router();
const { InternalExamMarks } = require('./../../models/internalExamMarks');
const { checkIfTeacherTeachesInThatClass } = require('./../../middlewares');

router.get('/', checkIfTeacherTeachesInThatClass, async (req, res) => {
  try {
    const internalExamMarks = await InternalExamMarks.find(req.query)
      .populate([
        { path: 'student' },
        { path: 'class', populate: { path: 'group' } }
      ])
      .exec();

    res.send(internalExamMarks);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  internalExamMarksApi: router
};
