import React, { useState } from 'react';
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

const ProductCreateModal = ({ isOpen, onRequestClose, fetchData }) => {
    const [codigoProduct, setCodigoProduct] = useState('');
    const [nombreProduct, setNombreProduct] = useState('');
    const [precioUni, setPrecioUni] = useState('');
    const [cantidad, setCantidad] = useState(0); // Ajusta según tus necesidades
    const [proveedor, setProveedor] = useState('');
    const [tallas, setTallas] = useState('');
    const [categorias, setCategorias] = useState('');
    const [tipoCalzado, setTipoCalzado] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [images, setImages] = useState(null);

    const onTallasChange = (e) => setTallas(e.target.value);
    const onCategoriasChange = (e) => setCategorias(e.target.value);
    const onTipoCalzadoChange = (e) => setTipoCalzado(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImages(file);
    };

    const registerProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('codigoProduct', codigoProduct);
            formData.append('nombreProduct', nombreProduct);
            formData.append('precioUni', precioUni);
            formData.append('cantidad', cantidad);
            formData.append('proveedor', proveedor);
            formData.append('tallas', tallas);
            formData.append('categorias', categorias);
            formData.append('tipoCalzado', tipoCalzado);
            formData.append('descripcion', descripcion);
            formData.append('images', images);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/registerProduct`, formData, config);
            console.log(response.data);
            onRequestClose();
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    console.log(categorias)

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Registrar Nuevo Producto">
            <div className='Modal' style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>Registrar Nuevo Producto</h2>

                <label>Código del Producto:</label>
                <input type="text" required value={codigoProduct} onChange={(e) => setCodigoProduct(e.target.value)} />

                <label>Nombre del Producto:</label>
                <input type="text" required value={nombreProduct} onChange={(e) => setNombreProduct(e.target.value)} />

                <label>Precio Unitario:</label>
                <input type="text" required value={precioUni} onChange={(e) => setPrecioUni(e.target.value)} />

                <label>Cantidad:</label>
                <input type="numbe requiredr" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />

                <label>Proveedor:</label>
                <input type="text" required value={proveedor} onChange={(e) => setProveedor(e.target.value)} />

                <label>Tallas (separadas por comas):</label>
                <input type="text" required value={tallas} onChange={onTallasChange} />

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
                <input style={{ border: 'none' }} type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />

                <button className='btn_modal' onClick={registerProduct}>Registrar Producto</button>
            </div>
        </Modal>
    );
};

export default ProductCreateModal;
