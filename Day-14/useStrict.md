
---

````markdown
# ⚡ JavaScript Strict Mode — Complete Guide

Strict mode in **JavaScript** is a restricted variant of the language that helps you write **safer**, **cleaner**, and **faster** code.  
It was introduced in **ECMAScript 5 (ES5)** and is activated using the directive:

```javascript
"use strict";
````

---

## 📑 Table of Contents

1. [🎯 Why Use Strict Mode](#-why-use-strict-mode)
2. [🚀 How to Enable Strict Mode](#-how-to-enable-strict-mode)

   * [Global Scope](#1️⃣-global-scope-entire-script)
   * [Local Scope](#2️⃣-local-scope-inside-a-function)
3. [🛑 Turning Silent Bugs into Errors](#-turning-silent-bugs-into-errors)

   * [Example 1: Preventing Accidental Global Variables](#⚡-example-1-preventing-accidental-global-variables)
   * [Example 2: Assignments to Read-Only Properties](#⚡-example-2-assignments-to-read-only-properties)
   * [Example 3: Function Context (this)](#⚡-example-3-function-context-this)
   * [Example 4: Duplicate Parameter Names](#⚡-example-4-duplicate-parameter-names)
4. [🚫 Restricted Features & Behavior](#-restricted-features--behavior)
5. [🧩 Best Practice for Adopting Strict Mode](#-best-practice-for-adopting-strict-mode)
6. [🧠 Quick Recap](#-quick-recap)
7. [📘 Summary](#-summary)

---

## 🎯 Why Use Strict Mode

Strict mode serves three main purposes:

1. ✅ **Converts silent errors** (that fail without warnings) into explicit exceptions.
2. ⚙️ **Fixes mistakes** that make it hard for JavaScript engines to optimize code.
3. 🚫 **Prohibits problematic and confusing features** of the language.

---

## 🚀 How to Enable Strict Mode

The directive must appear **at the top** of a script or function.

---

### 1️⃣ Global Scope (Entire Script)

Enable strict mode for all code in a file:

```javascript
// main.js
"use strict"; 

// All code below runs in strict mode
let x = 10;
// y = 20; // ❌ ReferenceError
```

---

### 2️⃣ Local Scope (Inside a Function)

Enable strict mode only for a specific function:

```javascript
function useStrict() {
    "use strict"; 
    // Code inside this function is strict
    // undeclared = 1; // ❌ ReferenceError
}

function useSloppy() {
    // Code here is non-strict (sloppy)
    undeclared = 1; // ✅ Works but creates a global variable (bad!)
}
```

> 💡 **Note:**
> Modern **ES Modules** (`import` / `export`) and **Classes** are **strict by default** —
> you don’t need to manually add `"use strict";` inside them.

---

## 🛑 Turning Silent Bugs into Errors

Strict mode converts common silent bugs into thrown errors.

---

### ⚡ Example 1: Preventing Accidental Global Variables

| Sloppy Mode                                                               | Strict Mode                                                      |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Forgetting to use `let`, `const`, or `var` creates a **global variable**. | Assigning to an undeclared variable throws a **ReferenceError**. |

```javascript
// ❌ Sloppy Mode
function careless() { 
    message = "Hello Global!"; // Global variable created by mistake
}
careless();
console.log(message); // "Hello Global!"
```

```javascript
// ✅ Strict Mode
"use strict";
function careful() {
    message = "Hello Global!"; // ❌ ReferenceError
}
careful();
```

---

### ⚡ Example 2: Assignments to Read-Only Properties

| Sloppy Mode                | Strict Mode                        |
| -------------------------- | ---------------------------------- |
| Assignment silently fails. | Assignment throws a **TypeError**. |

```javascript
// ❌ Sloppy Mode
const person = {};
Object.defineProperty(person, "age", { value: 30, writable: false });
person.age = 40; // Ignored silently
console.log(person.age); // 30
```

```javascript
// ✅ Strict Mode
"use strict";
const person = {};
Object.defineProperty(person, "age", { value: 30, writable: false });
person.age = 40; // ❌ TypeError
```

---

### ⚡ Example 3: Function Context (`this`)

| Sloppy Mode                                                | Strict Mode                           |
| ---------------------------------------------------------- | ------------------------------------- |
| `this` defaults to the **global object** (e.g., `window`). | `this` becomes **undefined** instead. |

```javascript
// ❌ Sloppy Mode
function getContext() {
    this.name = "Global";
}
getContext();
console.log(window.name); // "Global" (pollutes global scope)
```

```javascript
// ✅ Strict Mode
"use strict";
function getContext() {
    this.name = "Global"; // ❌ TypeError (this is undefined)
}
getContext();
```

---

### ⚡ Example 4: Duplicate Parameter Names

| Sloppy Mode                        | Strict Mode   |
| ---------------------------------- | ------------- |
| Allowed — the last duplicate wins. | ❌ SyntaxError |

```javascript
// ❌ Sloppy Mode
function add(a, b, a) { 
    return a + b;
}
console.log(add(1, 2, 5)); // 7 (Confusing)
```

```javascript
// ✅ Strict Mode
"use strict";
function add(a, b, a) { 
    // ❌ SyntaxError: Duplicate parameter name
    return a + b;
}
```

---

## 🚫 Restricted Features & Behavior

| Feature                                             | Reason                                                  | Strict Mode Action                           |
| --------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------- |
| **`with` statement**                                | Prevents optimization, creates dynamic scope            | ❌ SyntaxError                                |
| **Octal literals (`010`)**                          | Ambiguous (looks like decimal)                          | ❌ SyntaxError                                |
| **`delete` on plain variables/functions**           | Only object properties should be deletable              | ❌ TypeError / SyntaxError                    |
| **Reserved keywords** (`interface`, `public`, etc.) | Reserved for future use                                 | ❌ SyntaxError                                |
| **`eval()` variable leak**                          | `eval()` can no longer create variables in parent scope | Variables are confined to `eval`'s own scope |

---

## 🧩 Best Practice for Adopting Strict Mode

> ⚙️ If you’re migrating an older codebase:
>
> * Start by enabling strict mode **only** in **new files or new functions**.
> * Gradually refactor older code to make it compliant.
> * This ensures a smooth transition without breaking legacy logic.

---

## 🧠 Quick Recap

| Benefit              | Description                                   |
| -------------------- | --------------------------------------------- |
| 🧹 Cleaner Code      | Forces proper declarations and structure      |
| 🚨 Fewer Bugs        | Converts silent mistakes into explicit errors |
| ⚡ Faster Performance | Helps JavaScript engines optimize code        |
| 🔒 Safer Environment | Disables dangerous or confusing features      |

---

## 📘 Summary

Strict mode helps developers:

* Avoid accidental globals
* Catch common coding mistakes
* Write more secure, predictable code

Whenever possible, **use strict mode** — or simply rely on **ES Modules** and **Classes**, which are strict by default.

---

**✅ Recommended:**
Always start every new JavaScript file with `"use strict";`
(or write your code using modern ES6 modules to get strict mode automatically.)

---

> © 2025 — JavaScript Strict Mode Guide by **Mahesh Kumar**
> *Clean Code. Fewer Bugs. Faster Apps.*

```
