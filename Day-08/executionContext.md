# JavaScript Execution Context: Beginner-Friendly Notes

## ✅ Why Learn About Execution Context?

Understanding Execution Context is key to mastering how JavaScript runs code behind the scenes. It helps you debug problems, predict code behavior, and write effective programs.

**Imagine:**  
When you run a recipe, you need a workspace (table), a list of ingredients (variables), and instructions (code). The *execution context* is JavaScript’s workspace for running your code.

---

## ✅ Lexical Environment

A **Lexical Environment** is like a box that holds all the variables and functions created in a specific place in your code.

**Think of it as:**  
A classroom. Each classroom (environment) has its own students (variables), but the school (global environment) has students who can be found anywhere.

**Practical Example:**
```js
let school = "Central High"; // Global Lexical Environment

function classroom() {
    let teacher = "Mr. Smith"; // Lexical Environment of 'classroom'
    console.log(school); // Can access 'school' from global environment
}
classroom();
```

---

## ✅ Execution Context

An **Execution Context** is like a container where JavaScript runs code. Every time a script or function runs, JavaScript creates a new execution context.

**Parts of Execution Context:**  
1. **Memory/Variable Environment**: Where variables/functions are stored.
2. **Code/Thread of Execution**: Where code is executed line by line.

---

## ✅ Global Execution Context (GEC)

The **Global Execution Context** is created when your JavaScript file starts running.  
It’s the main/base context.

**Features:**
- Only one GEC per program.
- All global code (outside functions) runs here.

**Example:**
```js
let country = "India";

function greet() {
    console.log("Hello!");
}
```
Here, `country` and `greet` are part of the GEC.

---

## ✅ Function Execution Context (FEC)

Each time a function is called, a **Function Execution Context** is created for that function.

**Think:**  
If every function is a recipe, every time you cook, you set up a new kitchen.

**Example:**
```js
function add(a, b) {
    let sum = a + b;
    return sum;
}

let result = add(3, 4);  // A new FEC is created for this call
```

---

## ✅ GEC and FEC With Complex (but Easy) Examples

**Code Example:**
```js
let name = "Alice";

function outer() {
    let age = 25;
    function inner() {
        let city = "Delhi";
        console.log(name, age, city); // Can access all three!
    }
    inner();
}
outer();
```
**What Happens:**
1. GEC is created (for `name` and `outer`).
2. When `outer()` runs, a new FEC is created (for `age` and `inner`).
3. When `inner()` runs, another FEC is created (for `city`).
4. Each context has access to its own variables and the ones above it (lexical scoping).

---

## ✅ Memory Management With Call Stack and Heap

- **Call Stack:**  
  JavaScript keeps track of which function is running using a stack (like a stack of plates). Each time you call a function, it adds (pushes) a new context to the stack. When a function finishes, it removes (pops) it.

- **Heap:**  
  This is where JavaScript stores objects and functions in memory (like a big container where things can be placed anywhere).

**Visual Example:**

```js
function greet() {
    console.log("Hi!");
}

function start() {
    greet();
}

start();
```
- GEC is pushed to the call stack.
- `start()` FEC is pushed when called.
- `greet()` FEC is pushed when called inside `start`.
- As each finishes, their FEC is popped off.

---

## 📝 Practical Task for Students

### Task 1: Trace the Execution Context

**Try this code and draw the call stack step by step:**
```js
let x = 10;

function multiply(y) {
    return x * y;
}

function printResult() {
    let result = multiply(5);
    console.log(result);
}

printResult();
```

**Questions to Answer:**
- What is in the GEC after the first line?
- What happens to the call stack as each function is called?
- Which variables are accessible in each context?

---

### Task 2: Lexical Environment Practice

Write a function inside another function and try accessing variables from different levels.

```js
function grandparent() {
    let familyName = "Smith";
    function parent() {
        let parentName = "John";
        function child() {
            let childName = "Emma";
            console.log(familyName, parentName, childName);
        }
        child();
    }
    parent();
}
grandparent();
```
**Try modifying variable names and see what happens if you try to access variables that are out of scope.**

---

## 🎯 Tips for Beginners

- Use `console.log` to see which variables are accessible in each function.
- Draw diagrams of the call stack and lexical environments.
- Don’t hesitate to step through code line-by-line using browser DevTools.

---

**Remember:**  
Understanding execution context is the foundation for topics like closures, scope, and asynchronous JavaScript!

---
