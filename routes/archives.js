const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const {Archive, ArchiveGuest, validate} = require('../models/archive');
const {Single, SingleGuest} = require('../models/single');
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
  //const archives = await Archive.find().sort('lastName');
  const archives = req.user.type === 'GUEST' ?  await ArchiveGuest.find().sort('lastName') :
                                                await Archive.find().sort('lastName');

  winston.info('Responding to get all Archives request.  Count:' + archives.length);
  res.send(archives);
});


/**
 * Add an Archive
 */
router.post('/', auth, async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    winston.error('Adding Archive. Details: ' + error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  let archive;
  if (req.user.type === 'GUEST') {
    archive = new ArchiveGuest({
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
    archive = new Archive({
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
  winston.info('Request to add Archive (name: '+ identity.lastName + ')');
  await archive.save();
  winston.info('Archive added');
  res.send(archive);
});

/**
 * Delete an Archive
 */
router.delete('/:id', auth, async (req, res) => {
  winston.info('Request to delete Archive (id: '+req.params.id+ ')');
  const archive =   req.user.type === 'GUEST' ?  await ArchiveGuest.findByIdAndRemove(req.params.id):
                                                 await Archive.findByIdAndRemove(req.params.id);

  if (!archive) {
    winston.error('The archived Single with the given ID was not found. Delete failed');
    return res.status(404).send('The archived Single with the given ID was not found. Delete failed');
  }
  winston.info('Archive deleted. Archive last name: '+ archive.identity.lastName);
  res.send(archive);
});

/**
 * Archive Single
 */
router.put('/:id', auth, async (req, res) => {
  // Delete from Single, and create in Archive. Do it atomically with Fawn. Fawn not working. Not doing the remove for some weird reason
  // Try again later ?
  winston.info('Request to archive Single (id: '+req.params.id+ ')');
  // First, get the relevant Single

  let single  = req.user.type === 'GUEST' ?  await SingleGuest.findById(req.params.id):
                                             await Single.findById(req.params.id);
  if (!single) {
    winston.error('The Single with the given ID was not found. Archive unsuccessful');
    return res.status(404).send('The Single with the given ID was not found. Archive unsuccessful');
  }

  let archive;
  if (req.user.type === 'GUEST'){
    archive = new ArchiveGuest({
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
  }
  else {
    archive = new Archive({
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
  }
  //Add the Single to archives collection
  await archive.save();
  winston.info('Archive succeeded. Will now attempt to delete from Single collection');
  // Now, remove the Single from the singles collection
  single = req.user.type === 'GUEST' ? await SingleGuest.findByIdAndRemove(req.params.id):
                                       await Single.findByIdAndRemove(req.params.id);
  if (!single) {
    winston.error('Could not delete the Single, but it was successfully migrated to Archives.');
    return res.status(404).send('Could not delete the Single, but it was successfully migrated to Archives.');
  }
  winston.info('Returning from Request to archive Single. Archive last name: ' + archive.identity.lastName);
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
