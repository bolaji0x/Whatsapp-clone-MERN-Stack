import React, { useEffect, useRef, useState } from 'react'
import { TestImg } from '.'
import { BiSearchAlt2, BiDotsVerticalRounded } from "react-icons/bi";
import background from '../assets/images/bg.png'
import ChatInput from './ChatInput';
import { useAppContext } from '../context/appContext';


const ChatContainer = ({currentChat, socket}) => {
  const { user, getMessages, projectedMessages, createMsg} = useAppContext()
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  
    useEffect(() => {
      getMessages({
        from: user?._id,
        to: currentChat._id,
      })
      
      // eslint-disable-next-line 
    }, [currentChat, messages])
  

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await user?._id;
      }
    };
    getCurrentChat();
    // eslint-disable-next-line 
  }, [currentChat]);
    

  const handleSendMsg = async (msg) => {
    
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user?._id,
      msg,
    });
    
    createMsg({
      from: user?._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours < 12 ? 'am ' : 'pm'}`;
    
  }
  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [projectedMessages]);


  

  return (
    <>
    <div>
      <div className='msgs-container'>
        <header className='nav-msgs-container'>
          <nav className='msgs-header'>
            <div className='lmsgs-flex'>
              <TestImg />
              <h4 className='navm-name'>{currentChat.name}</h4>
            </div>
            <div className='rmsgs-flex'>
                <button><BiSearchAlt2 className='rm-btn' /></button>
                <button><BiDotsVerticalRounded className='rm-btn' /></button>
            </div>
          </nav>
        </header>

        <div className='messages'>
          <div  style={{ backgroundImage: `url(${background})` }} className='msgs-content' >
          {projectedMessages.map((item) => {
            const { _id ,fromSelf, message, createdAt } = item
            console.log(createdAt)
            return (
              <div  key={_id}>
                <div  className={`${
                    fromSelf ? "sent" : "received"
                  }`} >
                  <div  className='each-message'>
                    <p className='each-text'>{message}</p>
                    <p className='each-time'>{formatDate(createdAt)}</p>
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={scrollRef} />
          </div>
    
        </div>
      
      </div>
        
      <div className='input-container'>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
    </>
  )
}

export default ChatContainer