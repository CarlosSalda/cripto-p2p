const PriceError = require('../model/errors/PriceError')
const Price = require('../model/Price')

const { describe, expect, test } = require('@jest/globals')

describe('Price model tests', () => {
  describe(('Price value'), () => {
    test('Should set Price value to 15.23.', () => {
      anyPrice.setValue(15.23)

      expect(anyPrice.getValue()).toEqual(15.23)
    })

    test('Should throw a PriceError when price value is less than 0.', () => {
      const negativeValueSetter = () => anyPrice.setValue(-24)

      expect(negativeValueSetter).toThrow(PriceError)
    })
  })

  describe(('Datetime'), () => {
    test('Should return current datetime when create a new Price', () => {
      const newPrice = createANewPrice()

      expect(newPrice.getDate().getTime() === new Date().getTime()).toBeTruthy()
    })
  })
})

const anyPrice = new Price('USDT', new Date(), 25.99)
const createANewPrice = () => new Price('USDT', new Date(), 25.99)
