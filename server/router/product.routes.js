const { Router } = require('express');
const { registerProduct } = require('../controllers/product.controller.js');

const api = Router();

api.post('/registerProduct', registerProduct);

module.exports = api;