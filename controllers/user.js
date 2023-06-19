const mongoose = require('mongoose')
const userSchema = mongoose.model('User')
const { User } = require('../model/User')
const jsonWebToken = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

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

const login = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email.toString(), password: req.body.password.toString() })
    let token = ''

    if (!user) {
      return res.status(400).send('Invalid email or password')
    } else {
      const payload = {
        id: user.id
      }

      token = jsonWebToken.sign(payload, secret, { expiresIn: '24h' })
    }

    res.status(200).send({
      message: 'Login successful',
      token
    })
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}

module.exports = {
  register,
  login
}
