const router = require('express').Router();
const { Routine } = require('./../../models/routine');
const { Class } = require('./../../models/class');
const {
  checkIfStudentBelongsToTheSameClassAndHasSpecialAuthority
} = require('./../../middlewares');

router.post(
  '/',
  checkIfStudentBelongsToTheSameClassAndHasSpecialAuthority,
  async (req, res) => {
    try {
      const { day, startTime, duration, classId } = req.body;
      const newRoutine = await new Routine({
        day,
        startTime,
        duration,
        classId
      }).save();
      const classInDb = await Class.findById(classId);
      classInDb.routine.push(newRoutine._id);
      await classInDb.save();
      res.send(newRoutine);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = {
  routinesApi: router
};
