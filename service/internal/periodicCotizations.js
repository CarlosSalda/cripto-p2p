const redis = require('redis')

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
})
const Agenda = require('agenda')
const mongoConnectionString = process.env.MONGO_URL || ''

const agenda = new Agenda({ db: { address: mongoConnectionString } })

const cotizationsController = require('../../controllers/cotizations')

const COTIZATION_UPDATE_FREQUENCY = process.env.COTIZATION_FREQUENCY || 3600 // 1 hour
const REDIS_KEY = 'cotizations'

agenda.define('Start Cotization Service', async (job) => {
  await saveCotization()
})

const startAgenda = async () => {
  await client.connect()
  await agenda.start()
  console.log('Agenda started')
  await agenda.every(`${COTIZATION_UPDATE_FREQUENCY} seconds`, 'Start Cotization Service')
}

client.on('error', err => console.log('Redis Client Error', err, {
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
}))

console.log('COTIZATION_UPDATE_FREQUENCY', COTIZATION_UPDATE_FREQUENCY)

const saveCotization = async () => {
  const cotizations = await cotizationsController.cotizations({}, responseMock)
  console.log('cotizations', cotizations)
  await client.set(REDIS_KEY, cotizations)
  console.log('cotization saved in redis', cotizations)
}

const getLastDayCotizations = async () => {
  const cotizations = await client.get(REDIS_KEY)
  console.log(cotizations)
}

const responseMock = {
  status: () => {
    return {
      send: () => {}
    }
  }
}

module.exports = {
  startAgenda,
  getLastDayCotizations
}
