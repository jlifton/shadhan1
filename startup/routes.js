const express = require('express');
const operators = require('../routes/operators');
const singles = require('../routes/singles');
const archives = require('../routes/archives');
const system =  require('../routes/systems');
const error = require('../middleware/error');
const cors = require('cors');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use('/api/operators', operators);
  app.use('/api/singles', singles);
  app.use('/api/archives', archives);
  app.use('/api/system', system);
  app.use(error);
};
