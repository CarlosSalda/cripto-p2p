require('dotenv').config()

const express = require('express')
const app = express()
require('./persistence/database')
const apiRoutes = require('./routes/apiRoutes')
const cors = require('cors')

const corsOptions = {
  origin: process.env.BASE_URL
}

// Api
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  if (req.url === '/') {
    return res.redirect('/api')
  }
  next()
})

app.use(cors(corsOptions))
app.use('/api', apiRoutes)

// app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
const port = process.env.PORT || 3000
app.listen(port)
