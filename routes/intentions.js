const express = require('express')
const router = express.Router()
const intentionsController = require('../controllers/intention')

router.post('/intentions', intentionsController.createIntention)
router.get('/intentions', intentionsController.getIntentions)

module.exports = router
