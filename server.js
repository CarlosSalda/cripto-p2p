require('dotenv').config()

const express = require('express')
const app = express()
require('./persistence/database')
const apiRoutes = require('./routes/apiRoutes')
const cors = require('cors')

// Api
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/api', apiRoutes)

// app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
const port = process.env.PORT || 3000
app.listen(port)
