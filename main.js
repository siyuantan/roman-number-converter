var numberMap = new Map(
    [
        ['1', 'I'], 
        ['5', 'V'], 
        ['10', 'X'], 
        ['50', 'L'], 
        ['100', 'C'], 
        ['500', 'D'], 
        ['1000', 'M']
    ]
);

var romanMap = new Map();
numberMap.forEach((value, key) => romanMap.set(value, key));

function convertRomanBtnClick() {
    var romanInput = document.getElementById("input-roman");
    var numberInput = document.getElementById("input-number");

    numberInput.value = convertRomanToNumber(romanInput.value.trim());
}

function convertNumberBtnClick() {
    var romanInput = document.getElementById("input-roman");
    var numberInput = document.getElementById("input-number");
    
    romanInput.value = convertNumberToRoman(numberInput.value.trim());
}

function convertNumberToRoman(inputNumberString) {
    var inputNumber = Number(inputNumberString);    
    var firstDigit = Number(inputNumberString.charAt(0));
    var decimalMultiplier = 0;
    
    if (inputNumberString.length === 0 || inputNumber === 0) {
        return '';
    }
    
    else if (inputNumberString.length === 1) {
        decimalMultiplier = 1;
        return generateRomanString(decimalMultiplier, firstDigit, inputNumberString, inputNumber);
    }
    
    else if (inputNumberString.length === 2) {
        decimalMultiplier = 10;
        return generateRomanString(decimalMultiplier, firstDigit, inputNumberString, inputNumber);
    }
    
    else if (inputNumberString.length === 3) {
        decimalMultiplier = 100;
        return generateRomanString(decimalMultiplier, firstDigit, inputNumberString, inputNumber);
    }
    
    else {
        if (inputNumber === 1000) {
            decimalMultiplier = 1000;
            const one = 1 * decimalMultiplier;
            
            return numberMap.get(String(one));
        }
        return 'Cannot be more than 1000';
    }
}

function generateRomanString(decimalMultiplier, _firstDigit, _inputNumberString, _inputNumber) {
    const one = 1 * decimalMultiplier;
    const fifth = 5 * decimalMultiplier;
    const tenth = 10 * decimalMultiplier;
    
    if (_firstDigit === 4) {
        return numberMap.get(String(one)) + numberMap.get(String(fifth)) + convertNumberToRoman(_inputNumberString.slice(1));
    } 
    else if (_firstDigit === 9) {
        return numberMap.get(String(one)) + numberMap.get(String(tenth)) + convertNumberToRoman(_inputNumberString.slice(1));
    }
    else if (_firstDigit < 5) {
        return numberMap.get(String(one)) + convertNumberToRoman(String(_inputNumber - (one)));
    } 
    else if (_firstDigit >= 5) {
        return numberMap.get(String(fifth)) + convertNumberToRoman(String(_inputNumber - (fifth)));
    }
}

function convertRomanToNumber(inputRomanString) {
    const firstLetter = inputRomanString.length > 0 ? inputRomanString.charAt(0) : '';
    const secondLetter = inputRomanString.charAt(1);
    
    if (inputRomanString.length === 0) {
        return 0;
    }
    else {
        const currentRomanValueString = romanMap.get(firstLetter);
        const nextRomanValueString = romanMap.get(secondLetter);
        const currentRomanValue = Number(currentRomanValueString);
        const nextRomanValue = Number(nextRomanValueString);
        
        if (currentRomanValue) {
            console.warn('Input romanValue: ', currentRomanValue);

            if ((currentRomanValue === 1 && nextRomanValue === 5) || (currentRomanValue === 10 && nextRomanValue === 50) || (currentRomanValue === 100 && nextRomanValue === 500) ||
            (currentRomanValue === 1 && nextRomanValue === 10) || (currentRomanValue === 10 && nextRomanValue === 100) || (currentRomanValue === 100 && nextRomanValue === 1000)) {
                return nextRomanValue - currentRomanValue + convertRomanToNumber(inputRomanString.slice(2));
            }

            return currentRomanValue + convertRomanToNumber(inputRomanString.slice(1));
        } else {
            return 0;
        }
    }
}