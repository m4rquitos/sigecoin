const Sales = require('../models/Sales');
const Product = require('../models/Product');

async function createVenta(req, res) {
    const {
        codigoVenta,
        cliente,
        productosVendidos,
        subtotal,
        impuesto,
        total,
        abono,
        saldo,
        estado,
        vendedor
    } = req.body;

    try {
        const nuevaVenta = new Sales({
            codigoVenta,
            cliente,
            productosVendidos,
            subtotal,
            impuesto,
            total,
            abono,
            saldo,
            estado,
            vendedor
        });

        const ventaGuardada = await nuevaVenta.save();

        for (const producto of productosVendidos) {
            const { nombre, marca, cantidad } = producto;

            const productoEncontrado = await Product.findOne({ nombre, marca });

            if (productoEncontrado) {
                productoEncontrado.cantidadDisponible -= cantidad;
                await productoEncontrado.save();
            }
        }

        res.status(201).json({ success: true, venta: ventaGuardada });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function updateVenta(req, res) {
    const { id } = req.params;
    const ventaData = req.body;

    try {
        const ventaActualizada = await Sales.findByIdAndUpdate(id, ventaData);
        res.status(200).json({ success: true, message: 'Venta actualizada correctamente', venta: ventaActualizada });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar la venta', error: error.message });
    }
}

async function getVentas(req, res) {
    try {
        const { estado } = req.query;
        let ventas = null;

        if (estado === undefined) {
            ventas = await Sales.find().sort({ codigoVenta: 'asc' });
        } else {
            ventas = await Sales.find({ estado }).sort({ codigoVenta: 'asc' });
        }

        res.status(200).json({ success: true, ventas });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al obtener las ventas', error: error.message });
    }
}

async function deleteVenta(req, res) {
    const { id } = req.params;

    try {
        await Sales.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Venta eliminada exitosamente' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al eliminar la venta', error: error.message });
    }
}

module.exports = {
    createVenta,
    updateVenta,
    getVentas,
    deleteVenta
};
