# 🚀 Day 32: JavaScript Performance (Debouncing, Throttling & Memoization)

Welcome to Day 32! In this module, we will explore the core pillars of JavaScript client-side performance optimization: **Debouncing**, **Throttling**, and **Memoization**. You will master how to control execution rates, limit heavy DOM interactions, and cache expensive runtime calculations using pure JavaScript closures.

---

## 1. Mental Models

### 1. Debouncing (The Elevator Door)
Think of a **smart elevator door**:
*   A passenger walks in. The door is about to close, but detects the motion and resets its timer, waiting another 3 seconds.
*   Another passenger walks in 2 seconds later. The timer resets again, waiting another 3 seconds.
*   The door will *only* close and the elevator will *only* move after passengers **stop entering** for a continuous 3-second window of silence.
*   **Code Analogy:** Triggering a search autocomplete API. We wait until the user pauses typing for 300ms before sending the network request.

### 2. Throttling (The Water Tap Valve)
Think of a **timer-controlled water tap**:
*   You press the button, and water flows for 5 seconds.
*   If you mash the button repeatedly while the water is already flowing, the tap ignores you. It will not extend the flow or release more water.
*   Once the 5 seconds are up, the valve resets, and you can press it again to get another 5 seconds of water.
*   **Code Analogy:** Monitoring a webpage scroll event. We only update the position variable at most once every 100ms, regardless of how fast the browser triggers scroll sweeps.

### 3. Memoization (The Math Cheat Sheet)
Think of a **complex math exam**:
*   You calculate that $347 \times 892 = 309,524$. It takes you 10 seconds of scratchpad arithmetic.
*   Instead of throw-away math, you write down: `347 x 892 = 309,524` on a cheat sheet card.
*   The next time the question appears on the exam, you don't do any arithmetic. You look at your card and write down the answer instantly.
*   **Code Analogy:** Caching results of heavy math or recursive algorithms based on function input parameters.

---

## 2. Visual Thinking: Trigger Lifecycles

```text
=================================== DEBOUNCE LIFECYCLE ===================================
User Keystrokes:  ──[A]────[B]──[C]─────────────────────────────► (Continuous Typing)
Timer Duration:    └───300ms───X (Reset)
                       └───300ms───X (Reset)
                           └─────────300ms─────────┤ [Trigger: Fetch search results for "ABC"]

=================================== THROTTLE LIFECYCLE ===================================
Scroll Events:    ──[Scroll]──[Scroll]──[Scroll]──[Scroll]──────► (Continuous Mouse Drag)
Valve Open?       ──[Yes]─────[No]──────[No]──────[No]──────────►
Execution:        ──[Trigger]───────────────────────────────────► (Wait 200ms cooldown)
Cooldown Lock:    ├─────────────200ms Cooldown─────────────┤[Unlock: Next scroll event triggers]

================================== MEMOIZATION LIFECYCLE ==================================
Call: calculate(5)  ──► Cache Check: Miss ──► Compute: 5 * 2 ──► Save in Cache ──► Return 10
Call: calculate(5)  ──► Cache Check: Hit  ──────────────────────────────────────► Return 10 (Instant!)
```

---

## 3. Debouncing: Deep Dive & Implementation

Debouncing ensures that a function is not called again until a certain amount of time has passed since its last call.

### The Custom Debounce Implementation
Here is a production-ready debounce utility featuring closure-scoped timers:

```javascript
function debounce(func, delay = 300) {
  let timeoutId = null;

  return function (...args) {
    const context = this;

    // 1. Clear any active timer, resetting the countdown window
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 2. Set a new timer to execute the function after the delay
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
```

### Use Case: Autocomplete Search Box
Without debouncing, typing "react" triggers five API calls (`r`, `re`, `rea`, `react`, `react`). With a 300ms debounce, only one call is made when typing stops.

```javascript
const searchProducts = (query) => {
  console.log(`[API Call] Fetching results for: ${query}`);
};

// Wrap the API call in our debounce wrapper
const debouncedSearch = debounce(searchProducts, 300);

// Simulating rapid user typing
debouncedSearch("r");
debouncedSearch("re");
debouncedSearch("rea"); // Clears previous timers...
setTimeout(() => debouncedSearch("react"), 100); // Only "react" runs after a 300ms pause!
```

---

## 4. Throttling: Deep Dive & Implementation

Throttling enforces a maximum number of times a function can be called over a period of time (e.g., "at most once every 200ms").

### The Custom Throttle Implementation
We can implement throttling using either a **timestamp comparison** or a **boolean timeout lock**. Here is the timestamp method, which is highly accurate:

```javascript
function throttle(func, limit = 200) {
  let lastFuncCall = 0;

  return function (...args) {
    const context = this;
    const now = Date.now();

    // If the difference between now and the last call exceeds the limit, run the function
    if (now - lastFuncCall >= limit) {
      func.apply(context, args);
      lastFuncCall = now; // Update the execution timestamp
    }
  };
}
```

### Use Case: Infinite Scroll / Scroll Progress Indicator
Updating UI layout trackers during scroll events.

```javascript
const handleScroll = () => {
  console.log(`[DOM Render] Scroll position: ${window.scrollY}px`);
};

// Wrap in throttle to prevent blocking the main rendering thread
const throttledScroll = throttle(handleScroll, 200);

window.addEventListener("scroll", throttledScroll);
```

---

## 5. Memoization: Deep Dive & Implementation

Memoization caches the output of a function based on its input parameters to avoid redundant calculations.

