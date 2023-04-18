import listsList from '../lists-list.js';
import taskList from '../tasks.js'
import storageService from '../storage-service.js';
import { getId } from '../utils.js';

function deleteCheckedTasks() {
    
    const checkedTasks = document.querySelectorAll('li.checked');
    const deleteCheckedBtn = document.querySelector('.delete-checked-btn');
    // console.log(deleteCheckedBtn)

    checkedTasks.forEach((checkedTask) => {
        checkedTask.remove();

        const taskId = getId(checkedTask);
        taskList.delete(taskId);
    })


    deleteCheckedBtn.setAttribute('disabled', "true");

    storageService.set('tasks', JSON.stringify(taskList.tasks));

}

export default deleteCheckedTasks;