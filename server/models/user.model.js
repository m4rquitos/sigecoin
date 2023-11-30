const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String,
    active: Boolean,
    avatar: String,
})

const User = mongoose.model('User', UserSchema);

module.exports = User;