const express = require('express')
const router = express.Router()
const cotizationsController = require('../controllers/cotizations')

router.get('/cotizations', cotizationsController.cotizations)
router.get('/lastcotization', cotizationsController.lastCotizations)
router.get('/lastdaycotizations', cotizationsController.lastDayCotizations)

module.exports = router
