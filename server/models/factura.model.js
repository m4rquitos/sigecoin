const mongoose = require("mongoose")

const FacturaSchema = mongoose.Schema({
    ncompra: {
        type: Number,
        require: true,
        trim: true
    },
    //client
    nombre: String,
    fecCompra: Date,
    proveedor: String,
    productos: String,
    cantidad: Number,
    precioUnitario: String,
    subtotal: String,
    impuesto: String,
    total: String,
    abono: String,
    saldo: String,
    estado: Boolean,
    vendedor: String,
});

module.exports = mongoose.model('Factura', FacturaSchema)