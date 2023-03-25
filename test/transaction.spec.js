const PriceError = require('../model/errors/PriceError')
const Transaction = require('../model/Transaction')
const Enums = require('../model/enums/cryptoactive')
const EnumsAction = require('../model/enums/actions')

const { describe, expect, test } = require('@jest/globals')
const { User } = require('../model/User')

describe('Transaction model tests', () => {
  describe(('Cryptoactive'), () => {
    test('Should set cryptoactive to solana.', () => {
      const transaction = anyTransaction()
      transaction.setCryptoactive(Enums.SOLANA)

      expect(transaction.getCryptoactive()).toEqual(Enums.SOLANA)
    })
  })

  describe(('Nominal amount'), () => {
    test('Should set nominalAmount to 30.', () => {
      const transaction = anyTransaction()
      transaction.setNominalAmount(30)

      expect(transaction.getNominalAmount()).toEqual(30)
    })
  })

  describe(('Cotization'), () => {
    test('Should set cotization to 10.', () => {
      const transaction = anyTransaction()
      transaction.setCotization(10)

      expect(transaction.getCotization()).toEqual(10)
    })

    test('Should throw an error when cotization is less than 0', () => {
      const transaction = anyTransaction()
      const negativeValueSetter = () => transaction.setCotization(-24)

      expect(negativeValueSetter).toThrow(PriceError)
    })
  })

  describe(('Operation value'), () => {
    test('Should set operation value to 33.', () => {
      const transaction = anyTransaction()
      transaction.setOperationValue(33)

      expect(transaction.getOperationValue()).toEqual(33)
    })

    test('Should throw an error when operation value is less than 0', () => {
      const transaction = anyTransaction()
      const negativeValueSetter = () => transaction.setOperationValue(-24)

      expect(negativeValueSetter).toThrow(PriceError)
    })
  })

  describe(('User'), () => {
    test('Should set user correctly.', () => {
      const transaction = anyTransaction()
      const user = new User(randomUserData)

      transaction.setUser(user)

      expect(transaction.getUser()).toEqual(user)
    })
  })

  describe(('Operation amount'), () => {
    test('Should set operation amount to 15.', () => {
      const transaction = anyTransaction()
      transaction.setOperationAmount(15)

      expect(transaction.getOperationAmount()).toEqual(15)
    })

    test('Should throw an error when operation value is less than 0', () => {
      const transaction = anyTransaction()
      const negativeValueSetter = () => transaction.setOperationAmount(-24)

      expect(negativeValueSetter).toThrow(PriceError)
    })
  })

  describe(('Reputation'), () => {
    test('Should set reputation to 5.', () => {
      const transaction = anyTransaction()
      transaction.setReputation(5)

      expect(transaction.getReputation()).toEqual(5)
    })

    test('Should throw an error when reputation is less than 0', () => {
      const transaction = anyTransaction()
      const negativeValueSetter = () => transaction.setReputation(-24)

      expect(negativeValueSetter).toThrow(PriceError)
    })
  })

  describe(('Address'), () => {
    test('Should return user address', () => {
      const transaction = anyTransaction()
      const address = transaction.getUser().address

      transaction.setBuyOperation()

      expect(transaction.getAddress()).toEqual(address)
    })

    test('Should return user CVU', () => {
      const transaction = anyTransaction()
      const cvu = transaction.getUser().cvu

      transaction.setSellOperation()

      expect(transaction.getAddress()).toEqual(cvu)
    })
  })

  describe(('Actions'), () => {
    test('Should set and return Action transfer_done.', () => {
      const transaction = anyTransaction()
      transaction.setAction(EnumsAction.TRANSFER_DONE)
      expect(transaction.getAction()).toEqual(EnumsAction.TRANSFER_DONE)
    })

    test('Should set and return Action Cancel.', () => {
      const transaction = anyTransaction()
      transaction.setAction(EnumsAction.CANCEL)
      expect(transaction.getAction()).toEqual(EnumsAction.CANCEL)
    })

    test('Should set and return Action RECEPTION_CONFIRMED.', () => {
      const transaction = anyTransaction()
      transaction.setAction(EnumsAction.RECEPTION_CONFIRMED)
      expect(transaction.getAction()).toEqual(EnumsAction.RECEPTION_CONFIRMED)
    })
  })
})

const randomUserData = {
  name: 'Bob',
  surname: 'Dylan',
  email: 'bobdylan@gmail.com',
  adress: 'Calle falsa 123',
  password: 'Aa1234567!',
  cvu: '1234567890123456789012',
  criptoAdress: '12345678'
}
const anyUser = new User(randomUserData)
const anyTransaction = () => new Transaction(Enums.USDT, 50, 20, 10, anyUser, 100, 5, EnumsAction.TRANSFER_DONE, true)
