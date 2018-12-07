const router = require('express').Router();

// Locals
const { getNews, getNotice } = require('./../../scrape');

router.get('/', async (req, res) => {
  try {
    const news = await getNews();
    const notice = await getNotice();
    res.send({ news, notice });
  } catch (e) {
    res.sendStatus(400);
  }
});

module.exports = {
  kuNewsAndEvents: router
};
