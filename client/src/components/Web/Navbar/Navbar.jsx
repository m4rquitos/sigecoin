import React from 'react'
import { StickyNav } from 'react-js-stickynav'
import logo from '../../../assets/svg/logo_icon1.png'
import login from '../../../assets/svg/login.svg'
import calzalogo from '../../../assets/jpg/calzalogo.jpeg'


const CustomNavbar = () => {
  const style = () => {
    return (
      <style jsx>{`
        .nav {
          transition: all 0.1s linear;
          position: fixed;
          z-index: 2000;
          padding: 15px;
          display: flex;
          align-items: center;
        }
        .scrollNav {
          transition: all 0.5s ease-in;
          z-index: 2000;
          background: #ffffff;
          width: 100%;
          border-bottom: 1px solid #dddddd;
        }
        .style {
          padding-top: 80px;
          
        }
      `}</style>
    )
  }
  return (
    <div>
      {style()}
      <StickyNav length='40'> 
      <img src={logo} alt="" width="70" height="70" />
        navabar
      <img src={login} alt="" width="50" height="50" />

        </StickyNav>
      <div className='style'>
        <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(rgb(3, 246, 226),rgb(5, 202, 241),rgb(11, 3, 242))" }}>
          <img src={logo} alt="Sigecoin" width="400" height="400"/>
          <img src={calzalogo} alt="CalzaAlbert" width="600" height="400" className='calzalogo' style={{'borderRadius':'15px'}}/>

        </div>
      </div>
    </div>
  )
}

export default CustomNavbar


