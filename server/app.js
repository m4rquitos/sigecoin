const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
const { API_VERSION } = require('./constants.js');
const bodyParser = require('body-parser');
const expressFile = require('express-fileupload')

// Importar rutas
const authRoutes = require('./router/auth.router');
const userRoutes = require('./router/user.router');
const facturaRoutes = require('./router/factura.router');
const productRoute = require('./router/product.routes');
const proveedorRoute = require('./router/proveedor.router.js');
const ventaRoutes = require('./router/venta.router.js')

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('uploads'));
app.use(expressFile())

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

app.use(`/api/${API_VERSION}`, productRoute);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, facturaRoutes);
app.use(`/api/${API_VERSION}`, proveedorRoute);
app.use(`/api/${API_VERSION}`, ventaRoutes);

app.use((req, res, next) => {
	res.status(404).json({
		message: 'EndPoint No Encontrado 😴',
	});
});

module.exports = app;
