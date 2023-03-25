const ValueError = require('./errors/PriceError')

class Transaction {
  constructor (cryptoactive, nominalAmount, cotization, operationValue, user, operationAmount, reputation, action, isBuying) {
    this.cryptoactive = cryptoactive
    this.nominalAmount = nominalAmount
    this.cotization = cotization
    this.operationValue = operationValue
    this.user = user
    this.operationAmount = operationAmount
    this.reputation = reputation
    this.action = action
    this.isBuying = isBuying
  }

  setCryptoactive (cryptoactive) {
    this.cryptoactive = cryptoactive
  }

  getCryptoactive () {
    return this.cryptoactive
  }

  setNominalAmount (nominalAmount) {
    this.nominalAmount = nominalAmount
  }

  getNominalAmount () {
    return this.nominalAmount
  }

  setCotization (cotization) {
    if (cotization < 0) throw new ValueError('Cotization value cant be a negative value')
    this.cotization = cotization
  }

  getCotization () {
    return this.cotization
  }

  setOperationValue (operationValue) {
    if (operationValue < 0) throw new ValueError('operationValue can be less than 0')

    this.operationValue = operationValue
  }

  getOperationValue () {
    return this.operationValue
  }

  setUser (user) {
    this.user = user
  }

  getUser () {
    return this.user
  }

  setOperationAmount (operationAmount) {
    if (operationAmount < 0) throw new ValueError('operationAmount can be less than 0')

    this.operationAmount = operationAmount
  }

  getOperationAmount () {
    return this.operationAmount
  }

  setReputation (reputation) {
    if (reputation < 0) throw new ValueError('Reputation can be less than 0')

    this.reputation = reputation
  }

  getReputation () {
    return this.reputation
  }

  getAddress () {
    return this.isBuying ? this.user.address : this.user.cvu
  }

  setAction (action) {
    this.action = action
  }

  getAction () {
    return this.address
  }

  setBuyOperation () {
    this.isBuying = true
  }

  setSellOperation () {
    this.isBuying = false
  }
}

module.exports = Transaction
