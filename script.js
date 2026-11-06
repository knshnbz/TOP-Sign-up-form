console.log("Hello World");

const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#c-password');
const hintItems = document.querySelectorAll('.hints-list [data-rule]');

const rules = {
    length: (value) => value.length >= 8,
    upper: (value) => /[A-Z]/.test(value),
    symbol: (value) => /[^A-Za-z0-9]/.test(value),
}

function updateHints() {
    const value = password.value;
    let allMet = true;

    hintItems.forEach((item) => {
        const isMet = rules[item.dataset.rule](value);
        item.classList.toggle('met', isMet);
        if (!isMet) allMet = false;
    });

    return allMet;
}

function validatePassword() {
    const allMet = updateHints();
    password.setCustomValidity(
        allMet ? '' : 'Password does not meet all requirements.'
    );
    return allMet;
}

function validateMatch() {
    const matches = confirmPassword.value === password.value;
    confirmPassword.setCustomValidity(
        matches ? '' : 'Passwords do not match.'
    );
}

password.addEventListener('input', () => {
    validatePassword();
    if (confirmPassword.value) validateMatch();
});

confirmPassword.addEventListener('input', validateMatch);
