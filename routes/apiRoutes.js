const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const welcome = require('./welcome')
const cotizationRoutes = require('./cotizations')

router.use(userRoutes)
router.use(welcome)
router.use(cotizationRoutes)

module.exports = router
