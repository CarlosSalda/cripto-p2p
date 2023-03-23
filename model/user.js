class User {
    constructor({ name, surname, email, adress, password, cvu, cryptoAdress }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.adress = adress;
        this.password = password;
        this.cvu = cvu;
        this.cryptoAdress = cryptoAdress;
    }
}
const regex_mayus_minus = /^(?=.*[a-z])(?=.*[A-Z])/;
const regex_string = /^(?=.*[a-z])/;
const regex_special = /^(?=.*[!@#$%^&*_-])/;
const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexlength = (start, end) => {
    return new RegExp('^(?=.{' + start + ',' + end + '}$)');
}

const validateName = (name) => {
    const trimmed = name.trim();
    switch (false) {
        case regex_string.test(trimmed):
            return { error: 'El nombre debe contener solo letras' }
        case regexlength(3, 30).test(trimmed):
            return { error: 'El nombre debe contener entre 3 y 30 caracteres' }
        default:
            return { value: trimmed }
    }
}
const validateEmail = (email) => {
    const trimmed = email.trim();

    if (!regex_email.test(trimmed)) {
        return { error: 'El email no es valido' }
    }

    return { value: trimmed }
}

const validateAdress = (adress) => {
    const trimmed = adress.trim();

    if (!regexlength(10, 30).test(trimmed)) {
        return { error: 'La direccion debe contener entre 10 y 30 caracteres' }
    }

    return { value: trimmed };
}

const validatePassword = (password) => {
    const trimmed = password.trim();

    switch (false) {
        case trimmed.length >= 6:
            return { error: 'La contraseña debe contener al menos 6 caracteres' }
        case regex_mayus_minus.test(trimmed):
            return { error: 'La contraseña debe contener al menos una letra mayuscula y una minuscula' }
        case regex_special.test(trimmed):
            return { error: 'La contraseña debe contener al menos un caracter especial' }
        default:
            return { value: trimmed }
    }
}

const validateCvu = (cvu) => {
    const trimmed = cvu.trim();
    if(trimmed.length !== 22){
        return { error: 'El cvu debe contener 22 caracteres' }
    }
    return { value: trimmed }
}

const validateCrypto = (cryptoAdress) => {
    const trimmed = cryptoAdress.trim();
    if(trimmed.length !== 8){
        return { error: 'La direccion de cripto debe contener 8 caracteres' }
    }
    return { value: trimmed }
}



//validate a user
const validateUser = (user) => {
    const validated_name = validateName(user.name);
    const validated_surname = validateName(user.surname);
    const validated_email = validateEmail(user.email);
    const validated_adress = validateAdress(user.adress);
    const validated_password = validatePassword(user.password);
    const validated_cvu = validateCvu(user.cvu);
    const validated_cryptoAdress = validateCrypto(user.cryptoAdress);

    switch (undefined) {
        case validated_name.value:
            return validated_name.error;
        case validated_surname.value:
            return validated_surname.error;
        case validated_email.value:
            return validated_email.error;
        case validated_adress.value:
            return validated_adress.error;
        case validated_password.value:
            return validated_password.error;
        case validated_cvu.value:
            return validated_cvu.error;
        case validated_cryptoAdress.value:
            return validated_cryptoAdress.error;
        default:
            const user = {
                name: validated_name.value,
                surname: validated_surname.value,
                email: validated_email.value,
                adress: validated_adress.value,
                password: validated_password.value,
                cvu: validated_cvu.value,
                cryptoAdress: validated_cryptoAdress.value
            }
            return new User(user)
    }
}

//export the model
module.exports = {
    User,
    validateUser
}