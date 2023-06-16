const service = require('../service/external/binance')
const Cotization = require('../model/Currency')
const COTIZATIONS_LIST = require('../model/CotizationsList')
const verifyToken = require('../webservice/tokenVerification.js')

const periodicCotizationsService = require('../service/internal/periodicCotizations')

const cotizations = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)

    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

    const response = []

    await COTIZATIONS_LIST.forEach(async (currency) => {
      const price = await service.priceBinance(currency)
      response.push(new Cotization(price))
    })

    res.status(201).send(response)
    return response
  } catch (error) {
    console.log(error)
    res.status(500).send('Cotizations: Internal server error')
  }
}

periodicCotizationsService.setCotizationService(cotizations)

const lastCotizations = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)

    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

    const response = await periodicCotizationsService.getCotizations()

    res.status(201).send(response)
    return response
  } catch (error) {
    console.log(error)
    res.status(500).send('Cotizations: Internal server error')
  }
}

const lastDayCotizations = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)

    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

    const response = await periodicCotizationsService.getLastDayCotizations(req.query.currency)

    res.status(201).send(response)
    return response
  } catch (error) {
    console.log(error)
    res.status(500).send('Cotizations: Internal server error')
  }
}

module.exports = {
  cotizations,
  lastCotizations,
  lastDayCotizations
}
