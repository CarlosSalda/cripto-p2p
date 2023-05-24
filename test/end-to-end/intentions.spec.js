const { describe, expect, test } = require('@jest/globals')
const axios = require('axios')

const URL_BASE = 'http://localhost:3000'

const randomIntention = {
  criptoName: 'USDT',
  amountCripto: 200,
  valueCripto: 1.05,
  amountPesos: 7500,
  userData: 'John Doe',
  type: 'Compra',
  userEmail: 'johndoe@gmail.com'
}

describe('End to end tests', () => {
  describe(('Intentions endpoints'), () => {
    test('Create an intention', async () => {
      const response = await axios.post(URL_BASE + '/api/intentions', randomIntention)

      expect(response.status).toBe(201)
      expect(response.data).toBe('Intention created')

      // intentionSchema.deleteOne({ userEmail: randomIntention.userEmail }, function (err) { console.log('error deleting test intention', err) })
    })

    test('Get intentions', async () => {
      const response = await axios.get(URL_BASE + '/api/intentions')

      expect(response.status).toBe(200)
      // expect(response.data.message).toBe('Transaction canceled')
    })
  })
})
