# Module 19: Mastering JavaScript Promises

Welcome to Module 19! This module covers **Promises** in JavaScript—the modern way to handle asynchronous code. Promises solve the issues of nesting (Callback Hell) and loss of execution control (Inversion of Control) by providing a clean, stateful interface for async flows.

## 💡 What is a Promise?
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. A promise can be in one of three states:
1. **Pending**: The initial state; the operation is still running.
2. **Fulfilled**: The operation completed successfully (triggers `.then()`).
3. **Rejected**: The operation failed (triggers `.catch()`).

## 📁 Files & Guides
- **[01-promises-intro.md](01-promises-intro.md)**: A conceptual walkthrough comparing callback hell with the cleaner Promises approach using a simulated pizza order workflow.
- **[02-promises-tasks.md](02-promises-tasks.md)**: Practice tasks to build hands-on experience converting callbacks into Promise-based functions.
- **[03-promise-chaining.md](03-promise-chaining.md)**: In-depth guide on linking multiple asynchronous operations sequentially with `.then()`.
- **[promises-basics.js](promises-basics.js)**: Basic examples showing how to consume and instantiate standard Promises.
- **[promise-implementation.js](promise-implementation.js)**: A script demonstrating step-by-step resolve and reject handlers.
- **[promise-alternative.js](promise-alternative.js)**: Alternative ways to return and consume promises.
- **[index.html](index.html)**: Interactive starter page to run these promise examples in the browser environment.
