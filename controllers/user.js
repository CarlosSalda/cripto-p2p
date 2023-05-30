const mongoose = require('mongoose')
const userSchema = mongoose.model('User')
const { User } = require('../model/User')

const register = async (req, res) => {
  try {
    const validatedUser = User.validateUser(req.body)
    await userSchema.create(validatedUser)
    res.status(201).send('User created')
  } catch (error) {
    if (error.name === 'UserError') res.status(400).send(`${error.message}`)
    else res.status(500).send('Internal server error')
  }
}

module.exports = {
  register
}
