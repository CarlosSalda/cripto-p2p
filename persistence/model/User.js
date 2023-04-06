const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  adress: String,
  password: String,
  cvu: String,
  criptoAdress: String
})

mongoose.model('User', userSchema, 'Users')
