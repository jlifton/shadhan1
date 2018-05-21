const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const operators = require('../routes/operators');
const singles = require('../routes/singles');
const logitems = require('../routes/logitems');
const systems= require('../routes/systems');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/returns', returns);
  app.use('/api/operators', operators);
  app.use('/api/singles', singles);
  app.use('/api/logitems', logitems);
  app.use('/api/systems', systems);
  app.use(error);
};