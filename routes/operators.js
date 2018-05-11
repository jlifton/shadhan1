const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Operator, validate} = require('../models/operator');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async(req, res) => {
    const operator = await Operator.findById(req.operator._id).select('-password');
res.send(operator);
});

router.get('/', auth, async (req, res) => {
    const operator = await Operator.find();
    res.send(operator);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

let operator = await Operator.findOne({ email: req.body.email });
if (operator) return res.status(400).send('Operator already registered.');

operator = new Operator(_.pick(req.body, ['name', 'type', 'email', 'password']));

const salt = await bcrypt.genSalt(10);
operator.password = await bcrypt.hash(operator.password, salt);
await operator.save();

const token = operator.generateAuthToken();
res.header('x-auth-token', token).send(_.pick(operator, ['_id', 'name', 'type', 'email']));
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    const operator = await Operator.findByIdAndRemove(req.params.id);

    if (!operator) return res.status(404).send('The operator with the given ID was not found.');

    res.send(operator);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
    const operator = await Operator.findById(req.params.id);

    if (!operator) return res.status(404).send('The operator with the given ID was not found.');

    res.send(operator);
});


module.exports = router;
