# Example (short & clarifying)

```javascript
console.log("Start"); // 1

function foo() {
  // 2 (function declaration -> hoisted in GEC)
  console.log("Inside foo"); // 5 (when foo runs)
}

setTimeout(() => {
  // 3
  console.log("Timeout callback"); // 9 (macrotask)
}, 0);

Promise.resolve().then(() => {
  // 4
  console.log("Promise callback"); // 8 (microtask)
});

foo(); // 5 (call foo)
console.log("End"); // 6
```

Expected console output (final):

```
Start
Inside foo
End
Promise callback
Timeout callback
```

---

# Short rules used (with references)

- **GEC (Global Execution Context)** is created when the script runs; function declarations are hoisted into it. ([FreeCodeCamp][1])
- The **Call Stack** executes synchronous code (LIFO). ([Medium][2])
- `setTimeout` callback goes to the **task (callback) queue / macrotask queue** after the timer expires (Web API handles the timer). ([GeeksforGeeks][3])
- `Promise.then` handlers enqueue **microtasks (job queue)**; microtasks run _before_ macrotasks once the stack is empty. ([MDN Web Docs][4])
- The **Event Loop** repeatedly checks: if the call stack is empty, drain microtask queue, then take one macrotask from callback queue. ([Wikipedia][5])

---

# Step-by-step execution + diagrams

I’ll show the engine state after each important step. Legend:

- `Call Stack` — top is rightmost (what's executing now)
- `Web APIs` — tasks handled off-stack (timers, XHR, etc.)
- `Microtask Queue` — promises, mutation observers
- `Callback Queue` — setTimeout, setInterval, I/O callbacks
- `GEC` = Global Execution Context (implicitly created at start)

---

### **Initial state (before running script)**

```
Call Stack: [ empty ]
Microtask Q: []
Callback Q: []
Web APIs: idle
```

---

### **Step 0 — Start running script: create GEC**

When engine loads the file it creates the **GEC** and pushes it to the call stack.

```
Call Stack: [ GEC (global) ]        // executing global code
Microtask Q: []
Callback Q: []
Web APIs: idle
```

---

### **Step 1 — `console.log("Start")` runs**

- `console.log` is called from GEC; prints `Start`. Synchronous.

```
Call Stack: [ GEC ]                // executing lines inside GEC
-> console.log runs (briefly pushed/popped)
Output: Start
Microtask Q: []
Callback Q: []
```

---

### **Step 2 — Function declaration `foo` (hoisted)**

- Function `foo` is registered/hoisted in GEC's variable environment. No stack change beyond remaining in GEC.

```
Call Stack: [ GEC ]
(foo is stored in GEC memory; not executed now)
Microtask Q: []
Callback Q: []
```

---

### **Step 3 — `setTimeout(..., 0)` encountered**

- Host (browser) `setTimeout` API is called. The callback is handed off to the **Web APIs** (timer starts).
- **Important:** the callback is NOT on the call stack or queues yet — it will be queued in Callback Q when the timer fires.

```
Call Stack: [ GEC ]
Web APIs: timer scheduled -> will enqueue callback to Callback Q when 0ms elapsed
Microtask Q: []
Callback Q: []
```

---

### **Step 4 — `Promise.resolve().then(...)` encountered**

- The promise is resolved immediately. The `.then` callback is scheduled as a **microtask** (job).
- Microtasks are queued in the **Microtask Queue** (higher priority than Callback Q).

```
Call Stack: [ GEC ]
Web APIs: timer scheduled
Microtask Q: [ Promise callback ]
Callback Q: []
```

---

### **Step 5 — `foo()` is called**

- Calling `foo()` creates a **Function Execution Context (FEC)** and pushes it onto the **Call Stack**.
- Inside `foo`, `console.log("Inside foo")` runs synchronously and prints.

```
Call Stack:
  [ GEC ]
  [ FEC(foo) ]          <-- currently executing

Output so far:
Start
Inside foo

Microtask Q: [ Promise callback ]
Callback Q: []
```

- When `foo` returns, its FEC is popped.

```
Call Stack:
  [ GEC ]               // back to global after foo returns
```

---

### **Step 6 — `console.log("End")` runs**

- Still inside GEC; prints `End`.

```
Call Stack: [ GEC ]
Output so far:
Start
Inside foo
End

Microtask Q: [ Promise callback ]
Callback Q: []
```

At this point, the **global script has finished running to completion** — the call stack contains _only_ GEC but execution of synchronous statements is done. The engine now reaches the point where queued asynchronous callbacks can be processed. The Event Loop will act now.

---

### **Event Loop: Draining microtasks first**

The event loop checks: Call Stack is empty (script finished execution). It first **drains the Microtask Queue**.

**Step 7 — Run microtask(s)**

- Pop the `Promise` callback from Microtask Q and push onto Call Stack; execute `console.log("Promise callback")`. Then pop it.

```
Before:
Call Stack: [ (GEC code finished) ]
Microtask Q: [ Promise callback ]
Callback Q: [ ]

Action:
Call Stack: [ Promise callback ]
-> run -> prints "Promise callback"
Call Stack: [ (GEC) ]
Microtask Q: []
```

Output so far:

```
Start
Inside foo
End
Promise callback
```

**Important:** if the microtask enqueues more microtasks, the engine will continue draining microtasks until empty before moving to macrotasks.

(Citation: microtasks before macrotasks.) ([MDN Web Docs][4])

---

### **Step 8 — Now process macrotasks (Callback Queue)**

- The timer set earlier has expired (0ms) and its callback was placed into the **Callback Queue** by the Web API.
- Event Loop now takes the first callback from Callback Q, pushes it onto the Call Stack, and executes it.

```
Before:
Call Stack: [ (GEC) / empty for new tasks ]
Microtask Q: []
Callback Q: [ Timeout callback ]

Action:
Call Stack: [ Timeout callback ]
-> run -> prints "Timeout callback"
Call Stack: [ (GEC) ]
Callback Q: []
```

Final output appended:

```
Timeout callback
```

---

### **Final console output (sequence)**

```
Start
Inside foo
End
Promise callback
Timeout callback
```

---

# Short summary (one-liner)

1. Script runs inside **GEC** on the **Call Stack**.
2. `Promise.then` → **microtask queue** (higher priority).
3. `setTimeout` → **Web API** → after timer → **callback queue** (macrotask).
4. **Event Loop**: when stack is empty, drain **all microtasks**, then run **one** macrotask, repeat. ([FreeCodeCamp][1])

---

# Quick practical check (run this)

Paste the example into your browser console and watch the order. If you change the `setTimeout(..., 0)` delay or add more `Promise.resolve().then(...)` lines you’ll see the same microtask-before-macrotask behavior.

---

[1]: https://www.freecodecamp.org/news/execution-context-how-javascript-works-behind-the-scenes/?utm_source=chatgpt.com "JavaScript Execution Context – How JS Works Behind The ..."
[2]: https://medium.com/jsninja/call-stack-event-loop-and-task-queue-d49eff2ec7bb?utm_source=chatgpt.com "Call Stack, Event Loop, and Task Queue | by Anish Giri"
[3]: https://www.geeksforgeeks.org/javascript/what-is-an-event-loop-in-javascript/?utm_source=chatgpt.com "Event Loop in JavaScript"
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model?utm_source=chatgpt.com "JavaScript execution model - MDN - Mozilla"
[5]: https://en.wikipedia.org/wiki/Event_loop?utm_source=chatgpt.com "Event loop"
