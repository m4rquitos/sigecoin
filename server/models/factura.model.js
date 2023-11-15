const mongoose = require("mongoose")

const FacturaSchema = mongoose.Schema({
    codigoCompra: {
        type: Number,
        require: true,
        unique:true,
        trim: true,
    },
    //client
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    fecCompra: {
        type: Date,
        default: Date.now,
    },
    direccion: String,
    nombreProduct: [{
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        marca: {
            type: String,
            required: true,
            trim: true,
        },
        cantidad: {
            type: Number,
            required: true,
        },
        precioUni: {
            type: Number,
            required: true,
        }
    }],

    subtotal: String,
    impuesto: String,
    total: String,
    abono: String,
    saldo: String,
    estado: Boolean,
    vendedor: String,
})

module.exports = mongoose.model('Factura', FacturaSchema)