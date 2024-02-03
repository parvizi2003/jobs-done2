let form = document.querySelector('.index-form');
let inps = form.querySelectorAll('.form-control');
let btn = form.querySelector('.btn');
let showErr = document.querySelector('.show-err')
btn.addEventListener('click', (event) => {
    event.preventDefault();
    for (let inp of inps) {
        if (inp.value == '') {
            showErr.textContent = 'Inputs must be filled'
            return
        }
    }
    form.submit();
})