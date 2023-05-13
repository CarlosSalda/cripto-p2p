const CRIPTO_NAMES = require('../../model/enums/cryptoactive')
const INTENTION_TYPE = require('../../model/enums/intentions')

const number = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const criptoName = () => {
  const keys = Object.keys(CRIPTO_NAMES)
  const index = number(0, keys.length)
  return CRIPTO_NAMES[keys[index]]
}

const name = () => {
  const names = [
    'Marcelo',
    'Jose',
    'Marta',
    'Francisca',
    'Esther',
    'Horacio'
  ]

  const lastnames = [
    'Gomez',
    'Borghi',
    'Cassano',
    'Velazquez',
    'Rodriguez',
    'Williams'
  ]

  const index1 = number(0, names.length)
  const index2 = number(0, lastnames.length)
  return names[index1] + ' ' + lastnames[index2]
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

  const index1 = number(0, firstPart.length)
  const index2 = number(0, secondPart.length)
  const index3 = number(0, domain.length)

  return firstPart[index1] + secondPart[index2] + domain[index3]
}

const intentionType = () => {
  const isBuy = number(0, 2) === 1
  return isBuy ? INTENTION_TYPE.BUY : INTENTION_TYPE.SELL
}

module.exports = {
  criptoName,
  number,
  name,
  email,
  intentionType
}
