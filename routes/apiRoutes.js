const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const welcome = require('./welcome')
const cotizationRoutes = require('./cotizations')
const intentionRoutes = require('./intentions')

router.use(userRoutes)
router.use(welcome)
router.use(cotizationRoutes)
router.use(intentionRoutes)

module.exports = router
