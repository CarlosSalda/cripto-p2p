// const mongoose = require('mongoose')
// const { Schema } = mongoose
const { describe, expect, test } = require('@jest/globals')
const EnumsAction = require('../../model/enums/actions')
const Enums = require('../../model/enums/cryptoactive')
const Transaction = require('../../model/Transaction')
// const request = require('supertest')
const axios = require('axios')

const sellerRandomData = {
  name: 'Bob',
  surname: 'Dylan',
  cvu: '1234567890123456789012',
  criptoAdress: '12345678'
}

const sellerTransaction = () => new Transaction(Enums.USDT, 50, 20, 10, sellerRandomData, 100, 5, EnumsAction.TRANSFER_DONE, true)
const buyerTransaction = () => new Transaction(Enums.USDT, 50, 20, 10, buyerRandomData, 100, 5, EnumsAction.RECEPTION_CONFIRMATION, false)
const cancelTransaction = () => new Transaction(Enums.USDT, 50, 20, 10, buyerRandomData, 100, 5, EnumsAction.CANCEL, false)

const buyerRandomData = {
  name: 'Bob2',
  surname: 'Dylan2',
  cvu: '1234567890123456781112',
  criptoAdress: '87654321'
}
describe('Transaction Process model tests', () => {
  describe(('Transaction properties'), () => {
    test('Prcess transaction succesfully for seller', async () => {
      const response = await axios.post('http://localhost:3000/api/transaction', sellerTransaction())

      expect(response.status).toBe(201)
      expect(response.data.message).toBe('Transaction created. Seller')
      expect(response.data.direction).toBe(sellerRandomData.cvu)
    })

    test('Prcess transaction succesfully for buyer', async () => {
      const response = await axios.post('http://localhost:3000/api/transaction', buyerTransaction())

      expect(response.status).toBe(201)
      expect(response.data.message).toBe('Transaction created. Buyer')
      expect(response.data.direction).toBe(buyerRandomData.criptoAdress)
    })

    test('Cancel transaction succesfully', async () => {
      const response = await axios.post('http://localhost:3000/api/transaction', cancelTransaction())

      expect(response.status).toBe(200)
      expect(response.data.message).toBe('Transaction canceled')
    })

    // test('Should return 400 when transaction is not valid', async () => {
    //   const changeTransaction = buyerTransaction()
    //   changeTransaction.cryptoAmount = -1
    //   const response = await axios.post('http://localhost:3000/api/transaction', )

    //   expect(response.status).toBe(400)
    // })
  })
})
