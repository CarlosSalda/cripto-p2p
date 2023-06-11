const meld = require('meld')

const intentionController = require('./controllers/intention')
const transactionController = require('./controllers/transaction')
const userController = require('./controllers/user')
const binanceService = require('./service/external/binance')

const controllers = [intentionController, transactionController, userController, binanceService]
// timestamp,user,operación/metodo, parámetros, tiempoDeEjecicion
// Supply any or all of the advice types at once
const advices = {
  afterThrowing: function (thrownException) {
    console.error('Exception: ' + thrownException)
  },

  async around (pointcut) {
    const initialDate = new Date()
    await pointcut.proceed()
    const endDate = new Date()
    const time = endDate - initialDate

    console.log(`[LOG] [${endDate.toISOString()}] METHOD: ${pointcut.method} PARAMETERS: ${pointcut.args.length} - took ${time}ms to execute`)
  }
}

controllers.forEach(controller => {
  meld(controller, /^/, advices)
})
