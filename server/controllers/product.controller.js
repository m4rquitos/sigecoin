const Producto = require('../models/product.model.js');
const path = require('path');
const fs = require('fs');

async function registerProduct(req, res) {
    const __dirname = path.dirname(require.main.filename);

    const { codigoProduct, nombreProduct, precioUni, tallas, categorias, tipoCalzado, descripcion } = req.body;
    const { images } = req.files;

    try {
        const productFound = await Producto.findOne({ codigoProduct });
        if (productFound) return res.status(400).json({ msg: 'Error Id_Product Duplicate' });

        // Construir la ruta al directorio de archivos
        const archivosDirectory = path.resolve(__dirname, 'uploads', 'productos', codigoProduct);

        // Verificar si el directorio existe, si no, créalo
        if (!fs.existsSync(archivosDirectory)) {
            fs.mkdirSync(archivosDirectory, { recursive: true });
        }

        // Construir la ruta del archivo con el nombre original del archivo
        const rutaArchivoRelativa = path.join('uploads', 'productos', codigoProduct, images.name);
        const rutaSinUpload = path.join('productos', codigoProduct, images.name);

        fs.writeFileSync(path.resolve(__dirname, rutaArchivoRelativa), images.data);

        const newProduct = new Producto({
            codigoProduct: codigoProduct,
            nombreProduct: nombreProduct,
            precioUni: precioUni,
            tallas: tallas,
            categorias: categorias,
            tipoCalzado: tipoCalzado,
            descripcion: descripcion,
            images: rutaSinUpload
        });

        const saveProduct = await newProduct.save();
        res.status(200).send({ newProduct });

    } catch (error) {
        console.log(error);
    }
}

const getProducts = async (req, res) => {
    try{
        const data = await Producto.find()
        res.status(200).json(data)
    } catch (error){
        console.log(error)
    }
}

async function updateProduct(req, res) {
    const { codigoProduct } = req.params;
    const { nombreProduct, precioUni, tallas, categorias, tipoCalzado, descripcion } = req.body;
    const { file } = req.files; // file contendrá la información del archivo enviado

    try {
        // Verificar si el producto existe
        const product = await Producto.findOne({ codigoProduct });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Actualizar los campos del producto
        product.nombreProduct = nombreProduct || product.nombreProduct;
        product.precioUni = precioUni || product.precioUni;
        product.tallas = tallas || product.tallas;
        product.categorias = categorias || product.categorias;
        product.tipoCalzado = tipoCalzado || product.tipoCalzado;
        product.descripcion = descripcion || product.descripcion;

        // Actualizar la imagen si se proporcionó un nuevo archivo
        if (file) {
            // Eliminar el archivo anterior
            const filePath = path.resolve(__dirname, '..', 'uploads', product.images);
            fs.unlinkSync(filePath);

            // Construir la ruta del nuevo archivo con el nombre original del archivo
            const rutaArchivoRelativa = path.join( '..', 'uploads' , 'productos', codigoProduct, file.name);
            const rutaSinUpload = path.join('productos', codigoProduct, file.name);

            // Guardar el nuevo archivo
            fs.writeFileSync(path.resolve(__dirname, rutaArchivoRelativa), file.data);

            // Actualizar la ruta de la imagen en el producto
            product.images = rutaSinUpload;
        }

        // Guardar el producto actualizado en la base de datos
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