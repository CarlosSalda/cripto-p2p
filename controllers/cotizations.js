const service = require('../service/external/binance')
const Cotization = require('../model/Currency')
const COTIZATIONS_LIST = require('../model/CotizationsList')
const verifyToken = require('../webservice/tokenVerification.js')

const cotizations = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)

    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

    const response = []

    COTIZATIONS_LIST.forEach(async (currency) => {
      const price = await service.priceBinance(currency)
      console.log(price)
      response.push(new Cotization(price))
    })

    res.status(201).send(response)
    return response
  } catch (error) {
    console.log(error)
    res.status(500).send('Cotizations: Internal server error')
  }
}

module.exports = {
  cotizations
}
