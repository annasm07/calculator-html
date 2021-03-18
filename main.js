
let firstNumber="";
let showResults=false;
let finalResult="";
let operator="";
let valueClicked=0;
let currentValue;
let previousValue;
let pressedEqual=false;
let numbersForCalculations= [];
const screenPrevious =document.querySelector('.previous-numbers');
const screenCurrent = document.querySelector('.written-numbers');
const buttons = document.getElementsByTagName('button');

for (const button of buttons) {
    button.addEventListener('click', function(event) {
        const buttonClicked =event.target;
        valueClicked= button.innerHTML;
        if(buttonClicked.id === 'ac') clearScreen();
        if(buttonClicked.id === 'del') deleteOneValue();
        if(buttonClicked.id === 'number') addValueToScreen();
        if(buttonClicked.id === 'operation') operatorClick();
        if(buttonClicked.id === 'equal') pressEqual();
    });
}

function clearScreen(){
    firstNumber="";
    showResults=false;
    finalResult="";
    operator="";
    valueClicked=0;
    currentValue="";
    previousValue="";
    pressedEqual=false;
    numbersForCalculations= [];
    screenUpdate();
}

function screenUpdate(){
    screenPrevious.textContent=previousValue;
    screenCurrent.textContent=currentValue;
}

function deleteOneValue(){
    if (firstNumber===""){
        console.log(finalResult);
        finalResult=finalResult.toString().slice(0,-1);
        currentValue=parseFloat(finalResult);
    }
    else{
    firstNumber=firstNumber.slice(0,-1);
    currentValue=parseFloat(firstNumber);
    }
    console.log(numbersForCalculations);
    console.log(firstNumber);
    screenUpdate();
}

function addValueToScreen(){
    firstNumber+=valueClicked;
    currentValue=parseFloat(firstNumber);
    screenUpdate();
}

function operatorClick(){
    if (pressedEqual){
        firstNumber=finalResult;
        pressedEqual=false;
        numbersForCalculations=[];
    }

    numbersForCalculations.push(parseFloat(firstNumber));
    makeCalculations();
    operator=valueClicked;
    previousValue=(firstNumber+operator);
    firstNumber="";
    currentValue=parseFloat(firstNumber);

    if(showResults=true){
        currentValue=finalResult;
    }
    screenUpdate();
}

function pressEqual(){
    numbersForCalculations.push(parseFloat(firstNumber));
    previousValue=firstNumber;
    makeCalculations();
    currentValue=finalResult;
    screenUpdate();
    pressedEqual=true;
        previousValue=currentValue;
        firstNumber="";
        console.log(currentValue);
}

function makeCalculations(){
    if (numbersForCalculations.length>1){
        switch(operator){
            case 'x':
                finalResult = numbersForCalculations.reduce((accumulator, currentValue) => accumulator * currentValue);
            break;
            case '÷':
                finalResult = numbersForCalculations.reduce((accumulator, currentValue) => accumulator / currentValue).toFixed(3);
                
            break;
            case '+':
                finalResult = numbersForCalculations.reduce((accumulator, currentValue) => accumulator + currentValue);
                
            break;
            case '-':
                finalResult = numbersForCalculations.reduce((accumulator, currentValue) => accumulator - currentValue);
                
            break;

            default:
                return;

        }
        numbersForCalculations=[finalResult];
        console.log(finalResult);
    }
    showResults=true;    
}