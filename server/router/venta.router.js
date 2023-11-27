const express = require("express")
const VentaController = require("../controllers/venta.controller")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()
api.post("/venta", [md_auth.asureAuth], VentaController.createVenta)
api.get("/venta", [md_auth.asureAuth], VentaController.getVentas)
api.patch("/venta/:id", [md_auth.asureAuth], VentaController.updateVenta)
api.delete("/venta/:id", [md_auth.asureAuth], VentaController.deleteVenta)

module.exports = api