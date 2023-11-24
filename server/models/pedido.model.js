const mongoose = require('mongoose');
const { boolean } = require('zod');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
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
fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: boolean,
  },
  // Otros campos relacionados con el pedido
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
