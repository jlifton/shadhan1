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

router.get('/me', auth, async(req, res) => {
    const operator = await Operator.findById(req.operator._id).select('-password');
res.send(operator);
});

router.get('/', auth, async (req, res) => {
    const operator = await Operator.find();
    res.send(operator);
});


router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let operator = await Operator.findOne({ username: req.body.username });
    if (operator) {
        const validPassword = await bcrypt.compare(req.body.password, operator.password);
        if (validPassword) {
            const token = operator.generateAuthToken();
            operator.password = '';
            return res.header('x-auth-token', token).send(operator);
        }
        return  res.status(400).send('No Operator for this user name and password.');
    }
    else
        return  res.status(400).send('No Operator for this user name and password.');

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



router.post('/', async (req, res) => {
    const { error } = validateNewOperator(req.body);
if (error) return res.status(400).send(error.details[0].message);

let operator = await Operator.findOne({ email: req.body.email });
if (operator) return res.status(400).send('Operator already registered.');

operator = new Operator(_.pick(req.body, ['name', 'type', 'username', 'password', 'email',
                                            'phone', 'street', 'city', 'country', 'notes']));
const salt = await bcrypt.genSalt(10);
operator.password = await bcrypt.hash(operator.password, salt);
await operator.save();

const token = operator.generateAuthToken();
res.header('x-auth-token', token).send(_.pick(operator, ['_id',
    'name', 'type', 'username', 'email', 'phone', 'street', 'city', 'country', 'notes']));
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

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validateUpdateOperator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const operator = await Operator.findByIdAndUpdate(req.params.id,
                            { name: req.body.name ,
                             type: req.body.type ,
                             email: req.body.email ,
                             //password: req.body.password ,
                             phone: req.body.phone ,
                             street: req.body.street ,
                             city: req.body.city ,
                             country: req.body.country ,
                             username: req.body.username,
                             notes: req.body.notes},
        function(err, result){
            const x = '';
        });

    if (!operator) return res.status(404).send('The Operator with the given ID was not found.');

    res.send(operator);
});

module.exports = router;
