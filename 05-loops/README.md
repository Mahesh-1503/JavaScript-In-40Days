# Day 05: Loops and Iteration (Feed Generator & Paginated Search)

Loops are the primary mechanism for processing collections of data. Writing performant loops requires understanding how the JavaScript engine compiles loops, optimizes memory allocations, and prevents execution bottlenecks in high-scale feeds.

---

## 1. Mental Model (The Zomato Restaurant Feed)

Think about loading your food delivery feed on **Zomato** (or UberEats):
1. The app fetches a list of 100 nearby restaurants.
2. A **Loop** processes this list:
   - For each restaurant, check if it's currently open.
   - If closed, skip to the next one using `continue`.
   - Map details into feed cards and render them.
   - If the feed reaches a maximum page limit (e.g. 10 items), stop processing and break out using `break`.

---

## 2. Visual Thinking (Loop Execution Cycles)

Tracing the path of a loop processing a feed array using control keywords:

```
[Start Loop] ──► [Index < Length?] ──► No ──► [End Loop]
                        │
                       Yes
                        ▼
             [Get Restaurant Card]
                        │
             Is Restaurant Closed? ──► Yes ──► [continue] ──► (Next Index)
                        │
                        No
                        ▼
             Render Restaurant Card
                        │
             Page Full (10 cards)? ──► Yes ──► [break] ────► [End Loop]
                        │
                        No
                        ▼
                  (Next Index)
```

---

## 3. Beginner Explanation

Loops let you repeat a block of code multiple times without rewriting it.
- **`for` Loop:** Best when you know *exactly* how many times you want to loop beforehand (e.g. print numbers from 1 to 10).
- **`while` Loop:** Best when you want to repeat code until a certain condition changes, but you don't know when that will be (e.g. wait for a server response).
- **`break`:** Stop the loop immediately and exit.
- **`continue`:** Skip the rest of the current loop step and jump directly to the next iteration.

---

## 4. Deep Explanation (V8 Compiler Loop Optimizations)

To write performance-critical loops, we must understand how JS engines compile them:

### 1. Loop Unrolling
Modern JS engines (like Turbofan in V8) optimize loops by "unrolling" them. If a loop runs a small, static number of times, the compiler replaces the loop structure with flat, sequential machine code commands. This removes the performance overhead of incrementing loop indexes and evaluating loop conditions.

### 2. Guarding Against Closure Allocation in Loops
Defining functions or closures inside loops is a major cause of memory thrashing and garbage collection spikes.
```javascript
// BAD: Allocates a new function instance in heap memory on EVERY loop cycle!
for (let i = 0; i < restaurants.length; i++) {
  button.onclick = function() { console.log(restaurants[i].name); }
}
```
**Optimized Approach:** Create a single function outside the loop and pass dynamic variables when invoked.

---

## 5. Real Production Examples

### 1. Restaurant Feed Paginated Builder (For with early exit)
```javascript
const nearbyRestaurants = [
  { name: "Joe's Pizza", isOpen: true, rating: 4.5 },
  { name: "Burger Hub", isOpen: false, rating: 4.2 },
  { name: "Sushi House", isOpen: true, rating: 4.8 },
  { name: "Taco Stand", isOpen: true, rating: 3.9 }
];

const feedCardsLimit = 2;
const renderedFeed = [];

for (let i = 0; i < nearbyRestaurants.length; i++) {
  const current = nearbyRestaurants[i];

  if (!current.isOpen) continue; // Skip closed restaurants
  if (renderedFeed.length === feedCardsLimit) break; // Exit loop when feed is full

  renderedFeed.push(`Card: ${current.name} (★${current.rating})`);
}
```

### 2. Exponential Backoff API Retry Loop (While)
```javascript
async function fetchRestaurantMenuWithRetry(restaurantId) {
  let attempts = 0;
  const maxAttempts = 3;
  let success = false;

  while (attempts < maxAttempts && !success) {
    try {
      attempts++;
      console.log(`Connecting to database API... Attempt ${attempts}`);
      // Simulate fetch operation
      success = true; 
    } catch (error) {
      if (attempts === maxAttempts) throw new Error("Connection failed");
      await new Promise(resolve => setTimeout(resolve, attempts * 1000)); // Delay
    }
  }
}
```

### 3. Coordinate Grid Renderer (Nested Loop)
For building layout grids or maps:
```javascript
function generateRestaurantLayoutGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(`Table-${r + 1}x${c + 1}`);
    }
    grid.push(row);
  }
  return grid;
}
```

