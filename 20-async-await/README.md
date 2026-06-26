# Module 20: Async / Await in JavaScript

This module introduces **Async/Await**—syntactic sugar built on top of JavaScript Promises. It allows you to write asynchronous code that reads and behaves like synchronous code, significantly improving readability and error handling.

## 💡 Concept Overview

### 1. The `async` Keyword
Declaring a function with `async` ensures that it always returns a Promise. If the function returns a value, JavaScript automatically wraps it in a resolved Promise.

```javascript
async function greet() {
  return "Hello!";
}
greet().then(console.log); // Output: Hello!
```

### 2. The `await` Keyword
The `await` keyword can only be used inside an `async` function. It pauses the execution of the function until the Promise settles (resolves or rejects) and returns its result.

```javascript
async function fetchData() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);
}
```

## 📁 Files in This Module
- **[README.md](README.md)**: This overview guide.
- **[async-await.js](async-await.js)**: Code snippets showing the syntax and execution flow of async/await functions.
- **[index.html](index.html)**: Simple HTML harness to execute the scripts in a browser window.

## 🛡️ Error Handling
With async/await, you can use traditional `try...catch` blocks to handle errors, rather than `.catch()` chaining:

```javascript
async function run() {
  try {
    let result = await apiCall();
  } catch (error) {
    console.error("Oops! Something went wrong:", error);
  }
}
```
