function showErrors(errors, hasErrors) {
    for (let key in errors) {
        const span = document.querySelector(`input[name="${key}"] + span`);
        if (errors[key].length > 0) {
            hasErrors = true;
            const errorStr = errors[key].join('<br>');
            span.innerHTML = errorStr;
        } else {
            span.innerHTML = '';
        }
    }

    return hasErrors;
}

export default showErrors;