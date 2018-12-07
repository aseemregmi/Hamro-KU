const { Subject } = require('./../../models/subject');
const router = require('express').Router();

router.get('/', (req, res) => {
  Subject.find({})
    .then(subjects => {
      res.send(subjects);
    })
    .catch(e => {
      res.sendStatus(400);
    });
});

router.post('/', (req, res) => {
  const { name, subjectCode, credit } = req.body;

  const newSubject = new Subject({ name, subjectCode, credit });

  newSubject
    .save()
    .then(subject => res.send(subject))
    .catch(err => res.send(err).status(400));
});

module.exports = {
  subjectsApi: router
};
