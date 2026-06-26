# Day 23: Array Iterators (QuickBooks Expense Calculator)

Declarative array methods (`map`, `filter`, `reduce`) are the core of functional programming in JavaScript. They allow you to write clean, predictable, and immutable data transformations, replacing manual loop iterations and tracking variables.

---

## 1. Mental Model (The QuickBooks Expense Calculator)

Think of a finance auditing application like **QuickBooks**:
1. **The Transaction Ledger:** An array of purchase objects (`{ id: 1, amount: 100, category: "Software" }`).
2. **`map()` (Tax Calculator):** You want to apply a 10% tax rate to every transaction, returning a new array of adjusted costs.
3. **`filter()` (Deductions Filter):** You want to filter out personal expenses, leaving only business-related transactions.
4. **`reduce()` (Net Total Accumulator):** You want to sum all business costs into a single net total value.

By chaining these tools, you can process the entire ledger in a single flat pipeline:
`transactions ➔ filter(businessOnly) ➔ map(applyTax) ➔ reduce(sumTotal)`

---

## 2. Visual Thinking (Data Pipeline Flow)

How data transforms through a map-filter-reduce pipeline:

```
[Raw Ledger Array] ──► [{amount: 10, category: "Personal"}, {amount: 50, category: "Business"}]
                             │
                             ▼
  FILTER (businessOnly) ─────┼──► Keeps only "Business" items
                             │
                             ▼
                         [{amount: 50, category: "Business"}]
                             │
                             ▼
  MAP (applyTax) ────────────┼──► Multiplies amount by 1.10
                             │
                             ▼
                         [{amount: 55, category: "Business"}]
                             │
                             ▼
  REDUCE (sumTotal) ─────────┼──► Accumulates items into a single final value
                             │
                             ▼
                       [Total: $55.00]
```

---

## 3. Beginner Explanation

- **`map()`:** Transforms every item in an array. It runs a callback function on each item and returns a **new array** of the exact same length containing the transformed values.
- **`filter()`:** Scans an array and returns a **new array** containing only the elements that return `true` for a specific check condition.
- **`reduce()`:** Combines all items in an array into a **single value** (e.g. a sum, a string, or a grouped object). It uses an **accumulator** variable to compile values as it runs.

---

## 4. Deep Explanation (Functional Paradigms & Accumulator Safety)

### 1. Pure Transformations
Declarative iterators do not modify (mutate) the original array. They return new references. This prevents bugs related to shared state, especially in reactive frameworks (like React).

### 2. The Reduce Accumulator Engine
The `.reduce(callback, initialValue)` method operates like a recursive loop:
```javascript
// Callback arguments: (accumulator, currentValue, index, array)
```
- **Initial Value Guard:** If you omit the `initialValue` parameter, reduce will use the **first element** of the array as the initial accumulator value and start looping from the second element. This can cause severe runtime bugs if the array contains objects:
  ```javascript
  const list = [{ amt: 10 }, { amt: 20 }];
  // BUG: returns "[object Object]20" instead of 30!
  const total = list.reduce((acc, curr) => acc + curr.amt); 
  ```

---

## 5. Real Production Examples (QuickBooks flows)

### 1. Applying Tax to Ledgers (Map)
```javascript
const transactions = [
  { desc: "AWS Server", cost: 100 },
  { desc: "GitHub CoPilot", cost: 20 }
];

// Map returns a new array with updated costs
const taxedTransactions = transactions.map(item => ({
  ...item,
  cost: Number((item.cost * 1.1).toFixed(2))
}));
```

### 2. Filtering Business Deductions (Filter)
```javascript
const ledger = [
  { desc: "Uber for client meeting", category: "Business" },
  { desc: "Starbucks coffee", category: "Personal" }
];

// Filter returns only items matching the condition
const businessDeductions = ledger.filter(item => item.category === "Business");
```

### 3. Net Total Accumulator (Reduce)
```javascript
const expenses = [50.00, 120.50, 10.00];

// Sum expenses, explicitly loading 0 as the initial accumulator value
const totalSpend = expenses.reduce((acc, val) => acc + val, 0);
```

### 4. Category-Based Expense Grouping (Reduce)
Grouping items into a structured category summary object.
```javascript
const transactionsList = [
  { desc: "Slack", amt: 15, category: "SaaS" },
  { desc: "AWS", amt: 250, category: "Cloud" },
  { desc: "Figma", amt: 45, category: "SaaS" }
];

const summary = transactionsList.reduce((acc, current) => {
  const cat = current.category;
  if (!acc[cat]) acc[cat] = 0;
  acc[cat] += current.amt;
  return acc;
}, {}); // Initial value is an empty object {}
```

