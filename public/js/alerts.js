const alers = (title, text, icon) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    return Toast.fire({

        icon: icon,
        title: title,
        text: text,
        color: '#fff',
        background: '#2b2b2b',
    })
}