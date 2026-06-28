# Beginner's Guide: Operators and Expressions

Hey there, future developer! 👋 Welcome to your hands-on guide to JavaScript Operators and Expressions. Today, we are going to explore mathematical operators, increment prefix/postfix rules, logical short-circuiting, and ternary operations.

---

## 📂 How to Learn This Folder

To get the most out of your operators experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand operators classifications and short-circuit evaluations.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-ops.js`), and run them with `node test-ops.js` in your terminal to see the results.
3.  **Step 3:** Open and read [03-operators-and-expressions/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/03-operators-and-expressions/README.md) to explore operator precedence and bitwise masks.

---

## Step 1: What are Operators and Expressions?

### Operators
An **operator** is a symbol that tells the JavaScript engine to perform a specific action on one or more values.

```javascript
5 + 3
```
*   `+` is the **Operator** (performs addition).
*   `5` and `3` are the **Operands** (the values being modified).

#### Operator Classification by Operand Count:
*   **Unary Operators:** Work on a **single** operand (e.g., `typeof x`, `!isLogged`, `x++`).
*   **Binary Operators:** Work on **two** operands (e.g., `a + b`, `x === y`, `age >= 18`).
*   **Ternary Operator:** Works on **three** operands. JavaScript has only one: the conditional operator (`condition ? val1 : val2`).

### Expressions
An **expression** is any unit of code that resolves/evaluates to a single value.

```javascript
5 + 3;       // Evaluates to 8
10 > 5;      // Evaluates to true
age >= 18;   // Evaluates to true or false depending on the value of 'age'
```

---

## Step 2: Arithmetic Operators

Arithmetic operators perform standard mathematical calculations.

| Operator | Meaning | Example |
| :---: | :--- | :--- |
| **`+`** | Addition | `5 + 3` (8) |
| **`-`** | Subtraction | `10 - 3` (7) |
| **`*`** | Multiplication | `4 * 5` (20) |
| **`/`** | Division | `20 / 5` (4) |
| **`%`** | Modulus (Remainder) | `10 % 3` (1) |
| **`**`** | Exponentiation (Power) | `2 ** 3` (8) |

### Modulus (`%`)
Returns the remainder left over after dividing the first operand by the second:
```javascript
console.log(10 % 3); // 1 (Because 3 goes into 10 three times, leaving a remainder of 1)
```

#### Real Use: Odd or Even
Modulus is commonly used to check if a number is even or odd:
```javascript
let num = 7;

if (num % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}
```

### Exponentiation (`**`)
Raises the first operand to the power of the second (equivalent to `Math.pow()`):
```javascript
console.log(2 ** 3); // 8 (Equivalent to 2 * 2 * 2)
```

---

## Step 3: Increment and Decrement

These unary operators increase or decrease a variable's value by exactly 1.

### 1. Increment (`++`)
```javascript
let x = 5;
x++;
console.log(x); // 6
```

### 2. Decrement (`--`)
```javascript
let x = 5;
x--;
console.log(x); // 4
```

### 3. Post-fix vs. Pre-fix (Execution Order)

*   **Post-fix (`count++` / `count--`):** Evaluates/returns the current value *first*, and then increases or decreases it in memory.
    ```javascript
    let count = 5;
    console.log(count--); // 5 (Prints 5, then decreases count to 4 in memory)
    console.log(count);   // 4
    ```

*   **Pre-fix (`++count` / `--count`):** Increases or decreases the value in memory *first*, and then returns it.
    ```javascript
    let count = 5;
    console.log(--count); // 4 (Decreased to 4, then printed)
    ```

---

## Step 4: Assignment Operators

Used to assign values to variables. Compound assignments combine math operations with assignment to write shorter code.

| Naive Write | Shorthand Write |
| :--- | :--- |
| `x = x + 5;` | `x += 5;` |
| `x = x - 3;` | `x -= 3;` |
| `x = x * 2;` | `x *= 2;` |
| `x = x / 4;` | `x /= 4;` |

#### Real Example: CTC Calculator
```javascript
let monthlySalary = 12300;
let annualSalary = monthlySalary * 12;
let bonus = annualSalary * 0.2; // 20% bonus
let ctc = annualSalary + bonus;

