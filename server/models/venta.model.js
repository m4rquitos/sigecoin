const mongoose = require('mongoose');

const ventasSchema = new mongoose.Schema({
  codigoVenta: {
    type: Number,
    required: true,
    unique: true
  },
  cliente: {
    type: String,
    required: true
  },
  productosVendidos: [
    {
      nombre: {
        type: String,
        required: true
      },
      marca: {
        type: String,
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      precioUnitario: {
        type: Number,
        required: true
      }
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  impuesto: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  abono: {
    type: Number,
    required: true
  },
  saldo: {
    type: Number,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ajusta el nombre del modelo de usuario si es diferente
    //required: true
  },
  fechaVenta: {
    type: Date,
    default: Date.now,
}
});

const ventas = mongoose.model('ventas', ventasSchema);

module.exports = ventas;
