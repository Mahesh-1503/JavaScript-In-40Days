# Beginner's Guide: JavaScript Functions & Recursion

Hey there, future functional coder! 👋 Welcome to your hands-on guide to JavaScript Functions and Recursion. Today, we are going to learn how to pack reusable calculations inside functions, pass inputs, return juices, leverage higher-order callbacks, and safely recurse without overflowing the memory stack.

---

## 📂 How to Learn This Folder

To get the most out of your functions experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand juice blenders and call stack plate dynamics.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-func.js`), and run them with `node test-func.js` in your terminal to see it run.
3.  **Step 3:** Open and read [07-functions/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/07-functions/README.md) to explore lexical closures, HOF parameters, and memory optimization.
4.  **Step 4:** Inspect and run [07-functions/recursion-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/07-functions/recursion-demo.js) to trace fibonacci sequences and recursion limits.

---

## Part 1: What is a Function?

A **function** is a reusable machine that takes inputs, performs a specific calculation, and outputs a result.

### The Juice Blender Analogy:
*   **Parameters:** The holes at the top of the blender (placeholders for inputs, like fruit slots).
*   **Arguments:** The actual fruit ingredients you throw in (e.g. `"Apple"` or `"Banana"`).
*   **The Code Block `{...}`:** The spinning blades inside the blender that process the fruits.
*   **The `return` Statement:** The spout at the bottom of the blender that pours out the fresh juice.

```javascript
function makeJuice(fruit) { // 'fruit' is a parameter
  return `${fruit} Juice 🥤`; // 'return' pours out the result
}

let glassOfJuice = makeJuice("Mango"); // "Mango" is the argument
console.log(glassOfJuice); // "Mango Juice 🥤"
```

> [!WARNING]
> If you forget to write a `return` statement, the blender will blend the fruit, but keep the juice locked inside. In JavaScript, a function without a `return` statement returns `undefined` by default.

---

## Part 2: Function Declarations vs. Function Expressions

In JavaScript, there are two primary ways to declare a standard function.

### 1. Function Declaration
A standard named function declared using the `function` keyword.
```javascript
function printThis() {
  console.log("Printing...");
}
printThis();
```
*   **Key Property:** **Hoisting.** You can call a function declaration *before* it is written in the file. JavaScript pre-scans and loads declarations to the top of the scope before running.

### 2. Function Expression
Assigning an anonymous (nameless) function to a variable.
```javascript
const printMe = function() {
  console.log("Print Me");
};
printMe();
```
*   **Key Property:** **No hoisting.** You cannot call a function expression before declaring it. The variable must be initialized first.

---

## Part 3: Parameters, Arguments, Defaults, and Rest Parameters

### 1. Parameters vs. Arguments
*   **Parameters** are the variables listed in the function definition.
*   **Arguments** are the actual values passed to the function when it is called.
```javascript
function sum(a, b) { // 'a' and 'b' are parameters
  return a + b;
}
sum(10, 9); // '10' and '9' are arguments
```

### 2. Default Parameters
If a function is called with missing arguments, those parameters are set to `undefined`. You can provide fallback default values directly in the parameter list:
```javascript
function calc(a = 0, b = 0) {
  return 2 * (a + b);
}
console.log(calc()); // 0 (Defaults applied: a=0, b=0)
console.log(calc(5)); // 10 (b defaults to 0: 2 * (5 + 0))
```

### 3. The Rest Parameter (`...`)
If you don't know how many arguments a user will pass, use the rest parameter (`...`). It collects all remaining arguments into a **single array**:
```javascript
function calculateThis(x, y, ...rest) {
  console.log("x:", x); // 1
  console.log("y:", y); // 2
  console.log("rest:", rest); // [3, 4, 5, 6] (All other arguments packed in an array)
}
calculateThis(1, 2, 3, 4, 5, 6);
```

---

## Part 4: Higher-Order Functions (HOFs) & Callbacks

In JavaScript, functions are **First-Class Citizens**. This means they can be treated like any other variable: you can pass them as arguments to other functions, and functions can return other functions.

*   **Higher-Order Function (HOF):** A function that accepts another function as an argument, or returns a function.
*   **Callback Function:** The function passed into the HOF to be executed later.

```javascript
// HOF: accepts a function as an argument
function getCamera(cameraCallback) {
  cameraCallback(); // Executing callback
}

