const mongoose = require('mongoose')
const intentionSchema = mongoose.model('Intention')
const transactionSchema = mongoose.model('Transaction')
const userSchema = mongoose.model('User')

const { Intention } = require('../../model/Intention')
const Transaction = require('../../model/Transaction')
const { User } = require('../../model/User')

const RandomData = require('./random-data')

const addIntentions = async () => {
  for (let i = 0; i < 10; i++) {
    await intentionSchema.create(new Intention({
      criptoName: RandomData.criptoName(),
      amountCripto: RandomData.number(5, 500),
      valueCripto: RandomData.number(0.5, 12.5),
      amountPesos: RandomData.number(100, 9999),
      userData: RandomData.fullname(),
      userEmail: RandomData.email(),
      type: RandomData.intentionType()
    }))

    console.log('sample intention added')
  }
}

const addTransactions = async () => {
  for (let i = 0; i < 10; i++) {
    await transactionSchema.create({
      cryptoActive: RandomData.criptoName(),
      nominalAmount: RandomData.number(5, 500),
      cotization: RandomData.number(0.5, 12.5),
      operationValue: RandomData.number(100, 9999),
      fullNameUser: RandomData.fullname(),
      operationAmount: RandomData.number(5, 500),
      reputation: RandomData.number(0.1, 1),
      action: 'sell', // TODO: replace with real data?? 'sell' or 'buy
      type: RandomData.intentionType(),
      direction: 'buy'
    })

    console.log('sample transaction added')
  }
}

const addUsers = async () => {
  for (let i = 0; i < 10; i++) {
    await userSchema.create(new User({
      name: RandomData.firstName(),
      surname: RandomData.lastName(),
      email: RandomData.email(),
      adress: RandomData.address(),
      cvu: RandomData.number(10000000, 99999999),
      criptoAdress: RandomData.cryptoAddress(),
      totalOperations: RandomData.number(20, 22), // TODO: replace with real operations data??
      completedOperations: RandomData.number(0, 20)
    }))

    console.log('sample user added')
  }
}

const init = () => {
  addIntentions()
  addTransactions()
  addUsers()
}

module.exports = {
  init
}
