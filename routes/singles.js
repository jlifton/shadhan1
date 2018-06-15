const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const jwt = require('jsonwebtoken');
const {Single, validate} = require('../models/single');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/**
 * Get all Singles
 */
router.get('/', auth, async(req, res) => {
    const singles = await Single.find().sort('lastName');
    res.send(singles);
});

/**
 * Get specific Single
 */
router.get('/:id', [auth, validateObjectId], async(req, res) => {
    const single = await Single.findById(req.params.id);

    if (!single) return res.status(404).send('The single with the given ID was not found.');

    res.send(single);
});

/**
 * Add a Single
 */
router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const single = new Single({
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
        comments: req.body.comments
    });

    await single.save();

    res.send(single);
});

/**
 * Delete a Single
 */
router.delete('/:id', async(req, res) => {
    const single = await Single.findByIdAndRemove(req.params.id);

    if (!single) return res.status(404).send('The single with the given ID was not found.');

    res.send(single);
});

/**
 * Update a Single
 */
router.put('/:id', async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const single = await Single.findByIdAndUpdate(req.params.id,
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
            comments: req.body.comments
        },
        function (err, result) {
            const x = '';
        });

    if (!single) return res.status(404).send('The Single with the given ID was not found.');
    res.send(single);
});

module.exports = router;