
const display = document.getElementById("display");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendValue(value) {

    if ("+-*/".includes(value)) {
        if (operator !== null && !shouldReset) {
            calculate();
        }

        previousInput = Number(currentInput);
        operator = value;
        shouldReset = true;
        return;
    }

    if (value === ".") {
        if (shouldReset) {
            currentInput = "0.";
            shouldReset = false;
        } else if (!currentInput.includes(".")) {
            currentInput += ".";
        }
    } else {
        if (shouldReset || currentInput === "0") {
            currentInput = value;
            shouldReset = false;
        } else if (currentInput.length < 15) {
            currentInput += value;
        }
    }

    updateDisplay();
}

function calculate() {

    if (operator === null || previousInput === null) {
        return;
    }

    const secondInput = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = previousInput + secondInput;
            break;

        case "-":
            result = previousInput - secondInput;
            break;

        case "*":
            result = previousInput * secondInput;
            break;

        case "/":
            if (secondInput === 0) {
                currentInput = "Cannot divide by zero";
                operator = null;
                previousInput = null;
                shouldReset = true;
                updateDisplay();
                return;
            }
            result = previousInput / secondInput;
            break;
    }

    currentInput = String(Number(result.toPrecision(12)));
    operator = null;
    previousInput = null;
    shouldReset = true;

    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    shouldReset = false;
    updateDisplay();
}

function deleteNumber() {
    if (shouldReset) return;

    currentInput = currentInput.slice(0, -1);

    if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
    }

    updateDisplay();
}