### 4. Database Transaction Batch Processor
Processing massive arrays in safe chunks to prevent event-loop blockage.
```javascript
function processBulkOrdersInBatches(orders, batchSize) {
  let index = 0;
  while (index < orders.length) {
    const batch = [];
    for (let i = 0; i < batchSize && index < orders.length; i++) {
      batch.push(orders[index]);
      index++;
    }
    // Execute database transaction for this batch
    console.log(`Processed batch of ${batch.length} items`);
  }
}
```

### 5. Config Object Key Scraper
Iterating object properties to search for configuration matches.
```javascript
const serviceConfig = { stripeActive: true, segmentActive: false, debug: true };
const activeServices = [];

for (const key in serviceConfig) {
  if (serviceConfig[key]) {
    activeServices.push(key);
  }
}
```

---

## 6. Progressive Coding (Array Searching)

### Level 1: Beginner (Naive Full Loop Search)
```javascript
// Scan entire array, even if target is found on the first element
function findUser(users, targetId) {
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === targetId) {
      foundUser = users[i];
    }
  }
  return foundUser;
}
```

### Level 2: Better (Loop search with early exit)
```javascript
// Exit loop immediately once target is found, saving execution cycles
function findUser(users, targetId) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === targetId) {
      return users[i]; // Early return
    }
  }
  return null;
}
```

### Level 3: Production (Declarative Array Method)
```javascript
// Clean, standard production syntax using native engine finder
function findUser(users, targetId) {
  return users.find(user => user.id === targetId) || null;
}
```

### Level 4: Enterprise (Map-Index for O(1) Search Speeds)
```javascript
// ENTERPRISE: Index the collection into a Map object on load.
// Subsequent lookups are instant O(1) instead of scanning the array O(N).
class UserRegistryStore {
  #usersIndex = new Map();

  constructor(usersArray) {
    for (let i = 0; i < usersArray.length; i++) {
      this.#usersIndex.set(usersArray[i].id, usersArray[i]);
    }
  }

  getUserById(id) {
    return this.#usersIndex.get(id) || null; // Zero loop overhead during query
  }
}
```

---

## 7. Common Mistakes

1. **The Infinite Loop:**
   ```javascript
   let count = 0;
   while (count < 5) {
     // BUG: count is never incremented, loop hangs browser thread!
   }
   ```
2. **Reading Array Length inside Loop condition (Performance loss in legacy systems):**
   ```javascript
   // Legacy engines evaluate array length on every single iteration
   for (let i = 0; i < largeArray.length; i++) { ... }
   // Fix: cache length: const len = largeArray.length; for (let i = 0; i < len; i++)
   ```
3. **Changing loop indexes inside the block manually:**
   Modifying `i` inside the loop body makes loop execution flows unpredictable and hard to test.

---

## 8. Best Practices

1. **Avoid Nesting Loops (More than 2 levels):** Nested loops scale at $O(N^2)$ time complexity. If you must process nested data, index values to Map objects first to reduce complexity.
2. **Favor declarative array methods (`map`, `filter`, `forEach`):** They are cleaner and prevent off-by-one errors.
3. **Prefer `for...of` loops over traditional index counters:** It prevents accessing index variables directly, reducing syntax surface bugs.

---

## 9. Interview Preparation

### Q1: What is the difference between `break` and `continue` inside a loop?
**Answer:**
- `break` exits the loop immediately. Execution jumps to the first line of code following the loop.
- `continue` skips the rest of the current loop body and jumps directly to the loop condition evaluation or the next increment step.

### Q2: Why is declaring a function inside a loop bad?
**Answer:** On each iteration of the loop, JavaScript is forced to allocate a new function object in Heap memory. This creates excessive garbage collector load (known as memory thrashing), leading to micro-stutters in UI animations and page scrolls.

### Q3: What is loop unrolling and how does it happen?
**Answer:** Loop unrolling is a compiler optimization technique where a loop is replaced by repeated code statements to avoid loop control check overhead. Modern JavaScript engine JIT compilers (like V8) do this automatically when loops have a constant, small iteration limit.

---

## 10. Homework

1. **Restaurant Card Generator:** Write a loops builder that filters a restaurant array based on rating, status, and menu categories, returning a compiled layout payload.
2. **Grid Coordinates Matrix:** Write a function that prints a text-based coordinate grid (e.g. `[Row, Col]`) using nested loops, and calculate the maximum calculations count.
3. **Backoff Retrier:** Implement a loop that attempts a simulated HTTP request. Increase wait times between retries exponentially (e.g., 100ms, 200ms, 400ms, 800ms) until max attempts are met.
4. **Transaction Batch Creator:** Write an order processor that splits an array of 1,000 transaction orders into smaller transaction batches of size 50 and executes a batch handler function on each.
5. **Loops Performance Analyzer:** Measure execution times of `for` vs `while` vs `forEach()` using high-precision timers (`performance.now()`) with an array of 1,000,000 items and document your performance analysis.
