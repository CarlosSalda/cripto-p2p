const express = require('express')
const router = express.Router()
const transactionControllers = require('../controllers/transaction.js')

router.post('/transaction', transactionControllers.doTransaction)

module.exports = router
