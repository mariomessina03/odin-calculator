function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

let firstNum = "";
let secondNum = "";
let operator = "";
let isError = false;

function operate(firstNum, secondNum, operator) {
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);

  if (operator === "/" && secondNum === 0) {
    return "ERROR";
  }
  if (operator === "+") {
    return add(firstNum, secondNum);
  }
  if (operator === "-") {
    return subtract(firstNum, secondNum);
  }
  if (operator === "*") {
    return multiply(firstNum, secondNum);
  }
  if (operator === "/") {
    return divide(firstNum, secondNum);
  }
}

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digitButton");
const operatorButtons = document.querySelectorAll(".operatorButton");
const equalButton = document.querySelector(".equalButton");
const resetButton = document.querySelector(".resetButton");

function roundUpTo(number, upto) {
  const num = parseFloat(number);
  if (isNaN(num)) {
    return "ERROR";
  }

  return Number(number.toFixed(upto));
}

digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", (e) => {
    if (isError) return;

    if (operator === "") {
      firstNum += e.target.innerText;
      display.textContent = firstNum;
      console.log(`firstnum ${firstNum}`);
    } else if (firstNum !== "" && operator !== "") {
      secondNum += e.target.innerText;
      display.textContent = secondNum;
      console.log(`secondNum ${secondNum}`);
    }
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => {
    if (isError) return;

    operator = e.target.innerText;
    if (firstNum !== "" && secondNum !== "" && operator !== "") {
      result = operate(firstNum, secondNum, operator);
      roundResult = roundUpTo(result, 3);
      firstNum = roundResult;
      secondNum = "";
      display.textContent = firstNum;
    }
    console.log(`Operator selected: ${operator}`);
  });
});

equalButton.addEventListener("click", () => {
  if (firstNum !== "" && secondNum !== "" && operator !== "") {
    result = operate(firstNum, secondNum, operator);
    if (result === "ERROR") {
      display.textContent = "ERROR";
      isError = true;
    } else {
      roundResult = roundUpTo(result, 3);
      display.textContent = roundResult;
      firstNum = result;
      secondNum = "";
      operator = "";
    }

    // Reset delle variabili per permettere un nuovo calcolo
  }
});

resetButton.addEventListener("click", function () {
  firstNum = "";
  secondNum = "";
  operator = "";
  result = "";
  isError = false;
  display.textContent = "";
});
