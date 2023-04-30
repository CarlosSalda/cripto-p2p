const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  criptoName: String,
  amountCripto: Number,
  valueCripto: Number,
  amountPesos: Number,
  userData: String,
  type: String
})

mongoose.model('Intention', userSchema, 'Intentions')
