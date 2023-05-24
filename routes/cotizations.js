const express = require('express')
const router = express.Router()
const cotizationsController = require('../controllers/cotizations')

router.get('/cotizations', cotizationsController.cotizations)

module.exports = router
