# Beginner's Guide: Strict Mode & Error Handling

Hey there, future debugger! 👋 Welcome to your hands-on guide to JavaScript Strict Mode and Error Handling. Today, we are going to learn how to enforce safety guardrails using `"use strict"`, catch V8 exceptions with try-catch nets, trigger custom error classifications, and execute cleanups inside finally blocks.

---

## 📂 How to Learn This Folder

To get the most out of your debugging experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand standard error categories and finally blocks.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-errors.js`), and run them with `node test-errors.js` in your terminal to see the safety flows.
3.  **Step 3:** Open and read [15-strict-mode-and-error-handling/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/15-strict-mode-and-error-handling/README.md) to explore error stack traces, throwing models, and rethrowing structures.

---

## Part 1: Strict Mode (`"use strict"`)

By default, JavaScript is very forgiving. If you make a mistake (like spelling a variable name wrong), it often creates a new global variable silently instead of throwing an error. 

To prevent this, we use **Strict Mode**.
*   *Analogy:* **Switching from a Wild West dirt road to a policed highway.** The police (strict mode) will immediately pull you over (throw an error) for minor violations, stopping bugs before they escape to production.

### How to use it:
Add `"use strict";` at the top of your file (or inside a function scope). Let's test it inside a try-catch block:
```javascript
function testStrictMode() {
  "use strict";
  try {
    username = "Mahesh"; // ❌ Bug: Throws ReferenceError (Auto-globals are forbidden in strict mode!)
  } catch (error) {
    console.log("Expected Strict Mode Error Caught:");
    console.log("Error details:", error.message);
  }
}
testStrictMode();
```

### Core Strict Mode Rules:
1.  **No undeclared variables:** You must write `let`, `const`, or `var`.
2.  **No duplicate parameter names:**
    ```javascript
    // ❌ Bug: Throws SyntaxError in strict mode
    function sum(a, a) { return a + a; } 
    ```
3.  **Prevents dynamic default binding:** `this` in regular functions remains `undefined` instead of default-pointing to `window`.

---

## Part 2: The 6 Standard Errors in JavaScript

JavaScript has specific built-in objects to represent different types of errors. Let's run and catch them safely so they don't halt our script:

1.  **SyntaxError:** The code violates grammar rules (e.g. missing parentheses). *Note: Syntax errors fail during the compilation pass, so they cannot be caught at runtime. We comment it out here:*
    ```javascript
    // console.log("hello" // SyntaxError: Unexpected end of input
    ```
2.  **ReferenceError:** Accessing a variable name that does not exist in memory:
    ```javascript
    try {
      console.log(x); // ❌ ReferenceError: x is not defined
    } catch (error) {
      console.log("ReferenceError Caught:", error.message);
    }
    ```
3.  **TypeError:** Performing an operation on an incompatible data type:
    ```javascript
    try {
      let obj = null;
      console.log(obj.name); // ❌ TypeError: Cannot read properties of null
    } catch (error) {
      console.log("TypeError Caught:", error.message);
    }
    ```
4.  **RangeError:** Using numeric values outside their allowed boundaries:
    ```javascript
    try {
      let arr = new Array(-1); // ❌ RangeError: Invalid array length
    } catch (error) {
      console.log("RangeError Caught:", error.message);
    }
    ```
5.  **URIError:** Passing invalid characters to URL decoding/encoding functions:
    ```javascript
    try {
      decodeURIComponent("%"); // ❌ URIError: Malformed URI sequence
    } catch (error) {
      console.log("URIError Caught:", error.message);
    }
    ```
6.  **EvalError:** Errors related to the legacy `eval()` compilation function.

---

## Part 3: The Try-Catch Safety Net

If an error occurs during runtime, JavaScript immediately halts the entire program. To prevent our app from freezing, we wrap risky operations in a `try...catch` block:

### Syntax & Flow:
```javascript
try {
  // 1. Code inside try gets executed line-by-line
  console.log("Step 1: Check balance");
  invalidVariableLookup; // 2. Error occurs! Execution of try halts immediately.
  console.log("Step 2: Transfer funds"); // Never runs
} catch (error) {
  // 3. Control jumps directly here. We receive the error object!
  console.error("Step 3: Error caught safely!");
  console.log(error.name);    // "ReferenceError"
  console.log(error.message); // "invalidVariableLookup is not defined"
}
```

---

## Part 4: The `finally` Block

The `finally` block runs **always**, regardless of whether an error was thrown or caught successfully. 
*   *Analogy:* **Closing the door behind you.** If you enter a room (try), you might find what you want, or you might trip and fall (catch). In either case, you must shut the door (finally) before leaving.
*   *Use Case:* Closing network sockets, cleaning temporary variables, or releasing database connection pools.

```javascript
function processInformation(information) {
  try {
    console.log("Processing Data...");
    if (!information) throw new Error("Missing Payload");
    console.log("Success!");
  } catch (error) {
    console.log("Handled Error:", error.message);
  } finally {
    console.log("Cleanup: Closing Database Connection."); // ALWAYS runs!
  }
}
processInformation();
```

---

## Part 5: Throwing & Rethrowing Exceptions

### 1. Throwing Custom Errors (`throw`)
You can define custom validation errors and manually trigger them using the `throw` keyword:
```javascript
function validateAge(age) {
  if (isNaN(age)) {
    // Generate and throw a custom Error
    throw new Error(`Invalid Input: Age must be a number. Got: ${age}`);
  }
  console.log(`User age: ${age}`);
}

