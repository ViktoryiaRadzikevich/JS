export function getId(element) {
    return parseInt(element.id);
}

export function generateId(tasks) {
    // console.log(tasks)
    //получаем массив значений свойства id всех объектов task
    const ids = tasks.map(task => {
        return task.id;
    })

    //если у нас пустой массив, значит начианем нумерацию с единицы
    if (!ids.length) {
        return 1;
    }
    //нвходим макс айди
    const maxId = Math.max(...ids);
    //возращаем новый больше макс на 1 
    return maxId + 1;
}


export function getListIdByUrl() {
    const currentUrl = window.location.pathname;
    console.log(currentUrl)
    const splittedCurrentUrl = currentUrl.split('/');
    return parseInt(splittedCurrentUrl[splittedCurrentUrl.length - 1], 10);
}