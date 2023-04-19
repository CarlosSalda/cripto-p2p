const ValueError = require('./errors/PriceError')

class Report {
  constructor (datetime, usdAmount, arsAmount, criptoactives) {
    this.datetime = datetime
    this.usdAmount = usdAmount
    this.arsAmount = arsAmount
    this.criptoactives = criptoactives
  }

  setDatetime (datetime) {
    this.datetime = datetime
  }

  getDatetime () {
    return this.datetime
  }

  setUsdAmount (amount) {
    if (amount < 0) throw new ValueError('operationAmount can be less than 0')

    this.usdAmount = amount
  }

  getUsdAmount () {
    return this.usdAmount
  }

  setArsAmount (amount) {
    if (amount < 0) throw new ValueError('operationAmount can be less than 0')

    this.arsAmount = amount
  }

  getArsAmount () {
    return this.arsAmount
  }

  addCriptoactive (active, nominalAmount, cotization, arsCotization) {
    this.criptoactives.push({ criptoActive: active, nominalAmount, cotization, arsCotization })
  }

  getCriptoactives () {
    return this.criptoactives
  }

  setCriptoactivesList (criptoactives) {
    this.criptoactives = criptoactives
  }
}

module.exports = Report
