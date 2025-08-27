//function declaration
function add(a, b) {
    return a + b;
}

// function expression
const AddExpression = function add3(a, b, c) {
    return a + b + c;
  }

  // to give value you do AddExpression(1,2,3)

// arrow function
// 6 ways to write an arrow function
//are anonymous functions (meaning they have no name)
//no parameters
const greet = () => 'Hello World';

// one parameter
const add100 = a => a + 100;

// multiple parameters
const multiply3 = (a, b, c) => a * b * c;

//function body with multiple statements
const greet2 = (name = 'Guest') => {
  const greeting = `Hello, ${name}!`;
  return greeting;
}

//return an object
const createUser = (name, age) => ({ name, age });

//higher order function
function doMathOperation(a, b, operation) {
  return operation(a, b);
}

function add2(x, y) {
  return x + y;
}

function multiply2(x, y) {
  return x * y;
}