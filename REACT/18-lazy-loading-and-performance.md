# ⚡ Module 18: Performance Optimization & Lazy Loading (Dashboard Telemetry Hub)

Welcome to Module 18! In this module, we will learn how to optimize React application speed. We will study **Performance Hooks** (`useMemo`, `useCallback`, `React.memo`), **DOM References** (`useRef`), and **Code Splitting** (`React.lazy()`, `Suspense`) inside a real-world **Dashboard Telemetry Hub** context.

---

## 1. Mental Model: Rendering Reconciliation & Code Bundling

By default, when a parent component updates state, React recursively re-renders **all** of its children. In small apps, this is fine. In complex dashboard views, it causes lag.
* **Component Memoization (`React.memo`):** Prevents a child component from re-rendering if its input props haven't changed.
* **Calculation Memoization (`useMemo`):** Caches the result of an expensive calculation, re-running it only when dependencies change.
* **Function Memoization (`useCallback`):** Caches a function reference so it isn't recreated on every render.
* **Code Splitting (`React.lazy`):** By default, Vite bundles all your code into one large JS file. A user visiting your login page must download the entire app (including dashboards and settings). Code splitting splits your code into smaller chunks, downloading views only when the user navigates to them.

---

## 2. Visual Thinking: Suspense Code Splitting & Render Boundaries

```text
======================= LAZY LOADING & SUSPENSE =======================

   Browser URL Path: /analytics (First-time navigation)
   
   ┌──────────────────────────────────────────────┐
   │ 1. Intercept Navigation                     │
   │ 2. Trigger Network Request to download:      │
   │    "analytics-chunk.js"                      │
   └──────────────────────────────────────────────┘
                         │
              Download in Progress...
                         │
                         ▼
   ┌──────────────────────────────────────────────┐
   │ 3. Display Suspense fallback UI             │
   │    e.g. <LoadingSpinner />                   │
   └──────────────────────────────────────────────┘
                         │
               Download Complete!
                         │
                         ▼
   ┌──────────────────────────────────────────────┐
   │ 4. Mount & Render lazy Analytics Component   │
   └──────────────────────────────────────────────┘
```

---

## 3. Beginner Explanation: Core Performance APIs

Here is how you use React's performance APIs:

* **`useRef`:** References a DOM node directly or stores mutable values that survive re-renders *without triggering a new render* when modified:
  ```jsx
  const inputRef = useRef(null);
  const clickCounter = useRef(0); // Updates silently without re-rendering!
  ```
* **`useMemo`:** Caches the output of a heavy function:
  ```jsx
  const sortedUsers = useMemo(() => {
    return heavySort(users);
  }, [users]); // Re-runs ONLY if users array updates
  ```
* **`useCallback`:** Caches a function definition to prevent child re-renders when passing callbacks:
  ```jsx
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // Caches function reference permanently
  ```
* **`React.lazy` & `<Suspense>`:** Dynamically loads a component:
  ```jsx
  const LazyComponent = React.lazy(() => import("./HeavyDashboard"));

  function App() {
    return (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <LazyComponent />
      </Suspense>
    );
  }
  ```

---

## 4. Deep Explanation: Object Referential Integrity in V8

In JavaScript, objects and functions are compared by **reference**, not by value:
```javascript
const fn1 = () => {};
const fn2 = () => {};
console.log(fn1 === fn2); // false (different memory references!)
```
When React re-renders a parent component, every inline function and array declared inside is recreated at a new memory address.
If you pass an inline function as a prop to a child component (even if the child is wrapped in `React.memo`), the child will see a *new* reference, assume props changed, and re-render anyway.
* **The Solution:** Use `useCallback` to lock the function reference in V8 memory, making `React.memo` work correctly.

---

## 5. Real Production Example: Telemetry Dashboard Cache

Here is a dashboard view that sorts telemetry logs. It uses `useMemo` to cache the sort operation, `useCallback` to lock callback functions, and `useRef` to track how many times the component has rendered.

