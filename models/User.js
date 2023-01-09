const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
    ],
    name: {
        type: String,
        unique: true,
        trim: true,
        unique: true,
        required: [true, 'Pls provide a name'],
        minlength: 3,
        maxlength: 15
    },
    phoneNo: {
      type: Number,
      required: [true, 'Please provide phone number'],
      maxlength: 14,
      minlength: 14
    },
    password: {
        type: String,
        required: [true, 'Pls input your password'],
        minlength: 5
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city',
    },
    about: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'busy',
    },
    contacts: [{type: mongoose.Types.ObjectId, ref: 'User'}],

})

UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths())
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, contacts: this.contacts }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })
  }
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }

  module.exports = mongoose.model('User', UserSchema)