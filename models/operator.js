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
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
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
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(operator, schema);
}

exports.Operator = Operator;
exports.validate = validateOperator;