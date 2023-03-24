const PriceError = require('../model/errors/PriceError')
const Price = require('../model/Price')
const Enums = require('../model/enums/cryptoactive')

const { describe, expect, test } = require('@jest/globals')

describe('Price model tests', () => {
  describe(('Price value'), () => {
    test('Should set Price value to 15.23.', () => {
      const price = anyPrice()
      price.setValue(15.23)

      expect(price.getValue()).toEqual(15.23)
    })

    test('Should throw a PriceError when price value is less than 0.', () => {
      const price = anyPrice()
      const negativeValueSetter = () => price.setValue(-24)

      expect(negativeValueSetter).toThrow(PriceError)
    })
  })

  describe(('Datetime'), () => {
    test('Should return current datetime', () => {
      const price = anyPrice()
      price.setDate(new Date())

      expect(price.getDate().getTime() === new Date().getTime()).toBeTruthy()
    })
  })

  describe(('Criptocurrency'), () => {
    test('Should return USDC as currency type', () => {
      const price = anyPrice()
      price.setCryptoactive(Enums.Solana)

      expect(price.getCryptoactive()).toEqual(Enums.Solana)
    })
  })
})

const anyPrice = () => new Price(Enums.USDT, new Date(), 25.99)
