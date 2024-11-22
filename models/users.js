const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {validateUSPhoneNumber, validateEmail} = require('../utils/validationHelper');

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { 
        type: String, 
        required: true,
        validate: {
            validator: validateUSPhoneNumber, 
            message: 'Phone number is invalid. It must be a US valid 10 digit phone number.'
        }
    },
    email: { 
        type: String, 
        unique: true,
        required: true,
        validate: {
            validator: validateEmail,
            message: 'Email is invalid. It mus have the following format example@example.com'
        } 
    },
    sendNewsletter: {type: Boolean, required: true},
});

module.exports = mongoose.model('User', UserSchema);