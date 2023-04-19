const SystemDiffError = require('./errors/SystemError')

class Intention {
  constructor ({ criptoName, amountCripto, valueCripto, amountPesos, userData, type }, system) {
    if (system && system.getPercentageDifferenceAgainstMarketValue(amountPesos) > 5) {
      throw new SystemDiffError('Value diff with market value +/- than 5%')
    }

    this.criptoName = criptoName
    this.amountCripto = amountCripto
    this.valueCripto = valueCripto
    this.amountPesos = amountPesos
    this.userData = userData
    this.type = type
    this.system = system
  }

  setAmountPesos (value) {
    this.amountPesos = value
  }

  getAmountPesos () {
    return this.amountPesos
  }

  setValueCripto (value) {
    this.valueCripto = value
  }

  getValueCripto () {
    return this.valueCripto
  }

  confirmIntention () {
    if (this.system && this.system.getPercentageDifferenceAgainstMarketValue(this.amountPesos) > 5) {
      throw new SystemDiffError('Value diff with market value +/- than 5%')
    }

    console.log('operation confirmed')
  }

  static validateIntention = (intention) => {
    const validatedCriptoName = validateCriptoName(intention.criptoName)
    const validatedAmountCripto = validateAmount(intention.amountCripto, 'amountCripto')
    const validatedValueCripto = validateAmount(intention.valueCripto, 'valueCripto')
    const validatedAmountPesos = validateAmount(intention.amountPesos, 'amountPesos')
    const validatedUserData = validateUserData(intention.userData)
    const validatedType = validateType(intention.type)
    const intentionData = {
      criptoName: validatedCriptoName.value,
      amountCripto: validatedAmountCripto.value,
      valueCripto: validatedValueCripto.value,
      amountPesos: validatedAmountPesos.value,
      userData: validatedUserData.value,
      type: validatedType.value
    }

    switch (undefined) {
      case validatedCriptoName.value:
        return validatedCriptoName
      case validatedAmountCripto.value:
        return validatedAmountCripto
      case validatedValueCripto.value:
        return validatedValueCripto
      case validatedAmountPesos.value:
        return validatedAmountPesos
      case validatedUserData.value:
        return validatedUserData
      case validatedType.value:
        return validatedType
      default:
        return new Intention(intentionData)
    }
  }

  static anyIntentionWithSpecificKey (key, value) {
    const intention = new Intention({
      criptoName: 'CAKEUSDT',
      amountCripto: 100,
      valueCripto: 50,
      amountPesos: 5000,
      userData: 'Juan Perez',
      type: 'BUY'
    })
    intention[key] = value
    return intention
  }
}

const regexString = /^[a-zA-Z\s]*$/
const regexCaps = /^[A-Z]*$/
const regexAmounts = /^[+]?((\d+(\.\d*)?)|(\.\d+))$/ // Decimals must be with dot separation

const validateCriptoName = (criptoName) => {
  const trimed = criptoName.trim()

  if (!regexString.test(criptoName)) {
    return { error: 'The criptoName must be only letters' }
  }

  if (!regexCaps.test(criptoName)) {
    return { error: 'The criptoName must be only mayus' }
  }

  return { value: trimed }
}

const validateAmount = (amount, nameAmount) => {
  if (amount <= 0) {
    return { error: `The ${nameAmount} must be greater than 0` }
  }

  if (!regexAmounts.test(amount)) {
    return { error: `The ${nameAmount} must be only numbers` }
  }

  return { value: amount }
}

const validateUserData = (userData) => {
  const trimed = userData.trim()

  if (!regexString.test(trimed)) {
    return { error: 'The userData must be only letters' }
  }

  return { value: trimed }
}

const validateType = (type) => {
  if (type !== 'BUY' && type !== 'SELL') {
    return { error: 'The type must be only BUY or SELL' }
  }

  return { value: type }
}

module.exports = {
  Intention
}
