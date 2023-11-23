const Producto = require('../models/product.model.js');
const path = require('path');
const fs = require('fs');

async function registerProduct(req, res) {
    const {
        codigoProduct,
        nombreProduct,
        precioUni,
        cantidad,
        proveedor,
        tallas,
        categorias,
        tipoCalzado,
        descripcion,
    } = req.body;
    const { images } = req.files;

    try {
        // Verificar si ya existe un producto con el mismo código
        const productFound = await Producto.findOne({ codigoProduct });
        if (productFound) {
            return res.status(400).json({ msg: 'Error: Duplicate Product Code' });
        }

        // Crear la carpeta del producto si no existe
        const productDirectory = path.join(__dirname, '..', 'uploads', 'productos', codigoProduct);
        if (!fs.existsSync(productDirectory)) {
            fs.mkdirSync(productDirectory, { recursive: true });
        }

        // Guardar la imagen en la carpeta del producto
        const imagePath = path.join(productDirectory, images.name);
        fs.writeFileSync(imagePath, images.data);

        // Construir la ruta relativa para almacenar en la base de datos
        const relativeImagePath = path.join('productos', codigoProduct, images.name);

        // Crear el nuevo producto
        const newProduct = new Producto({
            codigoProduct,
            nombreProduct,
            precioUni,
            cantidad,
            proveedor,
            tallas,
            categorias,
            tipoCalzado,
            descripcion,
            images: relativeImagePath,
        });

        // Guardar el nuevo producto en la base de datos
        const savedProduct = await newProduct.save();

        // Enviar la respuesta con el nuevo producto
        res.status(200).json({ newProduct: savedProduct });
    } catch (error) {
        console.error(error);

        // Agregar una respuesta más detallada del error para depuración
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
}


const getProducts = async (req, res) => {
    try {
        const data = await Producto.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

async function updateProduct(req, res) {
    const { codigoProduct } = req.params;
    const { nombreProduct, precioUni, tallas, categorias, tipoCalzado, descripcion, cantidad, proveedor } = req.body;

    try {
        const product = await Producto.findOne({ codigoProduct });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.nombreProduct = nombreProduct || product.nombreProduct;
        product.precioUni = precioUni || product.precioUni;
        product.tallas = tallas || product.tallas;
        product.categorias = categorias || product.categorias;
        product.tipoCalzado = tipoCalzado || product.tipoCalzado;
        product.descripcion = descripcion || product.descripcion;
        product.cantidad = cantidad !== undefined ? cantidad : product.cantidad; // Actualiza la cantidad solo si se proporciona
        product.proveedor = proveedor || product.proveedor; // Actualiza el proveedor solo si se proporciona

        if (req.files && req.files.file) {
            const file = req.files.file;

            const filePath = path.resolve(__dirname, '..', 'uploads', product.images);
            fs.unlinkSync(filePath);

            const rutaArchivoRelativa = path.join('..', 'uploads', 'productos', codigoProduct, file.name);
            const rutaSinUpload = path.join('productos', codigoProduct, file.name);

            fs.writeFileSync(path.resolve(__dirname, rutaArchivoRelativa), file.data);

            product.images = rutaSinUpload;
        }

        const updatedProduct = await product.save();
        res.status(200).json({ msg: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}




async function deleteProduct(req, res) {
    const { codigoProduct } = req.params;

    try {
        // Buscar el producto por su código
        const product = await Producto.findOne({ codigoProduct });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Obtener la ruta del directorio
        const directoryPath = path.resolve(__dirname, '..', 'uploads', 'productos', codigoProduct);

        // Eliminar el archivo asociado al producto
        const filePath = path.resolve(directoryPath, '..', '..', product.images);
        fs.unlinkSync(filePath);

        // Eliminar el directorio
        await fs.promises.rm(directoryPath, { recursive: true });

        // Eliminar el producto de la base de datos
        await product.remove();

        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = {
    registerProduct,
    getProducts,
    updateProduct,
    deleteProduct
};