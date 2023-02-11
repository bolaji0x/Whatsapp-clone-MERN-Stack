import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
const ContactsContainer = ({users, changeChat}) => {

  const { user } = useAppContext()
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
      setCurrentUserName(user?.name)
      // eslint-disable-next-line
    }, [currentUserName])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };


  return (
    <>
      <div className='allcontacts-container'>
        {users.map((contact, index) => {
          return (
          <Link 
            key={contact._id} 
            className={`contacts-content ${
              index === currentSelected ? "selected" : ""
            }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            
          <div className='cc-img'><img alt={contact.name} className='profile-img' src={contact.images[0].url} /></div>
            <div className='cc-name-time'>
              <div className='cc-name-msg-grid'>
                <h4 className='cc-name'>{contact.name}</h4>
                <p className='cc-msg'>{contact.about}</p>
              </div>

              <div className='time-cont'>
                <p className='cc-time'></p>
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