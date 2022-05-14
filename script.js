const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    if (newNumber) {
        display.textContent = numero;
        newNumber = false;
    } else display.textContent += numero;
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent;
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    /**
     * ALterando a função calculate para considerar ',' como separador de decimal
     */

    const actualNumber = display.textContent;

    var numero1 = parseFloat(previousNumber.replace(',', '.'));
    var numero2 = parseFloat(actualNumber.replace(',', '.'));


    // const result = eval(`${previousNumber}${operator}${actualNumber}`); //template string, utilizando craze
    const result = eval(`${numero1}${operator}${numero2}`);

    console.log(result);

    var resultado = '' + result.toFixed(2);

    newNumber = true;

    // retorna o resultado substituindo '.' por ','
    updateDisplay(resultado.replace('.', ','));
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    clearDisplay();
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () =>
    (display.textContent = display.textContent.slice(0, -1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

const addDecimal = () => {

    console.log("Tamanho: " + display.textContent.length);
    console.log("NewNumber: " + newNumber);
    if (display.textContent.length == 0 || newNumber) {
        clearDisplay();
        newNumber = false;
        updateDisplay("0,");
    } else {
        // verificar se já possui casa decimal para não incluir nova ','
        if (display.textContent.search(",") < 0) {
            updateDisplay(",");
        }
    }
}

document.querySelector("#decimal").addEventListener("click", addDecimal);