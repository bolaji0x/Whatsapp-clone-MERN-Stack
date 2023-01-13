import React, { useEffect, useRef, useState } from 'react'
import { TestImg } from '.'
import { BiSearchAlt2, BiDotsVerticalRounded } from "react-icons/bi";
import background from '../assets/images/bg.png'
import ChatInput from './ChatInput';
import { useAppContext } from '../context/appContext';
import { v4 as uuidv4 } from "uuid";

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
  }, [messages]);


  

  return (
    <>
    <div className='msgs-container'>
      <nav className='nav-msgs-container'>
        <div className='lmsgs-flex'>
          <TestImg />
          <h4 className='navm-name'>{currentChat.name}</h4>
        </div>
        <div className='rmsgs-flex'>
            <button><BiSearchAlt2 className='rm-btn' /></button>
            <button><BiDotsVerticalRounded className='rm-btn' /></button>
        </div>
      </nav>

      <div style={{ backgroundImage: `url(${background})` }} className='msgs-content'>
        {projectedMessages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`${
                  message.fromSelf ? "sent" : "received"
                }`}>
                <div className='each-message'>
                  <p className='each-text'>{message.message}</p>
                  <p className='each-time'>8:34PM</p>
                </div>
              </div>
            </div>
          )
        })}
          

      </div>
      
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>

    
    </>
  )
}

export default ChatContainer