### 5. Flat Mapping Nested Arrays
Using flatMap to combine nested lists of receipts.
```javascript
const employeeReceipts = [
  ["rec_1", "rec_2"],
  ["rec_3"]
];
const flatList = employeeReceipts.flatMap(receipt => receipt); // ["rec_1", "rec_2", "rec_3"]
```

---

## 6. Progressive Coding (Expense Evaluator)

### Level 1: Beginner (Mutable loop counter)
```javascript
const items = [{ cost: 10 }, { cost: 20 }];
let total = 0;

// BAD: Mutates outer variables and relies on index increment tracking
for (let i = 0; i < items.length; i++) {
  total += items[i].cost;
}
```

### Level 2: Better (Array forEach)
```javascript
// BETTER: No index checks, but still mutates outer total variable
let total = 0;
items.forEach(item => {
  total += item.cost;
});
```

### Level 3: Production (Declarative Reduce)
```javascript
// PRODUCTION: Functional, immutable calculation of sum
const total = items.reduce((acc, item) => acc + item.cost, 0);
```

### Level 4: Enterprise (Dynamic Financial Pipeline)
```javascript
// ENTERPRISE: A fully pipeline compositor that registers filters,
// map calculations, and reduces outputs safely with format converters.
class FinancialPipeline {
  constructor() {
    this.transformers = [];
  }

  filter(predicateFn) {
    this.transformers.push(arr => arr.filter(predicateFn));
    return this;
  }

  map(mapFn) {
    this.transformers.push(arr => arr.map(mapFn));
    return this;
  }

  execute(ledgerArray) {
    // Pipe the ledger array sequentially through each registered step
    return this.transformers.reduce((currentData, transform) => {
      return transform(currentData);
    }, ledgerArray);
  }
}

const processor = new FinancialPipeline();
processor.filter(item => item.amt >= 20) // Keep items over $20
         .map(item => ({ ...item, amt: item.amt * 1.05 })); // Apply fees

const ledger = [{ amt: 10 }, { amt: 50 }, { amt: 100 }];
const result = processor.execute(ledger);
```

---

## 7. Common Mistakes

1. **Forgetting to return a value inside the `reduce` callback:**
   If you forget to `return acc` at the end of the callback function, the accumulator becomes `undefined` in the next iteration.
2. **Mutating the original array elements inside `map`:**
   ```javascript
   const arr = [{ val: 1 }];
   // BUG: Mutates original array reference val to 2!
   const modified = arr.map(item => {
     item.val = 2; 
     return item;
   });
   ```
3. **Omitting the initial value parameter in `reduce`:**
   Omitting the initial value leads to runtime crashes on empty arrays (`TypeError: Reduce of empty array with no initial value`).

---

## 8. Best Practices

1. **Always provide an initial value to `reduce`:** Ensures type safety and prevents empty array exceptions.
2. **Keep callbacks pure:** Do not read or mutate external variables inside iterator callbacks.
3. **Prefer chaining over nested assignments:** Keeps data transformations readable.

---

## 9. Interview Preparation

### Q1: What is the difference between `map()` and `forEach()`?
**Answer:**
- **`map()`** returns a **new array** containing the results of calling the callback function on every element. It is pure and does not mutate the original array.
- **`forEach()`** executes the callback function on each element but returns **`undefined`**. It is used to perform side effects (like DOM updates or logging).

### Q2: What happens if you do not pass an initial value to `.reduce()`?
**Answer:** If no initial value is passed:
1. `reduce()` uses the first array element (index 0) as the initial accumulator.
2. It starts executing the callback starting from the second element (index 1).
3. If the array is empty, the engine throws a `TypeError: Reduce of empty array with no initial value`.

### Q3: How does `.filter()` handle empty elements?
**Answer:** `.filter()` does not run its callback function on empty slots in sparse arrays. It simply returns a new array excluding those empty slots, returning a packed dense array.

---

## 10. Homework

1. **Transaction Tax Compiler:** Write a function `applyTaxes(ledger)` using `map` to apply local taxes to purchase item costs.
2. **Deductions Filter:** Create a ledger parser using `filter` that extracts only business expenses from a mixed category list.
3. **Category Aggregator:** Write a `reduce` function that totals spending grouped by categories (e.g. SaaS, Rent, Utilities) from an expense sheet.
4. **Custom Flat Map:** Write a function that uses `reduce` to flatten a nested array of arrays into a single-level array.
5. **Chaining Pipeline Validator:** Build a dynamic pipeline using chained `filter`, `map`, and `reduce` to compute total business expenses from an array of 5,000 transactions, logging processing time.
