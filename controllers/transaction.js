const mongoose = require('mongoose')
const transactionSchema = mongoose.model('Transaction')
const userSchema = mongoose.model('User')
const ReputationEnum = require('../model/enums/reputation')
const verifyToken = require('../webservice/tokenVerification.js')

const getUserData = async (email, res) => {
  try {
    const user = await userSchema.findOne({ email: email.toString() })

    return user
  } catch (error) {
    res.status(500).send('Transaction creation: Internal server error: ' + error.message)
  }
}

const getReputation = (user) => {
  if (!user || user.totalOperations === 0) return ReputationEnum.NO_OPERATIONS_YET

  return (user.completedOperations / user.totalOperations).toString()
}

const doTransaction = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)

    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

    const transactionData = req.body
    const user = req.body.user ? req.body.user : await getUserData(transactionData.userEmail.toString(), res)

    let stringedData = {
      cryptoActive: transactionData.cryptoActive.toString(),
      nominalAmount: parseInt(transactionData.nominalAmount.toString()),
      cotization: parseInt(transactionData.cotization.toString()),
      operationValue: parseInt(transactionData.operationValue.toString()),
      operationAmount: parseInt(transactionData.operationAmount.toString()),
      action: transactionData.action.toString(),
      type: transactionData.type.toString()
    }

    if (stringedData.action === 'Cancelar') return res.status(200).send({ message: 'Transaction canceled' })

    const action = () => {
      if (stringedData.action === 'Realice la transferencia') return 'Seller'
      else if (stringedData.action === 'Confirmar recepción') return 'Buyer'
    }

    const isValidTransactionData = (data) => {
      return (
        data.cryptoActive &&
        data.nominalAmount &&
        data.cotization &&
        data.operationValue &&
        data.operationAmount &&
        data.action &&
        data.type
      )
    }

    if (isValidTransactionData(stringedData)) {
      stringedData = { ...stringedData, user: user.toString(), reputation: getReputation(user).toString() }

      await transactionSchema.create(stringedData)

      res.status(201).send({
        message: `Transaction created. ${action()}`,
        direction: action() === 'Seller' ? stringedData.user.cvu : stringedData.user.criptoAdress
      })
    } else {
      res.status(500).send('Transaction creation: Internal server error: ' + 'invalid Data from Transacion')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error:' + error)
  }
}

const getTransactions = async (req, res) => {
  try {
    const verify = await verifyToken(req, res)
    if (verify.message === 'Unauthorized' || verify.message === 'Invalid token') {
      return res.status(verify.status).send(verify.message)
    }

    const user = req.query.user

    const ltDate = req.query.ltDate ? new Date(req.query.ltDate) : new Date()
    const gtDate = req.query.gtDate ? new Date(req.query.gtDate) : new Date(0)
    const transactions = await transactionSchema.find({ email: user.toString(), datetime: { $lte: ltDate, $gte: gtDate } })

    res.status(201).send(transactions)
  } catch (error) {
    res.status(500).send('Transactions: Internal server error ' + error.message)
  }
}

module.exports = {
  doTransaction,
  getTransactions
}
