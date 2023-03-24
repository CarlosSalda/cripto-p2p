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
const anyTransaction = () => new Transaction(Enums.USDT, 50, 20, 10, anyUser, 100, 5, '0x111a1123d12', EnumsAction.transferDone)
