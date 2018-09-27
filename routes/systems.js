const auth = require('../middleware/auth');
const {System, validate} = require('../models/system');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rayimahuvim18@gmail.com',
    pass: '(shidduch)'
  }
});
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



router.post('/contact', auth, async(req, res) => {
  let message = 'Name: ' +  req.body.name + '\n';
  message = message + 'Phone: ' +  req.body.phone + '\n';
  message = message + 'Email: ' +  req.body.email + '\n\n';
  message = message + 'Message: ' + req.body.message;

  var mailOptions = {
    from: req.body.email,
    to: 'rayimahuvim18@gmail.com',
    subject: 'Contact request',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      winston.error('Send contact email failed');
      return res.status(404).send('Send contact email failed.');
    } else {
      res.send('OK');
    }
  });

});

module.exports = router;
