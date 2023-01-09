import React from 'react'
import { Navbar } from '../../components'
import { Outlet } from 'react-router-dom'
import Chat from './Chat'
import { Messages } from '.'
const SharedLayout = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard-mobile'>
        <Navbar />
        <Outlet />
      </div>
      <div className='dashboard-page'>
        <Messages />
      </div>
    </div>
  )
}

export default SharedLayout