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

const COTIZATION_UPDATE_FREQUENCY = process.env.COTIZATION_FREQUENCY_MINUTES || 10 // 1 hour
const REDIS_KEY = 'events'
const REDIS_KEY_LIST = 'events_list'

let cotizationService = null

agenda.define(COTIZATION_AGENDA_ID, async (job) => {
  await saveCotization()
  await setLast24HoursCotizations()
})

const startAgenda = async () => {
  await client.connect()
  await client.flushDb()
  await agenda.start()
  console.log('Agenda started')
  await agenda.every(`${COTIZATION_UPDATE_FREQUENCY} seconds`, COTIZATION_AGENDA_ID)
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

  const cotizations = await cotizationService({}, responseMock, true)
  try {
    const tosave = {
      datetime: new Date(),
      cotization: cotizations
    }

    await client.set(REDIS_KEY, JSON.stringify(tosave))

    console.log('New cotization cached')
  } catch (e) {
    console.log('cache saving error', e)
  }
}

const setLast24HoursCotizations = async (currency) => {
  if (!cotizationService) return

  const cotizations = await cotizationService({}, responseMock, true)
  try {
    const tosave = {
      datetime: new Date(),
      cotization: cotizations
    }

    const len = await client.lLen(REDIS_KEY_LIST)
    if (len >= 24) {
      await client.rPop(REDIS_KEY_LIST)
    }

    await client.lPush(REDIS_KEY_LIST, JSON.stringify(tosave))

    console.log('New cotization pushed')
  } catch (e) {
    console.log('last cotization pushing error', e)
  }
}

const getCotizations = async () => {
  try {
    const cotization = await client.get(REDIS_KEY)

    return JSON.parse(cotization)
  } catch (e) {
    console.log('get errr', e)
  }
}

const getLastDayCotizations = async (currency) => {
  try {
    const cotizations = await client.lRange(REDIS_KEY_LIST, 0, -1)

    return cotizations.map(cotization => {
      const parsedCotization = JSON.parse(cotization)
      parsedCotization.cotization = parsedCotization.cotization.filter(c => c.symbol === currency)
      return parsedCotization
    })
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
  setCotizationService,
  getCotizations,
  setLast24HoursCotizations
}
