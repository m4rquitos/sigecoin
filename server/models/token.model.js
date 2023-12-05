const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // El token expirará después de 10 minutos (en segundos)
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
