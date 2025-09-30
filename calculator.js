const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
   return a*b;
};

function divide(a, b){
    return a/b;
}

function operateCalc( inputA, inputB, operator){
    
    if (operator == '+'){
        return add(inputA, inputB);
    }
    else if (operator == '-'){
        return subtract(inputA, inputB);
    }
    else if (operator == 'x'){
        return multiply(inputA, inputB);
    }
    else if (operator == '\u00F7'){
        return divide(inputA, inputB);
    }
}

//set up dynamic display with button input
const displayDigit = document.querySelector('.calculator-display');
const digitBtn = document.querySelectorAll('.digit');
const operateBtn = document.querySelectorAll('.operator');
const calcButton = document.querySelector('.calculator-button');
const clearBtn = document.querySelector('.clearButton');
const initDigit = document.querySelector('.paraDigit');
const equalBtn = document.querySelector('.equal');
const delBtn = document.querySelector('.deleteButton');


let currentNum = "";
let previousNum = "";
let operatorSymbol = undefined;

//clear button function
function clearButton(){
    currentNum = "";
    previousNum = "";
    operatorSymbol = undefined;
    result = undefined;
    updateDisplay();
}

function deleteButton(){
    currentNum = currentNum.slice(0, -1);
    updateDisplay();
}

//update display function
function updateDisplay(){
    displayDigit.textContent = currentNum || previousNum || '0';
}

//get input
digitBtn.forEach(item => {
    item.addEventListener('click', event => {
        initDigit.remove();
        let digitClick = event.target.textContent;
        if (digitClick === '.' && currentNum.includes('.')) return;
        currentNum += digitClick;
        updateDisplay();
    })
} );

//get operand
operateBtn.forEach(btn =>{
    btn.addEventListener('click', e =>{
        if (currentNum === ""){
            return;
        }
        if (previousNum !== ""){
            expression();
        }
        operatorSymbol = e.target.textContent;
        previousNum = currentNum;   
        currentNum = "";
        updateDisplay();
        
        console.log(previousNum, operatorSymbol, currentNum);
    })
});

// equal button to run calculation
equalBtn.addEventListener('click', ()=>{
    if (operatorSymbol === undefined){
        return;
    }
    expression();
})

//clear button to reset
clearBtn.addEventListener('click', ()=>{
    clearButton();
});

//delete button to remove wrong number input
delBtn.addEventListener('click', ()=>{
    deleteButton();
})


//function to receive math expression and calculate result
function expression(){
    let result;
    let num1 = Number(previousNum);
    let num2 = Number(currentNum);

    if (isNaN(num1) || isNaN(num2)) return;

    result = operateCalc(num1, num2, operatorSymbol);
    console.log(num1, operatorSymbol, num2, result);
    currentNum = result;
    operatorSymbol = undefined;
    previousNum = "";
    updateDisplay();
}