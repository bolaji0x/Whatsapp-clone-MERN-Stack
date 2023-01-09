import React from 'react'
import { TestImg } from '../components'
const ContactsContainer = () => {
  return (
    <>
      <div className='contacts-container'>
        <div className='contacts-content'>
          <div className='cc-img'><TestImg /></div>

          <div className='cc-name-time'>
            <div className='cc-name-msg-grid'>
              <h4 className='cc-name'>my dad</h4>
              <p className='cc-msg'>Testing this text sting this tex right now</p>
            </div>

            <div className='time-cont'>
              <p className='cc-time'>5:56PM</p>
            </div>
          </div>
        </div>
        

      </div>
    </>
  )
}

export default ContactsContainer