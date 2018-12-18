const { Teacher } = require('./../../models/teacher');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({})
      .populate('department')
      .exec();
    res.send(teachers);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', (req, res) => {
  const {
    email,
    password,
    name,
    phoneNo,
    post,
    address,
    department
  } = req.body;

  const newTeacher = new Teacher({
    email,
    password,
    name,
    phoneNo,
    post,
    address,
    department
  });

  newTeacher
    .save()
    .then(teacher => res.send(teacher))
    .catch(err => res.status(400).send(`${err.message}`));
});

router.patch('/verify/:id', async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    teacher.verified = !teacher.verified;

    const updatedTeacher = await teacher.save();
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

router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    res.send(teacher);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  teachersApi: router
};
