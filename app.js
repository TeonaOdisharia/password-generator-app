const slider = document.querySelector('.slider');
const length = document.querySelector('.length');

const includeUppercase = document.querySelector('#upper');
const includeLowercase = document.querySelector('#lower');
const includeNumbers = document.querySelector('#numbers');
const includeSymbols = document.querySelector('#symbols');
const generateButton = document.querySelector('.btn-generate');
const passwordDisplay = document.querySelector('.password');
const copyButton = document.querySelector('.password-copy');

var strengthLevel = 0;
const indicators = document.querySelectorAll('.indicator');
const indicatorstext = document.querySelector('.indicator-text');


slider.addEventListener('input', (e) => {
    length.textContent = slider.value;
});

const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
};

generateButton.addEventListener('click', () => {
    const passwordOptions = {
        length: slider.value,
        useUppercase: includeUppercase.checked,
        useLowercase: includeLowercase.checked,
        useNumbers: includeNumbers.checked,
        useSymbols: includeSymbols.checked
    };

    const password = createPassword(passwordOptions);
    passwordDisplay.textContent = password;
    stateColored();
});

function stateColored() {
    var color = 'transparent';
    var text = 'UNDIFINED';

    console.log(strengthLevel);

    if (strengthLevel === 1) {
        color = '#F64A4A';
        text = 'TOO WEAK!';
    }
    if (strengthLevel === 2) {
        color = '#FB7C58';
        text = 'WEAK';
    }
    if (strengthLevel === 3) {
        color = '#F8CD65';
        text = 'MEDIUM';
    }
    if (strengthLevel === 4) {
        color = '#A4FFAF';
        text = 'STRONG';
    }

    indicatorstext.textContent = text;
    for (let i = 0; i < 4; i++) {
        if (i < strengthLevel) {
            indicators[i].style.backgroundColor = color;
            indicators[i].style.border = 'none';
        } else {
            indicators[i].style.backgroundColor = 'transparent';
            indicators[i].style.border = '2px solid #fff';
        }
    }

};


const createPassword = (options) => {
    let charset = '';
    strengthLevel = 0;

    if (options.useUppercase) {
        charset += characters.uppercase;
        strengthLevel++;
    }

    if (options.useLowercase) {
        charset += characters.lowercase;
        strengthLevel++;
    }

    if (options.useNumbers) {
        charset += characters.numbers;
        strengthLevel++;
    }

    if (options.useSymbols) {
        charset += characters.symbols;
        strengthLevel++;
    }

    if (charset.length === 0) {
        alert('Please select at least one character type.');
        return '';
    }

    let password = '';
    for (let i = 0; i < options.length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    return password;
};

copyButton.addEventListener('click', () => {
    const passwordToCopy = passwordDisplay.textContent;
    if (passwordToCopy) {
        navigator.clipboard.writeText(passwordToCopy);
        alert('Password copied to clipboard!');
    }
});