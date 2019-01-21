const router = require('express').Router();
const { Attendance } = require('./../../models/attendance');
const { checkIfTeacherTeachesInThatClass } = require('./../../middlewares');

// Only teacher specific to that class can view data
router.get('/', checkIfTeacherTeachesInThatClass, async (req, res) => {
  try {
    const { student } = req.query;
    const attendances = await Attendance.find({
      class: req.query.class,
      student
    }).populate([
      { path: 'student' },
      { path: 'class', populate: { path: 'group' } }
    ]);
    res.send(attendances);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  attendanceApi: router
};
