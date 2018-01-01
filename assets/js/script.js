"use strict";
// get all UI elements

var screen = document.querySelector('.screen');
var figures = document.querySelectorAll('.figures'); // nodelist of number buttons
var operators = document.querySelectorAll('.operators'); // nodelist of operators
var equalsButton = document.querySelector('.equals');
var clearScreenButton = document.querySelector('[value=clear-screen]');
var clearAllButton = document.querySelector('[value=clear-all]');
var deleteButton = document.querySelector('[value=backspace]');
var plusMinus = document.querySelector('[value=plusOrMinus]');
var decimal = document.querySelector('[value="."]');

var result;
var operandTemp;
var operandOne;
var operandTwo;
var operator;
var tracker = false;
var signed = false;

// convert node list to array to enable array methods to be performed
figures = Array.from(figures);
operators = Array.from(operators);

// add event listeners
figures.forEach(function (button) {
  button.addEventListener('click', track);
});

operators.forEach(function (operator) {
  operator.addEventListener('click', operate);
});

equalsButton.addEventListener('click', doCalc);
equalsButton.addEventListener('click', function () {
  result = operandTemp = operandOne = operandTwo = operator = undefined;
  tracker = true;
});

deleteButton.addEventListener('click', backspace);
clearAllButton.addEventListener('click', clearAll);
clearScreenButton.addEventListener('click', clearScreen);
plusMinus.addEventListener('click', setSign);
decimal.addEventListener('click', addDecimal);

// follow user input and track and update relevant states
function track() {
  // track updates the global temp variable for each operand and updates the screen appropriately
  if (result || screen.textContent == '0') screen.textContent = '';
  if (tracker) screen.textContent = '';
  tracker = false;
  if (screen.textContent.length >= 9) {
    alert('Maximum number of digits allowed reached');
    return;
  }
  operandTemp = screen.textContent += this.value;
}

function operate() {
  // when triggered , it sets the operand to the screen content and clears the screen
  if (operator) {
    doCalc();
    operator = this.value;
    return;
  }
  operandOne = screen.textContent;
  operandTemp = undefined;
  operator = this.value;
  tracker = true;
}

function doCalc() {
  // operate on operand one and two based on value of current operand;
  operandTwo = Number(screen.textContent);
  operandTemp = undefined;
  operandOne = Number(operandOne);
  if (result) operandOne = result;
  var _ref = [operandTwo, operandOne];
  operandOne = _ref[0];
  operandTwo = _ref[1];

  switch (operator) {
    case 'add':
      result = operandTwo + operandOne;
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
  if (result > 999999999) {
    alert('Screen bounds exceeded');
    result = 0;
  }
  screen.textContent = '' + result;
}

function backspace() {
  screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
}

function clearAll() {
  screen.textContent = '0';
  result = operandTemp = operandOne = operandTwo = operator = undefined;
}

function clearScreen() {
  screen.textContent = '0';
}

function setSign() {
  if (!signed && screen.textContent != '0') {
    screen.textContent = '-' + screen.textContent;
    signed = true;
  } else if (screen.textContent != '0') {
    screen.textContent = screen.textContent.slice(1);
    signed = false;
  }
}

function addDecimal() {
  if (screen.textContent.indexOf('.') === -1) {
    screen.textContent += '.';
  }
}