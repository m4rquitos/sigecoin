import React, { useState, useEffect } from 'react';
import logo from '../../../assets/svg/logo_icon1.png';
import login from '../../../assets/svg/login.svg';
import calzalogo from '../../../assets/jpg/calzalogo.jpeg';
import './CustomNavbar.css'; // Estilos CSS para el Navbar
import { Link } from "react-router-dom";


const CustomNavbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Función para manejar el evento de scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={isSticky ? 'nav scrollNav' : 'nav'}>
        <img src={logo} alt="" width="70" height="70" />
        <h1>Sigecoin</h1> 
        <div>
        <Link to='/login' className="btn btn-secondary">
                alert('Sesión Cerrada');
          <img src={login} alt="" width="50" height="50" /></Link>
        </div>
      </div>
      <div className='style'>
        <div className= "d-flex justify-content-center align-items-center text-center vh-100" style={{backgroundImage: "linear-gradient(rgb(3, 246, 226), rgb(5, 202, 241), rgb(11, 3, 242))", flexDirection: "column"}}>
          <div className="d-flex justify-content-center align-items-center">
            <img src={logo} alt="Sigecoin" className='sigelogo' />
            <img src={calzalogo} alt="CalzaAlbert" className='calzalogo' />
          </div>
          <p className='initial'>
          ¡Descubre en Calzado Albert Sport en convenio con Sigecoin. Con una amplia selección de calzado de moda y comodidad ! Encuéntranos en Garzón Huila en el local 367 de la Galeria frente al bingo.
            <a href="https://maps.app.goo.gl/WJn4CGukNdzeLnNn8" target="_blank" rel="noopener noreferrer">Punto físico</a> <br />
            O comunícate con nosotros al WhatsApp: +57 3142051265
           ¡Prepárate para caminar con estilo y confianza! <br />
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;


