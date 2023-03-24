class Transaction {
  constructor (cryptoactive, nominalAmount, cotization, operationValue, user, operationAmount, reputation, address, action) {
    this.cryptoactive = cryptoactive
    this.nominalAmount = nominalAmount
    this.cotization = cotization
    this.operationValue = operationValue
    this.user = user
    this.operationAmount = operationAmount
    this.reputation = reputation
    this.address = address
    this.action = action
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
    this.cotization = cotization
  }

  getCotization () {
    return this.cotization
  }

  setOperationValue (operationValue) {
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
    this.operationAmount = operationAmount
  }

  getOperationAmount () {
    return this.operationAmount
  }

  setReputation (reputation) {
    this.reputation = reputation
  }

  getReputation () {
    return this.reputation
  }

  setAddress (address) {
    this.address = address
  }

  getAddress () {
    return this.address
  }

  setAction (action) {
    this.action = action
  }

  getAction () {
    return this.address
  }
}

module.exports = Transaction
