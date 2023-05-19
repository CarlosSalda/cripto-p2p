const mongoose = require('mongoose')
const transactionSchema = mongoose.model('Transaction')
const { User } = require('../model/User')

const doTransaction = async (req, res) => {
  try {
    const transactionData = req.body
    const direction = () => {
      if (transactionData.action === 'buy') return User.validateCryptoAdress(transactionData.direction)
      else if (transactionData.action === 'sell') return User.validateCvu(transactionData.direction)
    }

    transactionData.direction = direction()

    await transactionSchema.create(transactionData)

    res.status(201).send('Transaction created')
  } catch (error) {
    if (error.name === 'ValueError') res.status(400).send(`${error.message}`)
    else if (error.name === 'UserError') res.status(400).send(`${error.message}`)
    else res.status(500).send('Internal server error')
  }
}

module.exports = {
  doTransaction
}
