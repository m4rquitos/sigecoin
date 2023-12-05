import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import { BiSearchAlt } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { FaCartPlus } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import ProductCreateModal from './ProductCreateModal';
import ProductUpdateModal from './ProductUpdateModal';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

import './customStyles.css';
import Ventas from './ventas/Ventas';

export const NewsLetter = () => {
  const [products, setProducts] = useState([]);
  const [filterCode, setFilterCode] = useState('');
  const [filterName, setFilterName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const btnClose = useRef()

  const doc = new jsPDF();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/getProducts');
      const productsWithStock = response.data.map(product => ({ ...product, stock: product.cantidad }));
      setProducts(productsWithStock);
    } catch (error) {
      console.log(error);
    }
  };

  const getBackgroundColor = (quantity) => {
    if (quantity < 5) {
      return 'red';
    } else if (quantity >= 5 && quantity <= 10) {
      return 'orange';
    } else {
      return '#51d633';
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

  const generarFactura = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/generarFactura', {
        nombre: 'Cliente',
        vendedor: 'JuanFernando',
        carrito: cart.map(item => ({ ...item, nombreProduct: item.nombreProduct || 'Nombre Desconocido' })),
      });

      const newArray = cart.map(item => [
        item.nombreProduct,
        item.codigoProduct,
        item.precioUni,
        item.proveedor
      ]);

      autoTable(doc, { html: '#my-table' });

      autoTable(doc, {
        head: [['nombreProduct', 'codigoProduct', 'precioUni', 'proveedor']],
        body: newArray
      });

      const totalVenta = getTotalSale();
      doc.text(`Total Venta: $${totalVenta.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

      doc.save('table.pdf');

      setCart([]);
      fetchData()
      btnCloseCart()
    } catch (error) {
      console.error(error);
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

  const addToCart = (product) => {
    // Verificar si la cantidad del producto es mayor que 0
    if (product.cantidad <= 0) {
      alert(`La cantidad del producto ${product.nombreProduct} debe ser mayor que 0.`);
      return;
    }
  
    // Buscar el producto en el carrito
    const existingItem = cart.find((item) => item.codigoProduct === product.codigoProduct);
  
    // Verificar si el producto ya está en el carrito
    if (existingItem) {
      // Verificar si la cantidad en el carrito más la nueva cantidad supera el stock
      if (existingItem.cantidad + 1 <= product.cantidad) {
        // Actualizar la cantidad del producto en el carrito
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.codigoProduct === product.codigoProduct
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        );
      } else {
        // Mostrar una alerta o mensaje indicando que no hay suficiente stock
        alert(`No hay suficiente stock para el producto ${product.nombreProduct}`);
      }
    } else {
      // Agregar el producto al carrito con cantidad 1
      setCart([...cart, { ...product, cantidad: 1 }]);
    }
  };
  


  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.codigoProduct !== product.codigoProduct));
  };

  const incrementQuantity = (product) => {
    const existingItem = cart.find((item) => item.codigoProduct === product.codigoProduct);

    if (existingItem && existingItem.cantidad < existingItem.stock) {
      setCart(
        cart.map((item) =>
          item.codigoProduct === product.codigoProduct ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      alert(`No hay suficiente stock para incrementar la cantidad del producto ${product.nombreProduct}`);
    }
  };

  const decrementQuantity = (product) => {
    const existingItem = cart.find((item) => item.codigoProduct === product.codigoProduct);

    // Verifica si el producto está en el carrito y si la cantidad no es 1 (límite mínimo)
    if (existingItem && existingItem.cantidad > 1) {
      setCart(
        cart.map((item) =>
          item.codigoProduct === product.codigoProduct ? { ...item, cantidad: item.cantidad - 1 } : item
        )
      );
    } else {
      // Muestra una alerta o mensaje indicando que la cantidad no puede ser menor a 1
      alert(`La cantidad mínima para el producto ${product.nombreProduct} es 1`);
    }
  };

  const btnCloseCart = () => {
    btnClose.current.className = 'cart card_hidden'
  }
  const btnOpenCart = () => {
    btnClose.current.className = 'cart card_visible'
  }

  const getTotalQuantity = () => cart.reduce((total, item) => total + item.cantidad, 0);

  const getTotalSale = () => cart.reduce((total, item) => total + item.cantidad * item.precioUni, 0);

  return (
    <>
      <ProductCreateModal isOpen={isCreateModalOpen} onRequestClose={closeCreateModal} />
      <ProductUpdateModal isOpen={isUpdateModalOpen} onRequestClose={closeUpdateModal} selectedProduct={selectedProduct} />

      <section>
        <FaCartPlus className='btnOpenCart' onClick={btnOpenCart} />
        <span className='cartCount'>{cart.length}</span>

        <div className="card" style={{ padding: '0 2em' }}>
          <DataTable value={visibleData} header={header} tableStyle={{ minWidth: '60rem', textAlign: 'center', border: '1px solid rgb(154, 154, 154)' }} paginator rows={15}>
            <Column
              style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
              header="Image"
              className='column'
              headerClassName='headerTable'
              body={(rowData) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    alt="Product"
                    src={`http://localhost:3001/${rowData.images}`}
                    style={{ padding: '.7em 0' }}
                    width={'100px'}
                  />
                  <FaCartPlus className='btnCardAdd' onClick={() => addToCart(rowData)} />
                </div>
              )}
            />
            <Column className='column' field="codigoProduct" header="CodigoProduct" headerClassName='headerTable' />
            <Column className='column' field="nombreProduct" header="NombreProduct" headerClassName='headerTable' />
            <Column className='column' field="precioUni" header="Precio Uni" headerClassName='headerTable' />
            <Column
              className='column'
              field="cantidad"
              header="Cantidad"
              headerClassName='headerTable'
              body={(rowData) => (
                <div style={{ backgroundColor: getBackgroundColor(rowData.cantidad), padding: '0.5em', borderRadius: '5px' }}>
                  {rowData.cantidad}
                </div>
              )}
            />
            <Column className='column' field="proveedor" header="Provedor" headerClassName='headerTable' />
            <Column className='column' field="tallas" header="Tallas" headerClassName='headerTable' />
            <Column className='column' field="categorias" header="Categorias" headerClassName='headerTable' style={{ textTransform: 'capitalize' }} />
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

        <div className="cart card_hidden" ref={btnClose}>
          <h2 style={{ fontSize: '2em', display: 'flex', alignContent: 'center' }}><FaCartPlus style={{ fontSize: '1em' }} />Cart</h2>
          <IoMdCloseCircle className='btnCloseCart' onClick={btnCloseCart} />
          <ul className='cardUl'>
            {cart.map((item) => (
              <li className='cartContainer' key={item.codigoProduct}>
                <img alt="Product" src={`http://localhost:3001/${item.images}`} style={{ padding: '.7em 0' }} width={'90px'} />
                <span style={{ width: '14ch' }}>{item.nombreProduct}</span>
                <div>
                  <span>Cantidad: {item.cantidad}</span>
                  <CiCircleMinus className='btnCardAdd' style={{ fontSize: '2em' }} onClick={() => decrementQuantity(item)} />
                  <CiCirclePlus className='btnCardAdd' style={{ fontSize: '2em' }} onClick={() => incrementQuantity(item)} />
                </div>
                <span>Precio: ${item.precioUni}</span>
                <MdDelete className='btnCardAdd' style={{ fontSize: '2em' }} onClick={() => removeFromCart(item)} />
              </li>
            ))}
          </ul>
          <div className='cartOptions'>
            <span>Total de Productos: {getTotalQuantity()}</span>
            <span>Total de Venta: ${getTotalSale()}</span>
          </div>
          <button className='btnFactura' onClick={generarFactura}>Generar Factura</button>
        </div>
      </section>

      <section>
        <Ventas />
      </section>
    </>
  );
};

