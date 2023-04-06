const axios = require('axios')

const getDolarValues = async () => {
  try {
    const response = await axios.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

const getDolarBlue = async () => {
  try {
    const data = await getDolarValues()
    return data.find((dolar) => dolar.casa.nombre === 'Dolar Blue')
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

module.exports = {
  getDolarValues,
  getDolarBlue
}
