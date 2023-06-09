const intentionModel = require('../model/Intention')
const mongoose = require('mongoose')
const intentionSchema = mongoose.model('Intention')
const userSchema = mongoose.model('User')
const { User } = require('../model/User')
const system = require('../model/System')
const verifyToken = require('../webservice/tokenVerification.js')

const createIntention = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)
    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }
    const intentionData = {
      datetime: req.body.datetime.toString(),
      cryptoname: req.body.cryptoName.toString(),
      amountCrypto: req.body.amountCrypto.toString(),
      valueCripto: req.body.valueCripto.toString(),
      amountPesos: req.body.amountPesos.toString(),
      userData: req.body.userData.toString(),
      userEmail: req.body.userEmail.toString(),
      type: req.body.type.toString()
    }

    const isValidIntentionData = (data) => {
      return (
        data.datetime &&
        data.cryptoname &&
        data.amountCrypto &&
        data.valueCripto &&
        data.amountPesos &&
        data.userData &&
        data.userEmail &&
        data.type
      )
    }

    if (isValidIntentionData(intentionData)) {
      intentionData.datetime = new Date(intentionData.datetime)
      const intention = new intentionModel.Intention(intentionData, system)
      await intentionSchema.create(intention)

      res.status(201).send('Intention created')
    } else {
      res.status(500).send('Intentions creation: Internal server error: ' + 'invalid Data from Intention')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Intentions creation: Internal server error: ' + error.message)
  }
}

const getIntentions = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)

    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

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
    if (user.email === email) return user
  }
}

module.exports = {
  createIntention,
  getIntentions
}
