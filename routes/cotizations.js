const express = require('express')
const router = express.Router()
const cotizationsController = require('../controllers/cotizations')

router.get('/cotizations', cotizationsController.cotizations)
router.get('/lastcotizations', cotizationsController.lastCotizations)

module.exports = router
