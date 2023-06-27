const axios = require('axios')

const priceBinance = async (criptoName) => {
  try {
    if (process.env.ENVIRONMENT === 'production') {
      const response = fakeBinanceResponse(criptoName)
      return response
    }
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${criptoName}`)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

const fakeBinanceResponse = (criptoName) => {
  return {
    symbol: criptoName,
    price: '10000.00000000'
  }
}

module.exports = {
  priceBinance
}
