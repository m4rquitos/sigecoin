const express =require("express")
const proveedorcontroller = require("../controllers/proveedor.controller")

const api = express.Router()

api.post("proveedor/register", proveedorcontroller.register)

module.exports = api