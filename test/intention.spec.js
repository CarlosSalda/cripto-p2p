const intentionModel = require('../model/Intention')
const INTENTIKONS_TYPE = require('../model/enums/intentions')
const SystemError = require('../model/errors/SystemError')
const System = require('../model/System')
const { describe, expect, test } = require('@jest/globals')
const FAKE_MARKET_VALUE = 10000

const mockShouldMarketDiffFail = jest.fn().mockImplementation((value) => Math.abs(FAKE_MARKET_VALUE - value))
jest.mock('../model/System', () => {
  return jest.fn().mockImplementation(() => {
    return { getPercentageDifferenceAgainstMarketValue: mockShouldMarketDiffFail }
  })
})

describe('Intention model tests', () => {
  describe(('Intention criptoName validation tests'), () => {
    test('Should return an error when numbers are used in criptoName', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('criptoName', '123')
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The criptoName must be only letters')
    })

    test('Should return and error when the criptoName is not on mayus', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('criptoName', 'cakeusdt')
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The criptoName must be only mayus')
    })
  })
  describe(('Intention amountCripto validation tests'), () => {
    test('Should return an error when the amountCripto is not a number', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('amountCripto', 'abc')
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The amountCripto must be only numbers')
    })

    test('Should return an error when the amountCripto is <= 0', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('amountCripto', 0)
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The amountCripto must be greater than 0')
    })
  })
  describe(('Intention valueCripto validation tests'), () => {
    test('Should return an error when the valueCripto is not a number', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('valueCripto', 'abc')
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The valueCripto must be only numbers')
    })

    test('Should return an error when the valueCripto is <= 0', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('valueCripto', 0)
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The valueCripto must be greater than 0')
    })
  })
  describe(('Intention amountPesos validation tests'), () => {
    test('Should return an error when the amountPesos is not a number', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('amountPesos', 'abc')
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The amountPesos must be only numbers')
    })

    test('Should return an error when the amountPesos is <= 0', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('amountPesos', 0)
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The amountPesos must be greater than 0')
    })
  })
  describe(('Intention userData validation tests'), () => {
    test('Should return an error when the userData is not only letter', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('userData', '123')
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The userData must be only letters')
    })
  })
  describe(('Intention type validation tests'), () => {
    test('Should return an error when the type is not BUY or SELL', () => {
      const intention = intentionModel.Intention.anyIntentionWithSpecificKey('type', '123')
      const validatedIntention = intentionModel.Intention.validateIntention(intention)

      expect(validatedIntention.error).toBe('The type must be only BUY or SELL')
    })
  })

  describe(('Intention creation'), () => {
    test('Should return an intention when all the fields are correct', () => {
      const intention = anyIntentionObject()
      const validatedIntention = intentionModel.Intention.validateIntention(intention)
      expect(validatedIntention).toBeInstanceOf(intentionModel.Intention)
      expect(validatedIntention.userData).toBe(intention.userData)
    })

    test('Should throw an error when intention price is not within 5% +/- of system price', () => {
      const intention = () => anyIntention(5000)

      expect(intention).toThrow(SystemError)
    })

    test('Should create intention successfully', () => {
      const intention = anyIntention(9995)

      expect(intention).toBeInstanceOf(intentionModel.Intention)
    })
  })

  describe(('Intention confirmation'), () => {
    test('Should confirm intention successfully', () => {
      mockShouldMarketDiffFail.mockClear()

      const system = new System()
      const intention = anyWellCreatedIntention(system)

      intention.confirmIntention()
      expect(system.getPercentageDifferenceAgainstMarketValue).toHaveBeenCalledTimes(2)
    })

    test('Should fail when confirm intention', () => {
      mockShouldMarketDiffFail.mockClear()

      const system = new System()
      const intention = anyWellCreatedIntention(system)
      intention.setAmountPesos(50)

      expect(() => intention.confirmIntention(system)).toThrow(SystemError)
    })
  })
})

const anyIntentionObject = () => {
  return {
    criptoName: 'CAKEUSDT',
    amountCripto: 1000,
    valueCripto: 5,
    amountPesos: 5000,
    userData: 'Pedro Gomez',
    type: INTENTIKONS_TYPE.SELL
  }
}

const anyIntention = (value) => {
  const intentionData = anyIntentionObject()
  intentionData.amountPesos = value
  const intention = new intentionModel.Intention(intentionData, new System())
  return intention
}

const anyWellCreatedIntention = (system) => {
  const intentionData = anyIntentionObject()
  intentionData.amountPesos = 9995
  const intention = new intentionModel.Intention(intentionData, system)
  return intention
}
