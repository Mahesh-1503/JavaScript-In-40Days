# JavaScript Closures - Master Notes

Closures are one of the most powerful and sometimes confusing concepts in JavaScript. If you master closures, you will unlock a deeper understanding of how JavaScript works under the hood, and you’ll be able to write more robust, flexible code.

These notes break down closures from the absolute basics to advanced use-cases, in a way that even a complete beginner can become a master!

---

## 1. What is a Closure?

A **closure** is the combination of a function and the lexical environment within which that function was declared. In simple terms, a closure allows a function to remember and access variables from outside its own scope, **even after the outer function has finished executing**.

**Definition in Simple Words:**  
A closure is a function "remembering" the variables from where it was created.

---

## 2. The Building Blocks: Scope

Before closures, you must understand **scope**.

- **Global Scope:** Variables declared outside any function/block are in the global scope.
- **Function Scope:** Variables declared inside a function are only accessible inside that function.
- **Block Scope (ES6+):** Variables declared with `let` or `const` inside `{}` are block scoped.

```js
let a = 10; // global

function foo() {
  let b = 20; // function
  if (true) {
    let c = 30; // block
    console.log(c); // 30
  }
  // console.log(c); // ERROR: c is not defined
}
```

---

## 3. The Birth of a Closure

Whenever you create a function inside another function, and the inner function references variables from the outer function, a closure is formed.

### Example 1: Basic Closure

```js
function outer() {
  let message = "Hello from outer!";
  function inner() {
    console.log(message); // inner "remembers" message
  }
  return inner;
}

const myClosure = outer(); // outer() runs, returns inner()
myClosure(); // "Hello from outer!"
```

**What's happening?**  
Even after `outer()` has finished, `myClosure()` still has access to `message` because of the closure.

---

## 4. Why Are Closures Useful?

- **Data Privacy / Encapsulation**
- **Partial Application / Currying**
- **Function Factories**
- **Event Handlers & Callbacks**

---

## 5. Data Privacy with Closures

Closures let you have "private" variables that can't be accessed from outside.

### Example 2: Private Variables

```js
function Counter() {
  let count = 0; // private
  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    get: function () {
      return count;
    },
  };
}

const myCounter = Counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.decrement()); // 1
console.log(myCounter.get()); // 1
// console.log(myCounter.count); // undefined!
```

---

## 6. Closures in Loops (Classic Interview Trap)

### Example 3: Closures in Loops - The Problem

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// Output: 4, 4, 4 (after 1 second, 3 times)
```

**Why?**  
All three functions share the same `i` (the one in the outer scope), which becomes 4 after the loop.

### Solution: Use Closure to Capture Each Value

```js
for (var i = 1; i <= 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i);
}
// Output: 1, 2, 3
```

Or with `let` (block scoped):

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

---

## 7. Function Factories with Closures

Functions that create and return other functions can use closures to make "customized" functions.

### Example 4: Function Factory

```js
function makeMultiplier(multiplier) {
  return function (x) {
    return x * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

---

## 8. Closures in Real Life: Event Handlers

Closures keep variables alive for event handlers and callbacks.

### Example 5: Button Click Handler

```js
function setupButton(buttonId, message) {
  document.getElementById(buttonId).onclick = function () {
    alert(message);
  };
}

setupButton("btn1", "Clicked Button 1");
setupButton("btn2", "Clicked Button 2");
```

Each button "remembers" its own message.

---

## 9. Advanced: Currying with Closures

Currying is making a function with multiple arguments into a sequence of functions, each with one argument.

### Example 6: Currying

```js
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sum(1)(2)(3)); // 6
```

---

## 10. Common Gotchas & Tips

- Variables in closures are **live** – if they change in the outer scope, the closure sees the change.
- Closures can cause memory leaks if not used carefully (e.g., holding onto DOM nodes).
- Always use `let` or `const` in loops to avoid classic closure bugs.

---

## 11. Visualizing Closures

You can use [JavaScript Visualizer](https://pythontutor.com/javascript.html) to step through and see how closures work in memory.

---

## 12. Super Extreme Example: Closure with Asynchronous Code

```js
function fetchData(url) {
  let cache;
  return function () {
    if (cache) {
      return Promise.resolve(cache);
    } else {
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          cache = data;
          return data;
        });
    }
  };
}

const getUser = fetchData("https://jsonplaceholder.typicode.com/users/1");
getUser().then((user) => console.log(user)); // Fetches from network
getUser().then((user) => console.log(user)); // Returns cached user
```

---

## 13. Practice Time

Try to solve these yourself!

1. Write a function that returns a function that adds a specific number to its input.
2. Make a secret password function: once set, you can check guesses, but never see the password.
3. Make a function that remembers how many times it’s been called.

---

## 14. Summary

- **Closure = Function + Its Surrounding Variables ("Lexical Environment")**
- Closures allow data privacy, function factories, currying, and more.
- Mastering closures helps you deeply understand JavaScript.

---

# 🚀 You are now a Closure Master!
