const listRoutePattern = /^\/list\/\d+$/;
import renderList from './render/render-list.js';
import renderLists from './render/render-lists.js';
import renderRegistration from './render/render-registration.js';
import renderLogIn from './render/render-login.js';
import { getListIdByUrl } from './utils.js';
import lists from './lists-list.js';
import currentUser from './current-user.js';
import regLoginHeader from './templates/reg-log-header.js';
import logoutHeader from './templates/logout.js'


export const INDEX_URLS = ['/', 'iundex.html'];
export const REGISTRATION_URL = '/registration';
export const LOGIN_URL = '/login';

export function renderPage() {
    const { pathname: currentUrl } = window.location;
    const header = document.querySelector('header .header-links');

    //рендеринг ссылок в зависимости залогинен ли пользователь
    if (!currentUser.userData) {
        header.innerHTML = regLoginHeader;

    } else {
        header.innerHTML = logoutHeader;
    }


    if (currentUrl === REGISTRATION_URL) {
        renderRegistration();
        return
    }


    if (currentUrl === LOGIN_URL) {
        renderLogIn();
        return
    }

    if (!currentUser.userData) {
        navigateToUrl(LOGIN_URL);

        return;
    }

    if (INDEX_URLS.includes(currentUrl)) {
        renderLists()
        return;
    }


    if (listRoutePattern.test(currentUrl)) {
        const listId = getListIdByUrl();

        console.log(listId)

        const list = lists.getListById(listId);

        if (list.userId !== currentUser.userData.id) {
            
        }

        renderList();
        return;
    }

}

export function navigateToUrl(url) {
    window.history.pushState(
        {},
        url,
        window.location.origin + url
    );

    renderPage();
}