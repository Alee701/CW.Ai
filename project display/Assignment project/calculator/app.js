function appendToDisplay(value) {
    var displayValue = document.getElementById('display').value;
    if (value === '+/-') {
        if (displayValue.charAt(0) === '-') {
            document.getElementById('display').value = displayValue.slice(1);
        } else {
            document.getElementById('display').value = '-' + displayValue;
        }
    } else if (value === '.') {
        if (!displayValue.includes('.')) {
            document.getElementById('display').value += value;
        }
    } else if (value === '3-digit') {
        if (displayValue.length === 0 || displayValue === '0') {
            document.getElementById('display').value = '100';
        } else {
            document.getElementById('display').value += '100';
        }
    } else {
        if (displayValue.length === 0 || displayValue === '0') {
            document.getElementById('display').value = value;
        } else {
            document.getElementById('display').value += value;
        }
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    var displayValue = document.getElementById('display').value;
    document.getElementById('display').value = displayValue.slice(0, -1);
}

function calculate() {
    try {
        var result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result.toLocaleString('en-US');
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}
