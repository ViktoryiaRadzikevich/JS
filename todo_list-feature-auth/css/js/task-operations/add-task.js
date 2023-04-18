import checkTask from './check-task.js';
import delTask from './del-task.js';
import editTask from "./edit-task.js";
import taskList from '../tasks.js';
import storageService from '../storage-service.js';
import { generateId, getListIdByUrl } from '../utils.js';



export function createTask(task) {
    //находим список дел
    const todoList = document.querySelector('.todo-list ol');


    //создаем элемент списка
    const newTodo = document.createElement('li');

    newTodo.setAttribute('id', `${task.id}`)

    //добавляем элемент списка в конец списка заданий
    todoList.appendChild(newTodo);

    //добавляем в элемент списка штмл с текстом инпута и тд
    newTodo.innerHTML = `
    <input type="checkbox" id=${task.id}checkbox> 
    <span>${task.text}</span>  
    <button class="edit-btn" id=${task.id}edit><i class="far fa-edit fa-fw"></i></button>
    <button class="delete-btn" id=${task.id}del><i class="far fa-trash-alt fa-fw"></i></button>
    `;


    //код для установки чекбокса при перезагрузке
    if (task.checked) {
        newTodo.classList.add('checked');
        const checkboxInput = newTodo.querySelector('input[type="checkbox"]');
        checkboxInput.setAttribute('checked', true)
    }


    //код делающим доступным кнопку удалить все выделенные
    //если были сохраненные отмеченные
    if (document.querySelectorAll('li.checked').length !== 0) {
        const deleteCheckedBtn = document.querySelector('.delete-checked-btn');
        deleteCheckedBtn.removeAttribute('disabled');
    }

    //записываем каждый чекбокс
    const checkbox = document.getElementById(`${task.id}checkbox`);
    //записываем каждую кнопку удаления
    const delBtn = document.getElementById(`${task.id}del`);

    const editBtn = document.getElementById(`${task.id}edit`);

    //при изменении состояни чекбокса выполняем функцию
    //то есть вешаем обработчик события, который ждет клика
    checkbox.addEventListener('change', checkTask)
    //при нажатии на кнопку удалить выполняем функцию
    delBtn.addEventListener('click', delTask)

    editBtn.addEventListener('click', editTask)
}



function addTask(event) {

    //сброс стандартного поведения формы
    event.preventDefault();

    //получаем все значения полей формы
    const formData = new FormData(event.target);

    //получаем текст из инпута формы
    const todoText = formData.get("text");

    //если поле пустое ничего не добавляем
    if (!todoText) {
        return;
    }

    //создаем объект для хранения текста инпута и состояния чекбокса
    const newTask = {
        id: generateId(taskList.tasks),
        parentListId: getListIdByUrl(),
        text: todoText,
        checked: false,
    }

    //добавляем обект в массив заданий
    taskList.add(newTask);
    // console.log(taskList)

    createTask(newTask)

    //очистим поле ввода формы
    event.target.reset();


    storageService.set('tasks', JSON.stringify(taskList.tasks));
}


export default addTask;