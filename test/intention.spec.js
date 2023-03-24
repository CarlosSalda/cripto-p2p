const intention_model = require('../model/Intention');
const { describe, expect, test } = require('@jest/globals');


describe('Intention model tests', () => {
    describe(('Intention criptoName validation tests'), () => {
        test('Should return an error when numbers are used in criptoName', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('criptoName', '123');
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The criptoName must be only letters');
        })

        test('Should return and error when the criptoName is not on mayus', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('criptoName', 'cakeusdt');
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The criptoName must be only mayus');
        })
    })
    describe(('Intention amountCripto validation tests'), () => {
        test('Should return an error when the amountCripto is not a number', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('amountCripto', 'abc');
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The amountCripto must be only numbers');
        })

        test('Should return an error when the amountCripto is <= 0', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('amountCripto', 0);
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The amountCripto must be greater than 0');
        })
    })
    describe(('Intention valueCripto validation tests'), () => {
        test('Should return an error when the valueCripto is not a number', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('valueCripto', 'abc');
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The valueCripto must be only numbers');
        })

        test('Should return an error when the valueCripto is <= 0', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('valueCripto', 0);
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The valueCripto must be greater than 0');
        })
    })
    describe(('Intention amountPesos validation tests'), () => {
        test('Should return an error when the amountPesos is not a number', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('amountPesos', 'abc');
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The amountPesos must be only numbers');
        })

        test('Should return an error when the amountPesos is <= 0', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('amountPesos', 0);
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The amountPesos must be greater than 0');
        })
    })
    describe(('Intention userData validation tests'), () => {
        test('Should return an error when the userData is not only letter', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('userData', "123");
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The userData must be only letters');
        })
    })
    describe(('Intention type validation tests'), () => {
        test('Should return an error when the type is not BUY or SELL', () => {
            const intention = intention_model.Intention.anyIntentionWithSpecificKey('type', "123");
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention.error).toBe('The type must be only BUY or SELL');
        })
    })

    describe(('Intention creation success'), () => {
        test('Should return an intention when all the fields are correct', () => {
            const intention = {
                criptoName: 'CAKEUSDT',
                amountCripto: 1000,
                valueCripto: 5,
                amountPesos: 5000,
                userData: "Pedro Gomez",
                type: "SELL",
            };
            const validated_intention = intention_model.Intention.validateIntention(intention);

            expect(validated_intention).toBeInstanceOf(intention_model.Intention);
            expect(validated_intention.userData).toBe(intention.userData);
        })
    })
});