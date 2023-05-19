const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  datetime: Date,
  criptoName: String,
  amountCripto: Number,
  valueCripto: Number,
  amountPesos: Number,
  userData: String,
  userEmail: String,
  type: String
})

mongoose.model('Intention', userSchema, 'Intentions')
