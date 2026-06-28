# Beginner's Guide: Memory Management & Garbage Collection

Welcome to the beginner's guide to JavaScript Memory Management and Garbage Collection! This guide explains how browsers store variables in Stack and Heap memory, how the Mark-and-Sweep garbage collector runs, and how to prevent memory leak crashes.

---

## 📅 Learning Roadmap

*   **Part 1:** Memory Management (The Chrome Tab Analogy)
*   **Part 2:** Stack vs. Heap Memory
*   **Part 3:** The Garbage Collector: Mark-and-Sweep
*   **Part 4:** Weak References: `WeakMap` & `WeakSet`
*   **Part 5:** The 4 Common Memory Leaks in JavaScript
*   **Part 6:** Real-World Application Code (Leak vs. Clean)
*   **Part 7:** Essential Interview Questions & Practice Exercises

---

## Part 1: Memory Management

Unlike languages like C or C++, JavaScript manages memory automatically. When you create variables, functions, or objects, JavaScript allocates memory. When you delete or stop using them, it releases that memory (Garbage Collection).

### The Chrome Tab Analogy:
Think of browsing in a **Chrome tab**:
*   As you navigate pages and chat with friends, JavaScript loads messages and profile images into your computer's RAM.
*   Once you close a chat window, the browser sweeps the message data away to free up RAM.
*   If a developer leaves a bug in their code, the browser is blocked from cleaning up that memory. The memory keeps compiling (a **Memory Leak**), eventually crashing the tab with an "Aw, Snap!" error page.

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

### 1. `WeakMap` Example
```javascript
let cache = new WeakMap();
let user = { name: "Arun" };

cache.set(user, "Metadata profile");
user = null; // The object { name: "Arun" } is automatically swept from cache & memory!
```

### 2. `WeakSet` Rules:
*   Can only store **Objects or Symbols** (no primitives like numbers or strings).
*   Is **non-iterable** (no `for...of` loops, no `.keys()`, `.values()`, `.entries()`).
*   Has **no `.size` property**.

---

## Part 5: The 4 Common Memory Leaks

### 1. Accidental Globals (Undeclared Variables)
Variables declared without `let` or `const` keywords attach themselves permanently to the global `window` object and are never cleaned:
```javascript
function loadLog() {
  billingLogs = new Array(1000000); // ❌ Leaked to global window!
}
```

### 2. Forgotten Event Listeners
If you append a scroll listener to the global window, and then delete the DOM nodes they interact with, the listener and all its scope variables remain locked in memory:
```javascript
// ❌ Leak: Listener is never cleaned up
window.addEventListener("scroll", handleScroll);

// 🟢 Fix: Remove listener when removing the component
window.removeEventListener("scroll", handleScroll);
```

### 3. Zombie Timers
An active `setInterval()` callback remains alive in the Web API container until explicitly stopped:
```javascript
const user = { name: "Bob" };
const intervalId = setInterval(() => {
  console.log(user.name); // ❌ keeps user alive in memory forever!
}, 1000);

// 🟢 Fix:
clearInterval(intervalId);
```

### 4. Detached DOM Nodes
Storing reference pointers to HTML nodes in JavaScript variables after the nodes have been deleted from the page:
```javascript
let container = document.getElementById("header-box");
document.body.removeChild(container); // Node removed from page
// ❌ Leak: The 'container' variable still references the node in JavaScript!
container = null; // 🟢 Fix: Release reference
```

---

## Part 6: Real-World Application Code

Here is a memory-safe tab event listener wrapper:
```javascript
class ScrollTracker {
  constructor() {
    this.logs = [];
    this.handler = this.logScroll.bind(this);
  }
  
  start() {
    window.addEventListener("scroll", this.handler);
  }
  
  logScroll() {
    this.logs.push(window.scrollY);
    console.log("Logged scroll position.");
  }
  
  destroy() {
    // 🟢 Crucial: Prevent memory leaks by removing listeners on destroy!
    window.removeEventListener("scroll", this.handler);
    this.logs = [];
    console.log("Tracker destroyed. Memory released.");
  }
}
```

---

## Part 7: Essential Interview Questions & Practice Exercises

### Q1: What happens to objects on the Heap if their Stack reference pointer is set to `null`?
**Answer:** The objects become unreachable from the root scope. During the next Garbage Collection sweep, the Mark-and-Sweep engine will identify them as unmarked, delete them from Heap memory, and reclaim the memory address.

### Q2: Why are WeakMaps non-iterable?
**Answer:** Because the garbage collector runs non-deterministically (at random times). If a WeakMap was iterable, its size and content list would change randomly depending on whether the garbage collector had executed, leading to inconsistent application states.

### Practice Exercises:
1.  **Event listener memory test:** Write a script attaching a keydown event listener to the document. Write a cleanup function using `removeEventListener` to release the memory when keydown tests end.
2.  **WeakMap Cache Builder:** Implement a caching mechanism storing temporary database queries inside a `WeakMap` cache, and test how nullifying keys clears memory.
3.  **Accidental Global Tracker:** Place `"use strict";` at the top of a file, write a function assigning values to undeclared variables, and verify that strict mode correctly blocks accidental global leaks.
