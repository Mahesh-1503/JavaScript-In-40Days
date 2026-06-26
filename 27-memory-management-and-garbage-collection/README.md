# Day 27: Memory Management & Garbage Collection (Chrome Memory Profiler)

In JavaScript, memory allocation is automatic. When you declare variables, objects, or functions, the engine allocates memory. When they are no longer needed, the engine releases that memory. Understanding how the Stack and Heap manage memory, how the Garbage Collector scans references, and how to diagnose memory leaks is critical for building high-performance web applications.

---

## 1. Mental Model (The Chrome Tab Memory Leak)

Think of a **Chrome Browser Tab**:
- Each tab is allocated a private block of your computer's RAM.
- **The Memory Sweep:** As you browse, the JS engine allocates memory for articles, images, and chat lists. When you navigate away from a chat channel, the engine sweeps away the old message data to free up RAM.
- **The Memory Leak:** Imagine you add a scroll listener to the window:
  ```javascript
  window.addEventListener('scroll', () => { ... });
  ```
  If you delete the chat layout but forget to remove the scroll listener, the listener stays attached to the global `window` object. It holds onto all the variables in its parent scope. Because the global `window` is always active, the Garbage Collector is blocked from deleting the scroll listener and its scope. This is a **Memory Leak**. As the user continues browsing, RAM usage climbs until the tab runs out of memory and crashes with an "Aw, Snap!" error.

---

## 2. Visual Thinking (Stack vs. Heap & The Mark-and-Sweep Engine)

Where variables reside in memory, and how the garbage collector sweeps them:

```
[ STACK MEMORY ] (Static & Fast)
Call Stack Frames (Primitives & Pointers)
┌──────────────────────────────────────┐
│ FEC: runLog() { let age = 25; }      │ ◄── Primitives stored directly in Stack
├──────────────────────────────────────┤
│ GEC: { const objRef = 0x882fa }       │ ◄── Object reference pointer to Heap
└──────────────────────────────────────┘

[ HEAP MEMORY ] (Dynamic & Unstructured)
Objects, Arrays, and Closures
┌──────────────────────────────────────┐
│  0x882fa: { name: "Mahesh", ... }   │ ◄── Complex objects stored here
└──────────────────────────────────────┘

[ MARK-AND-SWEEP GARBAGE COLLECTION ]
Root (Global window / execution context root)
  │
  ├─► [Active Object A] ──► [Active Object B]  ◄── (MARKED as reachable)
  │
  └─► [Disconnected Object C]                   ◄── (UNMARKED - swept from heap!)
```

---

## 3. Beginner Explanation

- **The Stack:** A fast, structured block of memory that stores function call logs and primitive variables (numbers, strings, booleans) which have a fixed size.
- **The Heap:** A large, unstructured pool of memory used to store reference types (objects, arrays, functions) whose sizes can change dynamically.
- **Garbage Collection (GC):** The engine's automatic background process that scans the heap and frees up memory occupied by objects that are no longer accessible from the root scope.
- **Memory Leak:** Memory that has been allocated by the application but is no longer needed, yet cannot be released because it is still referenced by an active object (like the global window).

---

## 4. Deep Explanation (V8 Memory Allocations & Mark-and-Sweep)

### 1. The Mark-and-Sweep Algorithm
Modern JS engines (V8 in Chrome/Node, SpiderMonkey in Firefox) use the **Mark-and-Sweep** garbage collection algorithm:
1. **Mark Phase:** The GC starts at the **roots** (global window, active call stack variables). It walks the entire tree of reference pointers, "marking" every object it can reach.
2. **Sweep Phase:** The GC scans the Heap. Any objects that were *not* marked as reachable are deleted, and their memory spaces are reclaimed.

### 2. Why Closures Retain Heap Memory
When an outer function returns an inner function, the inner function retains a reference to the outer lexical scope. This scope is allocated on the **Heap**. The outer scope cannot be swept because the active inner function still points to it (making it reachable from the root).

### 3. WeakMap vs. Map Memory Handling
Standard ES6 `Map` and `Set` objects hold **strong references** to their keys:
- If an object is used as a key in a standard `Map`, it will never be garbage collected, even if all other variables referencing it are deleted.
- **`WeakMap`** holds **weak references** to its keys. If there are no other active references to the key object in memory, the engine will automatically garbage collect the key object and remove the key-value pair from the WeakMap, preventing leaks:
```javascript
let cache = new WeakMap();
let user = { id: 101 };
cache.set(user, "User Data");

user = null; // The { id: 101 } object is now eligible for Garbage Collection!
```

