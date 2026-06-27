# Day 02: Variables and Data Types (Memory & Scope)

In software development, variables are not just "containers." They are references to memory locations. Understanding how variables are declared, scoped, and stored in the JavaScript engine memory is critical for writing memory-efficient, bug-free web applications.

---

## 1. Mental Model (The Amazon Shopping Cart)

Think about the state of an **Amazon Shopping Cart**:
1. **`isCartOpen` (Boolean):** A flag representing if the cart modal is showing.
2. **`cartTotal` (Number):** The sum of items in the cart (needs reassignment as items are added).
3. **`items` (Array/Reference):** The list of product items.
4. **`currency` (String/Constant):** The currency indicator (e.g. `"USD"`) which never changes.

In JavaScript:
- Simple values (prices, flags) are stored directly in quick-access memory (**Stack**).
- Complex collections (arrays of items, product details objects) are stored in structured memory (**Heap**), and our variables point to those memory addresses.

---

## 2. Visual Thinking (Stack vs Heap Memory)

Here is how the JavaScript engine (like V8) allocates memory for primitives and references:

```
STACK MEMORY (Fixed size, fast access)        HEAP MEMORY (Dynamic size, objects)
┌──────────────────┬──────────────┐           ┌────────────────────────────────┐
│ Variable Name    │ Value/Address│           │ Memory Address: @099F          │
├──────────────────┼──────────────┤           │ {                              │
│ currency         │ "USD"        │           │   id: "p_101",                 │
│ cartTotal        │ 89.99        │ ─────────►│   title: "Kindle Reader",      │
│ productItemRef   │ @099F (Link) │           │   price: 89.99                 │
└──────────────────┴──────────────┘           │ }                              │
                                              └────────────────────────────────┘
```

When you reassign `cartTotal = 95.99`, the Stack value changes.
When you update `productItemRef.price = 79.99`, the value inside the Heap changes, but the address pointer on the Stack remains exactly the same (`@099F`).

---

## 3. Beginner Explanation

A **variable** is a nickname for a value stored in your computer's memory.
JavaScript gives us three keywords to create variables:
- **`const`:** (Constant) For values that will never be reassigned. (e.g. your birth year). **Always use this by default.**
- **`let`:** For variables that you need to reassign later (e.g. your age, shopping cart total).
- **`var`:** The legacy way to declare variables. It has dangerous scoping rules that lead to bugs. **Never use this.**

---

## 3.5. Syntax & Basic Code Mechanics

Before mapping memory heap addresses in Amazon shopping carts, let's look at the basic syntax of creating variables and variables reassignments in JavaScript.

### The Code
```javascript
// 1. Constant Variable: value cannot be reassigned
const birthYear = 2000;
// birthYear = 2005; // TypeError: Assignment to constant variable!

// 2. Mutable Variable: value can be reassigned
let userAge = 26;
userAge = 27; // Reassignment is successful

// 3. Constant Object Reference: reference address cannot change, but properties can
const userProfile = {
  name: "Arun",
  status: "active"
};

// userProfile = { name: "Vijay" }; // TypeError: Assignment to constant variable!
userProfile.status = "inactive"; // Works! We modified the property, not the pointer.
```

### Line-by-Line Breakdown for Beginners

1. **`const birthYear = 2000;`**
   - We declare a constant named `birthYear` using the `const` keyword and assign it the number `2000`.
   - The value is locked. If we try to reassign it on line 3, JavaScript throws a TypeError and stops executing.
2. **`let userAge = 26;`**
   - We declare a mutable variable named `userAge` using `let` and assign it `26`.
   - On the next line, we write `userAge = 27;`. This updates the value stored in memory. We do **not** write the `let` keyword again on reassignment.
3. **`const userProfile = { ... };`**
   - We create an object variable. In JavaScript, objects are reference types stored in Heap memory.
   - Using `const` here means the variable `userProfile` is locked to that specific object block. We cannot reassign `userProfile` to a *new* object (e.g. `userProfile = { ... }` throws an error).
4. **`userProfile.status = "inactive";`**
   - Because the object contents live inside the Heap, modifying properties *inside* the object is allowed! The constant pointer on the Stack remains unchanged.

---

## 3.6. JavaScript Comments & Primitives In-Focus (Strings, Numbers, Symbols)

### 1. JavaScript Comments
Comments are annotations in the code that the JavaScript engine ignores during execution. They are critical for documenting code logic.
* **Single-line Comments:** Start with `//`. Everything from the symbol to the end of the line is ignored.
  ```javascript
  // This is a single-line comment setting the count
  let count = 10;
  ```
