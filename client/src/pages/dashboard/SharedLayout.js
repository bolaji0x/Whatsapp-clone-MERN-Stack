import React from 'react'
import { Navbar } from '../../components'
import { Outlet } from 'react-router-dom'
import Chat from './Chat'

const SharedLayout = () => {
  return (
    <>
      <div className=''>
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default SharedLayout