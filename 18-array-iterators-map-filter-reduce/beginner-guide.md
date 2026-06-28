# Beginner's Guide: Array Iterators (`map`, `filter`, `reduce`)

Welcome to the beginner's guide to JavaScript Array Iterators! This guide explains functional programming methods (`map`, `filter`, `reduce`), how to write declarative pipelines, and how to avoid the common reduce initial-value gotcha.

---

## 📅 Learning Roadmap

*   **Part 1:** Declarative Programming (Assembly Line Analogy)
*   **Part 2:** Transforming lists with `map()`
*   **Part 3:** Filtering lists with `filter()`
*   **Part 4:** Accumulating lists with `reduce()`
*   **Part 5:** The Reduce Initial Value Gotcha (Critical Bug)
*   **Part 6:** Pipeline Method Chaining
*   **Part 7:** Real-World Application Code
*   **Part 8:** Essential Interview Questions & Practice Exercises

---

## Part 1: Declarative Programming

Traditionally, if you wanted to process items in an array, you wrote a `for` loop telling the computer **how** to do it step-by-step (imperative programming). 

Modern JavaScript uses **declarative programming** using array iterators. Instead of writing loop counters, you tell the browser **what** data you want, and the engine handles the loop under the hood.

### The QuickBooks Analogy:
Think of auditing a **transaction spreadsheet ledger**:
*   **`map()` (Tax Calculator):** You want to apply a 10% tax to every row, returning a new column of costs.
*   **`filter()` (Deductions Scanner):** You want to scan the ledger and keep only "Business" rows, throwing away personal rows.
*   **`reduce()` (Net Total Calculator):** You want to sum all the tax columns into a single final balance value.

---

## Part 2: Transforming Lists with `map()`

The `map()` method creates a **new array** by running a callback function on every item in the original array.
*   **Rule:** The new array is always the **exact same length** as the original array.
*   **Immutability:** The original array remains completely unmodified.

```text
Input Array:   [ Item 1 ]   [ Item 2 ]   [ Item 3 ]
                  │            │            │
    MAP Operation ┼──► (Multiply by 10)     │
                  ▼            ▼            ▼
Result Array:  [  10  ]     [  20  ]     [  30  ]
```

### Basic Example:
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
console.log(numbers); // [1, 2, 3] (Original is untouched)
```

### Object Example: Taxing Ledger Expenses
```javascript
const transactions = [
  { desc: "AWS Server", cost: 100 },
  { desc: "CoPilot Subscription", cost: 20 }
];

const taxedPrices = transactions.map(item => ({
  ...item,
  cost: item.cost * 1.10 // Add 10% tax
}));
```

---

## Part 3: Filtering Lists with `filter()`

The `filter()` method creates a **new array** containing only the elements that pass a logical check condition (returning `true` inside the callback).

```text
Input Array:   [ Bus-Item ]   [ Pers-Item ]   [ Bus-Item ]
                    │               │               │
  FILTER Operation  ┼──► (Is category === "Business"?)
                    ▼               │               ▼
Result Array:  [ Bus-Item ]        Drop        [ Bus-Item ]
```

### Basic Example:
```javascript
const numbers = [5, 12, 8, 130, 44];
const filtered = numbers.filter(num => num >= 10);
console.log(filtered); // [12, 130, 44]
```

### Object Example: Filtering Business Expenses
```javascript
const ledger = [
  { desc: "Uber for Client", category: "Business" },
  { desc: "Starbucks Coffee", category: "Personal" }
];

const businessOnly = ledger.filter(item => item.category === "Business");
console.log(businessOnly); // [{ desc: "Uber for Client", category: "Business" }]
```

---

## Part 4: Accumulating Lists with `reduce()`

The `reduce()` method executes a reducer callback function on each element of the array, returning a **single consolidated output value**.

### The Snowball Analogy:
Think of `reduce()` like a **snowball rolling down a hill**:
*   It starts with an initial size (the **initial value**).
*   As it rolls over each piece of snow (the **current value**), it absorbs it and grows larger (the **accumulator**).
*   At the bottom of the hill, you are left with one single giant snowball (the **final accumulated result**).

### Syntax:
```javascript
const finalResult = array.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, initialValue);
```

### Basic Example: Summing Numbers
```javascript
const scores = [10, 20, 30];
const totalScore = scores.reduce((sum, current) => sum + current, 0);
console.log(totalScore); // 60
```

---

## Part 5: The Reduce Initial Value Gotcha

If you do not supply the `initialValue` argument, JavaScript automatically sets the accumulator to the **first element** in the array and starts the loop from the second element.

This leads to a **major runtime bug** when reducing an array of objects:

```javascript
const ledger = [{ cost: 10 }, { cost: 20 }];

// ❌ Bug: No initial value!
const badTotal = ledger.reduce((acc, curr) => acc + curr.cost);
console.log(badTotal); // Output: "[object Object]20" 
```
*Why did this happen?*
*   Because `initialValue` was missing, JavaScript set the accumulator `acc` to the first object: `{ cost: 10 }`.
*   During iteration, it ran: `{ cost: 10 } + 20`. It coerced the object to string `"[object Object]"` and concatenated the `20`!

### The Correct Way:
Always provide a starting seed value (`0` for sums):
```javascript
// 🟢 Correct
const goodTotal = ledger.reduce((acc, curr) => acc + curr.cost, 0);
console.log(goodTotal); // 30
```

---

## Part 6: Pipeline Method Chaining

Since `map` and `filter` return new arrays, you can connect them together in a **declarative data pipeline** to execute complex filters, transformations, and sum reductions in a single statement:

```javascript
const checkoutCart = [
  { item: "Laptop", cost: 1000, category: "Work" },
  { item: "Soda Can", cost: 2, category: "Personal" },
  { item: "Notebook", cost: 10, category: "Work" }
];

// Chain: Keep Work items ──► Apply 10% tax ──► Sum up cost
const totalBill = checkoutCart
  .filter(prod => prod.category === "Work")
  .map(prod => prod.cost * 1.10)
  .reduce((sum, cost) => sum + cost, 0);

console.log(totalBill); // 1111 (1100 + 11)
```

---

## Part 7: Real-World Application Code

Here is how checkout databases calculate cart totals with discounts and tax configurations:
```javascript
const cartItems = [
  { name: "Shoe", price: 80 },
  { name: "Hat", price: 20 }
];

// Flat calculation using reduce
const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
const salesTax = subtotal * 0.08;
const finalInvoiceTotal = subtotal + salesTax;

console.log("Invoice Total: $", finalInvoiceTotal.toFixed(2)); // "Invoice Total: $ 108.00"
```

---

## Part 8: Essential Interview Questions & Practice Exercises

### Q1: What does `map()` return if the callback function does not return a value?
**Answer:** It returns a new array of the same length filled with `undefined` values.

### Q2: What is the difference between `filter()` and `find()`?
**Answer:** `filter()` checks the entire array and returns a **new array** containing *all* elements that pass the condition. `find()` stops searching the moment it hits the *first* matching element and returns that single element (or `undefined` if no match is found).

### Practice Exercises:
1.  **Metric Converter Pipeline:** Create an array of temperatures in Fahrenheit. Filter out values below freezing ($< 32^\circ\text{F}$), map them to Celsius ($C = (F - 32) \times 5/9$), and sum the Celsius values.
2.  **Object Grouping reduce:** Use `reduce()` to group an array of users by their role (e.g. keying elements into `{ admin: [...], editor: [...] }` objects).
3.  **Invalid reduce catcher:** Write a script compiling cost items. Run it without initial value parameters to observe string conversions, then fix it with `0` initial seeds.
