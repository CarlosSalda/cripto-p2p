const service = require('../service/external/binance')
const Cotization = require('../model/Currency')
const COTIZATIONS_LIST = require('../model/CotizationsList')

const cotizations = async (req, res) => {
  try {
    const response = []

    for (const currency of COTIZATIONS_LIST) {
      const price = await service.priceBinance(currency)
      response.push(new Cotization(price))
    }

    res.status(201).send(response)
  } catch (error) {
    res.status(500).send('Cotizations: Internal server error')
  }
}

module.exports = {
  cotizations
}
