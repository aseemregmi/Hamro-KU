const router = require('express').Router();
const { Note } = require('./../../models/notes');
const {
  checkIfTeacherTeachesInThatClass,
  checkEitherStudentOrTeacherBelongsToTheClass
} = require('./../../middlewares');

router.get(
  '/',
  checkEitherStudentOrTeacherBelongsToTheClass,
  async (req, res) => {
    try {
      const notes = await Note.find(req.query)
        .populate({
          path: 'classId',
          populate: { path: 'group', path: 'teacher' }
        })
        .exec();
      res.send(notes);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post('/', checkIfTeacherTeachesInThatClass, async (req, res) => {
  try {
    const { classId, noteUrl, name } = req.body;
    const newNote = await new Note({ classId, noteUrl, name }).save();
    res.send(newNote);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  notesApi: router
};
