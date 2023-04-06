const express = require('express')
const router = express.Router()
const welcomeController = require('../controllers/welcome.js')

router.get('/', welcomeController.getWelcomeMessage)

module.exports = router
