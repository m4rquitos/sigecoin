// controllers/cajaController.js

const Caja = require('../models/caja.model');

// Abrir una nueva caja
exports.abrirCaja = async (req, res) => {
  try {
    const nuevaCaja = new Caja();
    await nuevaCaja.save();
    res.json(nuevaCaja);
  } catch (error) {
    res.status(500).json({ error: 'Error al abrir la caja' });
  }
};

// Cerrar la caja y registrar las ventas totales
exports.cerrarCaja = async (req, res) => {
  try {
    const caja = await Caja.findById(req.params.id);
    caja.fechaCierre = Date.now();
    // Lógica para calcular y registrar las ventas totales
    // ...

    await caja.save();
    res.json(caja);
  } catch (error) {
    res.status(500).json({ error: 'Error al cerrar la caja' });
  }
};

// Generar una nueva factura
exports.generarFactura = async (req, res) => {
  try {
    const caja = await Caja.findById(req.params.id);
    const nuevaFactura = req.body;
    // Lógica para generar la factura
    // ...

    caja.facturas.push(nuevaFactura);
    caja.totalVentas += nuevaFactura.total;
    await caja.save();

    res.json(nuevaFactura);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar la factura' });
  }
};
