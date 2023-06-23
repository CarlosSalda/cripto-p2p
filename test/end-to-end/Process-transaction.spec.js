const { describe, expect, test } = require('@jest/globals')
const EnumsAction = require('../../model/enums/actions')
const Enums = require('../../model/enums/cryptoactive')
const Intentions = require('../../model/enums/intentions')
const axios = require('axios')

const sellerRandomData = {
  email: 'Hitestingsecondpart@binance.com',
  cvu: '1234567890123456789012'
}

const buyerRandomData = {
  email: 'Hitestingsecondpart@binance.com',
  criptoAdress: '0xasdas2'
}

const dataSellerTransaction = {
  cryptoActive: Enums.USDT,
  nominalAmount: 50,
  cotization: 20,
  operationValue: 10,
  userEmail: sellerRandomData.email,
  operationAmount: 100,
  action: EnumsAction.TRANSFER_DONE,
  type: Intentions.SELL
}

const dataBuyerTransaction = {
  cryptoActive: Enums.USDT,
  nominalAmount: 50,
  cotization: 20,
  operationValue: 10,
  userEmail: buyerRandomData.email,
  operationAmount: 100,
  action: EnumsAction.RECEPTION_CONFIRMATION,
  type: Intentions.BUY
}

const dataCancelTransaction = {
  cryptoActive: Enums.USDT,
  nominalAmount: 50,
  cotization: 20,
  operationValue: 10,
  userEmail: buyerRandomData.email,
  operationAmount: 100,
  action: EnumsAction.CANCEL,
  type: Intentions.BUY
}

const baseUrl = process.env.TEST_ENDPOINT_BASE || 'http://localhost:3000'

describe('Transaction Process model tests', () => {
  describe(('Transaction properties'), () => {
    test('Prcess transaction succesfully for seller', async () => {
      const response = await axios.post(`${baseUrl}/api/transaction`, dataSellerTransaction)

      expect(response.status).toBe(201)
      expect(response.data.message).toBe('Transaction created. Seller')
    })

    test('Prcess transaction succesfully for buyer', async () => {
      const response = await axios.post(`${baseUrl}/api/transaction`, dataBuyerTransaction)

      expect(response.status).toBe(201)
      expect(response.data.message).toBe('Transaction created. Buyer')
    })

    test('Cancel transaction succesfully', async () => {
      const response = await axios.post(`${baseUrl}/api/transaction`, dataCancelTransaction)

      expect(response.status).toBe(200)
      expect(response.data.message).toBe('Transaction canceled')
    })
  })
})
