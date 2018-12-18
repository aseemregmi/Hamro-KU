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

router.post('/', async (req, res) => {
  const { groupName, year, shortForm, school } = req.body;
  const newGroup = new Group({ groupName, year, shortForm, school });
  try {
    const group = await newGroup.save();
    res.send(group);
  } catch (err) {
    res.status(400).send(`${err.errors.shortForm.value} already exists`);
  }
});

module.exports = {
  groupsApi: router
};
