const redis = require('redis')
var { nanoid } = require("nanoid");

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
})
const Agenda = require('agenda')
const mongoConnectionString = process.env.MONGO_URL || ''

const agenda = new Agenda({ db: { address: mongoConnectionString } })
const COTIZATION_AGENDA_ID = 'cotization_' + nanoid()
const RESET_DATA_AGENDA_ID = 'cotization_reset_' + nanoid() 
const cotizationsController = require('../../controllers/cotizations')

const COTIZATION_UPDATE_FREQUENCY = process.env.COTIZATION_FREQUENCY || 3600 // 1 hour
const COTIZATION_RESET_UPDATE_FREQUENCY = process.env.RESET_FREQUENCY_HOURS || 24 // 1 hour
const REDIS_KEY = 'cotizations'

agenda.define(AGENDA_ID, async (job) => {
  await saveCotization()
})

const startAgenda = async () => {
  await client.connect()
  await agenda.start()
  console.log('Agenda started', AGENDA_ID)
  await agenda.every(`${COTIZATION_UPDATE_FREQUENCY} seconds`, COTIZATION_AGENDA_ID)
  await agenda.every(`${COTIZATION_RESET_UPDATE_FREQUENCY} hours`, RESET_DATA_AGENDA_ID)
}

client.on('error', err => console.log('Redis Client Error', err, {
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
}))

const saveCotization = async () => {
  const cotizations = await cotizationsController.cotizations({}, responseMock)
  console.log('cotizations to save', cotizations)
  try {
    const tosave = {
      datetime: new Date(),
      cotization: cotizations
    }
    await client.set(REDIS_KEY, JSON.stringify(tosave))
  } catch (e)
  {
    console.log('set error', e)
  }
 
}

const getLastDayCotizations = async () => {
  const cotizations = await client.get(REDIS_KEY)
  console.log('saved cotizations', cotizations)
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
