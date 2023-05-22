const mongoose = require('mongoose')
const transactionSchema = mongoose.model('Transaction')

const doTransaction = async (req, res) => {
  try {
    const transactionData = req.body
    if (transactionData.action === 'Cancelar') return res.status(200).send({ message: 'Transaction canceled' })
    const action = () => {
      if (transactionData.action === 'Realice la transferencia') return 'Seller'
      else if (transactionData.action === 'Confirmar recepción') return 'Buyer'
    }

    // transactionData.direction = direction()

    await transactionSchema.create(transactionData)

    res.status(201).send({
      message: `Transaction created. ${action()}`,
      direction: action() === 'Seller' ? transactionData.user.cvu : transactionData.user.criptoAdress
    })
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}

const getTransactions = async (req, res) => {
  try {
    const user = req.query.user

    const ltDate = req.query.ltDate ? new Date(req.query.ltDate) : new Date()
    const gtDate = req.query.gtDate ? new Date(req.query.gtDate) : new Date(0)
    const transactions = await transactionSchema.find({ email: user, datetime: { $lte: ltDate, $gte: gtDate } })

    res.status(201).send(transactions)
  } catch (error) {
    res.status(500).send('Transactions: Internal server error ' + error.message)
  }
}

module.exports = {
  doTransaction,
  getTransactions
}
