import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import './customStyles.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ProductUpdateModal = ({ isOpen, onRequestClose, fetchData, selectedProduct }) => {
    const [codigoProduct, setCodigoProduct] = useState('');
    const [nombreProduct, setNombreProduct] = useState('');
    const [precioUni, setPrecioUni] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [tallas, setTallas] = useState('');
    const [categorias, setCategorias] = useState('');
    const [tipoCalzado, setTipoCalzado] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [images, setImages] = useState(null);

    useEffect(() => {
        if (selectedProduct) {
            setCodigoProduct(selectedProduct.codigoProduct || '');
            setNombreProduct(selectedProduct.nombreProduct || '');
            setPrecioUni(selectedProduct.precioUni || '');
            setCantidad(selectedProduct.cantidad || '');
            setProveedor(selectedProduct.proveedor || '');
            setTallas(selectedProduct.tallas ? selectedProduct.tallas.join(', ') : '');
            setCategorias(selectedProduct.categorias ? selectedProduct.categorias.join(', ') : '');
            setTipoCalzado(selectedProduct.tipoCalzado ? selectedProduct.tipoCalzado.join(', ') : '');
            setDescripcion(selectedProduct.descripcion || '');
            setImages(null)
        }
    }, [selectedProduct]);

    const onTallasChange = (e) => setTallas(e.target.value);
    const onCategoriasChange = (e) => setCategorias(e.target.value);
    const onTipoCalzadoChange = (e) => setTipoCalzado(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImages(file);
        console.log('Image selected:', file);
    };

    const updateProduct = async () => {
        const formData = new FormData();
        formData.append('nombreProduct', nombreProduct);
        formData.append('precioUni', precioUni);
        formData.append('cantidad', cantidad);
        formData.append('proveedor', proveedor);
        formData.append('tallas', tallas);
        formData.append('categorias', categorias);
        formData.append('tipoCalzado', tipoCalzado);
        formData.append('descripcion', descripcion);

        if (images) {
            formData.append('file', images);
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const url = `${import.meta.env.VITE_API_URL}/updateProduct/${codigoProduct}`;
            const response = await axios.patch(url, formData, config);
            console.log(response.data);
            onRequestClose();
            fetchData();
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor');
            } else {
                console.error('Error de configuración de la solicitud:', error.message);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Actualizar Producto">
            <div className='Modal' style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>Registrar Nuevo Producto</h2>

                <label>Código del Producto:</label>
                <input type="text" value={codigoProduct} disabled />

                <label>Nombre del Producto:</label>
                <input type="text" value={nombreProduct} onChange={(e) => setNombreProduct(e.target.value)} />

                <label>Precio Unitario:</label>
                <input type="text" value={precioUni} onChange={(e) => setPrecioUni(e.target.value)} />

                <label>Cantidad:</label>
                <input type="text" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />

                <label>Proveedor:</label>
                <input type="text" value={proveedor} onChange={(e) => setProveedor(e.target.value)} />

                <label>Tallas (separadas por comas):</label>
                <input type="text" value={tallas} onChange={onTallasChange} />

                <label>Categorías:</label>
                <select onChange={onCategoriasChange}>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="deportivos">Deportivos</option>
                    <option value="infantil">Infantil</option>
                </select>

                <input value={categorias} style={{ visibility: 'hidden', display: 'none' }} />

                <label>Tipo de Calzado (separadas por comas):</label>
                <input type="text" required value={tipoCalzado} onChange={onTipoCalzadoChange} />

                <label>Descripción:</label>
                <textarea type="text" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} style={{ height: '60px' }} />

                <label>Imagen del Producto:</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />

                <button className='btn_modal' onClick={updateProduct}>Actualizar Producto</button>
            </div>
        </Modal>
    );
};

export default ProductUpdateModal;
