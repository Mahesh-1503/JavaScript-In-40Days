# Day 06: Functions in JavaScript - Detailed Notes

This document explains **everything about functions in JavaScript** as demonstrated in `index.js`, with clear explanations, use cases, and **5 progressively challenging examples** for each concept. The goal is to help beginners understand not just how, but **why and when to use each type of function**.

---

## Table of Contents

1. [What is a Function?](#what-is-a-function)
2. [Declaring a Function](#declaring-a-function)
3. [Calling/Invoking a Function](#callinginvoking-a-function)
4. [Function Expressions](#function-expressions)
5. [Parameters & Arguments](#parameters--arguments)
6. [Return Statement](#return-statement)
7. [Default Parameters](#default-parameters)
8. [Rest Parameters (`...rest`)](#rest-parameters-rest)
9. [Nested Functions](#nested-functions)
10. [Callback Functions](#callback-functions)
11. [Pure Functions](#pure-functions)
12. [Higher-Order Functions](#higher-order-functions)
13. [Arrow Functions](#arrow-functions)
14. [Immediately Invoked Function Expressions (IIFE)](#immediately-invoked-function-expressions-iife)
15. [Recursion](#recursion)

---

## What is a Function?

A function is a reusable block of code designed to perform a particular task. Functions help you avoid repeating code and make your program more modular.

### Why use functions?

- **Reusability:** Write once, use many times.
- **Organization:** Break big problems into smaller tasks.
- **Maintainability:** Easier to debug and update.

---

## Declaring a Function

**Declaration:**  
Use the `function` keyword to declare a function.

```javascript
function functionName() {
  // code to execute
}
```

### 5 Examples

#### 1. Print a message

```javascript
function sayHello() {
  console.log("Hello!");
}
```

#### 2. Add two numbers

```javascript
function add(a, b) {
  return a + b;
}
```

#### 3. Check even or odd

```javascript
function isEven(num) {
  return num % 2 === 0;
}
```

#### 4. Find maximum of three numbers

```javascript
function maxOfThree(a, b, c) {
  return Math.max(a, b, c);
}
```

#### 5. Power of a number

```javascript
function power(base, exponent) {
  return base ** exponent;
}
```

**When to use:**  
Whenever you need to repeat an operation or keep your code organized.

---

## Calling/Invoking a Function

**Invocation:**  
Use the function's name followed by parentheses.

```javascript
functionName();
```

### 5 Examples

#### 1. Call a greeting

```javascript
sayHello();
```

#### 2. Call with arguments

```javascript
console.log(add(2, 3));
```

#### 3. Store return value

```javascript
let result = isEven(4);
```

#### 4. Nested calls

```javascript
console.log(power(add(2, 3), 2)); // (2+3)^2
```

#### 5. Ignore return value

```javascript
maxOfThree(1, 2, 3); // doesn't store result
```

**Where to use:**  
Anywhere you want to execute the function's logic.

---

## Function Expressions

A function can also be stored in a variable.

```javascript
let myFunc = function () {
  console.log("Hello from expression!");
};
```

### 5 Examples

#### 1. Anonymous function

```javascript
let greet = function () {
  console.log("Hi!");
};
greet();
```

#### 2. Return value

```javascript
let square = function (x) {
  return x * x;
};
console.log(square(5));
```

#### 3. Passing as argument

```javascript
setTimeout(function () {
  console.log("Delayed!");
}, 1000);
```

#### 4. Assign to another variable

```javascript
let original = function () {
  return 42;
};
let copy = original;
console.log(copy());
```

#### 5. Expression in array

```javascript
let funcs = [
  function () {
    return 1;
  },
  function () {
    return 2;
  },
];
console.log(funcs[1]());
```

**Why use expressions?**  
For flexibility, passing functions around, or when you don't need to name them.

---

## Parameters & Arguments

**Parameters** are variables listed in the function declaration.  
**Arguments** are the actual values passed when calling the function.

```javascript
function sum(a, b) { ... }
sum(10, 9); // 10 and 9 are arguments
```

### 5 Examples

#### 1. Basic addition

```javascript
function add(a, b) {
  return a + b;
}
add(5, 7);
```

#### 2. Concatenate strings

```javascript
function concat(s1, s2) {
  return s1 + s2;
}
concat("Hello", "World");
```

#### 3. Multiply with default

```javascript
function mul(a, b) {
  return a * (b || 1);
}
mul(4); // uses b=1
```

#### 4. Calculate area

```javascript
function area(length, width) {
  return length * width;
}
area(10, 2);
```

#### 5. Calculate average

```javascript
function avg(a, b, c) {
  return (a + b + c) / 3;
}
avg(5, 10, 15);
```

**Where to use:**  
Whenever your function needs input data.

---

## Return Statement

Use `return` to send a value back from a function.

```javascript
function double(x) {
  return 2 * x;
}
```

### 5 Examples

#### 1. Return a value

```javascript
function getTen() {
  return 10;
}
```

#### 2. Return expression

```javascript
function plus(a, b) {
  return a + b;
}
```

#### 3. Conditional return

```javascript
function positiveOrZero(x) {
  return x < 0 ? 0 : x;
}
```

#### 4. Return object

```javascript
function makePerson(name, age) {
  return { name, age };
}
```

#### 5. Return function

```javascript
function returnsFunction() {
  return function () {
    console.log("Hi!");
  };
}
```

**Why use return?**  
To use the result outside the function or chain operations.

---

## Default Parameters

Give parameters default values if not provided.

```javascript
function calc(a = 0, b = 0) { ... }
```

### 5 Examples

#### 1. Default greeting

```javascript
function greet(name = "Guest") {
  return "Hello, " + name;
}
```

#### 2. Default calculation

```javascript
function mul(a, b = 1) {
  return a * b;
}
```

#### 3. Default array

```javascript
function addArr(arr = []) {
  return arr.length;
}
```

#### 4. Default object

```javascript
function printUser(user = { name: "NoName" }) {
  console.log(user.name);
}
```

#### 5. Default function

```javascript
function run(
  fn = function () {
    return "no-op";
  }
) {
  return fn();
}
```

**When to use:**  
To prevent errors if arguments are missing, or to provide fallback values.

---

## Rest Parameters (`...rest`)

Collects remaining arguments into an array.

```javascript
function calculateThis(x, y, ...rest) { ... }
```

### 5 Examples

#### 1. Sum all numbers

```javascript
function sumAll(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

#### 2. Log all arguments

```javascript
function logAll(...args) {
  args.forEach((arg) => console.log(arg));
}
```

#### 3. Separate first and rest

```javascript
function firstAndRest(first, ...rest) {
  return [first, rest];
}
```

#### 4. Find maximum

```javascript
function max(...nums) {
  return Math.max(...nums);
}
```

#### 5. Concatenate strings

```javascript
function concatAll(...strings) {
  return strings.join("-");
}
```

**Where to use:**  
When you don’t know how many arguments will be passed.

---

## Nested Functions

Functions can be defined inside other functions.

```javascript
function outer() {
  function inner() { ... }
}
```

### 5 Examples

#### 1. Simple nesting

```javascript
function outer() {
  function inner() {
    console.log("Inner!");
  }
  inner();
}
```

#### 2. Use inner variable

```javascript
function outer(msg) {
  function inner() {
    console.log(msg);
  }
  inner();
}
```

#### 3. Return inner function

```javascript
function makeMultiplier(factor) {
  return function (x) {
    return x * factor;
  };
}
```

#### 4. Closure for counter

```javascript
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
```

#### 5. Recursion in nested

```javascript
function outer(n) {
  function recurse(x) {
    if (x <= 0) return;
    console.log(x);
    recurse(x - 1);
  }
  recurse(n);
}
```

**Why use?**  
For encapsulation and creating closures (functions that remember their environment).

---

## Callback Functions

A callback is a function passed as an argument to another function, to be "called back" later.

```javascript
function foo(func) { ... }
foo(buz);
```

### 5 Examples

#### 1. Array iteration

```javascript
[1, 2, 3].forEach(function (el) {
  console.log(el);
});
```

#### 2. Custom callback

```javascript
function runTwice(cb) {
  cb();
  cb();
}
runTwice(() => console.log("Hi!"));
```

#### 3. Event handling (browser)

```javascript
button.addEventListener("click", function () {
  alert("Clicked!");
});
```

#### 4. Simulation of async

```javascript
setTimeout(function () {
  console.log("After 1s");
}, 1000);
```

#### 5. Filter with callback

```javascript
const evens = [1, 2, 3, 4].filter(function (n) {
  return n % 2 === 0;
});
```

**When to use:**  
Whenever you need to execute code after some event or operation.

---

## Pure Functions

A pure function's output depends only on its input and it does not affect outside state.

```javascript
function greeting(name) {
  return greeetingMsg + name;
}
```

But in the `index.js` example, it's **not pure** because `greeetingMsg` is an outer variable.  
**A pure version would be:**

```javascript
function greeting(msg, name) {
  return msg + name;
}
```

### 5 Examples

#### 1. Add numbers

```javascript
function add(a, b) {
  return a + b;
}
```

#### 2. Concat strings

```javascript
function concat(a, b) {
  return a + b;
}
```

#### 3. Multiply array

```javascript
function multiplyArr(arr, factor) {
  return arr.map((x) => x * factor);
}
```

#### 4. Uppercase

```javascript
function makeUpper(str) {
  return str.toUpperCase();
}
```

#### 5. Is adult

```javascript
function isAdult(age) {
  return age >= 18;
}
```

**Why use pure functions?**  
They are predictable, testable, and have no side effects.

---

## Higher-Order Functions

A function that takes another function as an argument or returns a function.

```javascript
function getCamera(camera) {
  camera();
}
```

### 5 Examples

#### 1. Takes function as argument

```javascript
function runFunc(fn) {
  fn();
}
```

#### 2. Returns a function

```javascript
function multiplier(factor) {
  return function (x) {
    return factor * x;
  };
}
```

#### 3. Array map

```javascript
[1, 2, 3].map((x) => x * 2);
```

#### 4. Array filter

```javascript
[1, 2, 3, 4].filter((x) => x % 2 === 0);
```

#### 5. Compose functions

```javascript
function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}
```

**Where to use:**  
For functional programming, event handling, and code flexibility.

---

## Arrow Functions

Shorter syntax for writing functions.

```javascript
let greetMe = (greetingMsg) => {
  return greetingMsg + " great";
};
```

### 5 Examples

#### 1. Simple return

```javascript
const double = (x) => x * 2;
```

#### 2. No parameters

```javascript
const sayHi = () => console.log("Hi!");
```

#### 3. Multiple parameters

```javascript
const add = (a, b) => a + b;
```

#### 4. As callback

```javascript
[1, 2, 3].forEach((x) => console.log(x));
```

#### 5. Implicit return

```javascript
const square = (x) => x * x;
```

**Why use arrow functions?**  
Concise code and different `this` behavior (advanced).

---

## Immediately Invoked Function Expressions (IIFE)

A function that runs immediately after it’s defined.

```javascript
(function (count) {
  console.log("IIFE", count);
})(1);
```

### 5 Examples

#### 1. Basic IIFE

```javascript
(function () {
  console.log("Run now!");
})();
```

#### 2. IIFE with argument

```javascript
(function (name) {
  console.log("Hello " + name);
})("JS");
```

#### 3. Return value

```javascript
let result = (function () {
  return 5 * 5;
})();
```

#### 4. Private variable

```javascript
let secret = (function () {
  let hidden = 42;
  return () => hidden;
})();
```

#### 5. IIFE for setup

```javascript
let config = (function () {
  return { debug: true, version: 1 };
})();
```

**Why use IIFE?**  
To avoid polluting global scope and for initialization code.

---

## Recursion

A function that calls itself.

```javascript
function fetchWater(count) {
  if (count === 0) return;
  fetchWater(count - 1);
}
```

### 5 Examples

#### 1. Count down

```javascript
function countDown(n) {
  if (n < 0) return;
  console.log(n);
  countDown(n - 1);
}
```

#### 2. Factorial

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

#### 3. Fibonacci

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

#### 4. Sum array

```javascript
function sumArr(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArr(arr.slice(1));
}
```

#### 5. Nested object search

```javascript
function findKey(obj, key) {
  if (obj[key]) return obj[key];
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      let val = findKey(obj[k], key);
      if (val) return val;
    }
  }
}
```

**When to use:**  
For problems that can be broken into similar sub-problems (divide & conquer).

---

## Summary

- **Declare** functions to organize and reuse code.
- **Parameters** let you pass data in; **return** sends data out.
- Use **expressions**, **arrow functions**, and **IIFE** for flexibility and cleaner code.
- **Callbacks** and **higher-order functions** make code more dynamic and powerful.
- **Pure functions** make code safer and easier to test.
- **Recursion** helps solve problems that repeat in structure.

---

**Tip:**  
Practice writing and running each example to fully understand how functions work in JavaScript!
