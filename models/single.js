const Joi = require('joi');
const mongoose = require('mongoose');

const Single = mongoose.model('Single', new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 255
    },
    height: {
        type: Number,
        required: true,
        min: 1.0,
        max: 3.0
    },
    maritalStatus: {
        type: String,
        enum : ['Single','Divorced', 'Widowed'],
        required: true
    },
    primaryActivity: {
        type: String,
        enum : ['Working', 'Learning', 'Koveah Itim'],
        required: true
    },
    occupation: {
        type: String,
        max: 255,
        required: false
    },
    sex: {
        type: String,
        enum : ['Male', 'Female'],
        required: true
    },
    specialNeeds: {
        type: String,
        max: 255,
        required: false
    },
    hashkafa: {
        type: String,
        enum : ['Haredi', 'Dati Leumi', 'Hardal', 'Hiloni'],
        required: true
    },
    ethnicity: {
        type: String,
        enum : ['Ashkenazi', 'Hasidish', 'Sefardi', 'Mixed'],
        required: true
    },
    ethnicityAdditional: {
        type: String,
        max: 255,
        required: false
    },
    convert: {
        type: Boolean,
        required: true
    },
    cohen: {
        type: Boolean,
        required: true
    },
    residenceCity: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 128
    },
    residenceCountry: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 128
    }
}));

function validateSingle(single) {
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(2).max(64).required()
        //isGold: Joi.boolean()
    };

    return Joi.validate(single, schema);
}

exports.Single = Single;
exports.validate = validateSingle;