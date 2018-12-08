const { Class } = require('./../../models/class');
const router = require('express').Router();

router.get('/', (req, res) => {
  Class.find({})
    .then(classes => {
      res.send(classes);
    })
    .catch(e => {
      res.sendStatus(400);
    });
});

router.post('/', (req, res) => {
  const { subjectID, routine, groupId, teacherId } = req.body;

  const newClass = new Class({ subjectID, routine, groupId, teacherId });

  newClass
    .save()
    .then(returnedClass => res.send(returnedClass))
    .catch(err => res.status(400).send(err));
});

module.exports = {
  classesApi: router
};
