const mongoose = require("mongoose")

const ProveedorSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    empresa: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: false,
        minlength: 10
    },
    nit: {
        type: String,
        required: true,
        maxLength: 256
    },

})