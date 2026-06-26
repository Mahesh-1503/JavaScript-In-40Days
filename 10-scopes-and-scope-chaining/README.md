# Understanding Scope and Scope Chaining in JavaScript

JavaScript variables are only accessible in certain parts of your code, depending on **where** and **how** you declare them. This concept is called **scope**. Closely related is **scope chaining**, which is how JavaScript looks for variables through different "layers" of your code.

Let's break these down with beginner-friendly explanations and **three levels of examples** for each.

---

## 1. Scope

**Scope** determines where a variable can be accessed in your code.

### 1.1. Global Scope (Beginner Example)

A variable declared **outside** of any function or block is in the **global scope** and can be used anywhere in your code.

```javascript
let name = "Tapas"; // Global scope

function greeting() {
  console.log("Hello", name); // Can access 'name' here
}

greeting();
console.log(name); // Can access 'name' here too
```

**Key Point:**  
Variables in the global scope can be accessed from anywhere in the file.

---

### 1.2. Function Scope (Intermediate Example)

Variables declared **inside a function** (using `var`, `let`, or `const`) are only available _inside_ that function.

```javascript
function toDo() {
  let task = "Learning 40 days of JS"; // Function scope
  console.log(task); // OK
}

toDo();
console.log(task); // ❌ Error: task is not defined
```

**Key Point:**  
A function's variables are "invisible" outside that function.

---

### 1.3. Block Scope (Practical Example)

Variables declared with `let` or `const` **inside a block** (`{ ... }`, like in loops, if statements, or just braces) are only available inside that block.

```javascript
{
  let count = 10; // Block scope
  console.log(count); // OK
}

console.log(count); // ❌ Error: count is not defined
```

**Key Point:**  
Variables inside `{}` with `let` or `const` cannot be accessed outside those curly braces.

---

## 2. Scope Chaining

**Scope chaining** is how JavaScript looks for a variable. It starts from the current scope and goes outward until it finds the variable or gives an error.

### 2.1. Nested Functions (Beginner Example)

Each nested function can "see" variables from its parent scopes.

```javascript
let globalVar = "I am a Global Variable";

function outer() {
  let outerVar = "I am an Outer Variable";

  function inner() {
    let innerVar = "I am an Inner Variable";

    console.log(innerVar); // Finds 'innerVar' in inner()
    console.log(outerVar); // Looks "up" to find 'outerVar' in outer()
    console.log(globalVar); // Looks further up to the global scope
  }

  inner();
}

outer();
```

**Key Point:**  
JavaScript searches for a variable in the innermost scope first, then moves outward.

---

### 2.2. Shadowing (Intermediate Example)

If a variable with the same name exists in different scopes, the innermost one "shadows" (hides) the outer one.

```javascript
let message = "I am doing great"; // Global

function situation() {
  let message = "I am not doing great"; // Function scope, shadows global
  console.log(message); // Prints: "I am not doing great"
}

situation();
console.log(message); // Prints: "I am doing great"
```

**Key Point:**  
The closest variable with the right name is used.

---

### 2.3. Variable Lookup Order (Practical Example)

If you reference a variable, JavaScript will check each level up the scope chain until it finds it, or throws an error.

```javascript
var count = 10;

function outer() {
  // var count = 20; // Uncomment to shadow global 'count'

  function inner() {
    //var count = 30; // Uncomment to shadow outer or global 'count'
    console.log(count); // Will print closest 'count' it finds
  }
  inner();
  console.log(count); // Also prints closest 'count'
}

outer();
console.log(count); // Always prints global 'count'
```

**Key Point:**

- If `count` is declared in `inner`, it uses that.
- Else if declared in `outer`, uses that.
- Otherwise, uses the global `count`.

---

## Summary Table

| Scope Type     | Where Declared              | Where Accessible          |
| -------------- | --------------------------- | ------------------------- |
| Global Scope   | Outside any block           | Anywhere in the code      |
| Function Scope | Inside a function           | Only within that function |
| Block Scope    | Inside `{ }` with let/const | Only inside those braces  |

**Scope chaining** is the process of JavaScript looking "outward" through these scopes to find the variable you referenced.

---

> **Remember:**
>
> - Always use `let` and `const` for block and function scope.
> - Understand scope to prevent bugs and write clean code!