* **Multi-line Comments (Block Comments):** Start with `/*` and end with `*/`. Useful for longer explanations or temporarily disabling chunks of code.
  ```javascript
  /*
    This function processes payment checkouts.
    It takes an amount and validates user limits.
  */
  function processPayment() {}
  ```

### 2. JavaScript Strings
Strings represent textual data. They are immutable primitive values.
* **String Creation:** Single quotes (`'...'`), double quotes (`"..."`), or template literals (backticks `` `...` ``) which support variable interpolation and multi-line formatting.
* **Core Properties & Methods:**
  - **`.length`:** Property returning string character count.
  - **`.charAt(index)`:** Returns character at specified position.
  - **`.indexOf(substring)` / `.lastIndexOf(substring)`:** Returns index of first/last occurrence of a substring (returns `-1` if not found).
  - **`.slice(start, end)`:** Extracts a section of a string and returns a new string.
  - **`.substring(start, end)`:** Similar to `slice`, but treats negative indices as `0`.
  - **`.includes(substring)` / `.startsWith(substring)` / `.endsWith(substring)`:** Boolean checks for substring matches.
  - **`.replace(target, replacement)` / `.replaceAll(target, replacement)`:** Substitutes occurrences of substrings.
  - **`.split(separator)`:** Splits a string into an array of substrings.
  - **`.trim()`:** Removes whitespace from both ends.
  - **`.toUpperCase()` / `.toLowerCase()`:** Case conversion.

### 3. JavaScript Numbers
In JavaScript, all numbers are double-precision 64-bit binary format IEEE 754 values (floats). There is no distinct "Integer" type at the primitive level (though modern JS includes `BigInt` for arbitrary precision integers).
* **Floating-Point Precision:** Floating-point numbers can cause rounding errors due to binary representation limits (e.g., `0.1 + 0.2` evaluates to `0.30000000000000004`).
* **Special Constants:**
  - `Number.MAX_VALUE` / `Number.MIN_VALUE`: Largest/smallest positive numeric values representable.
  - `Number.MAX_SAFE_INTEGER` / `Number.MIN_SAFE_INTEGER`: Safe limit for integer calculations (`2^53 - 1` and `-(2^53 - 1)`).
  - `Number.NaN`: "Not-a-Number", representing invalid mathematical operations (e.g., `0 / 0`).
* **Core Methods:**
  - `Number.isNaN(value)`: Checks if a value is NaN without type coercion (preferred over global `isNaN()`).
  - `Number.isInteger(value)`: Returns boolean indicating if a number is a whole integer.
  - `Number.parseInt(string, radix)` / `Number.parseFloat(string)`: Parses string representations to numbers.
  - `num.toFixed(digits)`: Formats a number to a fixed decimal point representation (returns a string).

### 4. JavaScript Symbols
Introduced in ES6, a **Symbol** is an immutable primitive value that is guaranteed to be unique.
* **Uniqueness:** Even if created with the same description, symbols are completely unique.
  ```javascript
  const sym1 = Symbol("id");
  const sym2 = Symbol("id");
  console.log(sym1 === sym2); // false
  ```
* **Primary Use Cases:**
  - **Hidden Object Keys:** Symbols do not show up in standard iteration loops (like `for...in` or `Object.keys()`), making them perfect for private/metadata properties on objects.
  - **Global Registry:** Using `Symbol.for(key)` looks up or creates a shared global symbol.

---

## 4. Deep Explanation (V8 Engine & Memory Allocation)

### 1. Variables Scoping Rules
- **Block Scope (`let`/`const`):** Variables declared inside a block `{ ... }` (e.g. inside an `if` block or a loop) cannot be accessed outside of it.
- **Function Scope (`var`):** Variables declared with `var` are scoped to the nearest enclosing function, ignoring block boundaries (like `if` statements or `for` loops).
- **Temporal Dead Zone (TDZ):** While variables declared with `var` are initialized to `undefined` when hoisted, `let` and `const` are hoisted but not initialized. Accessing them before their declaration line throws a `ReferenceError`.

