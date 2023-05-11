const f = document.querySelector('.form')
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("/js/alerts.js")

f.addEventListener('submit', (e) => {
    e.preventDefault()
    let username = document.querySelector('.form__username')
    let password = document.querySelector('.form__password')
    let username_replace = username.value.replaceAll(' ', '')
    let password_replace = password.value.replaceAll(' ', '')

    switch (true) {
        case username_replace.length >= 6 && password_replace.length >= 6:
            alers("Успешно!", 'Идет загрузка', 'success');
            f.submit();
            return

        case password_replace.length < 6 && username_replace.length >= 6:
            alers('Ошибка', 'Неверный пароль', 'error')
            password.style.borderColor = `red`;
            break;

        case password_replace.length >= 6 && username_replace.length < 6:
            alers('Ошибка', 'Неверное имя пользывателя', 'error')
            username.style.borderColor = `red`;
            break;

        default:
            alers('Ошибка', 'Указаны не все поля', 'error')
            password.style.borderColor = `red`;
            username.style.borderColor = `red`;
            break;
    }
});

const input = document.querySelectorAll('input')
input.forEach((key) => {
    key.addEventListener('input', () => {
        let key_replace = key.value.replaceAll(' ', '')
        if (key_replace.length >= 6) {
            return key.style.borderColor = `green`;
        }
        else {
            return key.style.borderColor = null;
        }
    })
})
