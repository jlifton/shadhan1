const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const {Archive, validate} = require('../models/archive');
const {Single} = require('../models/single');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const winston = require('winston');

Fawn.init(mongoose);
/**
 * Get all Archives
 */
router.get('/', auth, async (req, res) => {
  winston.info('Request to get all Archives');
  const archives = await Archive.find().sort('lastName');
  winston.info('Responding to get all Archives request.');
  res.send(archives);
});


/**
 * Add an Archive
 */
router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const archive = new Archive({
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

  await archive.save();

  res.send(archive);
});

/**
 * Delete an Archive
 */
router.delete('/:id', async (req, res) => {
  const archive = await Archive.findByIdAndRemove(req.params.id);

  if (!archive) return res.status(404).send('The archived Single with the given ID was not found.');

  res.send(archive);
});

/**
 * Archive Single
 */
router.put('/:id', async (req, res) => {
  // Delete from Single, and create in Archive. Do it atomically with Fawn. Fawn not working. Not doing the remove for some weird reason
  // Try again later ?

  // First, get the relevant Single
  let single  = await Single.findById(req.params.id);
  if (!single) return res.status(404).send('The Single with the given ID was not found. Archive unsuccessful');

  const archive = new Archive({
    identity: {
      firstName: single.identity.firstName,
      lastName: single.identity.lastName,
      sex: single.identity.sex,
      age: single.identity.age,
      maritalStatus: single.identity.maritalStatus
    },
    occupation: single.occupation,
    specialNeeds: single.specialNeeds,
    religioEthnic: {
      hashkafa: single.religioEthnic.hashkafa,
      ethnicity: single.religioEthnic.ethnicity,
      ethnicityAdditional: single.religioEthnic.ethnicityAdditional,
      convert: single.religioEthnic.convert,
      cohen: single.religioEthnic.cohen,
      primaryActivity: single.religioEthnic.primaryActivity
    },
    residence: {
      city: single.residence.city,
      country: single.residence.country
    },
    physical: {
      height: single.physical.height,
      build: single.physical.build,
      description: single.physical.description,
      smoker: single.physical.smoker
    },
    personalityRequirements: single.personalityRequirements,
    pastEducation: single.pastEducation,

    contact: {
      name: single.contact.name,
      relationship: single.contact.relationship,
      primaryPhone: single.contact.primaryPhone,
      secondaryPhone: single.contact.secondaryPhone,
      email: single.contact.email
    },
    dateEntered: single.dateEntered,
    source: {
      name: single.source.name,
      email: single.source.email,
      phone: single.source.phone
    },
    visible: single.visible,
    comments: single.comments,
    created: single.created,
    updated: single.updated
  });
  //Add the Single to archives collection
  await archive.save();

  // Now, remove the Single from the singles collection
  single = await Single.findByIdAndRemove(req.params.id);

  if (!single) return res.status(404).send('Could not delete the Single, but it was successfully migrated to Archives.');
  res.send(archive);

/**
  try {
    new Fawn.Task()
     // .save('archives', archive)
      .remove(Single, {_id: req.params.id})
      .remove(Single, {_id: single._id})
      .remove(Single, {occupation: single.occupation})
      .run().then(() => {
      res.send(archive);
    });
  }
  catch (ex) {
    res.status(500).send('Something failed.');
  }
**/
});

module.exports = router;
