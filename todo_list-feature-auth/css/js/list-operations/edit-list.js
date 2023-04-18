import { ENTER_KEY_CODE } from '../constants.js';
import listsList from '../lists-list.js';
import { getId } from '../utils.js';
import storageService from '../storage-service.js'

function submitList(event) {
    if (event.keyCode !== ENTER_KEY_CODE) {
        return
    }

    const li = event.target.closest('li');
    //записываем иконки
    const icon = li.querySelector('.edit-btn i');
    //записываем их список классов
    const { classList: iconClass } = icon;
    // const iconClass = icon.classList

    const checkbox = li.querySelector('input[type="checkbox"]')

    saveList(li, iconClass, checkbox);
}

function saveList(li, iconClass, checkbox) {
    const input = li.querySelector('input[type="text"]');
    const { value: newText } = input;

    //заменяем класс иконок
    iconClass.remove('fa-save');
    iconClass.add('fa-edit');

    //убираем атрибут дизабл
    checkbox.removeAttribute("disabled");
    // console.log(checkbox.checked)


    const newLink = document.createElement('a');
    newLink.setAttribute('href', '#')
    newLink.textContent = newText;

    li.replaceChild(newLink, input);

    const listId = getId(li);
    listsList.edit(newText, listId);

    storageService.set('lists', JSON.stringify(listsList.lists));

}

function editList(event) {

    /* находим a текущего таска
    записываем его содержимое  в переменную
    создаем текстовый инпут с value равным содержимому a
    и всталвяем его вместо a
    после повторного нажатия на кнопку едит,
    сохраняем текущее значение инпута
    заменяем инпут на a с новым значением */

    const li = event.target.closest('li');

    const link = li.querySelector('a');

    //записываем иконки
    const icon = li.querySelector('.edit-btn i');
    //записываем их список классов
    const { classList: iconClass } = icon;
    // const iconClass = icon.classList

    const checkbox = li.querySelector('input[type="checkbox"]')

    if (link) {


        const { textContent: text } = link;

        const input = document.createElement('input');
        // input.setAttribute('value', text);
        input.setAttribute('type', "text");

        input.addEventListener('keydown', submitList)


        //заменяем класс иконок
        iconClass.remove('fa-edit');
        iconClass.add('fa-save');

        //устанавливаем атрибут disabel for checkbox
        checkbox.setAttribute("disabled", "true");

        li.replaceChild(input, link);

        //делаем автофокус при нажатии на кнопку едит
        input.focus();
        //стираем инпут и дописываем перед фокусом текст
        input.value = "";
        input.value = text;

        return;
    }
    saveList(li, iconClass, checkbox);



}

export default editList;