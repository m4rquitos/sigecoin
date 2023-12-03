const express = require("express")
const FacturaController = require("../controllers/factura.controller")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.post("/factura", FacturaController.createFactura)
api.patch("/factura/:id", FacturaController.updateFactura)
api.get("/factura", FacturaController.getFacturas)
api.delete("/factura/:id", FacturaController.deleteFactura)

api.post('/generarFactura', FacturaController.generarFactura);

module.exports = api
