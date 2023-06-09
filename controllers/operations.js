// const Operation = require('../model/Operation')
const verifyToken = require('../webservice/tokenVerification.js')

const userOperations = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)
    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

    res.status(201).send([])
  } catch (error) {
    res.status(500).send('Cotizations: Internal server error')
  }
}

module.exports = {
  userOperations
}
