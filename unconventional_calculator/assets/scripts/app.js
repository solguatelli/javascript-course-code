const userInput = document.querySelector('input-number');
const addBtn = document.querySelector('btn-add');
const subtractBtn = document.querySelector('btn-subtract');
const multiplyBtn = document.querySelector('btn-multiply');
const divideBtn = document.querySelector('btn-divide');

const currentResultOutput = document.querySelector('current-result');
const currentCalculationOutput = document.querySelector('current-calculation');

function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}

function add(){
  
}

function subtract(){

}

function multiply(){

}

function divide(){

}

// Add event listeners 

addBtn.addEventListener("click",calculate)
subtractBtn.addEventListener("click",calculate)
multiplyBtn.addEventListener("click",calculate)
divideBtn.addEventListener("click",calculate)
