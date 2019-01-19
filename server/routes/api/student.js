const { Student } = require('./../../models/student');
const { InternalExamMarks } = require('./../../models/internalExamMarks');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const students = await Student.find(req.query)
      .populate('group')
      .exec();
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/internalexammarks', async (req, res) => {
  try {
    const { examNo, studentIdWithMarks, fullMarks, classId } = req.body;

    await Promise.all(
      studentIdWithMarks.map(async studentwmarks => {
        const student = await Student.findById(studentwmarks._id);

        const internalExamMarks = await new InternalExamMarks({
          examNo,
          fullMarks,
          obtainedMarks: studentwmarks.marks,
          class: classId,
          student: student._id
        }).save();
        student.internalExamMarks.push(internalExamMarks._id);
        await student.save();
      })
    );
    res.send('Successfull');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', (req, res) => {
  const {
    email,
    password,
    name,
    group,
    phoneNo,
    registrationNo,
    address
  } = req.body;

  const newStudent = new Student({
    email,
    password,
    name,
    group,
    phoneNo,
    registrationNo,
    address
  });

  newStudent
    .save()
    .then(student => res.send(student))
    .catch(err => {
      res.status(400).send(`${err.message}`);
    });
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

router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.send(student);
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
