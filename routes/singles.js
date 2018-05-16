const {Single, validate} = require('../models/single');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const singles = await Single.find().sort('lastName');
    res.send(singles);
});

router.get('/:id', async (req, res) => {
    const single = await Single.findById(req.params.id);

    if (!single) return res.status(404).send('The single with the given ID was not found.');

    res.send(single);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const single = new Single({
        identity: {
            firstName: req.body.identity.firstName,
            lastName: req.body.identity.lastName,
            sex: req.body.identity.sex,
            age: req.body.identity.age,
            maritalStatus: req.body.identity.maritalStatus
        },
        occupation:  req.body.occupation,
        specialNeeds:  req.body.specialNeeds,
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
            country:req.body.residence.country
        },
        physical: {
            height: req.body.physical.height,
            build: req.body.physical.build,
            description: req.body.physical.description
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
        visible: req.body.visible
    });

    await single.save();

    res.send(single);
});

router.delete('/:id', async (req, res) => {
    const single = await Single.findByIdAndRemove(req.params.id);

    if (!single) return res.status(404).send('The single with the given ID was not found.');

    res.send(single);
});
/**
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});
**/
module.exports = router;