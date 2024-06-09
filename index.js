const calcDisplay = document.getElementById("display");
const settings = { shouldReset: true };

function addCharacter(character) {
    if (calcDisplay.value === "0" && settings.shouldReset) {
        calcDisplay.value = "";
    }
    calcDisplay.value += character;
    calcDisplay.value = formatWithCommas(calcDisplay.value.replace(/,/g, ""));
    settings.shouldReset = false;
}

function formatWithCommas(number) {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

const validKeys = [
    'x', '+', '-', '/', '.', '=', '*',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'CapsLock'
];

calcDisplay.addEventListener('keydown', function(event) {
    if (!validKeys.includes(event.key) && !event.shiftKey) {
        alert('Key not allowed');
        event.preventDefault();
    }

    if (event.key === '=' || event.key === 'Enter') {
        performCalculation();
        if (event.key === '=') {
            event.preventDefault();
        }
    }
});

document.addEventListener('keydown', function(event) {
    event.stopPropagation();

    if (!validKeys.includes(event.key) && !event.shiftKey) {
        alert('Key not allowed');
        return;
    }

    if (event.key === '=' || event.key === 'Enter') {
        performCalculation();
        event.preventDefault();
    } else if (['x', '+', '-', '/', '.', '=', '*', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
        addCharacter(event.key === '*' ? 'x' : event.key);
    } else if (event.key === 'Backspace') {
        removeLastCharacter();
    }
});

function performCalculation() {
    const expression = calcDisplay.value.replaceAll('x', '*').replace(/,/g, "");
    try {
        calcDisplay.value = formatWithCommas(eval(expression));
    } catch (error) {
        calcDisplay.value = "ERROR";
    }
    settings.shouldReset = true;
}

function clearDisplay() {
    calcDisplay.value = "0";
    settings.shouldReset = true;
}

function removeLastCharacter() {
    if (["ERROR", 'undefined', 'Infinity'].includes(calcDisplay.value)) {
        calcDisplay.value = "0";
        settings.shouldReset = true;
        return;
    }
    calcDisplay.value = calcDisplay.value.slice(0, -1) || "0";
    calcDisplay.value = formatWithCommas(calcDisplay.value.replace(/,/g, ""));
    settings.shouldReset = true;
}

// Theme changer

function switchTheme() {
    const body = document.querySelector('body');
    const toggle = this;
    if (body.classList.contains('theme-1')) {
        body.classList.replace('theme-1', 'theme-2');
        toggle.style.margin = "0 auto";
    } else if (body.classList.contains('theme-2')) {
        body.classList.replace('theme-2', 'theme-3');
        toggle.style.margin = "0 0 0 auto";
    } else {
        body.classList.replace('theme-3', 'theme-1');
        toggle.style.margin = "0";
    }
}

const themeToggleButton = document.getElementById("toggle-circle");
themeToggleButton.addEventListener("click", switchTheme);
