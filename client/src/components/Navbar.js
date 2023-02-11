import React from 'react'
import { BiUserCircle, BiLoaderCircle, BiMessageDetail, BiDotsVerticalRounded } from "react-icons/bi";
import {BsPeople} from "react-icons/bs";
const Navbar = () => {
  return (
    <nav className='navbar-container'>
      <div className='nav-content'>
        <div>
          <button><BiUserCircle className='user-icon' /></button>
        </div>
        <div>
          <button><BsPeople className='nav-icon' /></button>
          <button><BiLoaderCircle className='nav-icon' /></button>
          <button><BiMessageDetail className='nav-icon' /></button>
          <button><BiDotsVerticalRounded className='nav-icon' /></button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar