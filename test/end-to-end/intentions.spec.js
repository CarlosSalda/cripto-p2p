const { describe, expect, test } = require('@jest/globals')
const axios = require('axios')

const URL_BASE = process.env.TEST_ENDPOINT_BASE || 'http://localhost:3000'

const randomIntention = {
  datetime: '2022-10-31T09:00:00Z',
  cryptoName: 'USDT',
  amountCrypto: 200,
  valueCripto: 1.05,
  amountPesos: 7500,
  userData: 'John Doe',
  userEmail: 'johndoe@gmail.com',
  type: 'Compra'
}

describe('End to end tests', () => {
  describe(('Intentions endpoints'), () => {
    test('Create an intention', async () => {
      const response = await axios.post(URL_BASE + '/api/intentions', randomIntention)

      expect(response.status).toBe(201)
      expect(response.data).toBe('Intention created')
    })

    test('Get intentions', async () => {
      const response = await axios.get(URL_BASE + '/api/intentions')

      expect(response.status).toBe(200)
    })
  })
})
