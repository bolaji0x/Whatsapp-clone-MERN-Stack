import React, { useEffect, useState } from 'react'
import { TestImg } from '../components'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
const ContactsContainer = ({users, changeChat}) => {

  const { user } = useAppContext()
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
      setCurrentUserName(user?.name)
      // eslint-disable-next-line
    }, [])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };


  return (
    <>
      <div className='contacts-container'>
        {users.map((contact, index) => {
          return (
          <Link 
            key={contact._id} 
            className='contacts-content' 
            onClick={() => changeCurrentChat(index, contact)}
          >
            
            <div className='cc-img'><img className='profile-img' src={contact.images[0].url} /></div>
            <div className='cc-name-time'>
              <div className='cc-name-msg-grid'>
                <h4 className='cc-name'>{contact.name}</h4>
                <p className='cc-msg'>Testing this text sting this tex right now</p>
              </div>

              <div className='time-cont'>
                <p className='cc-time'>5:56PM</p>
              </div>
          </div>
          </Link>
          )
        })}
        
        

      </div>
    </>
  )
}

export default ContactsContainer