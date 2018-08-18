const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const {Single, SingleGuest, validate} = require('../models/single');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const winston = require('winston');

/**
 * Get all Singles
 */
router.get('/', auth, async (req, res) => {
  winston.info('Request to get all Singles.');
  winston.info(`Requested by _id:`+ req.user._id + ', type:' + req.user.type);
  const singles = req.user.type === 'GUEST' ?  await SingleGuest.find().sort('lastName') :
                                               await Single.find().sort('lastName');
  winston.info('Responding to get all Singles request.  Count: ' + singles.length);

  res.send(singles);
});

/**
 * Get specific Single
 */
router.get('/:id', [auth, validateObjectId], async (req, res) => {
  winston.info('Request to get Single. (id: ' + req.params.id + ')');
  //const single = await Single.findById(req.params.id);
  const single = req.user.type === 'GUEST' ? await SingleGuest.findById(req.params.id) :
                                             await Single.findById(req.params.id);
  if (!single) {
    winston.info('Request to get Single failed. Not found (id: ' + req.params.id + ')');
    return res.status(404).send('The single with the given ID was not found.');
  }
  winston.info('Responding to get Single request. Single last name: '+ single.identity.lastName);
  res.send(single);
});

/**
 * Add a Single
 */
router.post('/', auth, async (req, res) => {
  winston.info('Request to add new Single');
  const {error} = validate(req.body);
  if (error) {
    winston.error ('Request to add Single failed. Error message: ' + error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  let single;
  if (req.user.type === 'GUEST') {
    single = new SingleGuest({
      identity: {
        firstName: req.body.identity.firstName,
        lastName: req.body.identity.lastName,
        sex: req.body.identity.sex,
        age: req.body.identity.age,
        maritalStatus: req.body.identity.maritalStatus
      },
      occupation: req.body.occupation,
      specialNeeds: req.body.specialNeeds,
      religioEthnic: {
        hashkafa: req.body.religioEthnic.hashkafa,
        ethnicity: req.body.religioEthnic.ethnicity,
        ethnicityAdditional: req.body.religioEthnic.ethnicityAdditional,
        convert: req.body.religioEthnic.convert,
        cohen: req.body.religioEthnic.cohen,
        primaryActivity: req.body.religioEthnic.primaryActivity
      },
      residence: {
        city: req.body.residence.city,
        country: req.body.residence.country
      },
      physical: {
        height: req.body.physical.height,
        build: req.body.physical.build,
        description: req.body.physical.description,
        smoker: req.body.physical.smoker
      },
      personalityRequirements: req.body.personalityRequirements,
      pastEducation: req.body.pastEducation,

      contact: {
        name: req.body.contact.name,
        relationship: req.body.contact.relationship,
        primaryPhone: req.body.contact.primaryPhone,
        secondaryPhone: req.body.contact.secondaryPhone,
        email: req.body.contact.email
      },
      dateEntered: req.body.dateEntered,
      source: {
        name: req.body.source.name,
        email: req.body.source.email,
        phone: req.body.source.phone
      },
      visible: req.body.visible,
      comments: req.body.comments,
      created: Date.now(),
      updated: Date.now()
    });
  }
  else {
    single = new Single({
      identity: {
        firstName: req.body.identity.firstName,
        lastName: req.body.identity.lastName,
        sex: req.body.identity.sex,
        age: req.body.identity.age,
        maritalStatus: req.body.identity.maritalStatus
      },
      occupation: req.body.occupation,
      specialNeeds: req.body.specialNeeds,
      religioEthnic: {
        hashkafa: req.body.religioEthnic.hashkafa,
        ethnicity: req.body.religioEthnic.ethnicity,
        ethnicityAdditional: req.body.religioEthnic.ethnicityAdditional,
        convert: req.body.religioEthnic.convert,
        cohen: req.body.religioEthnic.cohen,
        primaryActivity: req.body.religioEthnic.primaryActivity
      },
      residence: {
        city: req.body.residence.city,
        country: req.body.residence.country
      },
      physical: {
        height: req.body.physical.height,
        build: req.body.physical.build,
        description: req.body.physical.description,
        smoker: req.body.physical.smoker
      },
      personalityRequirements: req.body.personalityRequirements,
      pastEducation: req.body.pastEducation,

      contact: {
        name: req.body.contact.name,
        relationship: req.body.contact.relationship,
        primaryPhone: req.body.contact.primaryPhone,
        secondaryPhone: req.body.contact.secondaryPhone,
        email: req.body.contact.email
      },
      dateEntered: req.body.dateEntered,
      source: {
        name: req.body.source.name,
        email: req.body.source.email,
        phone: req.body.source.phone
      },
      visible: req.body.visible,
      comments: req.body.comments,
      created: Date.now(),
      updated: Date.now()
    });
  }
  winston.info('Will save new  Single');
  await single.save();
  winston.info('Responding to request add Single. Single last name: ' + single.identity.lastName);
  res.send(single);
});

/**
 * Delete a Single
 */
router.delete('/:id', auth, async (req, res) => {
  winston.info('Request to delete Single. (id: '+ req.params.id + ')');
  let single;
  if (req.user.type === 'GUEST') {
    single = await SingleGuest.findByIdAndRemove(req.params.id);
  }
  else {
    single = await Single.findByIdAndRemove(req.params.id);
  }
  if (!single) {
    winston.error('Single for given id not found. Delete failed');
    return res.status(404).send('The single with the given ID was not found.');
  }
  winston.info('Responding to delete request. Single last name: ' + single.identity.lastName);
  res.send(single);
});

/**
 * Update a Single
 */
router.put('/:id', auth, async (req, res) => {
  winston.info('Request to update Single. (id: '+ req.params.id + ')');
  const {error} = validate(req.body);
  if (error) {
    winston.error('Request to update Single failed in validation. Error message: '+ error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  let single;
  if (req.user.type === 'GUEST') {
    single = await SingleGuest.findByIdAndUpdate(req.params.id,
      {
        identity: {
          firstName: req.body.identity.firstName,
          lastName: req.body.identity.lastName,
          sex: req.body.identity.sex,
          age: req.body.identity.age,
          maritalStatus: req.body.identity.maritalStatus
        },
        occupation: req.body.occupation,
        specialNeeds: req.body.specialNeeds,
        religioEthnic: {
          hashkafa: req.body.religioEthnic.hashkafa,
          ethnicity: req.body.religioEthnic.ethnicity,
          ethnicityAdditional: req.body.religioEthnic.ethnicityAdditional,
          convert: req.body.religioEthnic.convert,
          cohen: req.body.religioEthnic.cohen,
          primaryActivity: req.body.religioEthnic.primaryActivity
        },
        residence: {
          city: req.body.residence.city,
          country: req.body.residence.country
        },
        physical: {
          height: req.body.physical.height,
          build: req.body.physical.build,
          description: req.body.physical.description,
          smoker: req.body.physical.smoker
        },
        personalityRequirements: req.body.personalityRequirements,
        pastEducation: req.body.pastEducation,

        contact: {
          name: req.body.contact.name,
          relationship: req.body.contact.relationship,
          primaryPhone: req.body.contact.primaryPhone,
          secondaryPhone: req.body.contact.secondaryPhone,
          email: req.body.contact.email
        },
        dateEntered: req.body.dateEntered,
        source: {
          name: req.body.source.name,
          email: req.body.source.email,
          phone: req.body.source.phone
        },
        visible: req.body.visible,
        comments: req.body.comments,
        updated: Date.now()
      },
      function (err, result) {

      });
  }
  else {
    single = await Single.findByIdAndUpdate(req.params.id,
      {
        identity: {
          firstName: req.body.identity.firstName,
          lastName: req.body.identity.lastName,
          sex: req.body.identity.sex,
          age: req.body.identity.age,
          maritalStatus: req.body.identity.maritalStatus
        },
        occupation: req.body.occupation,
        specialNeeds: req.body.specialNeeds,
        religioEthnic: {
          hashkafa: req.body.religioEthnic.hashkafa,
          ethnicity: req.body.religioEthnic.ethnicity,
          ethnicityAdditional: req.body.religioEthnic.ethnicityAdditional,
          convert: req.body.religioEthnic.convert,
          cohen: req.body.religioEthnic.cohen,
          primaryActivity: req.body.religioEthnic.primaryActivity
        },
        residence: {
          city: req.body.residence.city,
          country: req.body.residence.country
        },
        physical: {
          height: req.body.physical.height,
          build: req.body.physical.build,
          description: req.body.physical.description,
          smoker: req.body.physical.smoker
        },
        personalityRequirements: req.body.personalityRequirements,
        pastEducation: req.body.pastEducation,

        contact: {
          name: req.body.contact.name,
          relationship: req.body.contact.relationship,
          primaryPhone: req.body.contact.primaryPhone,
          secondaryPhone: req.body.contact.secondaryPhone,
          email: req.body.contact.email
        },
        dateEntered: req.body.dateEntered,
        source: {
          name: req.body.source.name,
          email: req.body.source.email,
          phone: req.body.source.phone
        },
        visible: req.body.visible,
        comments: req.body.comments,
        updated: Date.now()
      },
      function (err, result) {

      });
  }


  if (!single) {
    winston.error('Request to update Single failed. The Single with the given ID was not found.');
    return res.status(404).send('The Single with the given ID was not found.');
  }
  winston.info('Responding to request to update Single. Single last name: '+ single.identity.lastName);
  res.send(single);
});

module.exports = router;
