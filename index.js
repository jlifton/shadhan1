const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;


const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

app.use(express.static('dist'));

//app.use(express.static('public/dist'));
module.exports = server;
