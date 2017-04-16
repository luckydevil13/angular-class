const express = require('express');
const router = express.Router();
const url = require('url');
const util = require('util');

module.exports = (server) => {
  router.get('/courses', (req, res, next) => {
    // console.log(util.inspect(req, false, 1));
    let url_parts = url.parse(req.originalUrl, true);
    let query = url_parts.query;
    let from = query.start;
    let to = +query.start + +query.count;
    let queryStr = query.query;
    courses = server.db.getState().courses.sort((a, b) => {
        a.date = new Date(a.date);
        b.date = new Date(b.date);
        return +b.date - +a.date
      }
    );

    if (query.q) {
      courses = courses.filter((course) => {
        let re = new RegExp(query.q, 'g');
        return course.name.match(re) || course.description.match(re);
      });
    }

    if (courses.length < to) {
      to = courses.length;
    }
    if (from) {
      courses = courses.slice(from, to);
    }

    res.json(courses);
  });

  return router;
};
