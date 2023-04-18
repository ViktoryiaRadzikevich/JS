import listsList from '../lists-list.js';
import storageService from '../storage-service.js'
import taskList from '../tasks.js';
import {getId} from '../utils.js'

//функция удаления элемента из списка дел при нажатии на кнопку delBtn
function delList(event) {
    //получаем свойство парентнод объекта ивент.таргер.паретнтноде
    const { parentNode } = event.target.parentNode;

    //удаляем из массива
    const listId = getId(parentNode);
    taskList.deleteTaskByList(listId);
    listsList.delete(listId);
    
    //удаляем из массива таски соответствующие этому листу
    // taskList.tasks = taskList.tasks.filter((task) => task.parentListId !== listId);
    
    parentNode.remove();

    const deleteCheckedBtn = document.querySelector('.delete-checked-btn');
    if (document.querySelectorAll('li.checked').length === 0) {
        deleteCheckedBtn.setAttribute('disabled', "true")
    }

    storageService.set('tasks', JSON.stringify(taskList.tasks));
    storageService.set('lists', JSON.stringify(listsList.lists));
}

export default delList;
