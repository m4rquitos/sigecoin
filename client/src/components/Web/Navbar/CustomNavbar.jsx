import React, { useState, useEffect } from 'react';
import logo from '../../../assets/svg/logo_icon1.png';
import login from '../../../assets/svg/login.svg';
import calzalogo from '../../../assets/jpg/calzalogo.jpeg';
import './CustomNavbar.css'; // Estilos CSS para el Navbar

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
          <img src={login} alt="" width="50" height="50" />
        </div>
      </div>
      <div className='style'>
        <div className= "d-flex justify-content-center align-items-center text-center vh-100" style={{backgroundImage: "linear-gradient(rgb(3, 246, 226), rgb(5, 202, 241), rgb(11, 3, 242))", flexDirection: "column"}}>
          <div className="d-flex justify-content-center align-items-center">
            <img src={logo} alt="Sigecoin" className='sigelogo' />
          <img src={calzalogo} alt="CalzaAlbert" className='calzalogo' />
          </div>
          
          <p>
¡Bienvenido a Calzado Albert Sport en convenio con Sigecoin!

Sumérgete en el mundo del calzado con estilo y calidad. En nuestra tienda en línea, encontrarás una amplia gama de zapatos que combinan la moda y el confort. Desde zapatillas deportivas de última generación hasta elegantes modelos para ocasiones especiales, ¡aquí encontrarás lo que necesitas!

Explora nuestro catálogo y descubre las últimas tendencias en calzado que se adaptan a tu estilo de vida. Con la colaboración de Sigecoin, ofrecemos una experiencia de compra segura y conveniente para que encuentres el par perfecto desde la comodidad de tu hogar.

¡Prepárate para dar pasos con confianza y estilo!</p>
        </div>

      </div>
    </div>
  );
};

export default CustomNavbar;



