const mongoose = require('mongoose')
require('./model/User')
require('./model/Intention')
require('./model/Operations')
require('./model/Transaction')

const MONGO_URL = process.env.MONGO_URL
mongoose.Promise = global.Promise

async function connectToDatabase () {
  try {
    await mongoose.connect(MONGO_URL)

    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
  }
}

connectToDatabase()
