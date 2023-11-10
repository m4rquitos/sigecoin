const express = require('express')

const controllerProduct = require('../controllers/product.controller.js')


const Router = express.Router()

const api = Router()

api.post('/registerProduct', controllerProduct.registerProduct)


module.exports = api