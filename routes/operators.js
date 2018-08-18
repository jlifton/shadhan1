const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Operator, validateNewOperator, validateUpdateOperator, validateLogin} = require('../models/operator');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const winston = require('winston');

router.get('/me', auth, async (req, res) => {
  const operator = await Operator.findById(req.operator._id).select('-password');
  res.send(operator);
});

/** Get all Operators
 *
 */
router.get('/', auth, async (req, res) => {
  winston.info('Request to get all Operators');
  const operator = await Operator.find();
  winston.info('Responding to get all Operators request. Count: ' + operator.length);
  res.send(operator);
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
  winston.info('Request to login');
  const {error} = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let operator = await Operator.findOne({username: req.body.username});
  if (operator) {
    const validPassword = await bcrypt.compare(req.body.password, operator.password);
    if (validPassword) {
      const token = operator.generateAuthToken();
      operator.password = '';
      winston.info('Operator: ' + req.body.username + ' authenticated and logged in. _id: ' + operator._id + ' jwt:'+token);
      return res.header('x-auth-token', token).send(operator);
    }
    winston.info('Password doesnt match for ' + req.body.username);
    return res.status(400).send('No Operator for this user name and password.');
  }
  else {
    winston.info('No Operator for (user, pw combo. Operator found, pw doesnt match. Operator name: ' + req.body.username);
    return res.status(400).send('No Operator for this user name and password.');
  }

  /**
   operator = new Operator(_.pick(req.body, ['name', 'type', 'username', 'password', 'email',
   'phone', 'street', 'city', 'country']));
   const salt = await bcrypt.genSalt(10);
   operator.password = await bcrypt.hash(operator.password, salt);
   await operator.save();

   const token = operator.generateAuthToken();
   res.header('x-auth-token', token).send(_.pick(operator, ['_id',
   'name', 'type', 'username', 'email', 'phone', 'street', 'city', 'country']));
   **/
});


/**
 * Add Operator
 */
router.post('/', async (req, res) => {
  winston.info('Request to add new Operator');
  const {error} = validateNewOperator(req.body);
  if (error) {
    winston.error('Request to add new Operator failed in validation. Message: ' + error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  let operator = await Operator.findOne({email: req.body.email});
  if (operator) {
    return res.status(400).send('Operator already registered.');
  }

  operator = new Operator(_.pick(req.body, ['name', 'type', 'username', 'password', 'email',
    'phone', 'street', 'city', 'country', 'notes']));
  const salt = await bcrypt.genSalt(10);
  operator.password = await bcrypt.hash(operator.password, salt);
  winston.info('Will attempt to save new Operator');
  await operator.save();
  winston.info('Operator saved');
  const token = operator.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(operator, ['_id',
    'name', 'type', 'username', 'email', 'phone', 'street', 'city', 'country', 'notes']));
  winston.info('Responding to request add Operator. Operator name: ' + operator.name);
});

/**
 * Delete Operator
 */
router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  winston.info('Request to delete Operator. (id: '+ req.params.id + ')');
  const operator = await Operator.findByIdAndRemove(req.params.id);

  if (!operator) {
    winston.error('Operator for given id not found. Delete failed');
    return res.status(404).send('The operator with the given ID was not found.');
  }
  winston.info('Responding to delete request. Operator name: ' + operator.name);
  res.send(operator);
});

/**
 * Get  Operator
 */
router.get('/:id', [auth, validateObjectId], async (req, res) => {
  winston.info('Request to get Operator. (id: '+ req.params.id + ')');
  const operator = await Operator.findById(req.params.id);

  if (!operator) {
    winston.error('Request to get Operator failed. The operator with the given ID was not found.');
    return res.status(404).send('The operator with the given ID was not found.');
  }
  winston.info('Responding to get Operator. Operator (name: ' + operator.name +')');
  res.send(operator);
});

/**
 * Change password
 */
router.put('/pw/:id', [auth, validateObjectId], async (req, res) => {
  winston.info('Request to change password');
  // Get the referenced operator object
  const operator = await Operator.findById(req.params.id);
  if (operator) {
    // Make sure the user supplied the correct current password
    const validPassword = await bcrypt.compare(req.body.currentPassword, operator.password);
    if (validPassword) {
      // OK now. Go ahead and encrypt and save the new password
      const salt = await bcrypt.genSalt(10);
      operator.password = await bcrypt.hash(req.body.newPassword, salt);
      await operator.save();
      winston.info('Request to change password succeeded');
      res.send(operator);
    }
    else {
      winston.error('Request to change password failed. The current password supplied is incorrect.');
      return res.status(404).send('The current password supplied is incorrect. Please adjust, then again.');
    }
  } else {
    winston.error('Request to change password failed.The operator with the given password was not found.');
    return res.status(404).send('The operator with the given password was not found.');
  }
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  winston.info('Request to update Operator. (id: '+ req.params.id + ')');
  const {error} = validateUpdateOperator(req.body);
  if (error) {
    winston.error('Request to update Operator failed in validation. Error message: '+ error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const operator = await Operator.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      type: req.body.type,
      email: req.body.email,
      //password: req.body.password ,
      phone: req.body.phone,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      username: req.body.username,
      notes: req.body.notes
    },
    function (err, result) {
      const x = '';
    });

  if (!operator) {
    winston.error('Request to update Operator failed. The Operator with the given ID was not found.');
    return res.status(404).send('The Operator with the given ID was not found.');
  }
  winston.info('Responding to request to update Operator. Operator name: ' + operator.name);
  res.send(operator);
});

module.exports = router;
