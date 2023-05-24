const mongoose = require('mongoose')
require('./model/User')
require('./model/Intention')
require('./model/Operations')
require('./model/Transaction')

const MONGO_URL = process.env.MONGO_URL
mongoose.Promise = global.Promise

mongoose.connect(MONGO_URL).then(
  console.log('Connected to MongoDB')
).catch((error) => {
  console.log(error)
})
