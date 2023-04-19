const axios = require('axios')

const priceBinance = async (criptoName) => {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${criptoName}`)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

module.exports = {
  priceBinance
}
