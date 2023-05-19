
const mongoose = require('mongoose')
const operationSchema = mongoose.model('Operations')
const Operation = require('../model/Operation')

const userOperations = async (req, res) => {
  try {
    const user = req.query.user

    const operations = await operationSchema.find({ userEmail: user })
    // const parsedOperations = new Operation(operations)

    res.status(201).send([])
  } catch (error) {
    res.status(500).send('Cotizations: Internal server error')
  }
}

module.exports = {
  userOperations
}
