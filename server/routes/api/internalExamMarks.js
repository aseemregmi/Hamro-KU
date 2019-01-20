const router = require('express').Router();
const { InternalExamMarks } = require('./../../models/internalExamMarks');

router.get('/', async (req, res) => {
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
