const Venta = require('../models/venta.model');
const Producto = require('../models/product.model');
const User = require('../models/user.model');

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
        estado
    } = req.body;

    try {
        const vendedorId = req.user._id; // Obtener el ID del vendedor desde req.user

        const nuevaVenta = new Venta({
            codigoVenta,
            cliente,
            productosVendidos,
            subtotal,
            impuesto,
            total,
            abono,
            saldo,
            estado,
            vendedor: vendedorId // Asignar el ID del vendedor a la venta
        });

        const ventaGuardada = await nuevaVenta.save();

        for (const producto of productosVendidos) {
            const { nombre, marca, cantidad } = producto;

            const productoEncontrado = await Producto.findOne({ nombre, marca });

            if (productoEncontrado) {
                productoEncontrado.cantidadDisponible -= cantidad;
                await productoEncontrado.save();
            }
        }

        res.status(201).json({ success: true, venta: ventaGuardada });
        console.log(req.user._id)
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function updateVenta(req, res) {
    const { id } = req.params;
    const ventaData = req.body;

    try {
        const ventaActualizada = await Venta.findByIdAndUpdate(id, ventaData);
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
            ventas = await Venta.find().sort({ codigoVenta: 'asc' });
        } else {
            ventas = await Venta.find({ estado }).sort({ codigoVenta: 'asc' });
        }

        res.status(200).json({ success: true, ventas });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al obtener las ventas', error: error.message });
    }
}

async function deleteVenta(req, res) {
    const { id } = req.params;

    try {
        await Venta.findByIdAndDelete(id);
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
