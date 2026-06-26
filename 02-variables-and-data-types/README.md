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

## 4. Deep Explanation (V8 Engine & Memory Allocation)

### 1. Variables Scoping Rules
- **Block Scope (`let`/`const`):** Variables declared inside a block `{ ... }` (e.g. inside an `if` block or a loop) cannot be accessed outside of it.
- **Function Scope (`var`):** Variables declared with `var` are scoped to the nearest enclosing function, ignoring block boundaries (like `if` statements or `for` loops).
- **Temporal Dead Zone (TDZ):** While variables declared with `var` are initialized to `undefined` when hoisted, `let` and `const` are hoisted but not initialized. Accessing them before their declaration line throws a `ReferenceError`.

### 2. Primitive vs Reference Types
- **Primitives (Value Types):** Stored directly in the **Stack**. These include: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol`, `BigInt`. They are immutable and compared by value.
- **Reference Types:** Stored in the **Heap**. These include: `Object`, `Array`, `Function`. The variable only holds a reference pointer to the Heap memory location. They are compared by reference address.

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
