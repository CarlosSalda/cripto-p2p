const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  adress: String,
  password: String,
  cvu: String,
  criptoAdress: String,
  completedOperations: Number,
  totalOperations: Number
})

mongoose.model('User', userSchema, 'Users')
