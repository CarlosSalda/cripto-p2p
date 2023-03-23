const ValueError = require('./errors/PriceError')

class Price {
  constructor (cryptoactive, datetime, cValue) {
    this.cryptoactive = cryptoactive
    this.datetime = datetime
    this.cValue = cValue
  }

  setValue (cValue) {
    if (cValue < 0) throw new ValueError('Negative values are not allowed')
    this.cValue = cValue
  }

  getValue () {
    return this.cValue
  }

  getDate () {
    return this.datetime
  }
}

module.exports = Price
