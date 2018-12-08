const { Group } = require('./../../models/group');
const router = require('express').Router();

router.get('/', (req, res) => {
  Group.find({})
    .then(groups => {
      res.send(groups);
    })
    .catch(e => {
      res.sendStatus(400);
    });
});

router.post('/', (req, res) => {
  const { groupName, year, shortForm, school } = req.body;
  const newGroup = new Group({ groupName, year, shortForm, school });

  newGroup
    .save()
    .then(group => {
      res.send(group);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/', (req, res) => {
  Group.find({})
    .then(groups => {
      res.send(groups);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = {
  groupsApi: router
};