console.log(ctc); // 177120
```

---

## Step 5: Comparison Operators

Comparison operators compare two values and return a Boolean: `true` or `false`.

| Operator | Meaning | Example |
| :---: | :--- | :--- |
| **`==`** | Loose Equality (coerces types) | `5 == "5"` (true) |
| **`===`** | Strict Equality (compares type & value) | `5 === "5"` (false) |
| **`!=`** | Loose Inequality | `5 != "5"` (false) |
| **`!==`** | Strict Inequality | `5 !== "5"` (true) |
| **`>`** | Greater Than | `10 > 5` (true) |
| **`<`** | Less Than | `10 < 5` (false) |
| **`>=`** | Greater Than or Equal | `5 >= 5` (true) |
| **`<=`** | Less Than or Equal | `4 <= 5` (true) |

### Strict vs. Loose Comparison
*   **Loose Equality (`==`):** Converts (coerces) operands to a common type before comparing:
    ```javascript
    console.log(3 == "3"); // true (String "3" is converted to Number 3)
    ```
*   **Strict Equality (`===`):** Returns false if types are different, performing no coercion:
    ```javascript
    console.log(3 === "3"); // false (Number !== String)
    ```

> [!IMPORTANT]
> **Golden Rule:** Always use strict comparison (`===` and `!==`). Avoid loose comparison (`==` and `!=`) because coercion leads to unpredictable, silent bugs.

#### Coercion Gotchas:
```javascript
console.log(0 == false);        // true
console.log(null == undefined); // true
console.log(NaN == NaN);        // false (Special rule: NaN is never equal to anything, including itself!)
```

#### Object Comparisons:
```javascript
let obj1 = { name: "JS" };
let obj2 = { name: "JS" };
console.log(obj1 === obj2); // false
```
*Why?* Reference types compare **memory address pointers** in the Stack, not the property contents in the Heap. Since `obj1` and `obj2` live at different addresses, they are not equal.

---

## Step 6: Logical Operators

Used to combine or invert Boolean conditions.

### 1. AND (`&&`)
Returns `true` only if **both** operands are true.
```javascript
let age = 20;
let citizen = true;
console.log(age >= 18 && citizen); // true
```

### 2. OR (`||`)
Returns `true` if **at least one** operand is true.
```javascript
let isWeekend = true;
let isHoliday = false;
console.log(isWeekend || isHoliday); // true
```

### 3. NOT (`!`)
Inverts a Boolean value.
```javascript
console.log(!true);  // false
console.log(!false); // true
```

---

## Step 7: Short-Circuit Evaluation

JavaScript evaluates logical expressions from left to right and stops execution as soon as the outcome is guaranteed.

### AND Short-Circuit
If the first condition is `false`, the entire statement *must* be false. The engine skips evaluating the second part completely:
```javascript
false && someFunction(); // someFunction() is never called!
```

### OR Short-Circuit
If the first condition is `true`, the entire statement *must* be true. The engine skips evaluating the second part completely:
```javascript
true || someFunction(); // someFunction() is never called!
```

#### Real Production Code: Fallback Default
```javascript
// If user has a promoCode, evaluate its discount. If not, fallback to 0.
const discount = (promoCode === "SAVE10" && 10) || 0;
```

---

## Step 8: Nullish Coalescing (`??`)

The nullish coalescing operator returns the right-hand value **only** if the left-hand value is `null` or `undefined`.

### The Problem with OR (`||`)
The `||` operator falls back on *any* falsy value, including valid numbers like `0` or empty strings `""`:
```javascript
let volume = 0; // Valid settings value
console.log(volume || 50); // 50 (Wrong! 0 is falsy, so it fell back to 50)
```

### The Solution with `??`
```javascript
console.log(volume ?? 50); // 0 (Correct! 0 is not nullish, so it is preserved)
```

---

## Step 9: Ternary Operator (`? :`)

A clean, single-line shorthand for an `if...else` block.
*   **Syntax:** `condition ? valueIfTrue : valueIfFalse`

### Basic Example:
```javascript
let age = 23;
let group = (age >= 18) ? "Adult" : "Minor";
console.log(group); // "Adult"
```

### Leap Year Calculation Example:
```javascript
let year = 2024;
let result = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 
  ? "Leap Year" 
  : "Not Leap Year";

