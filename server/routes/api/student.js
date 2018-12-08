const { Student } = require('./../../models/student');
const router = require('express').Router();

router.get('/', (req, res) => {
  Student.find({})
    .then(students => {
      res.send(students);
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
    groupId,
    phoneNo,
    registrationNo,
    address
  } = req.body;

  const newStudent = new Student({
    email,
    password,
    name,
    groupId,
    phoneNo,
    registrationNo,
    address
  });

  newStudent
    .save()
    .then(student => res.send(student))
    .catch(err => res.send(err).status(400));
});

router.patch('/verify/:id', async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    student.verified = !student.verified;

    const updatedStudent = await student.save();
    res.send(updatedStudent);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.patch('/specialAuthority/:id', async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    student.specialAuthority = !student.specialAuthority;

    const updatedStudent = await student.save();
    res.send(updatedStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (student) {
      if (student.verified) {
        await student.matchPassword(password);
        const token = await student.generateAuthToken();
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
  studentsApi: router
};
