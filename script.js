let screenDisplay = '0';
let runningTotal = 0;
let previousOperator = null;
const screen  = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    reRender();
}

function handleNumber(number) {
    if (screenDisplay === '0') {
        screenDisplay = number;
    } else {
        screenDisplay += number;
    }
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': 
            screenDisplay = '0';
            break;
        case '=': 
            if (previousOperator === null) {
                return;
            }
            calculateRunningTotal(parseInt(screenDisplay));
            previousOperator = null;
            screenDisplay = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if (screenDisplay.length === 1) {
                screenDisplay = '0';
            } else {
                screenDisplay = screenDisplay.substring(0, screenDisplay.length - 1);
            }
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(value) {
    // if (screenDisplay === '0') {
    //     return;
    // }

    const intScreenDisplay = parseInt(screenDisplay);
    if (runningTotal === 0) {
        runningTotal = intScreenDisplay;
    } else {
        calculateRunningTotal(intScreenDisplay);
    }

    previousOperator = value;
    screenDisplay = '0';
}

function calculateRunningTotal(intScreenDisplay) {
    if (previousOperator === '+'){
        runningTotal += intScreenDisplay;
    } else if (previousOperator === '−') {
        runningTotal -= intScreenDisplay;
    } else if (previousOperator === '×') {
        runningTotal *= intScreenDisplay;
    } else if (previousOperator === '÷') {
        runningTotal /= intScreenDisplay;
    }
}

function reRender(){
    screen.innerText = screenDisplay;
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(e) {
        buttonClick(e.target.innerText);
    })
}

init();