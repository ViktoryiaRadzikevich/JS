import loginUser from '../auth/login-user.js';
import currentUser from '../current-user.js';
import { navigateToUrl } from '../routing.js';
import loginTemplate from '../templates/pages/login/index.js';
import { REGISTRATION_URL } from '../routing.js';

const rootDiv = document.querySelector('.container');

export default function renderLogIn() {
    if (!currentUser.userData) {
        rootDiv.innerHTML = loginTemplate;

        const loginForm = document.querySelector('.login-form > form');
        loginForm.addEventListener('submit', loginUser);

        // const registrationBtn = document.getElementById('registration');
        // registrationBtn.addEventListener('click',
        //     (event) => {
        //         event.preventDefault();
        //         navigateToUrl(REGISTRATION_URL);
        //     })

    } else {
        navigateToUrl('/')
    }

}