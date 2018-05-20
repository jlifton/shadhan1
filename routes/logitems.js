const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const {LogItem, validate} = require('../models/logitem');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/**
 * Get all Log Items
 */
router.get('/', auth, async(req, res) => {
    const logItems = await LogItem.find().sort('date');
    res.send(logItems);
});


/**
 * Add a LogItem
 */
router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const logItem = new LogItem({
            details: req.body.details,
            date:  req.body.date
    });
    await logItem.save();
    res.send(logItem);
});

/**
 * Delete all LogItems
 */
router.delete('/', async(req, res) => {
    const result = await LogItem.remove({}, () => {'In remove callback'});
    res.send('OK');
});

module.exports = router;