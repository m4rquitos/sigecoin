// Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { BiSearchAlt } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';

import ProductCreateModal from './ProductCreateModal';
import ProductUpdateModal from './ProductUpdateModal';

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
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Inventario</span>
            <BiSearchAlt style={{ color: 'green', fontSize: '1.6em' }} />
            <span className="p-input-icon-left">
                <InputText
                    style={{ outline: 'none', borderBottom: '2px solid #4CAF50' }}
                    value={filterCode}
                    onChange={onCodeFilterChange}
                    placeholder="Buscar Por Codigo"
                />
            </span>
            <span className="p-input-icon-left">
                <InputText
                    style={{ outline: 'none', borderBottom: '2px solid #4CAF50' }}
                    value={filterName}
                    onChange={onNameFilterChange}
                    placeholder="Buscar Por Nombre"
                />
            </span>
            <button onClick={openCreateModal}>Nuevo Producto</button>
        </div>
    );

    const visibleData = filterData(products);

    return (
        <>
            <ProductCreateModal isOpen={isCreateModalOpen} onRequestClose={closeCreateModal} />
            <ProductUpdateModal isOpen={isUpdateModalOpen} onRequestClose={closeUpdateModal} selectedProduct={selectedProduct} />

            <section>
                <div className="card">
                    <DataTable value={visibleData} header={header} tableStyle={{ minWidth: '60rem' }} paginator rows={15}>
                        <Column
                            style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
                            header="Image"
                            body={(rowData) => (
                                <img
                                    alt="Product"
                                    src={`http://localhost:3001/${rowData.images}`}
                                    className="w-6rem shadow-2 border-round"
                                    width={'100px'}
                                />
                            )}
                        />
                        <Column field="codigoProduct" header="CodigoProduct" />
                        <Column field="nombreProduct" header="NombreProduct" />
                        <Column field="precioUni" header="Precio Uni" />
                        <Column field="cantidad" header="Cantidad" />
                        <Column field="proveedor" header="Proveedor" />
                        <Column field="tallas" header="Tallas" />
                        <Column field="categorias" header="Categorias" />
                        <Column field="tipoCalzado" header="Tipo Calzado" />
                        <Column field="descripcion" header="Descripcion" />
                        <Column
                            header='Actions'
                            body={(rowData) => (
                                <>
                                    <button className="p-button p-component p-button-text p-button-plain" onClick={() => openUpdateModal(rowData)}>
                                        <MdEdit style={{ fontSize: '1.5em' }} />
                                    </button>
                                    <button className="p-button p-component p-button-text p-button-plain" onClick={() => deleteProduct(rowData)}>
                                        <MdDelete style={{ fontSize: '1.5em' }} />
                                    </button>
                                </>
                            )}
                        />
                    </DataTable>
                </div>
            </section>
        </>
    );
}

export default Home;
