# Day 22: Looping Objects & Arrays (Shopify Inventory Auditor)

Choosing the correct loop syntax determines how code behaves, processes keys vs values, and interacts with the prototype chain. Writing clean iterations requires understanding the differences between `for...in`, `for...of`, and `forEach()`.

---

## 1. Mental Model (The Shopify Inventory Auditor)

Think of a warehouse inventory tool on **Shopify**:
1. **The Inventory Object:** An object where keys are product IDs and values are stock counts (`{ prod_101: 50, prod_102: 0 }`).
2. **The Product Array:** An ordered list of product name strings (`["Echo Dot", "Kindle Reader"]`).
3. **The Audit Operations:**
   - To inspect product attributes inside the inventory database object, we iterate over the keys using **`for...in`**.
   - To scan actual items sequentially in the product array, we iterate over the values using **`for...of`**.
   - To execute actions on each product element (e.g. notify supervisor on out-of-stock items), we use **`forEach()`**.

---

## 2. Visual Thinking (Loop Target Routing)

How each loop targets data structures (Keys vs Values vs Iterators):

```
            ┌────────────────── Loop Query ─────────────────┐
            │                                               │
            ▼                                               ▼
     [Objects (Keys)]                                [Arrays (Values)]
            │                                               │
        for...in                                     ┌──────┴──────┐
            │                                        ▼             ▼
    Iterates enumerable                           for...of      forEach()
    property keys (including                         │             │
    inherited prototypes!)                       Invokes       Executes
                                                 Symbol.       functional
                                                 iterator      callbacks
```

---

## 3. Beginner Explanation

- **`for...in`:** Best for looping through the keys (property names) of an **Object**. (Think: "Look *in* the object for its keys").
- **`for...of`:** Best for looping through the actual values of an **Array** or other iterable list. (Think: "Get the values *of* the array").
- **`forEach()`:** A built-in array method that executes a provided callback function once for each array element.

---

## 4. Deep Explanation (Iterators & Enumerable Chains)

### 1. `for...in` and the Prototype Chain
`for...in` loops iterate over the **enumerable properties** of an object. 
- **The Catch:** It traverses the entire prototype chain. If someone added a property to `Object.prototype`, `for...in` will print it!
- **The Guard:** Always use `.hasOwnProperty()` (or `Object.hasOwn()`) to verify a property belongs to the local object instance rather than its prototype.

### 2. `for...of` and the Iterator Protocol
`for...of` iterates over values of **Iterable Objects** (Arrays, Strings, Maps, Sets).
- **The Engine:** It calls the object's internal `Symbol.iterator` method, which returns an iterator object with a `.next()` method.
- **The Limit:** Standard objects `{}` do NOT have a default `Symbol.iterator` property, meaning calling `for...of` on an object throws a `TypeError: obj is not iterable`.

### 3. `forEach()` Callbacks
`forEach()` is a declarative array utility. Unlike `for` loops, you cannot break out of `forEach()` using the `break` or `continue` keywords. If you need to stop early, you must use a standard `for` loop or helper methods like `.some()` or `.every()`.

---

## 5. Real Production Examples (Shopify Auditor)

### 1. Auditing Warehouse Totals (for...in with Guard)
```javascript
const warehouseStock = { echoDot: 150, kindle: 80 };

// Add method to Object prototype to simulate external libraries
Object.prototype.globalTheme = "dark"; 

let totalItems = 0;
for (const productKey in warehouseStock) {
  // Guard: exclude prototype additions (like globalTheme)
  if (Object.hasOwn(warehouseStock, productKey)) {
    totalItems += warehouseStock[productKey];
  }
}
```

### 2. Scanning Product List (for...of)
```javascript
const activeShipments = ["echoDot", "kindle", "fireStick"];

for (const product of activeShipments) {
  console.log(`Shipment scanned: ${product}`);
}
```

### 3. Out of Stock Alerts Dispatcher (forEach)
```javascript
const stockInventory = [
  { name: "Echo Dot", count: 40 },
  { name: "Kindle", count: 0 }
];

stockInventory.forEach((item, index) => {
  if (item.count === 0) {
    console.log(`[ALERT] Item #${index} [${item.name}] is out of stock!`);
  }
});
```

### 4. Custom Iterator Definition (Making an Object Iterable)
Making a custom inventory class iterable so it supports `for...of`.
```javascript
const inventoryRecords = {
  items: ["Kindle", "Echo"],
  [Symbol.iterator]: function() {
    let index = 0;
    const list = this.items;
    return {
      next: () => ({
        value: list[index++],
        done: index > list.length
      })
    };
  }
};
for (const item of inventoryRecords) {
  console.log(`Iterable: ${item}`); // Works!
}
```

### 5. Config Array key-value collector (Object.entries)
Using `for...of` on objects by extracting key-value entries:
```javascript
const stockRates = { echoDot: 49.99, kindle: 89.99 };

