import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { BiSearchAlt } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';

import ProductCreateModal from './ProductCreateModal';
import ProductUpdateModal from './ProductUpdateModal';
import { CiCirclePlus } from "react-icons/ci";


import './customStyles.css'

function Home() {
    const [products, setProducts] = useState([]);
    const [filterCode, setFilterCode] = useState('');
    const [filterName, setFilterName] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/getProducts');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onCodeFilterChange = (e) => {
        setFilterCode(e.target.value.toLowerCase());
    };

    const onNameFilterChange = (e) => {
        setFilterName(e.target.value.toLowerCase());
    };

    const filterData = (data) => {
        return data.filter(
            (item) =>
                item.codigoProduct.toLowerCase().includes(filterCode) &&
                item.nombreProduct.toLowerCase().includes(filterName)
        );
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        fetchData();
    };

    const openUpdateModal = (product) => {
        setSelectedProduct(product);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedProduct(null);
        fetchData();  
    };

    const deleteProduct = async (product) => {
        const confirmDelete = window.confirm(`¿Seguro que desea eliminar el producto ${product.nombreProduct}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/v1/deleteProduct/${product.codigoProduct}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const header = (
        <div className="header">
            <span style={{ marginLeft: '2em', fontWeight: 'bold', fontSize: '1.4em' }}>Inventario</span>
            <BiSearchAlt style={{ color: 'green', fontSize: '1.6em' }} />
            <span className="p-input-icon-left">
                <InputText
                    style={{ outline: 'none', borderBottom: '2px solid rgb(154, 154, 154)', fontSize: '1.2em' }}
                    value={filterCode}
                    onChange={onCodeFilterChange}
                    placeholder="Buscar Por Codigo"
                />
            </span>
            <span className="p-input-icon-left">
                <InputText
                    style={{ outline: 'none', borderBottom: '2px solid rgb(154, 154, 154)', fontSize: '1.2em' }}
                    value={filterName}
                    onChange={onNameFilterChange}
                    placeholder="Buscar Por Nombre"
                />
            </span>
            
        </div>
    );

    const visibleData = filterData(products);

    return (
        <>
            <ProductCreateModal isOpen={isCreateModalOpen} onRequestClose={closeCreateModal} />
            <ProductUpdateModal isOpen={isUpdateModalOpen} onRequestClose={closeUpdateModal} selectedProduct={selectedProduct} />

            <section>
                <div className="card" style={{padding: '0 2em' }}>
                    <DataTable value={visibleData} header={header} tableStyle={{ minWidth: '60rem', textAlign: 'center', border: '1px solid rgb(154, 154, 154)' }} paginator rows={15} >
                        <Column
                            style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
                            header="Image"
                            className='column'
                            headerClassName='headerTable'
                            body={(rowData) => (
                                <img
                                    alt="Product"
                                    src={`http://localhost:3001/${rowData.images}`}
                                    style={{ padding: '.7em 0' }}
                                    width={'100px'}
                                />
                            )}
                        />
                        <Column className='column' field="codigoProduct" header="CodigoProduct" headerClassName='headerTable' />
                        <Column className='column' field="nombreProduct" header="NombreProduct" headerClassName='headerTable' />
                        <Column className='column' field="precioUni" header="Precio Uni" headerClassName='headerTable' />
                        <Column className='column' field="cantidad" header="Cantidad" headerClassName='headerTable' />
                        <Column className='column' field="proveedor" header="Provedor" headerClassName='headerTable' />
                        <Column className='column' field="tallas" header="Tallas" headerClassName='headerTable' />
                        <Column className='column' field="categorias" header="Categorias" headerClassName='headerTable' />
                        <Column className='column' field="tipoCalzado" header="Tipo Calzado" headerClassName='headerTable' />
                        <Column className='column' field="descripcion" style={{ width: '20%' }} header="Descripcion" headerClassName='headerTable' />
                        <Column
                            className='column'
                            header='Actions'
                            headerClassName='headerTable'
                            body={(rowData) => (
                                <div style={{ display: 'flex', gap: '.5em', justifyContent: 'center' }}>
                                    <button className="btnActions" onClick={() => openUpdateModal(rowData)}>
                                        <MdEdit style={{ fontSize: '3em' }} />
                                    </button>
                                    <button className="btnActions" onClick={() => deleteProduct(rowData)}>
                                        <MdDelete style={{ fontSize: '3em' }} />
                                    </button>
                                </div>
                            )}
                        />
                    </DataTable>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '.3em' }} className='btn_create' onClick={openCreateModal}><CiCirclePlus style={{ fontSize: '2em' }} />Producto</button>
            </section>
        </>
    );
}

export default Home;
