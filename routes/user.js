const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.js')

// router.get('/users', userControllers.getUsers)
router.post('/register', userControllers.register)

module.exports = router