for (const [productName, price] of Object.entries(stockRates)) {
  console.log(`${productName} costs $${price}`);
}
```

---

## 6. Progressive Coding (Inventory Auditor)

### Level 1: Beginner (var-index array parsing)
```javascript
const products = ["Echo", "Kindle"];
// BAD: Leaks i index variable globally, prone to off-by-one errors
for (var i = 0; i < products.length; i++) {
  console.log(products[i]);
}
```

### Level 2: Better (for...in on array - A common mistake)
```javascript
// BETTER: No index variable leaked, but parses index keys as strings, not numbers!
for (const index in products) {
  console.log(products[index]); // "0", "1" (string keys, slower access)
}
```

### Level 3: Production (for...of / forEach values traversal)
```javascript
// PRODUCTION: Straightforward value queries, highly optimized by engines
for (const product of products) {
  console.log(product);
}
```

### Level 4: Enterprise (High-Performance Inventory Audit Pipeline)
```javascript
// ENTERPRISE: A robust inventory processor that aggregates categories,
// audits values safely against prototype pollution, and tracks performance.
class InventoryAuditor {
  constructor(warehouseData) {
    this.data = warehouseData;
  }

  auditStockLevels(alertThreshold) {
    const report = { lowStockItems: [], healthyStockCount: 0 };

    // Standardize object iteration using Object.keys() to bypass prototype chain
    const productKeys = Object.keys(this.data);

    for (const key of productKeys) {
      const stock = this.data[key];
      
      if (stock < alertThreshold) {
        report.lowStockItems.push({ id: key, quantity: stock });
      } else {
        report.healthyStockCount++;
      }
    }
    return report;
  }
}

const audit = new InventoryAuditor({ prod_x: 5, prod_y: 50, prod_z: 100 });
const report = audit.auditStockLevels(10);
```

---

## 7. Common Mistakes

1. **Using `for...in` on Arrays:**
   `for...in` returns keys as strings (`"0"`, `"1"`), not numbers. It can also capture random non-index properties attached to the array object, breaking calculations.
2. **Calling `for...of` on standard Objects:**
   ```javascript
   const obj = { a: 1 };
   for (const val of obj) { ... } // BUG: TypeError: obj is not iterable
   ```
3. **Attempting to use `break` inside `forEach()`:**
   `forEach()` does not support loop breaks. Use a standard `for...of` loop if you need to stop early.

---

## 8. Best Practices

1. **Avoid `for...in` on Arrays:** Use `for...of` or `forEach()`.
2. **Always call `Object.keys()` / `Object.entries()` to iterate objects:** This bypasses prototype chain lookup entirely.
3. **Keep callback functions pure inside `forEach()` loops:** Do not mutate variables from outer scopes to prevent state bugs.

---

## 9. Interview Preparation

### Q1: What is the main difference between `for...in` and `for...of`?
**Answer:**
- **`for...in`** iterates over the **enumerable keys** (property names) of an object, climbing up the prototype chain.
- **`for...of`** iterates over the **values** of an iterable object (like an Array, Map, or String) by invoking its internal iterator method.

### Q2: Why should we not use `for...in` to iterate over an Array?
**Answer:** Two main reasons:
1. `for...in` returns the array indexes as strings (e.g. `"0"`, `"1"`), which can cause math errors (e.g. `"0" + 1` equals `"01"`).
2. It iterates over all enumerable properties, meaning if a library or developer added methods to the base `Array.prototype`, `for...in` will return those methods alongside the array elements.

### Q3: How can you break out of a `forEach()` loop early?
**Answer:** You cannot break out of `forEach()` using the `break` or `continue` keywords. To exit early, you must either:
- Throw a custom Exception (not recommended).
- Refactor the code to use a standard `for...of` loop.
- Use array check methods like `.some()` or `.every()` that support early exit.

---

## 10. Homework

1. **Warehouse Total Auditor:** Write a function `auditInventory(stockObj)` using `for...in`. Ensure prototype additions are blocked using hasOwnProperty checks.
2. **Object entries Mapper:** Create an object mapping product costs. Use `for...of` alongside `Object.entries()` to print price descriptions.
3. **Break Tester:** Write a search loop that iterates over a product array. Exit immediately using `break` once a specific target is found.
4. **Custom Iterator Builder:** Write an object containing a list of employees. Implement a custom `Symbol.iterator` method to allow looping employees using `for...of`.
5. **Loops Performance Benchmark:** Benchmark the execution speeds of `for`, `for...of`, and `forEach` on an array of 5,000,000 integers and document your results.