// Invoking HOF with an anonymous Callback function
getCamera(function() {
  console.log("Sony Camera Clicked!");
});
```

### Returning Functions from HOFs:
```javascript
function returnFunc(param) {
  return function() {
    if (param === 1) {
      console.log("Hello from nested function!");
    }
  };
}

const triggerHello = returnFunc(1);
triggerHello(); // Prints: "Hello from nested function!"
```

---

## Part 5: Arrow Functions

Arrow functions provide a shorter, modern syntax for writing function expressions.
*   **Traditional Expression:**
    ```javascript
    const double = function(x) {
      return 2 * x;
    };
    ```
*   **Arrow Function:**
    ```javascript
    const double = (x) => 2 * x; // Implicit return (single line)
    ```

### Arrow Function Rules:
1.  **No `function` keyword:** Uses the fat arrow `=>`.
2.  **Implicit Return:** If the function has only a single expression, you can omit the `{}` brackets and the `return` keyword.
3.  **Lexical `this`:** Arrow functions do not bind their own `this` keyword. They inherit `this` from their outer parent scope.

---

## Part 6: Immediately Invoked Function Expressions (IIFE)

An IIFE is a function that runs **immediately** as soon as it is defined.
*   *Analogy:* **A self-destructing document.** It executes instantly and keeps all variables locked privately inside its scope, preventing them from leaking into the global scope.

### Syntax:
```javascript
(function(count) {
  console.log("IIFE Triggered with count:", count);
})(1);
// Output: "IIFE Triggered with count: 1"
```
Wrap the function declaration in grouping parentheses `(function...)` and call it immediately with trailing execution parentheses `()`.

---

## Part 7: Pure vs. Impure Functions

### 1. Pure Functions
A function that:
*   Always returns the same output for the same input arguments.
*   Has **no side effects** (does not modify external variables, databases, or DOM states).
```javascript
function add(x, y) {
  return x + y; // Pure!
}
```

### 2. Impure Functions
A function that depends on or modifies variables outside of its local scope:
```javascript
let greetingMsg = "Hola ";

function greeting(name) {
  return greetingMsg + name; // Impure! Output changes if greetingMsg changes.
}

console.log(greeting("Mahesh")); // "Hola Mahesh"
greetingMsg = "Namaste ";
console.log(greeting("Mahesh")); // "Namaste Mahesh" (Same input, different output!)
```

---

## Part 8: Recursion & The Call Stack

**Recursion** is a programming technique where a function **calls itself** to solve a smaller version of the same problem.

### The Two Golden Rules of Recursion:
1.  **The Base Case (The Stop Sign):** The condition under which the function stops calling itself. Without a base case, the function will run forever.
2.  **The Recursive Step:** The part where the function calls itself with a simpler input, moving closer to the basecase.

### The Stack of Plates Analogy (The Call Stack)
The computer manages active function calls using the **Call Stack** (like a stack of dinner plates):
*   When a function is called, a new plate (execution frame) is placed on top of the stack.
*   The computer can only process the plate on the very top of the stack.
*   Once a function completes (returns), its plate is popped off the top of the stack.

---

## Part 9: Stack Unwinding & Maximum Stack Size Exceeded Errors

Let's trace a recursive countdown function:

```javascript
function fetchWater(count) {
  console.log("Fetching Water...", count);
  
  // 1. Base Case (Stop Sign)
  if (count === 0) {
    console.log("No more water to fetch!");
    return;
  }
  
  // 2. Recursive Step
  fetchWater(count - 1);
}

