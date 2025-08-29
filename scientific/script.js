let display = document.getElementById("display");
let lastAnswer = 0;
let memory = 0;

function appendValue(value) {
    if (display.value === "Error") display.value = "";
    if (value === "." && display.value.endsWith(".")) return;
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    if (display.value === "Error") {
        display.value = "";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function toggleSign() {
    if (display.value) {
        display.value = display.value.startsWoith("-") ? display.value.slice(1) : "-" + display.value;
    }
}

function calculateResult() {
   try {
    const result = computeExpression(display.value);
    display.value = result;
   } catch {
    display.value = "Error";
   }
}

function computeExpression(expr) {
    //Remove Spaces
    expr = expr.replace(/\s+/g, '');

    //Tokenize expression into numbers and operators
    const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/()])/g);
    if (!tokens) throw "Invalid Expression";

    //Use Shunting Yard algorithm to convert to postfix

    const precedence = {
        '+' : 1,
        '-' : 1,
        '*' : 2,
        '/' : 2,
    };
    const outputQueue = [], operatorStack = [];

    const applyOperator = (a,b, op) => {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op)  {
            case '+' : return a + b;
            case '-' : return a - b;
            case '*' : return a * b;
            case '/' : return b !== 0 ? a / b : (() => { throw "Division by zero";})();
            default: throw "Unknown operator";
        }
    };

    for (let token of tokens) {
        if (!isNaN(token)) outputQueue.push(token);
        else if (precedence[token]) {
            while (operatorStack.length && 
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token])  {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if ( token === '(') operatorStack.push(token);
            else if (token === ')') {
                while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop();
            }
        }


    while (operatorStack.length) outputQueue.push(operatorStack.pop());


    //Evaluate postfix expression
    const stack = [];
    for (let token of outputQueue) {
        if (!isNaN(token)) stack.push(token);
        else stack.push(applyOperator(stack.pop(), stack.pop(), token));
    }
    if (stack.length !== 1) throw "Invalid Expression";
    return stack[0];

} 


//Scientific Functions
function squareRoot() {
    display.value = Math.sqrt(parseFloat(display.value));
}

function square() {
    display.value = Math.pow(parseFloat(display.value), 2);
}

function inverse() {
    const val = parseFloat(display.value);
    if(val !== 0) display.value = 1 / val;
    else display.value = "Error";
}

function absValue() {
    display.value = Math.abs(parseFloat(display.value));
}

function exp() {
    display.value = Math.exp(parseFloat(display.value));
}

function log10() {
    display.value = Math.log10(parseFloat(display.value));
}

function ln() {
    display.value = Math.log(parseFloat(display.value));
}

function power10() {
    display.value = Math.pow(10, parseFloat(display.value));
}

function power(n) {
    display.value = Math.pow(parseFloat(display.value), n);
}

function cubeRoot() {
    display.value = Math.cbrt(parseFloat(display.value));
}

function factorial() {
    const num = parseInt(display.value);
    if (num < 0) {
        display.value = "Error";
        return;
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    display.value = result;
}

function modulo() {
    const tokens = display.value.split("mod");
    if(tokens.length === 2) {
        const a = parseFloat(tokens[0]);
        const b = parseFloat(tokens[1]);
        display.value = a % b;
    } else {
        display.value = "Error";
    }
}

function percent() {
    display.value = parseFloat(display.value) / 100;
}

function getAngleMode() {
    const mode = document.querySelector('input[name="angleMode"]:checked').value;
    return mode;
}
function toRadians(val) {
    return getAngleMode() === "deg" ? val * Math.PI / 100 : val;
}
function toDegrees(val) {
    return getAngleMode() === "deg" ? val * 180 / Math.PI : val; 
}

function sin() {
    display.value = Math.sin(toRadians(parseFloat(display.value)));
}
function cos() {
    display.value = Math.cos(toRadians(parseFloat(display.value)));
}
function tan() {
    display.value = Math.tan(toRadians(parseFloat(display.value)));
}
function asin() {
    display.value = toDegrees(Math.asin(parseFloat(display.value)));
}
function acos() {
    display.value = toDegrees(Math.acos(parseFloat(display.value)));
}
function atan() {
    display.value = toDegrees(Math.atan(parseFloat(display.value)));
}
function sinh() {
    display.value = Math.sinh(parseFloat(display.value));
}
function cosh() {
    display.value = Math.sinh(parseFloat(display.value));
}
function tanh() {
    display.value = Math.tanh(parseFloat(display.value));
}

function insertPi() {
    display.value += Math.PI;
}
function insertE() {
    display.value += Math.E;
}

function powerY() {
    const base = parseFloat(display.value);
    const exponent = propmt("Enter exponent: ");
    if (!isNaN(exponent)) display.value = Math.pow(base, parseFloat(exponent));
}

function randomNum() {
    display.value = Math.random();
}

function ans() {
    display.value += lastAnswer;
}

function memoryClear() {
    memory = 0;
}
function memoryRecall() {
    display.value += memory;
}
function memoryStore() {
    memory = parseFloat(display.value);
}
function memoryAdd() {
    memory += parseFloat(display.value);
}
function memorySubtract() {
    memory -= parseFloat(display.value);
}

//Convert Deg to Radian vice versa 
const angleIndicator = document.getElementById("angleIndicator");
const angleRadios = document.querySelectorAll('input[name="angleMode"]');

angleRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (!display.value || isNaN(display.value)) {
            angleIndicator.textContent = radio.value.toUpperCase();
            return;
        }

        let val = parseFloat(display.value);
        if (radio.value === "deg") {
            display.value = (val * 180 / Math.PI).toFixed(6);
            angleIndicator.textContent = "DEG";
        } else if (radio.value === "rad") {
            display.value = (val * Math.PI / 180).toFixed(6);
            angleIndicator.textContent = "RAD";
        }
    });
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

document.getElementById("themeToggle").addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
});