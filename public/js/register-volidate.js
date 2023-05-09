const f = document.querySelector('.form');
const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("/js/alerts.js")

f.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('.form__email');
    const username = document.querySelector('.form__username');
    const password = document.querySelector('.form__password');
    const password_confirm = document.querySelector('.form__confirm__password');

    email.style.borderColor = null;
    username.style.borderColor = null;
    password.style.borderColor = null;
    password_confirm.style.borderColor = null;

    let isValid = true;

    if (email.value.length < 6 || !email.value.match(pattern)) {
        email.style.borderColor = "red";
        isValid = false;
    } else {
        email.style.borderColor = "green";
    }

    if (username.value.replaceAll(' ', '').length < 6) {
        username.style.borderColor = "red";
        isValid = false;
    } else {
        username.style.borderColor = "green";
    }

    if (password.value.replaceAll(' ', '').length <= 5) {
        password.style.borderColor = "red";
        isValid = false;
    } else {
        password.style.borderColor = "green";
    }

    if (
        password.value.replaceAll(' ', '') !== password_confirm.value.replaceAll(' ', '') ||
        password.value.replaceAll(' ', '').length < 6
    ) {
        password_confirm.style.borderColor = "red";
        isValid = false;
    } else {
        password_confirm.style.borderColor = "green";
    }

    if (isValid) {
        alers("Успешно!", '', 'success');
        f.submit();
    } else {
        alers('Ошибка!', 'Указаны не все поля', 'error')
    }
});


const input = document.querySelectorAll('input')
input.forEach((key) => {

    if (key.name == "email") {
        return key.addEventListener('input', () => {

            if (key.value.match(pattern)) {
                key.style.borderColor = `green`;
            }
            else {
                key.style.borderColor = null;
            }
        })
    }

    if (key.name == "password_confirm") {
        return key.addEventListener('input', () => {
            let key_replace = key.value.replaceAll(' ', '').length

            let password = document.querySelector('.form__password')
            let password_replace = password.value.replaceAll(' ', '').length

            if (password_replace == 0) return key.style.borderColor = null;

            if (key_replace >= 6) {
                if (key_replace != password_replace) {
                    return key.style.borderColor = `yellow`;
                }
                else if (key_replace == password_replace) {
                    return key.style.borderColor = `green`;
                }
                else {
                    return key.style.borderColor = `green`;
                }
            } else {
                return key.style.borderColor = null;
            }
        })
    }

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
