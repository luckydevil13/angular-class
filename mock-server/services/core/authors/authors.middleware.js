const express = require('express');
const router = express.Router();
const url = require('url');
const util = require('util');

module.exports = (server) => {
  router.get('/authors', (req, res, next) => {
    authors = server.db.getState().courses.reduce(function(previousValue, currentValue) {
      currentValue.authors.forEach((author) => {
        previousValue[author.id] = {
          firstName: author.firstName,
          lastName: author.lastName,
          id: author.id
        }
      });
      return previousValue;
    }, {});

    res.json(Object.keys(authors).map(function (key) { return authors[key] }));
  });

  return router;
};
