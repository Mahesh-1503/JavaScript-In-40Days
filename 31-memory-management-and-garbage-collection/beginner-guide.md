# Beginner's Guide: Memory Management & Garbage Collection

Hey there, future memory optimizer! 👋 Welcome to your hands-on guide to JavaScript Memory Management. Today, we are going to look under the hood of Stack and Heap storage, watch how the Garbage Collector sweeps garbage, and build memory leak-free web apps.

---

## 📂 How to Learn This Folder

To get the most out of your memory profiling experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand Stack vs. Heap models.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-memory.js`), and run them with `node test-memory.js` in your terminal to see the live console logs.
3.  **Step 3:** Open and read [31-memory-management-and-garbage-collection/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/31-memory-management-and-garbage-collection/README.md) to explore V8 generation memory spaces and Chrome Heap Snapshots.

---

## Part 1: Memory Management

Unlike low-level languages, JavaScript manages memory automatically. When you create variables, functions, or objects, the browser allocates memory. When you delete or stop referencing them, the browser sweeps them away (Garbage Collection).

### The Chrome Tab Analogy:
Think of browsing in a **Chrome tab**:
*   As you read articles or chat with friends, JavaScript loads profile pictures and message logs into your computer's RAM.
*   Once you close a chat panel, the browser sweeps the old message data away to free up RAM.
*   If a developer leaves a bug in their code, the browser cannot clean up the unused memory. The memory compiles (a **Memory Leak**), eventually crashing the tab with an "Aw, Snap!" error page.

---

## Part 2: Stack vs. Heap Memory

JavaScript allocates memory in two distinct zones:

```text
[ STACK MEMORY ] (Static & Fast)
Call Stack Frames (Primitives & Pointers)
┌──────────────────────────────────────┐
│ runLog() { let age = 25; }           │ ◄── Primitives stored directly in Stack
├──────────────────────────────────────┤
│ GEC: { const objRef = 0x882fa }      │ ◄── Object reference pointer to Heap
└──────────────────────────────────────┘

[ HEAP MEMORY ] (Dynamic & Unstructured)
Objects, Arrays, and Closures
┌──────────────────────────────────────┐
│  0x882fa: { name: "Mahesh", ... }    │ ◄── Complex objects stored here
└──────────────────────────────────────┘
```

### 1. The Stack (Fast & Structured)
Stores function execution frames and primitive data types (Numbers, Strings, Booleans) that have a fixed, unchanging size in memory.

### 2. The Heap (Large & Dynamic)
A large, unstructured pool of memory used to store reference types (Objects, Arrays, Functions) whose sizes can change dynamically. Variables on the stack hold reference address pointers pointing to these objects on the heap.

---

## Part 3: The Garbage Collector: Mark-and-Sweep

To clean up heap memory, the JS engine uses a background assistant called the **Garbage Collector (GC)**, which implements the **Mark-and-Sweep** algorithm:

1.  **Mark Phase:** The GC starts at the root scope (the global `window` object or active Call Stack). It traverses all reference pointers, "marking" every object it can successfully reach as **active**.
2.  **Sweep Phase:** The GC sweeps the Heap. Any object that was **not** marked is declared unreachable and deleted from RAM.

---

## Part 4: Weak References: `WeakMap` & `WeakSet`

Standard `Map` and `Set` collections hold **strong references** to their elements, preventing them from being garbage collected even if the rest of your app has discarded them.

To solve this, JavaScript offers `WeakMap` and `WeakSet`, which hold **weak references** (allowing the Garbage Collector to clean them up):

### 🧪 Executing a WeakMap Sandbox:
Copy, paste, and run this code to see how standard maps differ from WeakMaps:

```javascript
// ==========================================
// 1. WeakMap Garbage Collection Sandbox
// ==========================================
const cache = new WeakMap();
let user = { name: "Arun", id: 101 };

// Store some metadata for our user in the WeakMap
cache.set(user, "Premium User Log Details");
console.log("Cached details before nullify:", cache.get(user)); // "Premium User Log Details"

// Nullifying the variable removes the only strong reference to the object
user = null; 
// The { name: "Arun" } object on the heap is now eligible for Garbage Collection!
// It will be swept automatically when V8 sweeps the heap.

