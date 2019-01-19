const router = require('express').Router();
const { Attendance } = require('./../../models/attendance');

router.get('/', async (req, res) => {
  try {
    const attendances = await Attendance.find(req.query).populate([
      { path: 'student' },
      { path: 'class' }
    ]);

    res.send(attendances);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  attendanceApi: router
};
