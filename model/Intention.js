class Intention {
    constructor({criptoName, amountCripto, valueCripto, amountPesos, userData, type}) {
        this.criptoName = criptoName;
        this.amountCripto = amountCripto;
        this.valueCripto = valueCripto;
        this.amountPesos = amountPesos;
        this.userData = userData;
        this.type = type;
    }


    static validateIntention = (intention) => {
        const validated_criptoName = validateCriptoName(intention.criptoName);
        const validated_amountCripto = validateAmount(intention.amountCripto, "amountCripto");
        const validated_valueCripto = validateAmount(intention.valueCripto, "valueCripto");
        const validated_amountPesos = validateAmount(intention.amountPesos, "amountPesos");
        const validated_userData = validateUserData(intention.userData);
        const validated_type = validateType(intention.type);
        const intention_data = {
            criptoName: validated_criptoName.value,
            amountCripto: validated_amountCripto.value,
            valueCripto: validated_valueCripto.value,
            amountPesos: validated_amountPesos.value,
            userData: validated_userData.value,
            type: validated_type.value
        }

        switch (undefined) {
            case validated_criptoName.value:
                return validated_criptoName;
            case validated_amountCripto.value:
                return validated_amountCripto;
            case validated_valueCripto.value:
                return validated_valueCripto;
            case validated_amountPesos.value:
                return validated_amountPesos;
            case validated_userData.value:
                return validated_userData;
            case validated_type.value:
                return validated_type;
            default:
                return new Intention(intention_data);
        }
    }

    static anyIntentionWithSpecificKey(key, value) {
        const intention = new Intention({
            criptoName: 'CAKEUSDT',
            amountCripto: 100,
            valueCripto: 50,
            amountPesos: 5000,
            userData: "Juan Perez",
            type: "BUY",
        });
        intention[key] = value;
        return intention;
    }
}

const regex_string = /^[a-zA-Z\s]*$/;
const regex_caps = /^[A-Z]*$/;
const regex_amounts = /^[+]?((\d+(\.\d*)?)|(\.\d+))$/;  //Decimals must be with dot separation

const validateCriptoName = (criptoName) => {
    const trimed = criptoName.trim();

    if (!regex_string.test(criptoName)) {
        return { error: 'The criptoName must be only letters' };
    }

    if (!regex_caps.test(criptoName)) {
        return { error: 'The criptoName must be only mayus' };
    }

    return { value: trimed };
}

const validateAmount = (amount, nameAmount) => {
    if (amount <= 0) {
        return { error: `The ${nameAmount} must be greater than 0` };
    }

    if (!regex_amounts.test(amount)) {
        return { error: `The ${nameAmount} must be only numbers` };
    }

    return { value: amount };
}

const validateUserData = (userData) => {
    const trimed = userData.trim();

    if (!regex_string.test(trimed)) {
        return { error: 'The userData must be only letters' };
    }

    return { value: trimed };
}

const validateType = (type) => {
    if (type !== "BUY" && type !== "SELL") {
        return { error: 'The type must be only BUY or SELL' };
    }

    return { value: type };
}



//export module
module.exports = {
    Intention
}