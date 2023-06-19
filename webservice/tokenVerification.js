const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY
const mongoose = require('mongoose')
const userSchema = mongoose.model('User')

const verifyToken = async (req, res) => {
  if (process.env.ENVIRONMENT === 'development') return { message: 'Valid token', status: 200 }
  const token = req.headers.authorization || null
  console.log('token:', token)
  if (!token) {
    return {
      message: 'Unauthorized',
      status: 401
    }
  }

  try {
    const decoded = jwt.verify(token, secret)

    await userSchema.findOne({ id: decoded.id })

    return {
      message: 'Valid token',
      id: decoded.id,
      status: 200
    }
  } catch (error) {
    return {
      message: 'Invalid token',
      status: 403,
      error
    }
  }
}

module.exports = verifyToken
