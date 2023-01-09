const express = require('express')
const router = express.Router()

const rateLimiter = require('express-rate-limit')
/*
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

*/
const {
  addContact,
  searchContact
} = require('../controllers/userController')

router.route('/search').get(searchContact)

router.route('/add/:id').patch(addContact)

module.exports = router
