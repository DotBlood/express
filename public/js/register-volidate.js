const auth__form = document.querySelector('.auth__form');
const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


auth__form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = auth__form.querySelector('.email');
    const username = auth__form.querySelector('.username');
    const password = auth__form.querySelector('.password');
    const password_confirm = auth__form.querySelector('.password_confirm');

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

    if (username.value.replaceAll(' ', '').length <= 6) {
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
        auth__form.submit();
    } else {
        alers('Ошибка!', 'Указаны не все поля', 'error')
    }
});


const input = document.querySelectorAll('input')
input.forEach((key) => {
    console.log(key)

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

            let password = auth__form.querySelector('.password')
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
