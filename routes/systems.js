const auth = require('../middleware/auth');
const {System, validate} = require('../models/system');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/**
 * Get System object
 */
router.get('/', auth, async(req, res) => {
    const systems = await System.find();
    res.send(systems);
});

router.get('/import', auth, async(req, res) => {

    res.send('Do import. View = ' + req.query.view);
});


/**
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


router.delete('/', async(req, res) => {
    const result = await LogItem.remove({}, () => {'In remove callback'});
    res.send('OK');
});
**/
module.exports = router;