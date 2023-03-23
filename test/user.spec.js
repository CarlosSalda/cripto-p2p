const user_model = require('../model/User');
const { describe, expect, test } = require('@jest/globals');

describe('User model tests', () => {

    describe(('User name validation tests'), () => {
        test('Should return an error when numbers are used in name', () => {
            const user = user_model.User.anyUserWithSpecificKey('name', '123');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The name should contain only letters');
        });

        test('Should return an error when the name is shorter than 3 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('name', 'Bo');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The name should contain between 3 and 30 characters');
        });

        test('Should return an error when the name is longer than 30 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('name', 'abcdefhijklmnopqrstuvwxyzabcdefhijklmnopqrstuvwxyz');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The name should contain between 3 and 30 characters');
        })
    })

    describe(('User surname validation tests'), () => {
        test('Should return an error when numbers are used in surname', () => {
            const user = user_model.User.anyUserWithSpecificKey('surname', '123');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The surname should contain only letters');
        })

        test('Should return an error when the surname is shorter than 3 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('surname', 'Bo');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The surname should contain between 3 and 30 characters');
        })

        test('Should return an error when the surname is longer than 30 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('surname', 'abcdefhijklmnopqrstuvwxyzabcdefhijklmnopqrstuvwxyz');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The surname should contain between 3 and 30 characters');
        })
    })

    describe(('User email validation tests'), () => {
        test('Should return an error when the email is not valid', () => {
            const user = user_model.User.anyUserWithSpecificKey('email', 'abc');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The email is a not valid email');
        })
    })

    describe(('User adress validation tests'), () => {
        test('Should return an error when the adress is shorter than 10 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('adress', 'an adress');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The adress should contain between 10 and 30 characters');
        })

        test('Should return an error when the adress is longer than 30 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('adress', 'abcdefhijklmnopqrstuvwxyzabcdefhijklmnopqrstuvwxyz');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The adress should contain between 10 and 30 characters');
        })
    })

    describe(('User password validation tests'), () => {
        test('Should return an error when the password is shorter than 6 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('password', '12345');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The password should contain at least 6 characters');
        })

        test('Should return an error when password does not contain at least a Mayus letter', () => {
            const user = user_model.User.anyUserWithSpecificKey('password', 'a1234567');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The password should contain at least 1 mayus and 1 minus character');
        })

        test('Should return an error when password does not contain at least a minus letter', () => {
            const user = user_model.User.anyUserWithSpecificKey('password', 'A1234567');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The password should contain at least 1 mayus and 1 minus character');
        })

        test('Should return an error when password does not contain at least a special character', () => {
            const user = user_model.User.anyUserWithSpecificKey('password', 'Aa1234567');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The password should contain at least 1 special character');
        })
    })

    describe(('User CVU validation tests'), () => {
        test('Should return an error when the cvu is shorter than 22 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('cvu', '1234567');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The CVU should contain only 22 characters');
        })

        test('Should return an error when the cvu is longer than 22 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('cvu', '123456789012345678901234567890');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The CVU should contain only 22 characters');
        })
    })

    describe(('User cripto adress validation tests'), () => {
        test('Should return an error when cripto adress is shorter than 8 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('criptoAdress', '1234567');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The cripto adress should contain only 8 characters');
        })

        test('Should return an error when cripto adress is longer than 8 characters', () => {
            const user = user_model.User.anyUserWithSpecificKey('criptoAdress', '123456789');
            const validated_user = user_model.User.validateUser(user);

            expect(validated_user).toBe('The cripto adress should contain only 8 characters');
        })
    })

    describe(('User creation success'), () => {
        test('Should create a user with out any error. The response should be a User', () => {
            const user = {
                name: 'Bob',
                surname: 'Dylan',
                email: 'bobdylan@gmail.com',
                adress: 'Calle falsa 123',
                password: 'Aa1234567!',
                cvu: '1234567890123456789012',
                criptoAdress: '12345678'
            }

            const validated_user = user_model.User.validateUser(user);
            
            expect(validated_user).toBeInstanceOf(user_model.User);
            expect(validated_user.name).toBe('Bob');
        })
    })
});