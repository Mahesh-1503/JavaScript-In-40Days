# 🧩 Mastering JavaScript Promise Chaining

## 📘 What is a Promise?

A **Promise** in JavaScript is an object that represents the **eventual completion (or failure)** of an asynchronous operation and its resulting value.

👉 Think of a Promise as a placeholder for a value that will be available **later** (for example, after a delay or network request).

---

### 🧠 Key Points

- A Promise can be in **three states**:

  1. **Pending** → still waiting
  2. **Fulfilled (resolved)** → completed successfully
  3. **Rejected** → failed with an error

- You can handle these outcomes using:

  - `.then()` → when the promise resolves
  - `.catch()` → when the promise is rejected
  - `.finally()` → always runs after resolve or reject

---

## 🔗 What is Promise Chaining?

**Promise Chaining** means linking multiple asynchronous operations together so that **each one starts after the previous one completes**.

The result of one `.then()` can be passed to the next `.then()`.

---

### 🧮 Example: Basic Promise Chain

```javascript
const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Resolving first promise");
    resolve();
  }, 2000);
});

firstPromise
  .then(() => {
    console.log("First promise resolved");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Resolving second promise");
        resolve();
      }, 2000);
    });
  })
  .then(() => {
    console.log("Second promise resolved");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Resolving third promise");
        resolve();
      }, 2000);
    });
  })
  .then(() => {
    console.log("Third promise resolved");
  });
```

### 🧾 Output

```
(after 2 seconds)
Resolving first promise
First promise resolved
(after 2 seconds)
Resolving second promise
Second promise resolved
(after 2 seconds)
Resolving third promise
Third promise resolved
```

🟢 **Explanation:**

1. The first promise resolves after 2 seconds.
2. The `.then()` returns a new promise, which resolves after another 2 seconds.
3. The chain continues, executing each step sequentially.

---

## ⚠️ Handling Errors in Promise Chains

Errors can happen at any point in a chain.
To handle them, use the `.catch()` method at the end.

### 💥 Example: Rejection in Chain

```javascript
const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Resolving first promise");
    resolve();
  }, 2000);
});

firstPromise
  .then(() => {
    console.log("First promise resolved");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Rejecting second promise");
        reject("ERROR: Rejecting promise");
      }, 2000);
    });
  })
  .then(() => {
    console.log("Second promise resolved");
  })
  .then(() => {
    console.log("Third promise resolved");
  })
  .catch((error) => {
    console.error("Error in promise chain");
  });
```

### 🧾 Output

```
(after 2 seconds)
Resolving first promise
First promise resolved
(after 2 seconds)
Rejecting second promise
Error in promise chain
```

🟡 **Note:** Once a promise is rejected, the chain stops executing further `.then()` calls and jumps directly to `.catch()`.

---

## 🧩 Why Use Promise Chaining?

✅ Cleaner and more readable asynchronous code
✅ Avoids “callback hell”
✅ Easier to debug and maintain
✅ Allows step-by-step execution of async tasks

---

## 🧠 Practice Example

Try to predict the output before running this code 👇

```javascript
const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
});

firstPromise
  .then(() => {
    console.log("First promise resolved");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  })
  .then(() => {
    console.log("Second promise resolved");
  })
  .catch((error) => {
    console.error(error);
  });

firstPromise.then(() => {
  console.log("First promise resolved in second chain");
});
```

### 🧾 Output (Think before you scroll!)

```
(after 2 seconds)
First promise resolved
First promise resolved in second chain
(after 2 seconds)
Second promise resolved
```

🧩 **Explanation:**

- The same `firstPromise` is used in two separate chains.
- Both chains start once the `firstPromise` resolves.
- They execute independently after that.

---

## 🏁 Conclusion

**Promise Chaining** makes it easy to:

- Run asynchronous tasks **sequentially**
- Handle errors cleanly
- Keep your code readable and organized

By breaking down tasks into small, chained steps, you can write **maintainable, reusable, and clean asynchronous JavaScript code**.
