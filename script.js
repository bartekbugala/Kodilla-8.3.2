'use strict';

let outputTempToF = document.getElementById('temp-to-f-output');
let outputTempToC = document.getElementById('temp-to-c-output');

outputTempToF.innerHTML = 'Click the button! to convert °C to °F!' + '<br><br>';
outputTempToC.innerHTML = 'Click the button! to convert °F to °C!' + '<br><br>';

let buttonTempToF = document.getElementById('temp-to-f-button');
let buttonTempToC = document.getElementById('temp-to-c-button');

// If second param decimal not set default is 2 
function round(num, decimal = 2) {
    let multiplier = Math.pow(10, decimal);
    return Math.round(num * multiplier) / multiplier;
};

function celsiusToFahrenheit(tempC) {
    let tempF = (tempC * 1.8) + 32;
    return round(tempF);
};

function fahrenheitToCelsius(tempF) {
    let tempC = (tempF - 32) / 1.8;
    return round(tempC);
};

function trimSpaceReplaceCommaWithDot(input) {
    input = input.replace(',', '.');
    input = input.trim();
    return input;
}

function returnTempMsg(tempC) {

    const tempMsgList = {
        0: 'Water freezes, You should wear winter clothing!',
        12: 'Its cold, wear a hat!',
        17: 'You can wear a coat! It is getting warmer!',
        25: 'It is warm',
        60: 'I\'s getting hot!',
        99: 'Life threatning temperature',
        400: 'Water is boiling or evaporates.',
        524: 'Fire could occurre',
        1000: 'Fire!',
        5505: 'Most probably you can\'t recieve this message'
    };

    function upToTempMsg(temp, array) {
        let tempSteps = Object.keys(array);
        let i = 0;
        let amountOfTempSteps = tempSteps.length;
        while (i < amountOfTempSteps) {
            if (temp <= tempSteps[i] && temp > tempSteps[i - 1]) {
                let key = arrayKeys[i];
                return array[key];
            }
            i++;
        }
        return;
    }

    return upToTempMsg(tempC, tempMsgList);
};

function returnNanIfEmptyOrNaN(input) {
    if (isNaN(input) || input === '') {
        return NaN;
    }
    return input;
};

function displayInHtmlElement(domElement, textToDisplay) {
    domElement.innerHTML = domElement.innerHTML + '<br><hr>' + textToDisplay + '<br><hr>';
}

buttonTempToF.addEventListener('click', function () {

    // (second parameter empty string '' is IE fallback)
    let tempC = window.prompt('Enter Temperature in Celsius degrees', '');

    tempC = trimSpaceReplaceCommaWithDot(tempC);

    if (tempC === null) {
        return;
    }

    tempC = returnNanIfEmptyOrNaN(tempC);

    if (isNaN(tempC)) {
        alert('Please enter a number');
        return;
    }

    let tempF = celsiusToFahrenheit(tempC);
    let tempMsg = returnTempMsg(tempC);
    let finalMsg = 'Input in °C: ' + tempC + '<br><span>Output in °F: ' + tempF + '</span><br><br>' + tempMsg;

    displayInHtmlElement(outputTempToF, finalMsg)
});



buttonTempToC.addEventListener('click', function () {

    // (second parameter empty string '' is IE fallback)
    let tempF = window.prompt('Enter Temperature in Fahrenheit degrees', '');

    tempF = trimSpaceReplaceCommaWithDot(tempF);

    if (tempF === null) {
        return;
    }

    tempF = returnNanIfEmptyOrNaN(tempF);

    if (isNaN(tempF)) {
        alert('Please enter a number');
        return;
    }

    let tempC = fahrenheitToCelsius(tempF);
    let tempMsg = returnTempMsg(tempC);

    let finalMsg = 'Input in °F: ' + tempF + '<br><span>Output in °C:' + tempC + '</span><br><br>' + tempMsg;

    displayInHtmlElement(outputTempToC, finalMsg);
});