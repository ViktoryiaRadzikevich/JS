import listsTemplate from '../templates/pages/lists/index.js';
import addList, { createList } from '../list-operations/add-list.js';
import listsList from '../lists-list.js';
import currentUser from '../current-user.js';
import storageService from '../storage-service.js';
import { navigateToUrl, LOGIN_URL } from '../routing.js';
import logout from '../auth/logout.js';

function renderLists() {
    const rootDiv = document.querySelector('.container');
    //если адресная строка после домена пуста то
    //создаем первый экран со списками списками в контейнере
    rootDiv.innerHTML = listsTemplate;

    const addListForm = document.querySelector('.add-form > form');

    //вешаем обработчик событий на форму добавления
    addListForm.addEventListener('submit', addList);


    const currentUserId = currentUser.userData.id;


    listsList.lists
        .filter((list) => list.userId === currentUserId)
        .forEach(list => {
        createList(list);
    });
    
    
    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', (event)=> logout(event))
    
    
}

export default renderLists;