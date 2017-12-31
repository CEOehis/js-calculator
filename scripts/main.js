"use strict"
var screen = document.querySelector('.screen');

var figures = document.querySelectorAll('.figures');
var operators = document.querySelectorAll('.operators');

var equalsButton = document.querySelector('.equals');
var clearScreenButton = document.querySelector('[value=clear-screen]');
var clearAllButton = document.querySelector('[value=clear-all]');
var deleteButton = document.querySelector('[value=backspace]');
var result;
var operandTemp;
var operandOne;
var operandTwo;
var operator;

function logger() {
  console.log(`result: ${result}`);
  console.log(`operandTemp: ${operandTemp}`);
  console.log(`operandOne: ${operandOne}`);
  console.log(`operandTwo: ${operandTwo} \noperator: ${operator}`)
}

figures = Array.from(figures);
operators = Array.from(operators);

figures.forEach( function(button) {
  button.addEventListener('click', track);
});

operators.forEach( function(operator) {
  operator.addEventListener('click', operate);
});

equalsButton.addEventListener('click', doCalc);
// equalsButton.addEventListener('click', () => result = undefined);

deleteButton.addEventListener('click', backspace);
clearAllButton.addEventListener('click', clearAll);
clearScreenButton.addEventListener('click', clearScreen);

function track() {
  // track updates the global temp variable for each operand and updates the screen appropriately
  if(result || screen.textContent == '0') screen.textContent = '';
  if(operator) screen.textContent = '';
  operandTemp = screen.textContent += this.value;
}

function operate() {
  // when triggered , it sets the operand to the screen content and clears the screen
  if(operator) {
    doCalc();
    operator = this.value;
    return;
  }
  operandOne = operandTemp;
  operandTemp = undefined;
  operator = this.value;
}

function backspace() {
  screen.textContent = screen.textContent.substring(0,screen.textContent.length -1)
}

function clearAll() {
  screen.textContent = '0';
  result, operandTemp, operandOne, operandTwo, operator = undefined;
}

function clearScreen() {
  screen.textContent = '0';
}

function doCalc() {
  // operate on operand one and two based on value of current operand;
  operandTwo = Number(screen.textContent);
  operandTemp = undefined;
  operandOne = Number(operandOne);
  if(result) operandOne = result;
  [operandOne, operandTwo] = [operandTwo, operandOne];
  switch (operator) {
    case 'add':
      result = operandTwo + operandOne
      break;
    case 'subtract':
      result = operandTwo - operandOne;
      break;
    case 'divide':
      result = operandTwo / operandOne;
      break;
    case 'multiply':
      result = operandTwo * operandOne;
      break;
    default:
      // statements_def
      break;
  }
  operator = undefined;
  screen.textContent = result;
}