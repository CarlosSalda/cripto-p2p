const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.js')

router.post('/register', userControllers.register)
router.post('/login', userControllers.login)
router.get('/users', userControllers.getUsers)

module.exports = router
