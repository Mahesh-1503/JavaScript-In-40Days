**“JavaScript Error Handling — From Beginner to Expert.”**

It’s structured for _hands-on mastery_:
✅ Concepts → 🧠 Think → 💻 Try → ✍️ Reflect → ✅ Verify

---

# 💼 JavaScript Error Handling — Interactive Self-Learning Workbook

---

## 🧭 Module 1: Understanding Errors

### 🧠 Concept

Errors are **signals** that something unexpected happened in your code.

There are **two main types**:

1. **Syntax (Parsing) Errors** — code can’t even start running.
2. **Runtime (Exception) Errors** — code starts, then fails partway.

---

### 💻 Try It Yourself

```js
console.log("Hello"
```

✍️ What happens when you run this code?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

✅ Now fix it:

```js
console.log("Hello");
```

🧩 **Reflection:**
What’s the difference between syntax and runtime errors?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

---

### 🧪 Task

Trigger one example each for:

- ReferenceError
- TypeError
- RangeError

✍️ Write your snippets below:

```js
// ReferenceError:
_____________________________________________;

// TypeError:
_____________________________________________;

// RangeError:
_____________________________________________;
```

---

## 🔒 Module 2: The `try...catch` Foundation

### 🧠 Concept

The `try` block lets you _attempt risky code_, and `catch` handles what goes wrong.

```js
try {
  // risky code
} catch (error) {
  // handle gracefully
}
```

---

### 💻 Experiment

```js
try {
  let result = num + 10; // num not defined
  console.log(result);
} catch (error) {
  console.log("Error Type:", error.name);
  console.log("Message:", error.message);
}
```

✍️ What does `error.name` and `error.message` show?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

---

### 🧠 Think

Why is it better to _log_ an error instead of ignoring it?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

---

## 💼 Module 3: Real-World Defensive Coding

### ✅ Task 1 — Prevent Division by Zero

```js
function divide(a, b) {
  try {
    // Add your check here
    const result = a / b;
    console.log("Result:", result);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
```

💡 Add your own validation:
If `b === 0`, throw an error.
✍️ Write it below:

```js
_____________________________________________;
```

Run for:

- divide(10, 2)
- divide(10, 0)

---

### ✅ Task 2 — Safe Property Access

```js
const user = { name: "Anya" };

try {
  console.log(user.address.city);
} catch (e) {
  console.error("Property Error:", e.message);
}
```

🧠 Why does this fail?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

✅ Now fix it using **optional chaining** (`?.`):

```js
console.log(user.address?.city ?? "Unknown");
```

---

### ✅ Task 3 — Input Validation

Write a function `validateAge(age)` that throws an error if age is not a number.

✍️ Write your code:

```js
function validateAge(age) {
  try {
    _____________________________________________;
  } catch (error) {
    console.error(error.message);
  }
}
```

🧩 Test with:

- `validateAge(30)`
- `validateAge("abc")`

---

## 🚨 Module 4: Throwing and Rethrowing Errors

### 🧠 Concept

You can **throw** custom errors and even **rethrow** them for higher-level handling.

---

### 💻 Practice

```js
function checkEmail(email) {
  try {
    if (!email.includes("@")) throw new Error("Invalid email format");
    console.log("Email looks good!");
  } catch (e) {
    console.error("Email Check Failed:", e.message);
    throw e; // 🔁 Try rethrowing
  }
}
```

✍️ Predict what happens if you call `checkEmail("abc.com")` inside another `try...catch`:
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

---

## 🔄 Module 5: Using `finally`

### 🧠 Concept

`finally` runs **every time** — whether error occurs or not.

---

### 💻 Practice

```js
function process(data) {
  try {
    if (!data) throw new Error("No data provided");
    console.log("Processing...");
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    console.log("Cleanup complete.");
  }
}

process("data");
process(null);
```

✍️ What difference do you notice in outputs?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

🧠 When might you use `finally` in real projects?
(e.g., closing files, stopping timers)
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

---

## 🧱 Module 6: Creating Custom Errors

### 💻 Exercise

Create a new error type called `BankError` for “Insufficient funds.”

```js
class BankError extends Error {
  constructor(message) {
    super(message);
    this.name = "BankError";
  }
}
```

✍️ Now use it:

```js
function withdraw(balance, amount) {
  if (amount > balance) throw new BankError("Insufficient funds!");
  return balance - amount;
}
```

✅ Test:

```js
try {
  console.log(withdraw(500, 700));
} catch (error) {
  console.error(`${error.name}: ${error.message}`);
}
```

🧩 Reflect:
Why create your own error types?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

---

## 🧮 Module 7: Bonus — Safe Defaults (`?=`)

Try this modern operator:

```js
let x;
let y = 5;

x ?= 10;
y ?= 20;

console.log(x, y);
```

✍️ Predict and explain the output:
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

When could this be useful?
➡️ **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\***

---

## 🧠 Module 8: Debugging and Expert Habits

### ✅ Checklist

Mark each when you master it:

| Skill                                     | Mastered? |
| ----------------------------------------- | --------- |
| Read and interpret stack traces           | ☐         |
| Identify and fix syntax vs runtime errors | ☐         |
| Use `try...catch` efficiently             | ☐         |
| Use `finally` for cleanup                 | ☐         |
| Throw custom errors                       | ☐         |
| Validate inputs early                     | ☐         |
| Avoid empty catch blocks                  | ☐         |
| Handle async errors (next level)          | ☐         |

---

## 🧩 Module 9: Challenge Projects

1. 🧮 Build a **Calculator** that prevents invalid operations.
2. 🌐 Create `fetchData(url)` that handles network errors with `try...catch`.
3. 🏦 Simulate a **bank withdrawal system** using your `BankError`.
4. 🔁 Use `try...finally` to log “Program completed” always.
5. 🔐 Build a `loginUser()` that rethrows server errors for UI handling.

✍️ Use the space below to outline your solution ideas:

```js
// Project Name: _______________________________

// Key errors to handle:
// _____________________________________________

// Example structure:
try {
  _____________________________________________;
} catch (error) {
  _____________________________________________;
} finally {
  _____________________________________________;
}
```

---

## 🏁 Module 10: Master Summary

✅ Errors are **inevitable**; crashes are **optional**.
✅ Use `try...catch...finally` to **control flow** under failure.
✅ Use `throw` and **custom errors** for clarity.
✅ **Never ignore** errors — handle or log them.
✅ **Always clean up** in `finally`.

---

## 🧗 Graduation Task

Write a **mini project** (any theme) that includes:

- At least 3 custom validation checks
- One custom error class
- A `finally` block for cleanup
- Proper rethrowing logic

🎯 Example ideas:

- Login validation system
- File upload handler
- Simple e-commerce checkout validator
