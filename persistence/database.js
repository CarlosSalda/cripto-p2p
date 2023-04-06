const mongoose = require('mongoose')
require('./model/User')

const MONGO_URL = process.env.MONGO_URL
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URL)
