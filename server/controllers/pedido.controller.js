const Pedido = require('../models/Pedido');

const PedidoController = {
  // Crear un nuevo pedido
  crearPedido: async (req, res) => {
    const { usuario, products } = req.body;

    try {
      const nuevoPedido = new Pedido({
        usuario,
        products
        // Otros campos relacionados con el pedido
      });

      const pedidoGuardado = await nuevoPedido.save();
      res.status(201).json({ success: true, pedido: pedidoGuardado });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Obtener todos los pedidos
  obtenerTodosPedidos: async (req, res) => {
    try {
      const pedidos = await Pedido.find().populate('usuario').populate('products.product');
      res.json({ success: true, pedidos });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Actualizar detalles de un pedido por ID
  actualizarPedido: async (req, res) => {
    const pedidoId = req.params.id;
    const { products, estado } = req.body;

    try {
      const pedidoActualizado = await Pedido.findByIdAndUpdate(
        pedidoId,
        { products, estado },
        { new: true }
      ).populate('usuario').populate('products.product');

      if (!pedidoActualizado) {
        return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
      }

      res.json({ success: true, pedido: pedidoActualizado });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Eliminar un pedido por ID
  eliminarPedido: async (req, res) => {
    const pedidoId = req.params.id;

    try {
      const pedidoEliminado = await Pedido.findByIdAndDelete(pedidoId);

      if (!pedidoEliminado) {
        return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
      }

      res.json({ success: true, message: 'Pedido eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = PedidoController;
