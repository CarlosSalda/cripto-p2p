const UserError = require('./errors/UserError')
class User {
  constructor ({ name, surname, email, adress, password, cvu, criptoAdress }) {
    this.name = name
    this.surname = surname
    this.email = email
    this.adress = adress
    this.password = password
    this.cvu = cvu
    this.criptoAdress = criptoAdress
  }

  static anyUserWithSpecificKey (key, value) {
    const user = new User({
      name: 'Any name',
      surname: 'Any surname',
      email: 'anymail@gmail.com',
      adress: 'anyadresss',
      password: 'AnyPassword1!',
      cvu: '1234567890123456789012',
      criptoAdress: '12345678'
    })
    user[key] = value
    return user
  }

  static validateUser = (user) => {
    const validatedName = validateName(user.name, 'name')
    const validatedSurname = validateName(user.surname, 'surname')
    const validatedEmail = validateEmail(user.email)
    const validatedAdress = validateAdress(user.adress)
    const validatedPassword = validatePassword(user.password)
    const validatedCvu = validateCvu(user.cvu)
    const validatedCriptoAdress = validateCripto(user.criptoAdress)
    const userData = {
      name: validatedName,
      surname: validatedSurname,
      email: validatedEmail,
      adress: validatedAdress,
      password: validatedPassword,
      cvu: validatedCvu,
      criptoAdress: validatedCriptoAdress
    }

    return new User(userData)
  }

  addOperationCanceled () {
    // TODO
  }

  addSuccessfullOperation (quickOperation) {
    // TODO
  }
}
const regexMayusMinus = /^(?=.*[a-z])(?=.*[A-Z])/
const regexString = /^[a-zA-Z]+$/
const regexSpecial = /^(?=.*[!@#$%^&*_-])/
const regexEmail = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexlength = (start, end) => {
  return new RegExp('^(?=.{' + start + ',' + end + '}$)')
}

const validateName = (data, key) => {
  const trimmed = data.trim()
  if (regexString.test(trimmed) === false) throw new UserError(`The ${key} should contain only letters`)
  if (regexlength(3, 30).test(trimmed) === false) throw new UserError(`The ${key} should contain between 3 and 30 characters`)

  return trimmed
}

const validateEmail = (email) => {
  const trimmed = email.trim()
  if (!regexEmail.test(trimmed)) throw new UserError('The email is a not valid email')

  return trimmed
}

const validateAdress = (adress) => {
  const trimmed = adress.trim()
  if (!regexlength(10, 30).test(trimmed)) throw new UserError('The adress should contain between 10 and 30 characters')

  return trimmed
}

const validatePassword = (password) => {
  const trimmed = password.trim()
  if (trimmed.length < 6) throw new UserError('The password should contain at least 6 characters')
  if (!regexMayusMinus.test(trimmed)) throw new UserError('The password should contain at least 1 mayus and 1 minus character')
  if (!regexSpecial.test(trimmed)) throw new UserError('The password should contain at least 1 special character')

  return trimmed
}

const validateCvu = (cvu) => {
  const trimmed = cvu.trim()
  if (trimmed.length !== 22) throw new UserError('The CVU should contain only 22 characters')

  return trimmed
}

const validateCripto = (criptoAdress) => {
  const trimmed = criptoAdress.trim()
  if (trimmed.length !== 8) throw new UserError('The cripto adress should contain only 8 characters')

  return trimmed
}

module.exports = {
  User
}
