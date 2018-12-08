const { Teacher } = require('./../../models/teacher');
const router = require('express').Router();

router.get('/', (req, res) => {
  Teacher.find({})
    .then(teachers => {
      res.send(teachers);
    })
    .catch(e => {
      res.sendStatus(400);
    });
});

router.post('/', (req, res) => {
  const {
    email,
    password,
    name,
    phoneNo,
    post,
    address,
    departmentId
  } = req.body;

  const newTeacher = new Teacher({
    email,
    password,
    name,
    phoneNo,
    post,
    address,
    departmentId
  });

  newTeacher
    .save()
    .then(teacher => res.send(teacher))
    .catch(err => res.send(err).status(400));
});

router.patch('/verify/:id', async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    teacher.verified = !teacher.verified;

    const updatedTeacher = await student.save();
    res.send(updatedTeacher);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (teacher) {
      if (teacher.verified) {
        await teacher.matchPassword(password);
        const token = await teacher.generateAuthToken();

        res.send(token);
      } else {
        throw 'Your account is not verfied. Please wait till we verify your account';
      }
    } else {
      throw 'Your email is not registered. Please Sign Up First';
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  teachersApi: router
};
