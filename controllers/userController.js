const User = require ('../models/User')
const { StatusCodes } = require ('http-status-codes')

const addContact = async (req, res) => {
    const {id: contactId} = req.params
    const myAccount = await User.find({_id: contactId, contacts: req.user.userId})
  
    if(myAccount.length > 0) return res.status(500).json({msg: "You added this user to your contact list."})

  
    const user = await User.findOneAndUpdate({_id: req.user.userId}, {
        $push: {contacts: contactId}
    }, {new: true})
  
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}


const searchContact = async (req, res) => {
    const users = await User.find({name: {$regex: req.query.name}}).limit(10).select("name")
              
    res.status(StatusCodes.OK).json({ users })
      
}

const getAllUsers = async (req, res) => {
    const users = await User.findOne({ _id: req.user.userId }).populate('contacts');
    res.status(StatusCodes.OK).json({ users: users.contacts, location: users.location });
  }

module.exports = {
    addContact,
    searchContact,
    getAllUsers
}
