import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import { useAppContext } from '../../context/appContext'
import {SearchContainer, ContactsContainer, Welcome, ChatContainer} from '../../components'
import { BiUserPlus } from "react-icons/bi";
import { Link } from 'react-router-dom';

const host = "http://localhost:5000"

const Chat = () => {
  const { getAllContacts, user, users } = useAppContext()

  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);


  useEffect(() => {
    if(user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user])

  useEffect(() => {
    getAllContacts()
    // eslint-disable-next-line
  }, [user])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
    <div className='dashboard'>
      <div className='homepage-container'>
        <SearchContainer />
        <ContactsContainer users={users} changeChat={handleChatChange} />

        <Link to='/addcontact' className='add-contact-btn'><BiUserPlus className='contact-plus-btn' /></Link>
      </div>

      <div className='dashboard-page'>
        {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
      </div>
    </div>
    </>
  )
}

export default Chat