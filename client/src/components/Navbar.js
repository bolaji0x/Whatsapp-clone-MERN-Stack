import React from 'react'
import { BiUserCircle, BiLoaderCircle, BiMessageDetail, BiDotsVerticalRounded } from "react-icons/bi";
import {BsPeople} from "react-icons/bs";
const Navbar = () => {
  return (
    <div className='navbar-container'>
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
  )
}

export default Navbar