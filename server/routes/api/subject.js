const { Subject } = require('./../../models/subject');
const router = require('express').Router();
const {
  isAuthenticated,
  isAuthenticatedAsAdmin
} = require('./../../middlewares');

router.get('/', isAuthenticated, (req, res) => {
  Subject.find({})
    .then(subjects => {
      res.send(subjects);
    })
    .catch(e => {
      res.sendStatus(400);
    });
});

router.post('/', isAuthenticatedAsAdmin, (req, res) => {
  const { name, subjectCode, credit } = req.body;

  const newSubject = new Subject({ name, subjectCode, credit });

  newSubject
    .save()
    .then(subject => res.send(subject))
    .catch(err =>
      res.status(400).send(`${err.errors.subjectCode.value} already exists`)
    );
});

module.exports = {
  subjectsApi: router
};
