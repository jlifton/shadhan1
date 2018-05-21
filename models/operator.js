const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    type: {
        type: String,
        enum : ['ADMIN','SHADHAN', 'DATAENTRY'],
        default: 'SHADHAN'
    },
    phone:{
        type: String,
        required: true,
        maxlength: 64
    },
    email: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    street: {
        type: String,
        required: false,
        maxlength: 255
    },
    city: {
        type: String,
        required: false,
        maxlength: 255
    },
    country: {
        type: String,
        required: false,
        maxlength: 255
    },
    username:  {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 64,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 64
    }
});

operatorSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, type: this.type }, config.get('jwtPrivateKey'));
    return token;
}

const Operator = mongoose.model('Operator', operatorSchema);

function validateOperator(operator) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        type: Joi.string().valid(['ADMIN','SHADHAN', 'DATAENTRY']).required(),
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(6).max(64).required(),
        phone: Joi.string().max(64).required(),
        street: Joi.string().max(255).allow(''),
        city: Joi.string().max(255).allow(''),
        country: Joi.string().max(255).allow(''),
        username: Joi.string().min(6).max(64).required()
    };

    return Joi.validate(operator, schema);
}

function validateLogin(operator) {
    const schema = {
        username: Joi.string().min(6).max(64).required(),
        password: Joi.string().min(6).max(64).required()
    };

    return Joi.validate(operator, schema);
}


exports.Operator = Operator;
exports.validate = validateOperator;
exports.validateLogin = validateLogin;