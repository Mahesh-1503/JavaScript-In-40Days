# Module 18: Callbacks and Callback Hell

This module explores **Callback Functions** in JavaScript—the core block of asynchronous execution before the introduction of Promises. You will learn what callbacks are, why we use them, and the challenges of nesting them (popularly known as **Callback Hell** or the **Pyramid of Doom**).

## 💡 What is a Callback?
A callback is a function passed as an argument to another function, to be executed later once a specific task is complete.

```javascript
function loadData(callback) {
  setTimeout(() => {
    console.log("Data loaded");
    callback();
  }, 1000);
}

loadData(() => {
  console.log("Ready to render");
});
```

## 📁 Files in This Module
- **[README.md](README.md)**: This overview guide.
- **[callback-hell-demo.js](callback-hell-demo.js)**: A hands-on code file illustrating a simulated e-commerce cart workflow containing highly nested callbacks.
- **[index.html](index.html)**: Starter page to run and observe script execution in browser developer tools.
- **[task.md](task.md)**: Daily exercises on writing and integrating custom callbacks.

## ⚠️ Challenges with Callbacks
1. **Callback Hell:** When you have multiple asynchronous tasks that depend on one another, your code starts nesting deeper and deeper, forming a pyramid structure that is hard to read and debug.
2. **Inversion of Control (IoC):** You lose control over function execution. When you pass a callback function to a third-party API, you are trusting that API to call your function at the right time, with correct parameters, and exactly once. If the API fails or calls it multiple times, your app behaves unpredictably.

In the next module, we will explore **Promises** and see how they elegantly solve these limitations.
