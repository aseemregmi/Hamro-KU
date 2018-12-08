const router = require('express').Router();
const { Token } = require('../../models/token');

router.post('/delete', async (req, res) => {
  try {
    const { token } = req.body;
    await Token.deleteOne({ token });
    res.send('Successfully deleted token');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  tokensApi: router
};
