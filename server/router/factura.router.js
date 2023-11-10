const express = require("express")
const FacturaController = require("../controllers/factura.controller")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.post("/factura", [md_auth.asureAuth], FacturaController.createFactura)


module.exports = api