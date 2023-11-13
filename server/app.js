const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const { API_VERSION } = require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./router/auth.router');
const userRoutes = require('./router/user.router');
const menuRoutes = require('./router/menu.router');
const facturaRoutes = require('./router/factura.router');
// const productRoute = require('./router/product.routes');

const app = express();

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('uploads'));
app.use(cors());

// app.use('/api', productRoute);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, facturaRoutes);

module.exports = app;
