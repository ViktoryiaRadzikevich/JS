import taskList from '../tasks.js';
import { getId } from '../utils.js';
import storageService from '../storage-service.js'

//функция для смены стилей отдельного дела при выборе (когда сделано)
function checkTask(event) {

    // const target = event.target;
    //понятие деструктуризации
    //полуачем свойство таргерт объекта ивент
    const { target } = event;

    //const li = target.parentNode; идентично
    const { parentNode: li, checked } = target

    //получаем наш li соответствующий чекбоксу
    // const li = target.parentNode;
    //получаем кнопку delBtn
    const delBtn = target.parentNode.querySelector('button');

    const deleteCheckedBtn = document.querySelector('.delete-checked-btn');

    if (checked) {
        //меняем стили
        li.classList.add('checked');
        delBtn.classList.add('checked');

        if (deleteCheckedBtn.hasAttribute('disabled')) {
            deleteCheckedBtn.removeAttribute('disabled');
        }
    } else {
        li.classList.remove('checked');
        delBtn.classList.remove('checked');

        if (document.querySelectorAll('li.checked').length === 0) {
            deleteCheckedBtn.setAttribute('disabled', "true")
        }
    }


    const taskId = getId(li);
    taskList.check(taskId);
    storageService.set('tasks', JSON.stringify(taskList.tasks));
}

export default checkTask;