// find a way to manage and track the calculator state
// such that as the user types in the figures it updates for each keypress a "operand" variable
// that will be operand 'a'. when the user presses an operation button it saves it ready to use for the operation
// then monitors the rest key presses and for each key press updates the variable and does the operation
"use strict";

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

figures = Array.from(figures);
operators = Array.from(operators);

figures.forEach(function (button) {
  button.addEventListener('click', track);
});

operators.forEach(function (operator) {
  operator.addEventListener('click', operate);
});

equalsButton.addEventListener('click', doCalc);

deleteButton.addEventListener('click', backspace);
clearAllButton.addEventListener('click', clearAll);
clearScreenButton.addEventListener('click', clearScreen);

function track() {
  // track updates the global temp variable for each operand and updates the screen appropriately
  if (result || screen.textContent == '0') screen.textContent = '';
  operandTemp = screen.textContent += this.value;
}

function operate() {
  // when triggered , it sets the operand to the screen content and clears the screen
  operandOne = screen.textContent;
  operandTemp = undefined;
  screen.textContent = '';
  operator = this.value;
}

function backspace() {
  screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
}

function clearAll() {
  screen.textContent = '0';
  result, operandTemp, operandOne, operandTwo, operator = undefined;
}

function clearScreen() {
  screen.textContent = '';
  // operandTemp = undefined;
}

function doCalc() {
  // operate on operand one and two based on value of current operand;
  operandTemp = Number(operandTemp);
  operandOne = Number(operandOne);
  switch (operator) {
    case 'add':
      result = operandTemp + operandOne;
      break;
    case 'subtract':
      result = operandOne - operandTemp;
      break;
    case 'divide':
      result = operandOne / operandTemp;
      break;
    case 'multiply':
      result = operandOne * operandTemp;
      break;
    default:
      // statements_def
      break;
  }
  // result = (operandTemp * operandOne);
  screen.textContent = result;
}