const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const welcome = require('./welcome')

router.use(userRoutes)
router.use(welcome)

module.exports = router