---

## 5. Real Production Examples (Chrome Profiler diagnostics)

### 1. Accidental Global Variable Leak
Variables declared without keywords default to the global context, leaking memory.
```javascript
function processBilling() {
  // BUG: Missing 'let' or 'const'. 'billingLogs' leaks to the global 'window'!
  billingLogs = new Array(100000).fill("Log Entry");
}

// === CALLING & EXECUTING THIS ===
processBilling();
console.log(window.billingLogs.length); // Output: 100000 (Leaked into global scope!)

/*
  DIAGNOSIS:
  Because billingLogs was declared without let/const/var, the JS engine attaches it to the global object.
  The global window object is never garbage collected during the tab's lifespan, causing the 100,000-entry array to leak permanently.
*/
```

### 2. The Zombie Timer (Uncleared Interval Leak)
```javascript
function startLiveChatFeed() {
  const massiveData = new Array(500000).fill("Chat Cache");
  
  const intervalId = setInterval(() => {
    // Reference inside the interval prevents massiveData from being garbage collected
    console.log(`Checking chat queue status... Cache items: ${massiveData.length}`);
  }, 2000);

  return intervalId;
}

// === CALLING & EXECUTING THIS ===
const activeTimer = startLiveChatFeed();

// Even if we close the chat window, the interval keeps running and massiveData remains in memory!
// Fix: clearInterval(activeTimer);
```

### 3. Detached DOM Nodes Memory Leak
Keeping references to HTML elements in JS arrays after they are deleted from the page.
```javascript
const detachedElementsCache = [];

function deleteHeaderElement() {
  const header = document.getElementById("main-header");
  header.remove(); // Removes it from the visible webpage DOM
  
  // BUG: Storing the reference in JS prevents GC from cleaning up its memory!
  detachedElementsCache.push(header); 
}
```

### 4. Closure Event Listener Leak
Attaching closures to global windows without cleanup.
```javascript
function registerResizeMonitor() {
  const heavyData = new Array(100000).fill("Resize Cache");

  const monitor = () => {
    console.log(`Window size measured. Cache size: ${heavyData.length}`);
  };

  window.addEventListener('resize', monitor);

  // Return unsubscribe cleanup function
  return () => {
    window.removeEventListener('resize', monitor);
  };
}

// === CALLING & EXECUTING THIS ===
const cleanupMonitor = registerResizeMonitor();
// When done with the monitor:
cleanupMonitor(); // SAFE: Cleans up listener and allows heavyData to be collected.
```

### 5. Memory-Safe Metadata Mapping (WeakMap Cache)
```javascript
const metadataStore = new WeakMap();

function logSession(userObject) {
  // Store session logs weakly
  metadataStore.set(userObject, { loginTime: Date.now() });
}

// === CALLING & EXECUTING THIS ===
let userSession = { username: "Alice" };
logSession(userSession);

// Once user logs out and references are deleted
userSession = null; 
// The metadataStore automatically frees the loginTime object from memory.
```

---

## 6. Progressive Coding (Memory Safe Caching)

### Level 1: Beginner (Leaking Cache - Standard Map)
```javascript
// BAD: Standard Map references are strongly held. 
// Objects added to the cache will never be garbage collected, even if deleted elsewhere.
const memoryLeakingCache = new Map();

function getCachedUserData(user) {
  if (memoryLeakingCache.has(user)) {
    return memoryLeakingCache.get(user);
  }
  const data = { age: 30 };
  memoryLeakingCache.set(user, data);
  return data;
}
```

### Level 2: Better (Manual Deletion Cleanup Interface)
```javascript
// BETTER: Exposes a clear cache method. 
// However, relies on the developer to remember to call it, which is error-prone.
const manualCache = new Map();

function cleanCacheEntry(user) {
  manualCache.delete(user);
}
```

### Level 3: Production (Safe WeakMap Garbage collection integration)
```javascript
// PRODUCTION: Utilizes WeakMap. The engine cleans up cache items automatically 
// as soon as their keys are dereferenced elsewhere in the code.
const safeWeakCache = new WeakMap();

function getSafeUserData(userObject) {
  if (safeWeakCache.has(userObject)) {
    return safeWeakCache.get(userObject);
  }
  const computedData = { permissions: ['read', 'write'] };
  safeWeakCache.set(userObject, computedData);
  return computedData;
}
```

