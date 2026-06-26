# JavaScript Hoisting: Detailed Notes with Examples

---

## 1. **Introduction to Hoisting**

**Hoisting** is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compile phase, before code execution. This means you can use variables and functions before declaring them in your code.

> **Note:** Only the declarations are hoisted, NOT the initializations or assignments.

---

## 2. **Misconception About Hoisting**

A common misconception is that the **entire variable or function**, including its value, is hoisted. In reality:

- **For variables**: Only the declaration is hoisted, NOT the value.
- **For functions**: The entire function declaration is hoisted, but function expressions are not.

**Example Misconception:**

```javascript
console.log(x); // undefined, not ReferenceError
var x = 5;
```
Some think this will throw an error, but it prints `undefined` because the declaration is hoisted, but the assignment (`= 5`) is not.

---

## 3. **Variable Hoisting**

**How it works:**

- Variables declared with `var` are hoisted to the top of their scope (function or global).
- Their value is set to `undefined` until the line where they are assigned.

**Example:**

```javascript
console.log(a); // undefined
var a = 10;
console.log(a); // 10
```

**Behind the scenes:**

```javascript
var a;
console.log(a); // undefined
a = 10;
console.log(a); // 10
```

**Key Points:**
- Only the declaration (`var a;`) is hoisted.
- The assignment remains at its place.

---

## 4. **Hoisting with `let` and `const`**

- Variables declared with `let` and `const` are also hoisted, but **not initialized**.
- They are placed in a **Temporal Dead Zone (TDZ)** from the start of the block until their declaration is encountered.

**Example:**

```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

Or with `const`:

```javascript
console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 30;
```

**Summary Table:**

| Declaration | Hoisted | Initialized | Value Before Declaration |
|-------------|---------|-------------|-------------------------|
| var         | Yes     | Yes         | undefined               |
| let         | Yes     | No          | ReferenceError (TDZ)    |
| const       | Yes     | No          | ReferenceError (TDZ)    |

---

## 5. **Temporal Dead Zone (TDZ)**

The **Temporal Dead Zone** is the time between entering scope and the variable's declaration where you cannot access `let` or `const` variables.

**Example:**

```javascript
{
  // TDZ starts here
  // console.log(x); // ReferenceError
  let x = 5; // TDZ ends after this line
  console.log(x); // 5
}
```

**Why does TDZ exist?**
- To prevent bugs and make code more predictable by not allowing access before explicit declaration.

---

## 6. **Functional Hoisting**

**Function Declarations** are fully hoisted. You can safely call them before their declaration in the code.

**Example:**

```javascript
greet(); // "Hello World!"

function greet() {
  console.log("Hello World!");
}
```

**How JavaScript sees it:**

```javascript
function greet() {
  console.log("Hello World!");
}
greet(); // "Hello World!"
```

---

## 7. **Hoisting and Function Expressions**

**Function Expressions** (using `var`, `let`, or `const`) are NOT fully hoisted.

**Example with `var`:**

```javascript
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi!");
};
```
- Here, `sayHi` is hoisted as a variable (with value `undefined`), but not as a function.

**Example with `let` or `const`:**

```javascript
sayBye(); // ReferenceError: Cannot access 'sayBye' before initialization

let sayBye = function() {
  console.log("Bye!");
};
```
- Here, `sayBye` is in the TDZ.

---

## 8. **Task: Practical Examples for Students**

### Example 1: Predict the Output

```javascript
console.log(foo);
var foo = "I am learning hoisting!";
```
**Answer:**  
Output: `undefined`  
Explanation: Declaration is hoisted, assignment is not. So, `foo` exists but is `undefined` before assignment.

---

### Example 2: Hoisting with `let`

```javascript
console.log(bar);
let bar = "Hoisting with let!";
```
**Answer:**  
Output: ReferenceError  
Explanation: `bar` is in the TDZ until the line it is declared.

---

### Example 3: Hoisting with Functions

```javascript
hello(); // ?

function hello() {
  console.log("Hello from function declaration!");
}
```
**Answer:**  
Output: `Hello from function declaration!`  
Explanation: Function declarations are fully hoisted.

---

### Example 4: Function Expression with `var`

```javascript
greet(); // ?

var greet = function() {
  console.log("Hello from function expression!");
};
```
**Answer:**  
Output: TypeError: greet is not a function  
Explanation: `greet` is hoisted as a variable (`undefined`), not as a function.

---

## **Summary Table**

| Concept                    | `var`        | `let`/`const` | Function Declaration | Function Expression |
|----------------------------|--------------|---------------|---------------------|--------------------|
| Hoisted?                   | Yes          | Yes           | Yes                 | Variable only      |
| Initialized on hoist?      | Yes (undef.) | No (TDZ)      | Yes (function)      | No (undef./TDZ)    |
| Usable before declaration? | Yes (undef.) | No (TDZ)      | Yes                 | No                 |

---

## **Key Takeaways**

- **Declarations** (not initializations) are hoisted.
- `var` variables are hoisted and initialized as `undefined`.
- `let`/`const` are hoisted but in TDZ, not accessible before declaration.
- Function declarations are fully hoisted.
- Function expressions are not hoisted as functions (only their variable).
- Always **declare variables and functions at the top** to avoid confusion!

---

## **Practice Task**

Try predicting outputs for the following, and then run them in your console!

```javascript
// 1
console.log(a); // ?
var a = 1;

// 2
console.log(b); // ?
let b = 2;

// 3
test(); // ?
function test() { console.log("Tested!"); }

// 4
fun(); // ?
var fun = function() { console.log("Fun!"); }
```

**Check your answers and understand WHY each result occurs!**