console.log(result); // "Leap Year"
```

### Traffic Light Status Example:
```javascript
let color = "Red";
console.log(color === "Red" ? "STOP" : "GO"); // "STOP"
```

---

## Step 10: Operator Precedence

Precedence determines the order in which operators are evaluated. Higher precedence operators run first.

```javascript
let result = 1 + 2 * 3;
console.log(result); // 7 (Multiplication has higher precedence than addition: 2 * 3 = 6, 1 + 6 = 7)
```

### Using Parentheses
You can override default precedence using parentheses:
```javascript
let result = (1 + 2) * 3;
console.log(result); // 9 (Expressions inside parentheses run first)
```
> [!TIP]
> **Best Practice:** Always use parentheses in complex mathematical or logical operations to make the evaluation order explicit and readable for other developers.

---

## Step 11: Bitwise Operators

Bitwise operators convert numeric operands into 32-bit binary digits (zeros and ones) and perform bit-by-bit comparisons.

### 1. AND (`&`)
Sets each bit to `1` only if both bits are `1`:
```javascript
// 15 = 1111
//  9 = 1001
console.log(15 & 9); // 9 (1001 in binary)
```

### 2. OR (`|`)
Sets each bit to `1` if at least one bit is `1`:
```javascript
console.log(15 | 9); // 15 (1111 in binary)
```

### 3. XOR (`^`)
Sets each bit to `1` only if bits are different:
```javascript
console.log(15 ^ 9); // 6 (0110 in binary)
```

### 4. Left Shift (`<<`)
Shifts binary digits to the left by filling empty right spots with zeros. Effectively **multiplies the number by 2** for each shift:
```javascript
// 5 in binary is 0101
// Shift left by 1 digit: 1010 (10 in binary)
console.log(5 << 1); // 10
```

### Production Example: High-Performance Permissions Mask
```javascript
const READ = 1;   // 0001
const WRITE = 2;  // 0010
const DELETE = 4; // 0100

// Assign permissions via bitwise OR (|)
let userPermission = READ | WRITE; // 0011

// Check permissions via bitwise AND (&)
const canWrite = (userPermission & WRITE) !== 0;
console.log("Can write?:", canWrite); // true
```

---

## Step 12: The `typeof` Operator

A unary operator that returns a string indicating the evaluation type of the operand.

```javascript
console.log(typeof "Mahesh");    // "string"
console.log(typeof 100);         // "number"
console.log(typeof false);       // "boolean"
console.log(typeof [1, 2, 3]);   // "object" (Arrays are reference objects)
```

### The Null Bug:
```javascript
console.log(typeof null); // "object"
```
> [!WARNING]
> This is a famous legacy bug in the JavaScript engine that was never fixed to maintain backwards compatibility. If you need to verify if a variable is `null`, check it explicitly: `val === null`.

---

## Step 13: Real-World Application Projects

### Project 1: Uber Fare Calculator
```javascript
const baseFare = 5;
const distanceKm = 12.5;
const ratePerKm = 1.5;
const surgeMultiplier = 1.8;

const totalFare = (baseFare + (distanceKm * ratePerKm)) * surgeMultiplier;
console.log("Uber Invoice Total: $", totalFare.toFixed(2)); // "Uber Invoice Total: $ 42.75"
```

### Project 2: Electricity Bill Calculator
```javascript
let dailyUnits = 10;
let costPerUnit = 1.50;
let billDays = 30;

let monthlyBill = dailyUnits * costPerUnit * billDays;
let annualBillWithoutDiscount = monthlyBill * 12;

// Apply 20% loyalty discount using compound assignment
let finalAnnualBill = annualBillWithoutDiscount;
finalAnnualBill *= 0.8; 

console.log("Final Annual Electricity Bill: $", finalAnnualBill.toFixed(2));
```

---

## Step 14: Most Important Interview Questions

### Q1: What does `0.1 + 0.2 === 0.3` evaluate to and why?
**Answer:** It evaluates to `false`. JavaScript numbers are double-precision binary floats. Numbers like `0.1` and `0.2` cannot be represented precisely in finite binary digits, leading to tiny rounding errors (evaluating to `0.30000000000000004`).

### Q2: What is the difference between `==` and `===`?
**Answer:** `==` (loose equality) converts operands to a common type before performing comparison. `===` (strict equality) performs no type conversion, returning `false` if types differ.

### Q3: What is the difference between `||` and `??`?
**Answer:** `||` returns the right-hand value on *any* falsy left-hand value (`0`, `""`, `false`, `null`, `undefined`, `NaN`). `??` (nullish coalescing) returns the right-hand value *only* if the left-hand value is `null` or `undefined`.

---

## Step 15: Practice Exercises

1.  **Metric Converter:** Write a program that converts inches to centimeters using arithmetic operations.
2.  **Odd/Even Evaluator:** Create a script checking if a number is even/odd using `%`.
3.  **Speed Gate Tracker:** Verify if a driver's speed is within bounds (`>= 40` and `<= 120`).
4.  **Ternary Leap Checker:** Code a single-line leap year calculator using ternary conditions.
5.  **Score comparison HOF:** Compare two student objects and return the maximum score.
6.  **Utility biller:** Build a script calculating bills based on dynamic tiers using math and logical short-circuits.
7.  **Fare Surge tracker:** Build a calculator calculating dynamic surge prices on events using ternary cascades.
8.  **POSIX mask gates:** Write a permissions checker system using bitwise AND/OR masks.
9.  **Config default setup:** Write a configuration system that loads custom timeouts using `??` defaults.
10. **Promo coupon checker:** Code a checkout system that applies discounts using `&&` conditions.
