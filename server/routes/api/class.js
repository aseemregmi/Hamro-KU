const { Class } = require('./../../models/class');
const router = require('express').Router();
const { Routine } = require('./../../models/routine');

router.get('/', async (req, res) => {
  try {
    const classes = await Class.find(req.query)
      // 'subject group teacher routine'
      .populate([
        { path: 'subject' },
        { path: 'group' },
        { path: 'teacher' },
        { path: 'routine' }
      ])
      .exec();
    console.log(classes);
    res.send(classes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
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
});

module.exports = {
  classesApi: router
};
