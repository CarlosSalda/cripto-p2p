const express = require('express')
const router = express.Router()
const operationsController = require('../controllers/operations')

router.get('/operations', operationsController.userOperations)

module.exports = router
