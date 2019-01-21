const router = require('express').Router();
const { Admin } = require('./../../models/admin');
const { isAuthenticatedAsAdmin } = require('./../../middlewares');

// Only Admins Can Access These Routes
// Tested for all cases
router.post('/', isAuthenticatedAsAdmin, (req, res) => {
  const { username, password } = req.body;
  const newAdmin = new Admin({ username, password });

  newAdmin
    .save()
    .then(admin => res.send(admin))
    .catch(err => res.status(400).send(err));
});

// Only Admins Can Access These Routes
// Tested for all cases
router.get('/', isAuthenticatedAsAdmin, (req, res) => {
  Admin.find({})
    .then(admins => res.send(admins))
    .catch(err => res.status(400).send(err));
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin) {
      await admin.matchPassword(password);
      const token = await admin.generateAdminToken();
      res.send(token);
    } else {
      throw 'You are not registered as admin';
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  adminsApi: router
};
