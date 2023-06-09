const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const welcome = require('./welcome')
const cotizationRoutes = require('./cotizations')
const intentionRoutes = require('./intentions')
const transaction = require('./process-transaction')
const operationRoutes = require('./operations')

router.use(userRoutes)
router.use(welcome)
router.use(cotizationRoutes)
router.use(intentionRoutes)
router.use(transaction)
router.use(operationRoutes)

module.exports = router