fetchWater(3);
```

### How the Call Stack builds up and unwinds:

```text
CALL STACK BUILD-UP (Pushing Plates):
┌─────────────────────────┐
│ fetchWater(0) ── BaseCase│ <-- Currently executing
├─────────────────────────┤
│ fetchWater(1)           │
├─────────────────────────┤
│ fetchWater(2)           │
├─────────────────────────┤
│ fetchWater(3)           │
└─────────────────────────┘

CALL STACK UNWINDING (Popping Plates):
Once fetchWater(0) returns, the plates are removed from top to bottom:
1. fetchWater(0) completes ──► removed from stack.
2. fetchWater(1) resumes and completes ──► removed.
3. fetchWater(2) resumes and completes ──► removed.
4. fetchWater(3) resumes and completes ──► stack is empty!
```

### Stack Overflow
What happens if you forget the base case stop sign?
```javascript
function foo() {
  foo(); // Recursive call with no stop sign
}
foo();
```
The computer will continuously push plates onto the Call Stack until it runs out of memory, crashing with:
```text
RangeError: Maximum call stack size exceeded
```

---

## Part 10: Real-World Application Examples

### 1. Factorial Calculation (Recursion)
Calculate the factorial of a number ($n!$):
```javascript
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive step
}
console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)
```

### 2. Hierarchical File Crawler
Traverse a directory structure (folders containing files or nested folders):
```javascript
const fileSystem = {
  name: "Root",
  type: "folder",
  children: [
    { name: "index.html", type: "file" },
    {
      name: "src",
      type: "folder",
      children: [
        { name: "app.js", type: "file" },
        { name: "styles.css", type: "file" }
      ]
    }
  ]
};

function crawlFolder(item) {
  if (item.type === "file") {
    console.log("Crawled File: ", item.name);
    return; // Base Case: Stop crawling when reaching a file
  }
  
  console.log("Crawling Folder: ", item.name);
  // Recursive Step: crawl each child in the folder
  for (let child of item.children) {
    crawlFolder(child);
  }
}

crawlFolder(fileSystem);
```

---

## Part 11: Common Developer Mistakes

### 1. Accessing a Function Expression Before Declaring It
Function expressions are not hoisted:
```javascript
try {
  sayHello(); // ❌ Bug: Throws ReferenceError/TypeError
} catch (error) {
  console.log("Expected Error Caught: Cannot access function expression before declaration.");
  console.log("Error details:", error.message);
}

const sayHello = function() {
  console.log("Hello!");
};
```

### 2. Creating an Infinite Recursion (Missing Base Case)
Always ensure your recursive step updates the argument to move closer to the base case:
```javascript
function crashCountdown(n) {
  // ❌ Bug: countdown(n) calls countdown(n) with same argument, causing infinite stack growth!
  // If we ran it, it would print forever until it crashes.
}

// Let's simulate a stack overflow and catch it safely:
try {
  const causeOverflow = () => causeOverflow();
  causeOverflow();
} catch (error) {
  console.log("Expected Stack Overflow Error Caught (RangeError):");
  console.log("Error details:", error.message);
}
```

---

## Part 12: Selector Cheat Sheet & Practice Exercises

### Function Type Selector
| Objective / Need | Best Choice | Syntax Example |
| :--- | :--- | :--- |
| **Standard reusable helper** | Function Declaration | `function process() {}` |
| **Bound to a variable scope** | Function Expression | `const process = function() {}` |
| **Concise inline callbacks** | Arrow Function | `(x) => x * 2` |
| **Self-contained initialization** | IIFE | `(function() { ... })()` |
| **Solving nested/hierarchical trees** | Recursion | `function crawler() { crawler() }` |

### Practice Exercises:
1.  **Greeting Printer:** Write a function taking a user name and printing a fallback default greeting if name is missing.
2.  **Product Total HOF:** Write a HOF taking price arrays and applying tax callbacks.
3.  **IIFE Setup:** Implement an IIFE initializing a private API token variable.
4.  **Fibonacci Sequence:** Write a recursive function returning the $n$-th Fibonacci number.
5.  **Array Nested Flattener:** Write a recursive function flattening multi-nested arrays (e.g. `[1, [2, [3, 4]]]` ──► `[1, 2, 3, 4]`).
