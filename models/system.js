const Joi = require('joi');
const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    contactName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    contactPhone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 128
    },
    contactEmail: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
});

const System = mongoose.model('System', systemSchema);

function validateSystem(system) {
    const schema = {
        productName: Joi.string().min(5).max(50).required(),
        contactName: Joi.string().min(5).max(50).required(),
        contactPhone: Joi.string().min(5).max(50).required(),
        contactEmail: Joi.string().min(5).max(255).email(),
    };

    return Joi.validate(system, schema);
}

exports.System = System;
exports.validate = validateSystem;