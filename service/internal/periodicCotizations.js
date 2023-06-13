const redis = require('redis')
const { nanoid } = require('nanoid')

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
})
const Agenda = require('agenda')
const mongoConnectionString = process.env.MONGO_URL || ''

const agenda = new Agenda({ db: { address: mongoConnectionString } })
const COTIZATION_AGENDA_ID = 'cotization_' + nanoid()

const COTIZATION_UPDATE_FREQUENCY = process.env.COTIZATION_FREQUENCY_HOURS || 3600 // 1 hour
const REDIS_KEY = 'events'

let cotizationService = null

agenda.define(COTIZATION_AGENDA_ID, async (job) => {
  await saveCotization()
})

const startAgenda = async () => {
  await client.connect()
  await client.flushDb()
  await agenda.start()
  console.log('Agenda started')
  await agenda.every(`${COTIZATION_UPDATE_FREQUENCY} hours`, COTIZATION_AGENDA_ID)
}

client.on('error', err => console.log('Redis Client Error', err, {
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
}))

const setCotizationService = (service) => {
  cotizationService = service
}

const saveCotization = async () => {
  if (!cotizationService) return

  const cotizations = await cotizationService({}, responseMock)
  try {
    const tosave = {
      datetime: new Date(),
      cotization: cotizations
    }

    const len = await client.lLen(REDIS_KEY)
    if (len >= 24) {
      await client.rPop(REDIS_KEY)
    }

    await client.lPush(REDIS_KEY, JSON.stringify(tosave))
    console.log('New cotization pushed')
  } catch (e) {
    console.log('set error', e)
  }
}

const getLastDayCotizations = async () => {
  try {
    const cotizations = await client.lRange(REDIS_KEY, 0, -1)

    return cotizations.map(cotization => JSON.parse(cotization))
  } catch (e) {
    console.log('get errr', e)
  }
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
  getLastDayCotizations,
  setCotizationService
}
