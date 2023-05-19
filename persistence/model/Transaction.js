const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
  cryptoActive: String,
  nominalAmount: Number,
  cotization: Number,
  operationValue: Number,
  fullNameUser: String,
  operationAmount: Number,
  reputation: Number,
  action: String,
  type: String,
  direction: String
})

mongoose.model('Transaction', transactionSchema, 'Transactions')
