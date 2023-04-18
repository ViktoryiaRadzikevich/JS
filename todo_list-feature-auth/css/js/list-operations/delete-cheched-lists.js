import listsList from '../lists-list.js';
import storageService from '../storage-service.js';
import { getId } from '../utils.js';
import taskList from '../tasks.js';

function deleteCheckedLists() {


    const checkedLists = document.querySelectorAll('li.checked');
    const deleteCheckedBtn = document.querySelector('.delete-checked-btn');

    checkedLists.forEach((checkedList) => {
        checkedList.remove();

        const listId = getId(checkedList);
        listsList.delete(listId);

        //удаляем из массива таски соответствующие этому листу
        taskList.tasks = taskList.tasks.filter((task) => task.parentListId !== listId);
    })

    
    


    deleteCheckedBtn.setAttribute('disabled', "true");


    storageService.set('tasks', JSON.stringify(taskList.tasks));
    storageService.set('lists', JSON.stringify(listsList.lists));
}

export default deleteCheckedLists;