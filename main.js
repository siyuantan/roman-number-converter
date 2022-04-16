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

var romanMap = new Map(
    [
        ['I', '1'], 
        ['V', '5'], 
        ['X', '10'], 
        ['L', '50'], 
        ['C', '100'], 
        ['D', '500'], 
        ['M', '1000']
    ]
);

function convertRomanBtnClick() {
    var romanInput = document.getElementById("input-roman");
    var numberInput = document.getElementById("input-number");
}

function convertNumberBtnClick() {
    var romanInput = document.getElementById("input-roman");
    var numberInput = document.getElementById("input-number");
    
    romanInput.value = String(convertNumberToRoman(numberInput.value.trim()));
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
    
    return 0;
}