## 🌋 Callback Hell Example

Let’s start with a **real-world analogy** — **Pizza Order System** 🍕

### 🧩 Callback Hell Code

```js
console.log("Welcome to PizzaHub 🍕");

function orderPizza(callback) {
  setTimeout(() => {
    console.log("1️⃣ Pizza ordered");
    callback();
  }, 1000);
}

function bakePizza(callback) {
  setTimeout(() => {
    console.log("2️⃣ Pizza baked");
    callback();
  }, 2000);
}

function deliverPizza(callback) {
  setTimeout(() => {
    console.log("3️⃣ Pizza delivered");
    callback();
  }, 1500);
}

// Nested callbacks (Callback Hell)
orderPizza(() => {
  bakePizza(() => {
    deliverPizza(() => {
      console.log("✅ Pizza enjoyed! 😋");
    });
  });
});
```

---

### ⚠️ Problem — Callback Hell

You can see the **pyramid shape (nested structure)** 👇

```text
orderPizza(
   bakePizza(
      deliverPizza(
         ...
      )
   )
)
```

This is **hard to read, debug, or maintain**.
Now let’s convert it to **Promises**.

---

## ✨ Step 1: Convert Functions to Return Promises

Each function should **return a Promise** instead of using a callback.

```js
function orderPizza() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1️⃣ Pizza ordered");
      resolve();
    }, 1000);
  });
}

function bakePizza() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2️⃣ Pizza baked");
      resolve();
    }, 2000);
  });
}

function deliverPizza() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("3️⃣ Pizza delivered");
      resolve();
    }, 1500);
  });
}
```

---

## ✨ Step 2: Chain Promises Sequentially

Now you can chain them cleanly using `.then()`:

```js
console.log("Welcome to PizzaHub 🍕");

orderPizza()
  .then(() => bakePizza())
  .then(() => deliverPizza())
  .then(() => {
    console.log("✅ Pizza enjoyed! 😋");
  })
  .catch((error) => {
    console.log("❌ Something went wrong:", error);
  });
```

---

## ✨ Step 3: Make It Cleaner Using `async / await`

Modern and super-readable version 👇

```js
async function pizzaProcess() {
  try {
    console.log("Welcome to PizzaHub 🍕");
    await orderPizza();
    await bakePizza();
    await deliverPizza();
    console.log("✅ Pizza enjoyed! 😋");
  } catch (error) {
    console.log("❌ Something went wrong:", error);
  }
}

pizzaProcess();
```

---

## 🔁 Execution Flow Diagram

```
[Call Stack]
 ↓
Order Pizza (Promise)
 ↓
Bake Pizza (Promise)
 ↓
Deliver Pizza (Promise)
 ↓
✅ Done
```

✅ Each `.then()` or `await` waits for the previous Promise to resolve before moving on — no nesting, no chaos.

---

## 🧠 Summary

| Concept        | Callback Hell      | Promises               |
| -------------- | ------------------ | ---------------------- |
| Syntax         | Nested callbacks   | Flat `.then()` chain   |
| Error Handling | Separate try/catch | Centralized `.catch()` |
| Readability    | Hard               | Easy                   |
| Modern         | ❌ No              | ✅ Yes                 |

---

## 🧩 Student Task

Convert this **Callback Hell** into **Promises and async/await** 👇

```js
function wash(callback) {
  setTimeout(() => {
    console.log("1️⃣ Clothes washed");
    callback();
  }, 1000);
}

function dry(callback) {
  setTimeout(() => {
    console.log("2️⃣ Clothes dried");
    callback();
  }, 2000);
}

function iron(callback) {
  setTimeout(() => {
    console.log("3️⃣ Clothes ironed");
    callback();
  }, 1500);
}

wash(() => {
  dry(() => {
    iron(() => {
      console.log("✅ Clothes ready to wear 👕");
    });
  });
});
```
