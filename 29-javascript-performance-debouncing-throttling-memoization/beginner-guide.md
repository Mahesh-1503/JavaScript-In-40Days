# Beginner's Guide: JavaScript Performance (Debouncing, Throttling & Memoization)

Hey there, future performance pro! 👋 Welcome to your hands-on guide to JavaScript Performance Optimization. Today, we are going to write code that makes web apps blazingly fast by preventing redundant calculations and event spam.

---

## 📂 How to Learn This Folder

To get the most out of your performance experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand the core mental models.
2.  **Step 2:** Copy the code blocks below, paste them into a file (e.g. `test-perf.js`), and run them with `node test-perf.js` in your terminal to see the live logs.
3.  **Step 3:** Open and read [29-javascript-performance-debouncing-throttling-memoization/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/29-javascript-performance-debouncing-throttling-memoization/README.md) to explore layout thrashing and V8 rendering pipelines.

---

## Part 1: Performance Optimization

JavaScript runs inside a single browser execution thread. If your page runs heavy math calculations or monitors mouse scroll positions continuously, it can clog the thread, lag browser rendering, and freeze screen buttons.

To keep web applications responsive, we use three core performance tools:
1.  **Debouncing**
2.  **Throttling**
3.  **Memoization**

---

## Part 2: Debouncing (The Elevator Door)

### The Elevator Analogy:
Think of a **smart elevator door**:
*   A passenger walks in. The door is about to close, but detects motion and resets its timer, waiting another 3 seconds.
*   Another passenger walks in 2 seconds later. The timer resets again.
*   The door will *only* close and move after passengers **stop entering** for a continuous 3-second window of silence.

### Autocomplete Search Box:
If you type "react", you don't want to make five separate network queries (`r`, `re`, `rea`, `react`, `react`). You want to wait until the user **pauses typing** for 300ms, then trigger a single query!

---

## Part 3: Throttling (The Water Tap Valve)

### The Water Tap Analogy:
Think of a **timer-controlled water tap**:
*   You press the button, and water flows for 5 seconds.
*   If you keep pressing the button repeatedly while water is already flowing, the tap ignores you.
*   Once the 5 seconds are up, the valve resets, and pressing the button releases water again.

### Page Scrolling:
When you scroll down a page, the browser can fire 100 scroll events per second. Throttling limits our scroll handler function to run **at most once every 100ms**, ignoring the excess events to save CPU cycles.

---

## Part 4: Memoization (The Math Cheat Sheet)

### The Cheat Sheet Analogy:
Think of calculating a complex math problem:
*   You calculate that $347 \times 892 = 309,524$. It takes you 10 seconds of scratchpad arithmetic.
*   Instead of throwing the answer away, you write `347 x 892 = 309,524` on a **cheat sheet card (Cache)**.
*   The next time this multiplication appears, you don't calculate anything. You look at your card and write down the answer instantly!

---

## Part 5: Debounce & Throttle Code Implementations

Let's test this directly! Copy, paste, and run this entire file in your terminal:

```javascript
// ==========================================
// 1. Debounce Closure Implementation
// ==========================================
function debounce(func, delay = 300) {
  let timeoutId = null;

  return function (...args) {
    const context = this;
    if (timeoutId) {
      clearTimeout(timeoutId); // Reset timer window on each trigger
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// ==========================================
// 2. Throttle Closure Implementation
// ==========================================
function throttle(func, limit = 200) {
  let inThrottle = false;

  return function (...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true; // Lock further executions
      setTimeout(() => {
        inThrottle = false; // Unlock after limit time passes
      }, limit);
    }
  };
}

// ==========================================
// 🧪 Running a Live Simulation
// ==========================================
console.log("--- Starting Simulation ---");

// A. Test Debounce (Typing simulation)
const handleSearch = debounce((query) => {
  console.log(`[Debounce Triggered] API Search for: "${query}"`);
}, 100);

console.log("User starts typing rapidly...");
handleSearch("r");
handleSearch("re");
handleSearch("rea");
handleSearch("react"); // Only this last call runs after a 100ms pause!

// B. Test Throttle (Scroll simulation)
const handleScroll = throttle(() => {
  console.log("[Throttle Triggered] Executed scroll parallax position update!");
}, 150);

console.log("User scrolls mouse wheel continuously...");
handleScroll(); // Executes immediately
handleScroll(); // Ignored (in cooldown)
handleScroll(); // Ignored (in cooldown)

setTimeout(() => {
  console.log("User scrolls again after 200ms...");
  handleScroll(); // Executes because the 150ms cooldown has expired!
}, 200);
```

---

## Part 6: Custom Memoization Code

Memoization caches function results in an internal JavaScript Object database keyed by input parameters:

```javascript
function memoize(func) {
  const cache = {}; // Private cache store

  return function (...args) {
    const key = JSON.stringify(args); // Create unique string key
    
    if (key in cache) {
      console.log(`[Cache Hit] Returning saved result for: ${key}`);
      return cache[key];
    }
    
    console.log(`[Cache Miss] Calculating fresh result for: ${key}`);
    const result = func.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Usage: Heavy calculation simulator
const slowSquare = memoize((num) => {
  return num * num; 
});

console.log("Calculation 1:", slowSquare(5)); // Cache Miss
console.log("Calculation 2:", slowSquare(5)); // Cache Hit (Instant!)
console.log("Calculation 3:", slowSquare(10)); // Cache Miss
console.log("Calculation 4:", slowSquare(10)); // Cache Hit (Instant!)
```

---

## Part 7: Essential Interview Questions & Practice Exercises

### Q1: What is the main difference between debouncing and throttling?
**Answer:** Debouncing delays execution until a certain window of silence/inactivity passes. Throttling limits execution rate to a maximum frequency (at most once per time window), executing immediately and then locking.

### Q2: How does Memoization optimize recursive algorithms?
**Answer:** In recursive structures (like calculating Fibonacci numbers), the same function is executed multiple times with identical inputs (e.g. calculating `fib(3)` repeatedly). Memoization caches these sub-results, reducing execution steps from $O(2^N)$ down to $O(N)$ linear complexity.

### Practice Exercises:
1.  **Autocomplete simulation:** Create a debounced query function. Simulate a user typing a search term by firing multiple search triggers with varying timeouts.
2.  **Double Click Guard:** Create a button-click simulator. Wrap a purchase transaction handler in your custom `throttle` callback with a 2-second cooldown to block user double-clicks.
3.  **Recursive Fibonacci cache:** Implement a basic recursive Fibonacci function. Wrap it in the `memoize` closure utility and compare the calculation speed of index 35 with and without caching.
