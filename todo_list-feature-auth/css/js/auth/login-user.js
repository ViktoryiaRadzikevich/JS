import currentUser from '../current-user.js';
import { navigateToUrl } from '../routing.js';
import showErrors from '../show-errors.js';
import storageService from '../storage-service.js';
import userList from '../users.js';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

function validateLogin({ email, password }) {

    let errors = {
        email: [],
        password: [],
    };

    if (!email) {
        errors = { ...errors, email: [...errors.email, 'Enter email'] };
    }

    if (email && !userList.getUserByEmail(email)) {
        errors = { ...errors, email: [...errors.email, 'User does not exist'] };
    }

    if (
        userList.getUserByEmail(email)
        && userList.getUserByEmail(email).password !== CryptoJS.SHA3(password).toString()
    ) {
        errors = { ...errors, password: [...errors.password, 'Invalid Password (does not match)'] };
        }
    // if (!email) {
    //     errors = { ...errors, email: [...errors.email, 'Email cannot be empty'] };
    // }

    // if (email && !EMAIL_REGEX.test(email)) {
    //     // throw new Error('Email invalid format');
    //     errors = { ...errors, email: [...errors.email, 'Email invalid format'] };
    // }

    // if (!password) {
    //     // throw new Error('Password cannot be empty');
    //     errors = { ...errors, password: [...errors.password, 'Password cannot be empty'] };
    // }

    return errors;
}
    

export default function loginUser(event) {

    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');


    const errors = validateLogin({ email, password });

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

    //      return hasErrors;
    // }

    hasErrors = showErrors(errors, hasErrors);

    if (hasErrors) {
        return
    }



    //получаем есть ли юзер по этому имейлу 
    const user = userList.getUserByEmail(email);

    // if (!user) {
    //     alert('User does not exist');
    //     return
    // }

    // //будем сравниавть введенный пароль с имеющимся
    // const hashedPassword = CryptoJS.SHA3(password);

    // if (user.password !== hashedPassword.toString()) {
    //     alert('Invalid Password (does not match)')
    //     return
    // };

    currentUser.login(user);
    storageService.set('currentUser', JSON.stringify(user));

    navigateToUrl('/');

}