const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    codigoProduct: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    nombreProduct: {
        type: String,
        required: true,
        trim: true,
    },
    precioUni: {
        type: String,
        required: true,
        trim: true,
    },
    cantidad: {
        type: Number, // Cambiado a tipo Number para representar la cantidad como un número
        required: true,
        default: 0, // Puedes ajustar el valor predeterminado según tus necesidades
    },
    proveedor: {
        type: String,
        trim: true,
    },
    tallas: {
        type: [String], 
        required: true,
        trim: true,
    },
    categorias: {
        type: [String], 
        required: true,
        trim: true,
    },
    tipoCalzado: {
        type: [String], 
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    images: {
        type: String,//crear array para las imagenes y libreria para varios imagenes 
    },
});

const Product = mongoose.model('Product', productModel);

module.exports = Product;
