const Factura = require('../models/factura.model.js');
const Product = require('../models/product.model.js');

async function createFactura(req, res) {
    const factura = new Factura(req.body)

    factura.save((error, facturaStored) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear la Factura" })
        } else {
            res.status(200).send(facturaStored)
        }
    })
}

async function updateFactura(req, res) {
    const { id } = req.params;
    const facturaData = req.body

    Factura.findByIdAndUpdate({ _id: id }, facturaData, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al actualizar la factura" })
        } else {
            res.status(200).send({ msg: "La factura ha sido actualizada correctamente" })
        }
    })

}

async function getFacturas(req, res) {
    const { active } = req.query

    let response = null

    if (active === undefined) {
        response = await Factura.find().sort({ order: "asc" })
    } else {
        response = await Factura.find({ active }).sort({ order: "asc" })
    }

    if (!response) {
        res.status(400).send({ msg: "No se haencontrado ninguna factura" })
    } else {
        res.status(200).send({ response })
    }
}

async function deleteFactura(req, res) {

    const { id } = req.params

    Factura.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar la factura" })
        } else {
            res.status(200).send({ msg: "La factura ha sido eliminada exitosamente" })
        }
    })
}

const generarFactura = async (req, res) => {
    try {
        const { nombre, vendedor, carrito } = req.body;

        // Obtén información detallada de los productos en el carrito
        const productosEnCarrito = await Product.find({ codigoProduct: { $in: carrito.map(item => item.codigoProduct) } });

        // Calcula el total de la factura
        const total = carrito.reduce((total, item) => {
            const producto = productosEnCarrito.find(p => p.codigoProduct === item.codigoProduct);
            return total + item.cantidad * producto.precioUni;
        }, 0);

        // Verifica si hay suficiente stock para cada producto en el carrito
        const stockSuficiente = carrito.every(item => {
            const producto = productosEnCarrito.find(p => p.codigoProduct === item.codigoProduct);
            return producto && item.cantidad <= producto.cantidad;
        });

        if (!stockSuficiente) {
            return res.status(400).json({ msg: 'No hay suficiente stock para completar la compra.' });
        }

        // Crea la factura en la base de datos
        const nuevaFactura = new Factura({
            nombre,
            vendedor,
            productos: carrito,
            total,
            // Otros campos de la factura según tu modelo
        });

        // Guarda la factura en la base de datos
        const facturaGuardada = await nuevaFactura.save();

        // Actualiza el stock de productos
        for (const item of carrito) {
            const producto = productosEnCarrito.find(p => p.codigoProduct === item.codigoProduct);
            if (producto) {
                // Reduce la cantidad en stock según la cantidad vendida en la factura
                await Product.findOneAndUpdate(
                    { codigoProduct: item.codigoProduct },
                    { $inc: { cantidad: -item.cantidad } } // Reducción de stock
                );
            }
        }

        // Puedes realizar otras acciones aquí, como limpiar el carrito, etc.

        res.status(201).json({ msg: 'Factura generada exitosamente', factura: facturaGuardada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al generar la factura' });
    }
};



module.exports = {
    createFactura,
    updateFactura,
    getFacturas,
    deleteFactura,
    generarFactura
}