// ==========================================
// 2. WeakSet Rules Sandbox
// ==========================================
const activeConnections = new WeakSet();
const connectionObj = { port: 8080 };

activeConnections.add(connectionObj);

try {
  // ❌ Will fail: WeakSet can only store objects, not primitives!
  activeConnections.add("string-connection");
} catch (error) {
  console.log("Expected Error Caught: WeakSets do not support primitive values!");
  console.log("Error details:", error.message);
}
```

---

## Part 5: The 4 Common Memory Leaks

### 1. Accidental Globals (Undeclared Variables)
Always use `"use strict";` to block accidental global assignments:
```javascript
function loadLog() {
  // ❌ Bug: Missing 'let' or 'const'. billingLogs leaks to the global 'window'!
  billingLogs = new Array(1000000); 
}
```

### 2. Forgotten Event Listeners
If you append a scroll listener to the global window, and then delete the DOM nodes they interact with, the listener remains locked in memory:
```javascript
function handleScroll() {
  console.log("Scrolling...");
}

// ❌ Leak: Listener is never cleaned up
window.addEventListener("scroll", handleScroll);

// 🟢 Fix: Remove listener when removing the component
window.removeEventListener("scroll", handleScroll);
```

### 3. Zombie Timers
An active `setInterval()` callback remains alive in the Web API container until explicitly stopped:
```javascript
// 🧪 Safe Timer execution simulation
const userObj = { name: "Bob" };
const intervalId = setInterval(() => {
  console.log("Checking session status for:", userObj.name); 
}, 1000);

// 🟢 Fix: Stop the timer to release the user object from memory
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Cleared timer. Bob is now safe to be garbage collected!");
}, 1050);
```

### 4. Detached DOM Nodes
Storing references to HTML elements in JavaScript variables after the nodes have been deleted from the page:
```javascript
// Mock DOM environments setup
const mockDOM = {
  header: { id: "header-box" }
};

let container = mockDOM.header; // JS holds reference pointer
delete mockDOM.header; // Element removed from mock page

console.log("Detached node still in memory:", container.id); // "header-box" (Leak!)

container = null; // 🟢 Fix: Release reference, allowing GC to collect it!
console.log("Reference released:", container); // null
```

---

## Part 6: Real-World Application Code

Here is a memory-safe tab event listener tracker class. Copy and run the test script:

```javascript
class ScrollTracker {
  constructor() {
    this.logs = [];
  }
  
  start() {
    // Save reference of the handler so we can remove it later
    this.handler = this.logScroll.bind(this);
    // Simulating attaching a scroll listener to a mock window
    console.log("Scroll tracker event listener attached.");
  }
  
  logScroll(yPosition) {
    this.logs.push(yPosition);
  }
  
  destroy() {
    // 🟢 Clean up reference handlers to prevent memory leaks!
    this.handler = null;
    this.logs = [];
    console.log("Scroll tracker clean complete. Memory released.");
  }
}

const tracker = new ScrollTracker();
tracker.start();
tracker.logScroll(120);
tracker.destroy();
```

---

## Part 7: Essential Interview Questions & Practice Exercises

### Q1: What happens to objects on the Heap if their Stack reference pointer is set to `null`?
**Answer:** The objects become unreachable from the root scope. During the next Garbage Collection sweep, the Mark-and-Sweep engine will identify them as unmarked, delete them from Heap memory, and reclaim the memory address.

### Q2: Why are WeakMaps non-iterable?
**Answer:** Because the garbage collector runs non-deterministically (at random times). If a WeakMap was iterable, its size and content list would change randomly depending on whether the garbage collector had executed, leading to inconsistent application states.

### Practice Exercises:
1.  **Strict Mode Sandbox:** Create a script containing `"use strict";`. Write a function assigning values to undeclared variables. Run it via Node.js to confirm it successfully throws an error.
2.  **Zombie Interval Guard:** Write a class `SessionMonitor` that starts a `setInterval` logging alerts. Implement a `stop()` method clearing the interval cleanly.
3.  **WeakMap Cache Builder:** Implement a caching mechanism storing temporary database queries inside a `WeakMap` cache, and test how nullifying keys clears memory.
