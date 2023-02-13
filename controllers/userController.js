const User = require ('../models/User')
const { StatusCodes } = require ('http-status-codes')
const { BadRequestError } = require('../errors')

const addContact = async (req, res) => {
    if(req.user.userId !== req.params.id) {
        const currentUser = await User.findById(req.user.userId);
        if (!currentUser.contacts.includes(req.params.id)) {
            const user = await User.findOneAndUpdate({_id: req.user.userId}, {
                $push: {contacts: req.params.id}
            }, {new: true})
        
            const token = user.createJWT()
            res.status(StatusCodes.OK).json({ user, token, location: user.location })
        } else {
            throw new BadRequestError('User already added to your contacts');
        }
    } else {
        throw new BadRequestError(`You can't add yourself to contacts`);
    }
    
}

/*
const addContact = async (req, res) => {
    const user = await User.findOneAndUpdate({_id: req.user.userId}, {
        $push: {contacts: req.params.id}
    }, {new: true})
  
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
*/

const searchContact = async (req, res) => {
    const contacts = await User.find({name: {$regex: req.query.name}}).limit(10).select("name")
              
    res.status(StatusCodes.OK).json({ contacts })
      
}

const getAllContacts = async (req, res) => {
    const users = await User.findOne({ _id: req.user.userId }).populate('contacts');
    res.status(StatusCodes.OK).json({ users: users.contacts, location: users.location });
  }

module.exports = {
    addContact,
    searchContact,
    getAllContacts
}
