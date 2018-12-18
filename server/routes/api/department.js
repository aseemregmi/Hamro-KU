const router = require('express').Router();
const { Department } = require('./../../models/department');

router.get('/', async (req, res) => {
  try {
    const departments = await Department.find({});
    console.log(departments);
    res.send(departments);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  const { name, description, lattitude, longitude } = req.body;
  try {
    const newDepartment = new Department({
      name,
      description,
      lattitude,
      longitude
    });

    const newDepartmentInDb = await newDepartment.save();

    res.send(newDepartmentInDb);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  departmentsApi: router
};