try {
  validateAge("Tapas");
} catch (error) {
  console.error("Validation issues:", error.message);
}
```

### 2. Rethrowing Errors
Sometimes a function catches an error, but does not know how to fully handle it. It handles local logs and then **rethrows** the error so parent callers higher up can capture it:
```javascript
function validateForm(formData) {
  try {
    if (!formData.username) throw new Error("Username required.");
  } catch (error) {
    console.error("Local logger: form validation failed.");
    throw error; // Rethrows the error to parent context!
  }
}

try {
  validateForm({});
} catch(error) {
  console.error("UI overlay display:", error.message); // Receives the rethrown error
}
```

---

## Part 6: Creating Custom Error Classes

For complex applications, standard `Error` objects are too generic. You can define specific Custom Error structures:

```javascript
function ValidationError(message) {
  this.name = "ValidationError";
  this.message = message;
}

function validateCitizen(age) {
  if (age < 60) {
    throw new ValidationError("Access Denied: Senior Citizen cards only.");
  }
  return "Access Granted!";
}

try {
  validateCitizen(15);
} catch (error) {
  console.error(`${error.name}: ${error.message}`); // "ValidationError: Access Denied..."
}
```

---

## Part 7: Logical Nullish Assignment (`??=`)

The `??=` operator assigns a value to a variable **only** if the variable is currently **nullish** (`null` or `undefined`).

```javascript
let x;
let y = 10;

x ??= 20; // x was undefined, so x is assigned 20
y ??= 30; // y was 10 (not nullish), so y remains 10

console.log(x); // 20
console.log(y); // 10
```

---

## Part 8: Real-World Application Code

Here is a secure API payload parsing loop checking for JSON errors:
```javascript
function parsePayload(jsonString) {
  let config = null;
  try {
    config = JSON.parse(jsonString);
  } catch (error) {
    console.warn("JSON Parse Failed, falling back to default configuration.");
    config = { theme: "Dark" }; // Fallback config
  } finally {
    // Ensure config properties are initialized
    config.theme ??= "Light";
  }
  return config;
}

console.log(parsePayload('{"theme":"Blue"}')); // { theme: "Blue" }
console.log(parsePayload("invalid-json")); // { theme: "Dark" }
```

---

## 🚀 Modern ES2025 Upgrades: Promise.try()

When handling errors in API workflows, some operations are synchronous (like checking cache or validating payload structure) and some are asynchronous (like database queries). 

Previously, wrapping both types of actions inside a unified Promise flow required awkward try-catch blocks or creating dummy `Promise.resolve().then(...)` chains. If a synchronous check threw a direct error, it might crash the program before the promise chain's `.catch()` callback could be initialized.

ES2025 introduces **`Promise.try()`** to wrap both synchronous and asynchronous operations into a single, safe Promise chain.

### The Problem:
Imagine a loader function that crashes immediately on invalid input before returning a Promise, bypassing `.catch()`:
```javascript
function loadUserSync(id) {
  if (!id) throw new Error("Invalid ID (sync throw)");
  return Promise.resolve({ id, name: "Arun" });
}

// ❌ Bug: This will CRASH Node.js with an unhandled exception if not wrapped!
// The .catch() is never called because the function throws synchronously inside the stack.
```

### The ES2025 Solution:
`Promise.try()` executes the function immediately. If it throws a synchronous error, it wraps it in a rejected Promise, ensuring `.catch()` intercepts it safely:
```javascript
// 🟢 Safe: Promise.try catches both sync throws and async rejections!
Promise.try(() => loadUserSync(null))
  .then(user => console.log("Loaded user:", user))
  .catch(err => console.log("Promise.try caught error:", err.message));
  // Output: Promise.try caught error: Invalid ID (sync throw)
```

*When to use:* Use `Promise.try()` as a generic wrapper when executing utility functions or callbacks that might throw synchronous exceptions, ensuring your asynchronous promise chains catch them uniformly without manual outer try-catch blocks.

---

## Part 9: Essential Interview Questions & Practice Exercises

### Q1: What does `finally` do that code placed *after* the try-catch block does not?
**Answer:** Code inside `finally` is guaranteed to execute even if the `try` block executes a `return` statement or throws a nested unhandled error that exits the function scope.

### Q2: What are the primary errors handled by V8?
**Answer:** SyntaxError (compilation phase), ReferenceError (missing scope variables), and TypeError (invoking undefined properties or wrong types).

### Practice Exercises:
1.  **Strict Mode Sandbox:** Write a script and place `"use strict";` at the top. Try assigning `x = 10` and observe the ReferenceError console output.
2.  **Double Division Catch:** Build a function dividing two numbers. Wrap it in a `try...catch...finally` block. Throw a custom `Error` if division by zero occurs, and clean up connection logs inside the `finally` block.
3.  **JSON fallback parser:** Parse a payload string. Throw a custom `ParseError` on invalid formatting.
