import addTask, { createTask } from '../task-operations/add-task.js';
import { getListIdByUrl } from '../utils.js';
import taskList from '../tasks.js';
import template from '../templates/pages/list/index.js';

function renderList() {
    const rootDiv = document.querySelector('.container');
    rootDiv.innerHTML = template;

    //находим форму добавления
    const addForm = document.querySelector(".add-form");

    //вешаем обработчик события сабмит(отправку) на форму
    addForm.addEventListener("submit", addTask);

    const listId = getListIdByUrl();


    taskList.tasks
    .filter((task) => task.parentListId === listId)
    .forEach(task => {
        createTask(task);
    });
}

export default renderList;