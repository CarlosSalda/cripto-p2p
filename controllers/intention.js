const intentionModel = require('../model/Intention')
const mongoose = require('mongoose')
const intentionSchema = mongoose.model('Intention')
const { User } = require('../model/User')
const system = require('../model/System')

const createIntention = async (req, res) => {
  try {
    const intention = new intentionModel.Intention(req.body) // TODO: add system parameter
    await intentionSchema.create(intention)

    res.status(201).send('Intention created')
  } catch (error) {
    res.status(500).send('Intentions creation: Internal server error: ' + error.message)
  }
}

const getIntentions = async (req, res) => {
  try {
    const intentions = await intentionSchema.find({})
    const parsedIntentions = intentions.map(e => new intentionModel.Intention(e, system))
    console.log(parsedIntentions)

    res.status(201).send(parsedIntentions)
  } catch (error) {
    res.status(500).send('Intentions creation: Internal server error: ' + error.message)
  }
}

module.exports = {
  createIntention,
  getIntentions
}
