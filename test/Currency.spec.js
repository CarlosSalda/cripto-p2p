const Currency = require('../model/Currency')
const { describe, expect, test } = require('@jest/globals')

describe('Currency model tests', () => {
  describe(('Currency properties'), () => {
    test('Should return a price of 50', () => {
      const currency = anyCurrency()

      expect(currency.getPrice()).toBe(anyCurrencyValue)
    })

    test('Should return USDT as name', () => {
      const currency = anyCurrency()

      expect(currency.getName()).toBe(anyCurrencySymbol)
    })
  })
})

const anyCurrencySymbol = 'USDT'
const anyCurrencyValue = 50

const anyCurrency = () => {
  return new Currency({ symbol: anyCurrencySymbol, price: anyCurrencyValue })
}
