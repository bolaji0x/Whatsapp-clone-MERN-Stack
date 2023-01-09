const express = require('express')
const router = express.Router()

const {
    addMessage,
    getMessages
} = require('../controllers/msgController')


router.route('/addmsg').post(addMessage)
router.route('/getmsg').post(getMessages)


module.exports = router
