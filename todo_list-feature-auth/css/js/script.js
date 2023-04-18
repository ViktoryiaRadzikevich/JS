import deleteCheckedLists from "./list-operations/delete-cheched-lists.js";
import animateBorder from './input_border.js';
import { renderPage } from "./routing.js";

renderPage();

window.addEventListener('popstate', () => {
    renderPage();
});


// //находим кнопку удаления отмеченых
// const deleteCheckedBtn = document.querySelector('.delete-checked-btn');
// //вешаем на нее обработчик событий
// deleteCheckedBtn.addEventListener('click', deleteCheckedLists);

// window.addEventListener('click', animateBorder);

