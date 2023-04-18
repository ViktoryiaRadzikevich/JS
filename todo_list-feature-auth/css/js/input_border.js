

// const inputField = document.querySelector('input[type="text"]');
// const inputBottomBorder = document.getElementById('input-border');

// window.onclick = function (event) {
//     if (event.target === inputField) {
//         inputBottomBorder.style.width = "calc(100% - 48px)";
//     }
//     if (event.target !== inputField) {
//         inputBottomBorder.style.width = "0px";
//     }
// }

function animateBorder(event) {
    const inputField = document.querySelector('input[type="text"]');
    const inputBottomBorder = document.getElementById('input-border');

    if (event.target === inputField) {
        inputBottomBorder.style.width = "calc(100% - 48px)";
    }
    if (event.target !== inputField) {
        inputBottomBorder.style.width = "0px";
    }
}

export default animateBorder;