### Level 4: Enterprise (High-Aesthetic Memory-Safe WeakRef Cache)
```javascript
// ENTERPRISE: A robust cache loader that manages value WeakRefs, runs a cleanup registry, 
// prevents reference leaks, and logs memory performance diagnostics.
class EnterpriseMemorySafeCache {
  constructor() {
    this.cacheStore = new Map();
    // FinalizationRegistry notifies us when an object is garbage collected
    this.registry = new FinalizationRegistry((key) => {
      console.log(`[GC-NOTIFY] Reclaiming key: ${key} from cache`);
      this.cacheStore.delete(key);
    });
  }

  set(keyObject, valueObject, label) {
    // Store values as WeakRef (weak reference to the object value)
    this.cacheStore.set(label, new WeakRef(valueObject));
    this.registry.register(valueObject, label); // Listen for garbage collection
  }

  get(label) {
    const ref = this.cacheStore.get(label);
    if (!ref) return null;
    
    const value = ref.deref(); // Access the object if still in memory
    if (!value) {
      console.log(`[GC-DETECTED] Cache value for ${label} was reclaimed.`);
      this.cacheStore.delete(label);
      return null;
    }
    return value;
  }
}

// === CALLING & EXECUTING THIS ===
const auditCache = new EnterpriseMemorySafeCache();
let heavyResult = { matrix: [1, 2, 3] };

auditCache.set(null, heavyResult, "heavy_key");

console.log(auditCache.get("heavy_key")); // Output: { matrix: [1, 2, 3] }
heavyResult = null; // Eligible for Garbage Collection!
// The engine will clean it up on the next GC sweep cycle.
```

---

## 7. Common Mistakes

1. **Forgetting to Clear Timers (`setInterval` / `setTimeout`):**
   Leaving intervals running in the background when navigating pages. The interval continues to capture variables in its closure scope, leaking memory.
2. **Accidental Global Variable bindings:**
   Forgetting to declare variables with `let`, `const`, or `var`, causing them to bind to the global window context.
3. **Keeping Dead DOM Node references:**
   Deleting elements from the webpage DOM but keeping references to them in JavaScript arrays, preventing the engine from releasing their HTML memory.

---

## 8. Best Practices

1. **Use WeakMap for Object-Linked Metadata:** Always use `WeakMap` or `WeakSet` when you want to link metadata to objects without preventing them from being garbage collected.
2. **Clean up Event Listeners on Unmount:** Always remove scroll, resize, or keyboard event listeners when the parent component or page unmounts.
3. **Audit Memory via DevTools:** Open Chrome DevTools ➔ **Memory Tab** ➔ Take **Heap Snapshots** to find and trace memory leaks.

---

## 9. Interview Preparation

### Q1: Explain how the Mark-and-Sweep algorithm works in JavaScript Garbage Collection.
**Answer:** The Mark-and-Sweep algorithm is the standard garbage collection method. 
1. **Mark Phase:** The GC starts at the **roots** (global window, active call stack frames) and traverses all references. It "marks" any object it can reach as active.
2. **Sweep Phase:** The GC scans the heap and deletes any objects that were not marked as reachable, reclaiming their memory space.

### Q2: What is a detached DOM node, and how does it create a memory leak?
**Answer:** A detached DOM node is an HTML element that has been removed from the visible webpage DOM tree (using `element.remove()`), but is still referenced by a JavaScript variable in memory. Because JavaScript still holds an active pointer to the element, the Garbage Collector cannot sweep it, causing the node's HTML memory to leak.

### Q3: What is the difference between a Map and a WeakMap in terms of memory management?
**Answer:**
- **`Map`** holds **strong references** to its keys. An object used as a key in a standard Map will never be garbage collected, even if all other references to it are deleted.
- **`WeakMap`** holds **weak references** to its keys. If there are no other active references to a key object in memory, the engine will garbage collect the key object and automatically delete the key-value pair from the WeakMap.

---

## 10. Homework

1. **Simulate Zombie Interval Leak:** Write a script that schedules a setInterval log. Let it run for 10 seconds, clear the timer using its ID, and verify the interval stopped.
2. **Memory Leak Detector Snapshots:** Write an accidental global variable leak. Open Chrome DevTools Memory tab, take a heap snapshot, locate the leaked variable, and document it.
3. **WeakMap vs Map GC Experiment:** Write a script comparing memory allocations when adding 10,000 objects to a standard Map vs a WeakMap, and explain the difference.
4. **Detached Header Node Cleanup:** Build a script that deletes a DOM element. Write cleanup logic to set all variable references to `null` to ensure the node is garbage collected.
5. **Debounced Resize Listener Logger:** Implement a resize event listener. Ensure it only runs once every 200ms using debounce, and returns a clean cleanup function.
