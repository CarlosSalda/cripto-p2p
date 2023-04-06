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
      name: validatedName.value,
      surname: validatedSurname.value,
      email: validatedEmail.value,
      adress: validatedAdress.value,
      password: validatedPassword.value,
      cvu: validatedCvu.value,
      criptoAdress: validatedCriptoAdress.value
    }

    switch (undefined) {
      case validatedName.value:
        return validatedName
      case validatedSurname.value:
        return validatedSurname
      case validatedEmail.value:
        return validatedEmail
      case validatedAdress.value:
        return validatedAdress
      case validatedPassword.value:
        return validatedPassword
      case validatedCvu.value:
        return validatedCvu
      case validatedCriptoAdress.value:
        return validatedCriptoAdress
      default:
        return new User(userData)
    }
  }

  addOperationCanceled () {
    // TODO
  }

  addSuccessfullOperation (quickOperation) {
    // TODO
  }
}
const regexMayusMinus = /^(?=.*[a-z])(?=.*[A-Z])/
const regexString = /^(?=.*[a-z])/
const regexSpecial = /^(?=.*[!@#$%^&*_-])/
const regexEmail = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexlength = (start, end) => {
  return new RegExp('^(?=.{' + start + ',' + end + '}$)')
}

const validateName = (data, key) => {
  const trimmed = data.trim()
  switch (false) {
    case regexString.test(trimmed):
      return { error: `The ${key} should contain only letters` }
    case regexlength(3, 30).test(trimmed):
      return { error: `The ${key} should contain between 3 and 30 characters` }
    default:
      return { value: trimmed }
  }
}

const validateEmail = (email) => {
  const trimmed = email.trim()

  if (!regexEmail.test(trimmed)) {
    return { error: 'The email is a not valid email' }
  }

  return { value: trimmed }
}

const validateAdress = (adress) => {
  const trimmed = adress.trim()

  if (!regexlength(10, 30).test(trimmed)) {
    return { error: 'The adress should contain between 10 and 30 characters' }
  }

  return { value: trimmed }
}

const validatePassword = (password) => {
  const trimmed = password.trim()

  switch (false) {
    case trimmed.length >= 6:
      return { error: 'The password should contain at least 6 characters' }
    case regexMayusMinus.test(trimmed):
      return { error: 'The password should contain at least 1 mayus and 1 minus character' }
    case regexSpecial.test(trimmed):
      return { error: 'The password should contain at least 1 special character' }
    default:
      return { value: trimmed }
  }
}

const validateCvu = (cvu) => {
  const trimmed = cvu.trim()
  if (trimmed.length !== 22) {
    return { error: 'The CVU should contain only 22 characters' }
  }
  return { value: trimmed }
}

const validateCripto = (criptoAdress) => {
  const trimmed = criptoAdress.trim()
  if (trimmed.length !== 8) {
    return { error: 'The cripto adress should contain only 8 characters' }
  }
  return { value: trimmed }
}

module.exports = {
  User
}
