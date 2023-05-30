const mongoose = require('mongoose')
const intentionSchema = mongoose.model('Intention')
const transactionSchema = mongoose.model('Transaction')
const userSchema = mongoose.model('User')

const { Intention } = require('../../model/Intention')
const { User } = require('../../model/User')

const intentionController = require('../../controllers/intention')
const userController = require('../../controllers/User')

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
      email: RandomData.email(),
      operationAmount: RandomData.number(5, 500),
      reputation: RandomData.number(0.1, 1),
      action: 'sell', // TODO: replace with real data?? 'sell' or 'buy
      type: RandomData.intentionType(),
      direction: 'buy',
      datetime: RandomData.date()
    })

    console.log('sample transaction added')
  }
}

const addUsers = async () => {
  for (let i = 0; i < 10; i++) {
    await userController.register({
      body: {
        name: RandomData.firstName(),
        surname: RandomData.lastName(),
        email: RandomData.email(),
        password: process.env.TEST_USER_PASSWORD,
        adress: RandomData.address(),
        cvu: '1234567890123456789012',
        criptoAdress: RandomData.cryptoAddress(),
        totalOperations: RandomData.number(20, 22), // TODO: replace with real operations data??
        completedOperations: RandomData.number(0, 20)
      }
    }, {
      status: () => {
        return {
          send: () => {}
        }
      }
    })
    console.log('sample user added')
  }
}

const init = async () => {
  try {
    //await addIntentions()
    //await addTransactions()
    await addUsers()
  } catch (error) {
    console.error('Initialization error:', error)
  }
}

module.exports = {
  init
}
