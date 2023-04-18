import { ENTER_KEY_CODE } from '../constants.js';
import taskList from '../tasks.js';
import { getId } from '../utils.js';
import storageService from '../storage-service.js'

function submitTask(event) {
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

    saveTask(li, iconClass, checkbox);
}

function saveTask(li, iconClass, checkbox) {
    const input = li.querySelector('input[type="text"]');
    const { value: newText } = input;

    //заменяем класс иконок
    iconClass.remove('fa-save');
    iconClass.add('fa-edit');

    //убираем атрибут дизабл
    checkbox.removeAttribute("disabled");
    console.log(checkbox.checked)


    const newSpan = document.createElement('span');
    newSpan.textContent = newText;

    li.replaceChild(newSpan, input);

    const taskId = getId(li);
    taskList.edit(newText, taskId);
    storageService.set('tasks', JSON.stringify(taskList.tasks));

}

function editTask(event) {

    /* находим спан текущего таска
    записываем его содержимое  в переменную
    создаем текстовый инпут с value равным содержимому спана
    и всталвяем его вместо спана
    после повторного нажатия на кнопку едит,
    сохраняем текущее значение инпута
    заменяем инпут на спан с новым значением */

    const li = event.target.closest('li');

    const span = li.querySelector('span');

    //записываем иконки
    const icon = li.querySelector('.edit-btn i');
    //записываем их список классов
    const { classList: iconClass } = icon;
    // const iconClass = icon.classList

    const checkbox = li.querySelector('input[type="checkbox"]')

    if (span) {


        const { textContent: text } = span;

        const input = document.createElement('input');
        // input.setAttribute('value', text);
        input.setAttribute('type', "text");

        input.addEventListener('keydown', submitTask)


        //заменяем класс иконок
        iconClass.remove('fa-edit');
        iconClass.add('fa-save');

        //устанавливаем атрибут disabel for checkbox
        checkbox.setAttribute("disabled", "true");

        li.replaceChild(input, span);

        //делаем автофокус при нажатии на кнопку едит
        input.focus();
        //стираем инпут и дописываем перед фокусом текст
        input.value = "";
        input.value = text;

        return;
    }
    saveTask(li, iconClass, checkbox);



}

export default editTask;