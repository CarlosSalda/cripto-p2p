class Currency {
  constructor ({ symbol, price }) {
    this.symbol = symbol
    this.price = price
  }

  getName () {
    return this.symbol
  }

  getPrice () {
    return this.price
  }
}

module.exports = Currency
