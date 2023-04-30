const intentionModel = require('../model/Intention')
const mongoose = require('mongoose')
const intentionSchema = mongoose.model('Intention')

const createIntention = async (req, res) => {
  try {
    const intention = new intentionModel.Intention(req.body) // TODO: add system parameter
    await intentionSchema.create(intention)

    res.status(201).send(intention)
  } catch (error) {
    res.status(500).send('Intentions creation: Internal server error: ' + error.message)
  }
}

module.exports = {
  createIntention
}
