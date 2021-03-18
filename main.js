
let firstNumber="";//number constantly updated when pressing buttons
let showResults=false; 
let finalResult=""; // number updated when making calculations
let operator=""; //operator saved for calculations
let valueClicked=0; // last button clicked
let currentValue; //Current value for screen
let previousValue; // Value used previously for screen
let pressedEqual=false; // Boolean changed when the key "=" is pressed
let numbersForCalculations= []; // Array to save numbers for calculations using .reduce()
const screenPrevious =document.querySelector('.previous-numbers');
const screenCurrent = document.querySelector('.written-numbers');
const buttons = document.getElementsByTagName('button');

for (const button of buttons) { //event listener for when buttons are pressed
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

function clearScreen(){ //gets the screen clear & all the values are reset 
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

function screenUpdate(){ //function that updates the screen for both current and pprevious
    screenPrevious.textContent=previousValue;
    screenCurrent.textContent=currentValue;
}

function deleteOneValue(){ //function that delets the last value from the current number "currentValue"
    if (firstNumber===""){
        finalResult=finalResult.toString().slice(0,-1);
        currentValue=parseFloat(finalResult);
    }
    else{
    firstNumber=firstNumber.slice(0,-1);
    currentValue=parseFloat(firstNumber);
    }
    screenUpdate();
}

function addValueToScreen(){ //reassign value and print on screen every time a button is clicked 
    firstNumber+=valueClicked;
    currentValue=parseFloat(firstNumber);
    screenUpdate();
}

function operatorClick(){ // assigns the value operator, resets current value, & calls calculations() & screenUpdate()
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

function pressEqual(){ //"=" is pressed, call calculations() & screenUpdate()
    numbersForCalculations.push(parseFloat(firstNumber));
    previousValue=firstNumber;
    makeCalculations();
    currentValue=finalResult;
    screenUpdate();
    pressedEqual=true;
        previousValue=currentValue;
        firstNumber="";
        
}

function makeCalculations(){ //function that makes the calculations
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
        
    }
    showResults=true;    
}