const request = require('request');
const cheerio = require('cheerio');

const getNews = () => {
  return new Promise((resolve, reject) => {
    request(
      'http://www.ku.edu.np/news/index.php?op=Default&postCategoryId=2&blogId=1',
      (err, res, html) => {
        if (!err && res.statusCode == 200) {
          const $ = cheerio.load(html);
          let news = [];
          $('#Content h3 a').each((i, el) => {
            const item = $(el).text();
            const link = $(el).attr('href');
            news.push({ item, link });
          });
          resolve(news);
        } else {
          reject('Error Occurred');
        }
      }
    );
  });
};

const getNotice = () => {
  return new Promise((resolve, reject) => {
    request(
      'http://www.ku.edu.np/news/index.php?op=Default&postCategoryId=3&blogId=1',
      (err, res, html) => {
        if (!err && res.statusCode == 200) {
          const $ = cheerio.load(html);
          let notice = [];
          $('#Content h3 a').each((i, el) => {
            const item = $(el).text();
            const link = $(el).attr('href');
            notice.push({ item, link });
          });
          resolve(notice);
        } else {
          reject('Error Occurred');
        }
      }
    );
  });
};

module.exports = {
  getNews,
  getNotice
};
