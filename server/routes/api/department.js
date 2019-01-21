const router = require('express').Router();
const { Department } = require('./../../models/department');
const { isAuthenticatedAsAdmin } = require('./../../middlewares');

router.get('/', async (req, res) => {
  try {
    const departments = await Department.find({});
    res.send(departments);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Only Admins Are Allowed
router.post('/', isAuthenticatedAsAdmin, async (req, res) => {
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
