const Joi = require('joi');
const mongoose = require('mongoose');

const logitemSchema = new mongoose.Schema({
    details:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 512
    },
    date: {
        type: Date,
        required: true,
        minlength: 3,
        maxlength: 128
    }
});


const LogItem = mongoose.model('LogItem', logitemSchema);

function validateLogItem(logitem) {
    const schema = {
        details: Joi.string().min(3).max(512).required(),
        date: Joi.date().required()
    };

    return Joi.validate(logitem, schema);
}

exports.LogItem = LogItem;
exports.validate = validateLogItem;