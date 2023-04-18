import registerUser from '../auth/register-user.js';
import currentUser from '../current-user.js';
import { navigateToUrl } from '../routing.js';
import registrationTemplate from '../templates/pages/registration/index.js'
import renderLogIn from './render-login.js';
import { LOGIN_URL } from '../routing.js';

const rootDiv = document.querySelector('.container');

export default function renderRegistration() {
    if (!currentUser.userData) {
        rootDiv.innerHTML = registrationTemplate;

        const registrationForm = document.querySelector('.registration-form > form');
        registrationForm.addEventListener('submit', registerUser);

        const loginBtn = document.getElementById('login');
        loginBtn.addEventListener('click',
            (event) => {
                event.preventDefault();
                navigateToUrl(LOGIN_URL);
            })

    } else {
        navigateToUrl('/')
    }

    
}