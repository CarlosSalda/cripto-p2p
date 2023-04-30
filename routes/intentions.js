const express = require('express')
const router = express.Router()
const intentionsController = require('../controllers/intention')

router.get('/intentions', intentionsController.createIntention)

module.exports = router
