import { useState, useEffect } from 'react';
import axios from 'axios';

import './stylesVentas.css'

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [filteredVentas, setFilteredVentas] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isFilteringByDate, setIsFilteringByDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [isFilterByDatePressed, setIsFilterByDatePressed] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/factura`);
            const ventasData = response.data.response;
            setVentas(ventasData);

            if (isFilteringByDate && isFilterByDatePressed) {
                const todaySales = filterSalesByDate(ventasData, new Date(selectedDate));
                setFilteredVentas(todaySales);
            } else {
                setFilteredVentas(ventasData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isFilteringByDate, selectedDate, isFilterByDatePressed]);

    const filterSalesByMonth = (sales, month) => {
        return sales.filter((venta) => {
            const fechaVenta = venta.fecCompra.$date ? new Date(venta.fecCompra.$date) : new Date(venta.fecCompra);
            return fechaVenta.getMonth() + 1 === month;
        });
    };

    const filterSalesByDate = (sales, date) => {
        return sales.filter((venta) => {
            if (!venta.fecCompra) {
                console.error('Campo fecCompra indefinido:', venta);
                return false;
            }
            const fechaVenta = venta.fecCompra.$date ? new Date(venta.fecCompra.$date) : new Date(venta.fecCompra);
            if (isNaN(fechaVenta.getTime())) {
                console.error('Fecha de venta inválida:', venta.fecCompra);
                return false;
            }
            const dateString = date.toISOString().split('T')[0];
            const ventaDateString = fechaVenta.toISOString().split('T')[0];
            return dateString === ventaDateString;
        });
    };

    const handleFilterByMonth = () => {
        if (selectedMonth === '') {
            setFilteredVentas(ventas);
        } else {
            const filteredSales = filterSalesByMonth(ventas, parseInt(selectedMonth, 10));
            setFilteredVentas(filteredSales);
        }
        setIsFilteringByDate(false);
    };

    const handleFilterByDate = () => {
        setIsFilterByDatePressed(true);
        setIsFilteringByDate(true);
    };

    return (
        <>
            <div className='ventaInfo'>
                <label htmlFor="selectMonth">Seleccionar Mes: </label>
                <select
                    id="selectMonth"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
                <button onClick={handleFilterByMonth}>Filtrar por Mes</button>

                <label htmlFor="selectDate">Seleccionar Fecha: </label>
                <input
                    type="date"
                    id="selectDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <button onClick={handleFilterByDate}>Filtrar por Fecha</button>

                <span>Ventas Totales: {filteredVentas.length}</span>
            </div>

            <div className='containerVentas' style={{ width: '100vw' }}>

                {filteredVentas.length === 0 ? (
                    <p>No se encontraron ventas para la fecha seleccionada.</p>
                ) : (
                    <div className='containerVentas' style={{ width: '100vw' }}>
                        {filteredVentas.map((venta) => (
                            <ul className='venta' key={venta._id}>
                                <p><b>Código de Venta: </b> {venta.codigoCompra}</p>
                                <p><b>Fecha Venta: </b>{venta.fecCompra}</p>
                                <p><b>Vendedor: </b>{venta.vendedor}</p>
                                <p><b>Total:</b> {venta.total}</p>
                                <h2>Productos Compra:</h2>
                                <ul>
                                    {venta.productos.map((producto) => (
                                        <li className='productoVenta' key={producto._id}>
                                            <p><b>Código del Producto: </b>{producto.codigoProduct}</p>
                                            <p><b>Nombre del Producto:</b> {producto.nombreProduct}</p>
                                            <p><b>Precio Unitario: </b>{producto.precioUni}</p>
                                            <p><b>Cantidad:</b> {producto.cantidad}</p>
                                        </li>
                                    ))}
                                </ul>
                            </ul>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Ventas;
