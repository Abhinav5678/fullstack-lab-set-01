const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
        trim: true
    },
    aadharNumber: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    address: {
        location: {
            type: String,
            required: true
        }
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema); 