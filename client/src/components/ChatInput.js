import React, { useState } from 'react'
import { BiHappyAlt, BiSend } from "react-icons/bi";
import { FaPaperclip } from "react-icons/fa";
import Picker from "emoji-picker-react";
const ChatInput = ({ handleSendMsg }) => {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };

    const sendChat = (event) => {
      event.preventDefault();
      if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
      }
    };
  return (
    
    <>
      <div className='message-form-container'>
        
            <form className='message-form' onSubmit={(event) => sendChat(event)}>
            <div className='left-mf'>
              <button><BiHappyAlt className='mf-btn lmf-btn' onClick={handleEmojiPickerhideShow} /></button>
              <button><FaPaperclip className='mf-btn lmf-btn' /></button>
            </div>
            <div className='right-mf'>
              <textarea
                type='text'
                placeholder='Type a message'
                className='mf-input'
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              >
              </textarea>
              <button type='submit'><BiSend className='mf-btn rmf-btn' /></button>
            </div>
            </form>
           <div className='emoji-container'>
            {showEmojiPicker &&
            <Picker height={400} width='100%' className='emoji-modal' onEmojiClick={(emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)} />}
          </div>
        
        


      </div>
    </>
    
  )
}

export default ChatInput