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

module.exports = {
  doTransaction
}
