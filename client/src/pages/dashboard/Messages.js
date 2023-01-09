import React from 'react'
import { TestImg } from '../../components'
import { BiSearchAlt2, BiDotsVerticalRounded } from "react-icons/bi";
import background from '../../assets/images/bg.png'
const Messages = () => {
  return (
    <>
    <div className='msgs-container'>
      <nav className='nav-msgs-container'>
        <div className='lmsgs-flex'>
          <TestImg />
          <h4 className='navm-name'>Anas</h4>
        </div>
        <div className='rmsgs-flex'>
            <button><BiSearchAlt2 className='rm-btn' /></button>
            <button><BiDotsVerticalRounded className='rm-btn' /></button>
        </div>
      </nav>

      <div style={{ backgroundImage: `url(${background})` }} className='msgs-content'>
          <div className='each-message'>
            <p className='each-text'>I'm texting yo'm texting yo'm texting yo'm textiI'm texting yo'mextiI'm texting yo'm texting yo'm texting yo'm textiI'm texting yo'm texting yo'm texting yo'm textiI'm texting yo'm texting yo'm texting yo'm texting you</p>
            <p className='each-time'>8:34PM</p>
          </div>
      </div>
    </div>
    </>
  )
}

export default Messages