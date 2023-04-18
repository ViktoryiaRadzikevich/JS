import checkList from './check-list.js';
import delList from './del-list.js';
import editlist from "./edit-list.js";
import listsList from '../lists-list.js';
import { generateId } from '../utils.js';
import storageService from '../storage-service.js';
import { navigateToUrl } from '../routing.js';
import currentUser from '../current-user.js';



export function createList(list) {
    //находим сам список
    const listofLists = document.querySelector('ol');

    //создаем ли в ол
    const newListItem = document.createElement('li');
    newListItem.setAttribute('id', `${list.id}`);

    //добавляем новый элемент в список
    listofLists.appendChild(newListItem);

    newListItem.innerHTML = `
    <input type="checkbox" id=${list.id}checkbox> 
    <a href="#">${list.name}</a>
    <button class="edit-btn" id=${list.id}edit><i class="far fa-edit fa-fw"></i></button>
    <button class="delete-btn" id=${list.id}del><i class="far fa-trash-alt fa-fw"></i></button>
    `

    const linkToList = newListItem.querySelector('a');

    linkToList.addEventListener('click', (event) => {
        //чтобы решетка не появилась в конце урла
        event.preventDefault();
        navigateToUrl(`/list/${list.id}`);
    });


    //код для установки чекбокса при перезагрузке
    if (list.checked) {
        newListItem.classList.add('checked');
        const checkboxInput = newListItem.querySelector('input[type="checkbox"]');
        checkboxInput.setAttribute('checked', true)
    }


    //код делающим доступным кнопку удалить все выделенные
    //если были сохраненные отмеченные
    if (document.querySelectorAll('li.checked').length !== 0) {
        const deleteCheckedBtn = document.querySelector('.delete-checked-btn');
        deleteCheckedBtn.removeAttribute('disabled');
    }

    //записываем каждый чекбокс
    const checkbox = document.getElementById(`${list.id}checkbox`);
    //записываем каждую кнопку удаления
    const delBtn = document.getElementById(`${list.id}del`);
    //записываем каждую кнопку редактирования
    const editBtn = document.getElementById(`${list.id}edit`);

    //при изменении состояни чекбокса выполняем функцию
    //то есть вешаем обработчик события, который ждет клика
    checkbox.addEventListener('change', checkList)
    //при нажатии на кнопку удалить выполняем функцию
    delBtn.addEventListener('click', delList)

    editBtn.addEventListener('click', editlist)



}

function addList(event) {
    //предотвращаем перезагрузку страницы при нажатии на сабмит формы
    event.preventDefault();

    //получаем все значения полей формы
    const formData = new FormData(event.target);

    //переменная для названия формы
    //содержит в себе поле нейм формы
    const listName = formData.get('name');

    //если поле пустое ничего не добавляем
    if (!listName) {
        return;
    }

    //создам объект для отдельного элемента списка
    const newList = {
        id: generateId(listsList.lists),
        userId: currentUser.userData.id,
        name: listName
    };


    //функция добавления нового элемента в список списков
    listsList.add(newList);

    createList(newList);

    //очистим поле ввода формы
    event.target.reset();
    //сюда дописать функионал добалвения (как в эдд таск)

    storageService.set('lists', JSON.stringify(listsList.lists));

}

export default addList;