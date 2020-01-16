const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    avatar: {
        type: String,
    },
    date: {
        default: Date.now,
        type: Date,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    }
});

module.exports = User = mongoose.model('user', UserSchema);
