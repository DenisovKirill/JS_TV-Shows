//Валидация формы.

const nameField = document.getElementById('name');
const passField = document.getElementById('pass');
const btn = document.getElementById('btn');
let errors = {};

const showError = (block) => {
    block.style.border = '2px red solid'
}

const validator = (el, min, field) => {
    if (el.value.length < min)
    errors = {
        ...errors,
        [field]: true
    }
}

fn = () => {
    validator(nameField, 3, 'name');
    validator(passField, 6, 'pass');

    for (let key in errors) {
        if (key) {
            showError(document.getElementById(key))
        }
    }

    const trigger = isNaN(+passField.value);
    if(trigger){
        showError(passField)
    }
}

btn.addEventListener('click', fn);