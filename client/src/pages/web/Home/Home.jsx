import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';

import './customStyles.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filterCode, setFilterCode] = useState('');
    const [filterName, setFilterName] = useState('');
    const [cart, setCart] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const btnClose = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/getProducts');
            const productsWithStock = response.data.map((product) => ({ ...product, stock: product.cantidad }));
            setProducts(productsWithStock);
        } catch (error) {
            console.log(error);
        }
    };

    const filterData = (data) => {
        return data.filter(
            (item) =>
                item.codigoProduct.toLowerCase().includes(filterCode) &&
                item.nombreProduct.toLowerCase().includes(filterName)
        );
    };

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
        btnClose.current.className = 'cart card_hidden';
    };

    const btnOpenCart = () => {
        btnClose.current.className = 'cart card_visible';
    };

    const getTotalQuantity = () => cart.reduce((total, item) => total + item.cantidad, 0);
    const getTotalSale = () => cart.reduce((total, item) => total + item.cantidad * item.precioUni, 0);

    return (
        <>
            <section>
                <FaCartPlus className='btnOpenCart' onClick={btnOpenCart} />
                <span className='cartCount'>{cart.length}</span>

                <div className='products-container'>
                    {filterData(products).map((product) => (
                        <div key={product.codigoProduct} className='product-item'>
                            <img alt='Product' src={`http://localhost:3001/${product.images}`} width='100px' />
                            <div>
                                <h3>{product.nombreProduct}</h3>
                                <p>Precio: ${product.precioUni}</p>
                                <p>Stock: {product.stock}</p>
                            </div>
                            <button onClick={() => addToCart(product)}>Añadir al Carrito</button>
                        </div>
                    ))}
                </div>

                <div className='cart card_hidden' ref={btnClose}>
                    <IoMdCloseCircle className='btnCloseCart' onClick={btnCloseCart} />
                    <ul className='cardUl'>
                        {cart.map((item) => (
                            <li className='cartContainer' key={item.codigoProduct}>
                                <img alt='Product' src={`http://localhost:3001/${item.images}`} width={'90px'} />
                                <span style={{ width: '14ch' }}>{item.nombreProduct}</span>
                                <span>PrecioUni: ${item.precioUni}</span>
                                <div>
                                    <span>Cantidad: {item.cantidad}</span>
                                    <CiCircleMinus className='btnCardAdd' style={{ fontSize: '2em' }} onClick={() => decrementQuantity(item)} />
                                    <CiCirclePlus className='btnCardAdd' style={{ fontSize: '2em' }} onClick={() => incrementQuantity(item)} />
                                </div>
                                <MdDelete className='btnCardAdd' style={{ fontSize: '2em' }} onClick={() => removeFromCart(item)} />
                            </li>
                        ))}
                    </ul>
                    <div className='cartOptions'>
                        <span>Total de Productos: {getTotalQuantity()}</span>
                        <span>Total de Venta: ${getTotalSale().toFixed(2)}</span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
