import storageService from './storage-service.js'

class TaskList {
    constructor(tasks) {
        this.tasks = tasks;
    }

    add(newTask) {
        this.tasks = [...this.tasks, newTask];
    }

    delete(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    deleteTaskByList(listId) {
        taskList.tasks = taskList.tasks.filter((task) => task.parentListId !== listId);
    }

    check(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return { ...task, checked: !task.checked }
            }
            return task;
        })

    }

    edit(text, id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: text };
            }
            return task;
        })
    }
}

const tasks = JSON.parse(storageService.get('tasks'))

const taskList = new TaskList(tasks ? tasks : []); // =[]

export default taskList;