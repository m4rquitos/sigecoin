// routes/cajaRoutes.js

const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/caja.controller');

// Rutas para la caja
router.post('/caja/abrir', cajaController.abrirCaja);
router.put('/caja/cerrar/:id', cajaController.cerrarCaja);
router.post('/caja/factura/:id', cajaController.generarFactura);

module.exports = router;