```jsx
import React, { useState, useMemo, useCallback, useRef } from "react";

// 1. Wrap child component in React.memo to prevent re-renders
const LogRow = React.memo(({ log, onDelete }) => {
  console.log(`[Render] LogRow ID: ${log.id}`);
  return (
    <div className="flex justify-between p-2 border-b">
      <span>{log.message}</span>
      <button onClick={() => onDelete(log.id)}>Delete</button>
    </div>
  );
});

export function TelemetryDashboard() {
  const [logs, setLogs] = useState([
    { id: 1, message: "API limit hit" },
    { id: 2, message: "Database CPU spike" }
  ]);
  const [filterText, setFilterText] = useState("");
  
  // 2. useRef tracks render counts without causing re-renders
  const renderCounter = useRef(0);
  renderCounter.current += 1;

  // 3. useMemo caches heavy sorting logic
  const filteredLogs = useMemo(() => {
    console.log("[useMemo] Filtering logs list...");
    return logs.filter(log => log.message.toLowerCase().includes(filterText.toLowerCase()));
  }, [logs, filterText]);

  // 4. useCallback locks callback function reference in memory
  const handleDeleteLog = useCallback((id) => {
    setLogs((prev) => prev.filter(log => log.id !== id));
  }, []);

  return (
    <div className="p-6 bg-slate-100 rounded-lg">
      <h2>Telemetry Hub (Renders: {renderCounter.current})</h2>
      <input 
        type="text" 
        value={filterText} 
        onChange={(e) => setFilterText(e.target.value)} 
        placeholder="Filter logs..."
        className="mb-4 p-2 border rounded"
      />
      <div>
        {filteredLogs.map(log => (
          <LogRow key={log.id} log={log} onDelete={handleDeleteLog} />
        ))}
      </div>
    </div>
  );
}
```

---

## 6. Progressive Coding: Unoptimized vs. Optimized

Let's compare implementations:

### Unoptimized Code
Re-renders on every keystroke, sorting list from scratch, and recreates callbacks.
```jsx
export function UnoptimizedList({ items }) {
  const [query, setQuery] = useState("");
  
  const filtered = items.filter(x => x.includes(query)); // Runs on every keystroke!
  const handleAction = () => console.log("Action triggered");

  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} />
      <ChildComponent onAction={handleAction} list={filtered} />
    </div>
  );
}
```

### Optimized Code
Caches calculations, locks callback references, and uses lazy imports.
```jsx
import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";

const LazyChild = lazy(() => import("./ChildComponent"));

export function OptimizedList({ items }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => items.filter(x => x.includes(query)), [items, query]);
  const handleAction = useCallback(() => console.log("Action triggered"), []);

  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} />
      <Suspense fallback={<div>Loading List...</div>}>
        <LazyChild onAction={handleAction} list={filtered} />
      </Suspense>
    </div>
  );
}
```

---

## 7. Common Mistakes & Pitfalls

* **Mistake: Using `useMemo` for cheap, fast operations:**
  Wrapping operations like `const total = a + b` in `useMemo` is counter-productive. The overhead of running the dependency array check consumes more resources than the simple addition itself.
* **Mistake: Forgetting keys on Lazy components:**
  Make sure dynamic Suspense routes or lists have unique, persistent `key` values to help React's virtual DOM reconciliation.

---

## 8. Best Practices

1. **Only use `React.memo` on pure rendering components:** If a component receives object references that change frequently, memoization will fail and add checking overhead.
2. **Combine Code-Splitting with Routing:** Load route components lazily inside your React Router config using `React.lazy()` to reduce initial page load times.

---

## 9. Interview Prep: FAANG & Top-Tier Questions

### Question 1: When should you use `useCallback` vs. `useMemo`?
**Answer:**
* **`useMemo`:** Caches the *return value* of a function. It is used to optimize expensive calculations.
* **`useCallback`:** Caches the *function definition itself*. It is used to maintain referential identity for callbacks passed to memoized child components to prevent unnecessary re-renders.

---

## 10. Homework (Job-Ready Assignments)

### Assignment: Build a Lazy-Loaded Image Gallery with Suspense
Create an image gallery component. Load the heavy card list component using `React.lazy()` and `<Suspense>`. Memoize image filtering using `useMemo` so searching tags doesn't trigger component re-render unless values update.
