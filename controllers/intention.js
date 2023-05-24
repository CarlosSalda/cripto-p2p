const intentionModel = require('../model/Intention')
const mongoose = require('mongoose')
const intentionSchema = mongoose.model('Intention')
const userSchema = mongoose.model('User')
const { User } = require('../model/User')
const system = require('../model/System')

const createIntention = async (req, res) => {
  try {
    const intentionData = {
      datetime: req.body.datetime,
      cryptoname: req.body.cryptoName,
      amountCrypto: req.body.amountCrypto,
      valueCripto: req.body.valueCripto,
      amountPesos: req.body.amountPesos,
      userData: req.body.userData,
      userEmail: req.body.userEmail,
      type: req.body.type
    }
    const intention = new intentionModel.Intention(intentionData, system)

    await intentionSchema.create(intention)

    res.status(201).send('Intention created')
  } catch (error) {
    res.status(500).send('Intentions creation: Internal server error: ' + error.message)
  }
}

const getIntentions = async (req, res) => {
  try {
    const intentions = await intentionSchema.find({})
    const users = await userSchema.find({})

    const response = []

    for (const intention of intentions) {
      const parsedIntention = new intentionModel.Intention(intention)

      const user = getUserReputation(users, parsedIntention.userEmail)
      if (!user) continue // to avoid crashes, skip if we don't find the user

      const parsedUser = new User(user)

      parsedIntention.reputation = parsedUser.getReputation()

      response.push(parsedIntention)
    }

    res.status(200).send(response)
  } catch (error) {
    res.status(500).send('Intentions getting: Internal server error: ' + error.message)
  }
}

const getUserReputation = (users, email) => {
  for (const user of users) {
    console.log('user', user, 'target email', email)
    if (user.email === email) return user
  }
}

module.exports = {
  createIntention,
  getIntentions
}
