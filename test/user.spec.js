const { User } = require('../model/User')
const UserError = require('../model/errors/UserError')
const ReputationEnum = require('../model/enums/reputation')
const { describe, expect, test } = require('@jest/globals')

describe('User model tests', () => {
  describe(('User name validation tests'), () => {
    test('Should return an error when numbers are used in name', () => {
      const user = User.anyUserWithSpecificKey('name', '123')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when the name is shorter than 3 characters', () => {
      const user = User.anyUserWithSpecificKey('name', 'Bo')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when the name is longer than 30 characters', () => {
      const user = User.anyUserWithSpecificKey('name', 'abcdefhijklmnopqrstuvwxyzabcdefhijklmnopqrstuvwxyz')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })
  })

  describe(('User surname validation tests'), () => {
    test('Should return an error when numbers are used in surname', () => {
      const user = User.anyUserWithSpecificKey('surname', '123')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when the surname is shorter than 3 characters', () => {
      const user = User.anyUserWithSpecificKey('surname', 'Bo')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when the surname is longer than 30 characters', () => {
      const user = User.anyUserWithSpecificKey('surname', 'abcdefhijklmnopqrstuvwxyzabcdefhijklmnopqrstuvwxyz')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })
  })

  describe(('User email validation tests'), () => {
    test('Should return an error when the email is not valid', () => {
      const user = User.anyUserWithSpecificKey('email', 'abc')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })
  })

  describe(('User adress validation tests'), () => {
    test('Should return an error when the adress is shorter than 10 characters', () => {
      const user = User.anyUserWithSpecificKey('adress', 'an adress')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when the adress is longer than 30 characters', () => {
      const user = User.anyUserWithSpecificKey('adress', 'abcdefhijklmnopqrstuvwxyzabcdefhijklmnopqrstuvwxyz')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })
  })

  describe(('User password validation tests'), () => {
    test('Should return an error when the password is shorter than 6 characters', () => {
      const user = User.anyUserWithSpecificKey('password', '12345')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when password does not contain at least a Mayus letter', () => {
      const user = User.anyUserWithSpecificKey('password', 'a1234567')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when password does not contain at least a minus letter', () => {
      const user = User.anyUserWithSpecificKey('password', 'A1234567')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when password does not contain at least a special character', () => {
      const user = User.anyUserWithSpecificKey('password', 'Aa1234567')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })
  })

  describe(('User CVU validation tests'), () => {
    test('Should return an error when the cvu is shorter than 22 characters', () => {
      const user = User.anyUserWithSpecificKey('cvu', '1234567')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when the cvu is longer than 22 characters', () => {
      const user = User.anyUserWithSpecificKey('cvu', '123456789012345678901234567890')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })
  })

  describe(('User cripto adress validation tests'), () => {
    test('Should return an error when cripto adress is shorter than 8 characters', () => {
      const user = User.anyUserWithSpecificKey('criptoAdress', '1234567')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })

    test('Should return an error when cripto adress is longer than 8 characters', () => {
      const user = User.anyUserWithSpecificKey('criptoAdress', '123456789')
      const validatedUser = () => User.validateUser(user)

      expect(validatedUser).toThrow(UserError)
    })
  })

  describe(('User creation success'), () => {
    test('Should create a user with out any error. The response should be a User', () => {
      const validatedUser = User.validateUser(anyUser)

      expect(validatedUser).toBeInstanceOf(User)
      expect(validatedUser.name).toBe(anyUser.name)
    })
  })

  describe(('Reputation'), () => {
    test('Should return reputation of 1', () => {
      const user = anyUserFunction()
      const expectedReputation = 1

      user.addSuccessfullOperation()

      expect(user.getReputation()).toBe(expectedReputation.toString())
    })

    test('Should return -Sin operaciones-', () => {
      const user = anyUserFunction()

      expect(user.getReputation()).toBe(ReputationEnum.NO_OPERATIONS_YET)
    })

    test('Should return reputation of 0.5', () => {
      const user = anyUserFunction()
      const expectedReputation = 0.5

      user.addSuccessfullOperation()
      user.addOperationCanceled()

      expect(user.getReputation()).toBe(expectedReputation.toString())
    })
  })
})

const randomUserData = {
  name: 'Bob',
  surname: 'Dylan',
  email: 'bobdylan@gmail.com',
  adress: 'Calle falsa 123',
  password: 'Aa1234567!',
  cvu: '1234567890123456789012',
  criptoAdress: '12345678'
}
const anyUser = new User(randomUserData)
const anyUserFunction = () => new User(randomUserData)