### The Custom Memoization Implementation
Here is a generic memoize utility that handles single or multiple arguments by serializing inputs into a cache map key:

```javascript
function memoize(func) {
  const cache = new Map();

  return function (...args) {
    // Generate a unique cache key by stringifying the function arguments
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`[Cache Hit] Returning cached results for key: ${key}`);
      return cache.get(key);
    }

    console.log(`[Cache Miss] Computing results for key: ${key}`);
    const result = func.apply(this, args);
    cache.set(key, result); // Save calculations to memory
    return result;
  };
}
```

### Use Case: Recursive Fibonacci (Performance comparison)
Standard recursive Fibonacci has $O(2^n)$ exponential time complexity. Memoization reduces this to $O(n)$ linear complexity:

```javascript
const slowFibonacci = (n) => {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};

// Memoized wrapper
const memoizedFibonacci = memoize((n, fibFunc) => {
  if (n <= 1) return n;
  return fibFunc(n - 1, fibFunc) + fibFunc(n - 2, fibFunc);
});

const runFib = (n) => {
  const memoCache = new Map();
  const fib = (x) => {
    const key = JSON.stringify([x]);
    if (memoCache.has(key)) return memoCache.get(key);
    const result = x <= 1 ? x : fib(x - 1) + fib(x - 2);
    memoCache.set(key, result);
    return result;
  };
  return fib(n);
};

console.time("Slow Fibonacci (N=35)");
slowFibonacci(35);
console.timeEnd("Slow Fibonacci (N=35)"); // Takes ~100-200ms

console.time("Memoized Fibonacci (N=35)");
runFib(35);
console.timeEnd("Memoized Fibonacci (N=35)"); // Takes <1ms
```

---

## 6. Comparison Table: Performance Strategies

| Strategy | Primary Objective | Key Mechanism | Best Example Use Cases |
| :--- | :--- | :--- | :--- |
| **Debounce** | Postpone execution until action pauses. | `setTimeout` reset loops. | Search input autocompletes, autosave text draft saves, window resize redraws. |
| **Throttle** | Limit execution frequency to safe rates. | Timestamp comparisons / Lock gates. | Infinite scroll triggers, drag-and-drop mouse movements, gaming click spam caps. |
| **Memoize** | Avoid recalculating results of pure functions. | Key-value Cache Map. | Expensive calculations, recursive calculations (factorial, Fibonacci), heavy database parsing. |

---

## 7. Common Mistakes

1.  **Forgetting to return closure function variables:**
    When calling `debounce(fn, 300)`, it returns a wrapper function. If you recreate the wrapper on every single event trigger (e.g. inside a React render without `useCallback`), the timer state resets and debouncing will fail.
2.  **Using Memoization on impure functions:**
    If a function relies on external database states or global variables that change independently of inputs, memoizing it will return stale values from the cache. Only memoize **pure functions** (same inputs $\rightarrow$ same outputs).
3.  **Memory Bloat with unbound Memoization Caches:**
    A memoization cache persists in memory for the lifecycle of the application. If you memoize queries with millions of unique parameters, the cache map will grow indefinitely, creating a memory leak.
    *   **Optimization:** Implement a Least Recently Used (LRU) cache policy to purge old keys.

---

## 8. Best Practices

1.  **Debounce cleanups:** Provide a `.cancel()` method on your debounce wrapper to clear timers during component unmounting.
2.  **Combine Throttling and Debouncing:** For scroll events, you can throttle actions to update layouts, but run a debounced call at the end to ensure the final layout is perfectly aligned once scrolling ceases.
3.  **Choose the right cache keys:** When serializing objects for memoization keys, remember that `JSON.stringify({a:1, b:2})` differs from `JSON.stringify({b:2, a:1})` despite matching values. Sort object keys first in high-stakes environments.

---

## 9. Interview Preparation

### Q1: What is the primary difference between Debouncing and Throttling?
**Answer:** Debouncing delays execution until a period of inactivity (silence) has occurred. If triggers keep firing, the countdown resets continuously. Throttling limits the execution of a function to a maximum rate. It guarantees execution occurs periodically at fixed time blocks (e.g., once every 200ms) even if triggers fire continuously.

### Q2: How does the Javascript event loop handle debounced calls?
**Answer:** Debounced wrappers utilize `setTimeout(fn, delay)`. When invoked, they register a timer macro-task in the web browser API container. When the countdown completes, the callback is pushed to the **Macro-task Queue**. The Event Loop waits until the Call Stack is empty before executing it. If another event occurs before the timer completes, `clearTimeout` is called, removing the macro-task from the browser scheduler.

### Q3: Code a simple memoize utility function from scratch.
**Answer:**
```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    return (cache[key] = fn.apply(this, args));
  };
}
```

---

## 10. Homework

1.  **Leading Edge Debouncing:** Enhance the basic `debounce` function to accept an option `{ leading: true, trailing: false }`. When `leading` is true, trigger the function immediately on the first click, then block subsequent executions until a 300ms pause occurs.
2.  **LRU Cache Memoizer:** Write a custom memoization function that limits its cache size to a maximum of 10 items. When the 11th item is added, automatically delete the oldest item from the cache.
3.  **Scroll Position Gauge:** Create an HTML page showing a scroll progress bar at the top of the viewport. Implement a throttled listener to update the scroll progress width at most once every 100ms.
4.  **Drag-and-Drop Tracker:** Set up a small box element. Track mouse drag coordinates inside the box. Compare console log counts when tracking coordinates with a raw listener vs. a throttled listener (150ms limit).
