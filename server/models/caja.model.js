// models/Caja.js

const mongoose = require('mongoose');

const cajaSchema = new mongoose.Schema({
  fechaApertura: {
    type: Date,
    required: true,
    default: Date.now
  },
  fechaCierre: {
    type: Date
  },
  totalVentas: {
    type: Number,
    default: 0
  },
  cajero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ajusta el nombre del modelo de usuario si es diferente
    required: true
  },
  facturas: [
    {
      numero: {
        type: String,
        required: true
      },
      // Otros campos de la factura
    }
  ]
});

const Caja = mongoose.model('Caja', cajaSchema);

module.exports = Caja;