### 2. Primitive vs Reference Types
- **Primitives (Value Types):** Stored directly in the **Stack**. These include: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol`, `BigInt`. They are immutable and compared by value.
- **Reference Types:** Stored in the **Heap**. These include: `Object`, `Array`, `Function`. The variable only holds a reference pointer to the Heap memory location. They are compared by reference address.

---

## 4.5. Type Conversion (Explicit Casting vs. Implicit Coercion)

In JavaScript, variables can change types dynamically. This happens in two ways:

### 1. Explicit Type Conversion (Casting)
Explicit conversion is when a developer intentionally converts a value from one type to another using built-in constructors.
* **To String:** `String(value)` or `value.toString()`.
  ```javascript
  String(100);       // "100"
  String(true);      // "true"
  String(null);      // "null"
  ```
* **To Number:** `Number(value)`, `parseInt(value, radix)`, or `parseFloat(value)`.
  ```javascript
  Number("42");      // 42
  Number("42.5");    // 42.5
  Number("");        // 0
  Number(null);      // 0
  Number(undefined); // NaN
  parseInt("42px", 10); // 42 (stops parsing at non-numeric characters)
  ```
* **To Boolean:** `Boolean(value)`. Evaluates the value based on truthiness.
  - **Falsy Values (evaluates to `false`):** `false`, `0`, `-0`, `0n` (BigInt zero), `""` (empty string), `null`, `undefined`, and `NaN`.
  - **Truthy Values (evaluates to `true`):** Everything else, including empty objects `{}` and empty arrays `[]`!

### 2. Implicit Type Coercion
Coercion is when the JavaScript engine automatically converts a value's type under the hood during operation evaluation.
* **String Coercion (with the `+` operator):** If any operand is a string, the `+` operator acts as concatenation and coerces other values to strings.
  ```javascript
  "5" + 2;     // "52" (Number 2 is coerced to string "2")
  "5" + true;  // "5true"
  5 + 5 + "5"; // "105" (Evaluates left-to-right: 5+5=10, 10+"5"="105")
  ```
* **Numeric Coercion (with `-`, `*`, `/`, `%`):** Non-addition arithmetic operators coerce strings or boolean values to numbers.
  ```javascript
  "5" - 2;    // 3 (String "5" is coerced to number 5)
  "5" * "2";  // 10
  true + 2;   // 3 (Boolean true is coerced to 1)
  false * 10; // 0 (Boolean false is coerced to 0)
  ```
* **Loose Equality Coercion (`==`):** Compares values after coercing them to a common type.
  ```javascript
  "5" == 5;    // true (String coerced to Number)
  true == 1;   // true (Boolean coerced to Number)
  null == undefined; // true (Special rule in spec)
  ```
  > [!WARNING]
  > Because implicit coercion in loose comparison leads to unpredictable bugs (e.g., `[] == false` is `true`), **always use strict equality (`===`)**, which checks both value and type without coercion.

---

## 5. Real Production Examples

### 1. Read-Only API Config Object (Const References)
```javascript
const API_CONFIG = {
  baseURL: "https://api.amazon.com/v1",
  timeout: 5000,
  headers: { "Content-Type": "application/json" }
};
// You CAN mutate nested properties:
API_CONFIG.timeout = 10000;
```

### 2. Dynamic Pricing Reassignment (Let)
```javascript
let currentCartTotal = 0.00;
function addProductToCart(price) {
  currentCartTotal += price; // Reassigning let variable
}
```

### 3. Symbol for Unique Object Keys (Preventing Key Collisions)
Used in large systems (like React's internal fiber nodes) to ensure keys don't overwrite each other.
```javascript
const ITEM_TRACKING_KEY = Symbol('product_tracking_id');
const cartItem = {
  [ITEM_TRACKING_KEY]: "item_0911A",
  name: "Amazon Echo Dot",
  price: 49.99
};
```

### 4. BigInt for High-Precision Financial Transactions
Standard numbers in JS are double-precision floats, which lose precision beyond `2^53 - 1`. Transactions use BigInt or decimal libraries.
```javascript
const transactionId = 9007199254740991n; // Notice 'n' suffix
const microUSDAmount = BigInt("1230000000000000000"); // Cryptocurrencies/Micro-currencies
```

### 5. Frozen Immutable Configuration Object (Enterprise Pattern)
Preventing modifications to core configs:
```javascript
const SERVICE_KEYS = Object.freeze({
  STRIPE_PUBLIC_KEY: "pk_live_123",
  SEGMENT_WRITE_KEY: "seg_99aa"
});
// SERVICE_KEYS.STRIPE_PUBLIC_KEY = "new_val"; // Throws error in strict mode
```

---

## 6. Progressive Coding (Scoping and Mutation)

### Level 1: Beginner (Global Scoping with Var)
```javascript
// BAD: var leaks out of block, polluting global scope
if (true) {
  var userDiscountCode = "SUMMER20"; 
}
console.log(userDiscountCode); // Works, but dangerous!
```

### Level 2: Better (Block Scoping with Let/Const)
```javascript
// BETTER: Variable is isolated to block scope where it is used
if (true) {
  const discountCode = "SUMMER20";
  console.log(discountCode); // Works
}
// console.log(discountCode); // Throws ReferenceError: discountCode is not defined
```

### Level 3: Production (Protecting Constants)
```javascript
// PRODUCTION: Protecting configuration objects from being changed by sub-modules
const APP_THEME = Object.freeze({
  primaryColor: "#FF9900", // Amazon Orange
  darkMode: true
});
```

### Level 4: Enterprise (Dynamic Store State Engine)
```javascript
// ENTERPRISE: A primitive state container that enforces read-only access to state pointer
class ImmutableStateContainer {
  #state; // Private field (modern ES)
  
