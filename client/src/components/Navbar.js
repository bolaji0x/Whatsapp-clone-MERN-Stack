import React from 'react'
import { BiUserCircle, BiLoaderCircle, BiMessageDetail, BiDotsVerticalRounded } from "react-icons/bi";
import {BsPeople} from "react-icons/bs";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navbar-container'>
      <div className='nav-content'>
        <div>
          <Link to='/'><BiUserCircle className='user-icon' /></Link>
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