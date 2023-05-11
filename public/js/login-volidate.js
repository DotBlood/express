var aform = document.querySelector('.auth__form')

aform.addEventListener('submit', (e) => {
    e.preventDefault();
    let username = aform.querySelector('.username');
    let password = aform.querySelector('.password');

    if (username.value.replaceAll(' ', '').length <= 5) {
        username.style.borderColor = `red`
        alers('Ошибка!', 'Поле username не может быть пустым!', 'error');
    }
    if (password.value.replaceAll(' ', '').length <= 5) {
        password.style.borderColor = `red`
        alers('Ошибка!', 'Поле password не может быть пустым!', 'error');
    }

    if (username.value.replaceAll(' ', '').length >= 6 && password.value.replaceAll(' ', '').length >= 6) {
        aform.submit()
    }

    if (username.value.replaceAll(' ', '').length <= 5 && password.value.replaceAll(' ', '').length <= 5) {
        username.style.borderColor = `red`
        password.style.borderColor = `red`
        return alers('Ошибка!', 'Вы заполнили не все поля!', 'error');
    }
})