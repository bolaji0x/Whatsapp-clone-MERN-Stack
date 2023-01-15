const Message = require("../models/Message");
const { StatusCodes } = require('http-status-codes')
const getMessages = async (req, res) => {
  
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        
      };
    });
    
    res.status(StatusCodes.OK).json({ projectedMessages });
  
};

const addMessage = async (req, res, next) => {
  
    const { from, to, message } = req.body;
    
    const newMessage = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    
    res.status(StatusCodes.CREATED).json({ newMessage });
};

module.exports = {addMessage, getMessages}
