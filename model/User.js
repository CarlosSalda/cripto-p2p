class User {
    constructor({ name, surname, email, adress, password, cvu, criptoAdress }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.adress = adress;
        this.password = password;
        this.cvu = cvu;
        this.criptoAdress = criptoAdress;
    }

    static anyUserWithSpecificKey(key, value) {
        const user = new User({
            name: 'Any name',
            surname: 'Any surname',
            email: 'anymail@gmail.com',
            adress: 'anyadresss',
            password: 'AnyPassword1!',
            cvu: '1234567890123456789012',
            criptoAdress: '12345678'
        });
        user[key] = value;
        return user;
    }

    static validateUser = (user) => {
        const validated_name = validateName(user.name, "name");
        const validated_surname = validateName(user.surname, "surname");
        const validated_email = validateEmail(user.email);
        const validated_adress = validateAdress(user.adress);
        const validated_password = validatePassword(user.password);
        const validated_cvu = validateCvu(user.cvu);
        const validated_criptoAdress = validateCripto(user.criptoAdress);
        const user_data = {
            name: validated_name.value,
            surname: validated_surname.value,
            email: validated_email.value,
            adress: validated_adress.value,
            password: validated_password.value,
            cvu: validated_cvu.value,
            criptoAdress: validated_criptoAdress.value
        }
    
        switch (undefined) {
            case validated_name.value:
                return validated_name;
            case validated_surname.value:
                return validated_surname;
            case validated_email.value:
                return validated_email;
            case validated_adress.value:
                return validated_adress;
            case validated_password.value:
                return validated_password;
            case validated_cvu.value:
                return validated_cvu;
            case validated_criptoAdress.value:
                return validated_criptoAdress;
            default:
                return new User(user_data)
        }
    }
}
const regex_mayus_minus = /^(?=.*[a-z])(?=.*[A-Z])/;
const regex_string = /^(?=.*[a-z])/;
const regex_special = /^(?=.*[!@#$%^&*_-])/;
const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexlength = (start, end) => {
    return new RegExp('^(?=.{' + start + ',' + end + '}$)');
}

const validateName = (data, key) => {
    const trimmed = data.trim();
    switch (false) {
        case regex_string.test(trimmed):
            return { error: `The ${key} should contain only letters` }
        case regexlength(3, 30).test(trimmed):
            return { error: `The ${key} should contain between 3 and 30 characters` }
        default:
            return { value: trimmed }
    }
}

const validateEmail = (email) => {
    const trimmed = email.trim();

    if (!regex_email.test(trimmed)) {
        return { error: 'The email is a not valid email' }
    }

    return { value: trimmed }
}

const validateAdress = (adress) => {
    const trimmed = adress.trim();

    if (!regexlength(10, 30).test(trimmed)) {
        return { error: 'The adress should contain between 10 and 30 characters' }
    }

    return { value: trimmed };
}

const validatePassword = (password) => {
    const trimmed = password.trim();

    switch (false) {
        case trimmed.length >= 6:
            return { error: 'The password should contain at least 6 characters' }
        case regex_mayus_minus.test(trimmed):
            return { error: 'The password should contain at least 1 mayus and 1 minus character' }
        case regex_special.test(trimmed):
            return { error: 'The password should contain at least 1 special character' }
        default:
            return { value: trimmed }
    }
}

const validateCvu = (cvu) => {
    const trimmed = cvu.trim();
    if (trimmed.length !== 22) {
        return { error: 'The CVU should contain only 22 characters' }
    }
    return { value: trimmed }
}

const validateCripto = (criptoAdress) => {
    const trimmed = criptoAdress.trim();
    if (trimmed.length !== 8) {
        return { error: 'The cripto adress should contain only 8 characters' }
    }
    return { value: trimmed }
}



//export the model
module.exports = {
    User
}