  constructor(initialState) {
    this.#state = Object.freeze({ ...initialState });
  }

  get state() {
    return this.#state;
  }

  updateState(newState) {
    // Return a completely new reference (immutability pattern)
    return new ImmutableStateContainer({
      ...this.#state,
      ...newState
    });
  }
}

const initialCart = new ImmutableStateContainer({ items: [], total: 0 });
const updatedCart = initialCart.updateState({ total: 49.99 });
```

---

## 7. Common Mistakes

1. **Mutating elements of a constant Array/Object:**
   ```javascript
   const items = ["Echo Dot", "Kindle"];
   // items = ["Echo Dot"]; // Throws TypeError: Assignment to constant variable.
   items.push("Fire Stick"); // Works! const only locks the reference, not the content.
   ```
2. **Accidental Global Variable Creation:**
   If you assign to a variable without declaring it, JS creates a global property (in non-strict mode).
   ```javascript
   function setTaxRate() {
     taxRate = 0.08; // BUG: leaks to global window.taxRate
   }
   ```
3. **Leaked loop indexes using Var:**
   ```javascript
   for (var i = 0; i < 3; i++) {
     // Code runs...
   }
   console.log(i); // Outputs 3. i leaked outside the loop!
   ```

---

## 8. Best Practices

1. **Declare with `const` by default:** Only change to `let` if reassignment is explicitly required.
2. **Use camelCase:** For standard variables (`cartItemsCount`, `productPrice`).
3. **Use UPPER_SNAKE_CASE:** Only for global, build-time configurations (`API_ENDPOINT`, `MAX_RETRIES`).
4. **Clean Code Rule:** Initialize variables closest to where they are used.

---

## 9. Interview Preparation

### Q1: What is the difference between `let` and `var`?
**Answer:** The primary differences are:
1. **Scope:** `var` is function-scoped. `let` is block-scoped.
2. **Hoisting:** Both are hoisted. However, `var` is initialized with `undefined`. `let` is not initialized (remains in the Temporal Dead Zone), and accessing it early throws a `ReferenceError`.
3. **Redeclaration:** You can redeclare the same variable with `var` in the same scope. Doing so with `let` throws a SyntaxError.

### Q2: How does JavaScript compare two objects?
**Answer:** Objects are compared by reference (memory address) rather than content.
```javascript
const obj1 = { id: 1 };
const obj2 = { id: 1 };
console.log(obj1 === obj2); // false (different Heap memory locations)
```

### Q3: How do you prevent an object from being mutated?
**Answer:** Use `Object.freeze(obj)`. It makes all properties read-only and prevents new properties from being added or deleted. (Note: Freeze is shallow. Nested objects must be frozen recursively).

---

## 10. Homework

1. **Scope Leaks Auditor:** Write a script containing block scopes and function scopes. Print the variables at different levels and write down why they work or throw errors.
2. **Stack vs Heap Visualizer:** Trace a sequence of assignments (e.g. copying objects vs copying numbers) and draw/explain the Stack and Heap state changes.
3. **Deep Freeze Utility:** Write a function `deepFreeze(object)` that recursively freezes nested objects so they cannot be mutated.
4. **Symbol Property Definement:** Write a modular cart item object where some tracking properties are hidden from standard `Object.keys()` loops using `Symbol`.
5. **Precision Safe Calculator:** Create a function that safely adds financial amounts exceeding the `Number.MAX_SAFE_INTEGER` threshold using `BigInt`.
