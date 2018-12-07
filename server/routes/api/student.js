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
    res.send(err).status(400);
  }
});

module.exports = {
  studentsApi: router
};
