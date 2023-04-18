import currentUser from '../current-user.js';
import { navigateToUrl } from '../routing.js';
import showErrors from '../show-errors.js';
import storageService from '../storage-service.js';
import userList from '../users.js';
import { generateId } from '../utils.js';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /(([A-Za-z]+\d+)|(\d+[A-Za-z]+))[A-Za-z\d]/;

function validateRegistration({ email, password, repeatPassword }) {

    let errors = {
        email: [],
        password: [],
        repeatPassword: []
    };

    if (!email) {
        // throw new Error('Email cannot be empty');
        errors = { ...errors, email: [...errors.email, 'Email cannot be empty'] };
    }

    if (email && !EMAIL_REGEX.test(email)) {
        // throw new Error('Email invalid format');
        errors = { ...errors, email: [...errors.email, 'Email invalid format'] };
    }

    if (!password) {
        // throw new Error('Password cannot be empty');
        errors = { ...errors, password: [...errors.password, 'Password cannot be empty'] };
    }

    if (password && password.length < MIN_PASSWORD_LENGTH) {
        // throw new Error(`Password should contain at least ${MIN_PASSWORD_LENGTH} characters`);
        errors = { ...errors, password: [...errors.password, `Password should contain at least ${MIN_PASSWORD_LENGTH} characters`] };
    }

    if (password && !PASSWORD_REGEX.test(password)) {
        // throw new Error('Password invalid');
        errors = { ...errors, password: [...errors.password, 'Password invalid'] };
    }

    if (password !== repeatPassword) {
        // throw new Error('Passwords does not match');
        errors = { ...errors, repeatPassword: [...errors.repeatPassword, 'Passwords does not match'] };
    }

    return errors;
}

export default function registerUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    //прописываем в гет ИМЯ инпута
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    const errors = validateRegistration({ email, password, repeatPassword });

    let hasErrors = false; 

    // showErrors(errors, hasErrors);

    // for (let key in errors) {
    //     const span = document.querySelector(`input[name="${key}"] + span`);
    //     if (errors[key].length > 0) {
    //         hasErrors = true;
    //         const errorStr = errors[key].join('<br>');
    //         span.innerHTML = errorStr;
    //     } else {
    //         span.innerHTML = '';
    //     }
    // }

    hasErrors = showErrors(errors, hasErrors);

    if (hasErrors) {
        return
    }
    //шифруем пароль используя метод библиотеки
    const hashedPassword = CryptoJS.SHA3(password);

    const newUser = {
        id: generateId(userList.users),
        email: email,
        password: hashedPassword.toString()
    };

    try {
        userList.add(newUser);
        currentUser.login(newUser);

        storageService.set('users', JSON.stringify(userList.users));
        storageService.set('currentUser', JSON.stringify(currentUser.userData));
        

        navigateToUrl('/')
    } catch (error) {
        alert(error.message);
    }


    event.target.reset();

}