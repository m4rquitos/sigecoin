const { Router } = require('express');
const { registerProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller.js');

const api = Router();

api.post('/registerProduct', registerProduct);
api.get('/getProducts', getProducts);
api.patch('/updateProduct/:codigoProduct', updateProduct);
api.delete('/deleteProduct/:codigoProduct', deleteProduct);

module.exports = api;