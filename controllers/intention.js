const intentionModel = require('../model/Intention')
const mongoose = require('mongoose')
const intentionSchema = mongoose.model('Intention')
const userSchema = mongoose.model('User')
const { User } = require('../model/User')
const system = require('../model/System')

const createIntention = async (req, res) => {
  try {
    const intention = new intentionModel.Intention(req.body, system)
    await intentionSchema.create(intention)

    res.status(201).send('Intention created')
  } catch (error) {
    res.status(500).send('Intentions creation: Internal server error: ' + error.message)
  }
}

const getIntentions = async (req, res) => {
  try {
    const intentions = await intentionSchema.find({})
    const response = []

    for (const intention of intentions) {
      const parsedIntention = new intentionModel.Intention(intention)

      const user = await userSchema.findOne({ email: parsedIntention.userEmail }).exec()

      if (!user) continue // to avoid crashes, skip if we don't find the user

      const parsedUser = new User(user)

      parsedIntention.reputation = parsedUser.getReputation()

      response.push(parsedIntention)
    }

    res.status(201).send(response)
  } catch (error) {
    res.status(500).send('Intentions getting: Internal server error: ' + error.message)
  }
}

module.exports = {
  createIntention,
  getIntentions
}
