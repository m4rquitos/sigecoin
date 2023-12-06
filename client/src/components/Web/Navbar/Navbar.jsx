import React from 'react'
import { StickyNav } from 'react-js-stickynav'
import cardlogo from '../../../assets/jpg/cardlogo.jpg'
import logo from '../../../assets/svg/logo_icon1.png'
import login from '../../../assets/svg/login.svg'


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
        insert your Navbar Component here
      <img src={login} alt="" width="50" height="50" />

        </StickyNav>
      <div className='style'>
        <img src={cardlogo} alt="" />
      </div>
    </div>
  )
}

export default CustomNavbar


