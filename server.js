require('dotenv').config()

const express = require('express')
const app = express()
require('./persistence/database')
require('./aspects')

const apiRoutes = require('./routes/apiRoutes')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')
const sampleDataSet = require('./test/dataset/test-dataset')
const periodicCotizations = require('./service/internal/periodicCotizations')

const corsOptions = {
  origin: process.env.BASE_URL
}

// Sample dataset
if (process.env.ENVIRONMENT === 'production') sampleDataSet.init().then(console.log('Data Loaded')).catch(console.log('Data Failed'))

// Api
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.url === '/') {
    return res.redirect('/api')
  }
  next()
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors(corsOptions))
app.use('/api', apiRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server running on port ' + port)
  periodicCotizations.startAgenda()
})

module.exports = app
