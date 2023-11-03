const express = require('express');
const { API_VERSION } = require("./constants");
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()

//importar rutas
const authRoutes = require("./router/auth.router")
const userRoutes = require("./router/user.router")
const menuRoutes = require("./router/menu.router")


// configurar body parse
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

// conf carpeta static
app.use(express.static("uploads"))
//conf header HTTP -cors
app.use(cors())
//conf rutas
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes)


module.exports = app