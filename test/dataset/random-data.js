const { User } = require('../../model/User')
const CRIPTO_NAMES = require('../../model/enums/cryptoactive')
const INTENTION_TYPE = require('../../model/enums/intentions')
const crypto = require('crypto')

const number = (min, max) => {
  if (min >= max) {
    throw new Error('min must be less than max')
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('min and max must be numeric values')
  }

  const getRandomNumber = (min, max) => {
    const range = max - min + 1
    const randomBytes = crypto.randomBytes(4)
    const randomNumber = Math.floor(
      randomBytes.readUInt32BE(0) / (Math.pow(2, 32) / range)
    )

    return randomNumber + min
  }

  return Math.floor(getRandomNumber(0, 1) * (max - min)) + min
}

const criptoName = () => {
  const keys = Object.keys(CRIPTO_NAMES)
  const index = number(0, keys.length)
  return CRIPTO_NAMES[keys[index]]
}

const fullname = () => firstName() + ' ' + lastName()

const user = () => new User({ name: firstName(), surname: lastName(), email: email(), adress: address(), cvu: number(10000000, 99999999), criptoAdress: cryptoAddress(), totalOperations: number(20, 22), completedOperations: number(0, 20) })

const firstName = () => {
  const names = [
    'Marcelo',
    'Jose',
    'Marta',
    'Francisca',
    'Esther',
    'Horacio'
  ]

  const index = number(0, names.length - 1)
  return names[index]
}

const lastName = () => {
  const lastnames = [
    'Gomez',
    'Borghi',
    'Cassano',
    'Velazquez',
    'Rodriguez',
    'Williams'
  ]

  const index = number(0, lastnames.length - 1)
  return lastnames[index]
}

const email = () => {
  const firstPart = [
    'Hi',
    'World',
    'This',
    'Is',
    'My',
    'RandomMail'
  ]

  const secondPart = [
    'World',
    'Second',
    '_552',
    '-Gamer',
    'helloeveryone',
    'testingsecondpart'
  ]

  const domain = [
    '@gmail.com',
    '@hotmail.com',
    '@yahoo.com',
    '@outlook.com',
    '@duckduckgo.com',
    '@binance.com'
  ]

  const index1 = number(0, firstPart.length - 1)
  const index2 = number(0, secondPart.length - 1)
  const index3 = number(0, domain.length - 1)

  return firstPart[index1] + secondPart[index2] + domain[index3]
}

const intentionType = () => {
  const isBuy = number(0, 2) === 1
  return isBuy ? INTENTION_TYPE.BUY : INTENTION_TYPE.SELL
}

const address = () => {
  const addresses = [
    'Calle 123 3322',
    'Calle falsa 123',
    'Rodo 232 esq espora'
  ]

  const index = number(0, addresses.length - 1)
  console.log('getting address', addresses[index])
  return addresses[index]
}

const cryptoAddress = () => {
  const addresses = [
    '0xasdas2',
    '0x212321',
    '0x125sad'
  ]

  const index = number(0, addresses.length - 1)
  return addresses[index]
}

const date = () => {
  const dates = [
    '2023-05-20T00:00:00.000Z',
    '2023-05-21T00:00:00.000Z',
    '2023-05-22T00:00:00.000Z',
    '2023-05-23T00:00:00.000Z'
  ]
  const randomIndex = number(0, dates.length - 1)

  return dates[randomIndex]
}

module.exports = {
  criptoName,
  number,
  fullname,
  firstName,
  lastName,
  address,
  cryptoAddress,
  email,
  intentionType,
  user,
  date
}
