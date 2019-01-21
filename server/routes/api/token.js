const router = require('express').Router();
const { Token } = require('../../models/token');
const { Student } = require('../../models/student');
const { Teacher } = require('../../models/teacher');

router.post('/delete', async (req, res) => {
  try {
    const { token } = req.body;
    await Token.deleteOne({ token });
    res.send('Successfully deleted token');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/token-user', async (req, res) => {
  try {
    const { token } = req.body;
    const user = await Token.findOne({ token });
    if (user) {
      switch (user.userType) {
        case 'student':
          const student = await Student.findById(user.userId).populate('group');
          res.send(student);
          break;
        case 'teacher':
          const teacher = await Teacher.findById(user.userId);
          res.send(teacher);
          break;
        case 'admin':
          res.send();
          break;
        default:
          throw 'Not Found';
      }
    } else {
      throw 'No User Found';
    }
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

module.exports = {
  tokensApi: router
};
