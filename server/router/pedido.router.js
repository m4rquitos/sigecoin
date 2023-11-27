const express = require("express")
const PedidoController = require("../controllers/pedido.controller")

const api = express.Router()

api.post("/pedido", PedidoController.createPedido)
api.get("/pedido:/:id_user", PedidoController.getPedidos)
api.patch("/pedido/:id", PedidoController.updatePedido)
api.delete("/pedido/:id", PedidoController.deletePedido)


module.exports = api