# Day 16: setTimeout & Advanced Closures (Zoom Disconnect Timer)

JavaScript is single-threaded, meaning it can only do one thing at a time. To handle timed tasks (like auto-disconnects, warnings, and delays) without freezing the web page, the engine relies on the browser's **Web APIs** and the **Event Loop**.

---

## 1. Mental Model (The Zoom Auto-Disconnect Timer)

Think of a free **Zoom Meeting Room**:
1. **The 40-Minute Limit:** Free meetings auto-terminate after 40 minutes.
2. **The 35-Minute Warning:** At minute 35, a notification alerts users: *"Your meeting ends in 5 minutes. Upgrade to Pro."*
3. **The Disconnect Scheduler:** When a room starts, the server registers two timers:
   - Timer 1 (Warning): Runs after 35 minutes.
   - Timer 2 (Disconnect): Runs after 40 minutes.
4. **The Canceled Meeting:** If the host ends the meeting early, the engine must cancel these timers (`clearTimeout`) to prevent the warning from displaying on a closed page.

In JavaScript, `setTimeout` schedules these tasks to run asynchronously in the background.

---

## 2. Visual Thinking (Timer Event Scheduling)

How asynchronous timers flow through the Call Stack, Web APIs, and the Task Queue:

```
1. Call Stack (Executes code)      2. Web APIs (Timer thread in background)
┌─────────────────────────────┐    ┌────────────────────────────────────────┐
│ setTimeout(warn, 35m)       │ ──►│ Timer 1: [Counting down 35 minutes...]  │
└─────────────────────────────┘    └────────────────────────────────────────┘
                                                       │
                                           When countdown reaches 0:
                                                       │
                                                       ▼
3. Task Queue (Waiting to run)     4. Event Loop
┌─────────────────────────────┐    ┌────────────────────────────────────────┐
│ [warn() task] ◄─────────────┼────┼─ Checks if Call Stack is empty.        │
└─────────────────────────────┘    │  If empty, pushes warn() to Call Stack.│
                                   └────────────────────────────────────────┘
```

---

## 3. Beginner Explanation

- **`setTimeout(function, delay)`:** A function that waits for the specified `delay` (in milliseconds) and then runs the `function` code.
- **`clearTimeout(timerId)`:** Cancels a scheduled timeout before it runs.
- **Asynchronous Execution:** JavaScript does not wait around for the timer to finish. It registers the timer with the browser, immediately moves to the next line of code, and runs the timer's code only when the time is up and the main thread is free.

---

## 4. Deep Explanation (The Event Loop & Loop Closures)

### 1. The Async Timer Lifecycle
When you call `setTimeout(callback, 1000)`:
1. The call is pushed to the **Call Stack**.
2. The JS engine delegates the timer countdown to the browser's **Web APIs** container and pops `setTimeout` off the stack.
3. The browser background thread counts down 1000ms.
4. Once completed, the callback function is pushed to the **Task Queue** (Macrotask Queue).
5. The **Event Loop** continuously checks if the Call Stack is empty. When it is, it takes the first task from the Task Queue and pushes it to the Call Stack for execution.
- **Key Limit:** Even if you write `setTimeout(cb, 0)`, the callback will not execute immediately. It must wait for all synchronous code currently in the Call Stack to finish.

### 2. Closures Inside Loops (The Var vs Let Problem)
```javascript
// BUG: var is hoisted and function-scoped. When the timers run, the loop
// has already finished and the single shared 'i' variable is set to 3.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // Logs: 3, 3, 3
}

// FIX: let is block-scoped. On each loop iteration, a new lexical block scope
// is created with a unique copy of 'i' bound in memory.
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // Logs: 0, 1, 2
}
```

---

## 5. Real Production Examples (Zoom Room flows)

### 1. Zoom Disconnect Warnings (Scheduled Timeouts)
```javascript
const warningDelay = 35 * 60 * 1000; // 35 minutes
const disconnectDelay = 40 * 60 * 1000; // 40 minutes

const warningTimer = setTimeout(() => {
  console.log("Warning: Your meeting ends in 5 minutes!");
}, warningDelay);

const disconnectTimer = setTimeout(() => {
  console.log("Meeting terminated.");
}, disconnectDelay);
```

### 2. Meeting Ended Early (Clearing Timeouts)
```javascript
function terminateMeetingEarly() {
  console.log("Host ended meeting. Clearing all timers...");
  
  // Prevent ghost timers from executing
  clearTimeout(warningTimer);
  clearTimeout(disconnectTimer);
}
```

### 3. Search Query Input Debouncer
Prevents triggering database searches on every keystroke.
```javascript
let debounceTimer;

function handleSearchInput(query) {
  // Clear the previous timer if the user is still typing
  clearTimeout(debounceTimer);
  
  // Schedule API call only after typing stops for 500ms
  debounceTimer = setTimeout(() => {
    console.log(`Sending API Request for: ${query}`);
  }, 500);
}
```

### 4. Interactive Toast Notification Dismissal
```javascript
function showNotification(message) {
  console.log(`[Toast] ${message}`);
  
  // Dismiss notification card automatically after 3 seconds
  const dismissTimer = setTimeout(() => {
    console.log("Toast notification faded out.");
  }, 3000);
}
```

### 5. Loop Closure Manual Fix via IIFE (Legacy codebase pattern)
Creating unique variable frames when block-scoped `let` is not available.
```javascript
for (var i = 0; i < 3; i++) {
  (function(capturedIndex) {
    setTimeout(() => {
      console.log(`Index: ${capturedIndex}`);
    }, capturedIndex * 1000);
  })(i); // Captured immediately inside IIFE parameter
}
```

---

## 6. Progressive Coding (Timeout Manager)

### Level 1: Beginner (No timer references)
```javascript
// BAD: Triggers alert blindly. Cannot be canceled if user navigates away.
function showAdBanner() {
  setTimeout(() => {
    console.log("Rendering Ad Banner");
  }, 5000);
}
```

### Level 2: Better (Returning Timer ID)
```javascript
// BETTER: Returns timer reference so caller can cancel it
function scheduleAdBanner() {
  return setTimeout(() => {
    console.log("Rendering Ad Banner");
  }, 5000);
}
const bannerTimer = scheduleAdBanner();
```

### Level 3: Production (Class Timer Manager)
```javascript
// PRODUCTION: Standard class that securely encapsulates active timers
class ScheduledNotification {
  constructor(message, delay) {
    this.message = message;
    this.delay = delay;
    this.timerId = null;
  }

  start() {
    this.timerId = setTimeout(() => {
      console.log(`[ALERT] ${this.message}`);
    }, this.delay);
  }

  cancel() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
      console.log("Notification canceled.");
    }
  }
}
```

### Level 4: Enterprise (Zoom Room Session Controller)
```javascript
// ENTERPRISE: A robust room session lifecycle engine that schedules warn,
// disconnect, and cleanup tasks, while providing safe cancellation hooks.
class ZoomSessionController {
  #timers = new Map(); // Private timer map

  constructor(roomId, limitMinutes) {
    this.roomId = roomId;
    this.limitMs = limitMinutes * 60 * 1000;
  }

  startSession() {
    console.log(`Session started in Room [${this.roomId}]`);

    // 1. Schedule Warning (5 minutes before end)
    const warningTime = Math.max(0, this.limitMs - (5 * 60 * 1000));
    const warnTimer = setTimeout(() => {
      console.warn(`[ROOM-${this.roomId}] Warning: 5 minutes remaining!`);
    }, warningTime);
    this.#timers.set("warning", warnTimer);

    // 2. Schedule Disconnect
    const disconnectTimer = setTimeout(() => {
      this.#disconnect();
    }, this.limitMs);
    this.#timers.set("disconnect", disconnectTimer);
  }

  #disconnect() {
    console.log(`[ROOM-${this.roomId}] Auto-disconnected: Limit reached.`);
    this.cleanup();
  }

  cleanup() {
    console.log(`[ROOM-${this.roomId}] Cleaning active timers...`);
    for (const [name, timerId] of this.#timers.entries()) {
      clearTimeout(timerId);
    }
    this.#timers.clear();
  }
}

const zoomRoom = new ZoomSessionController("room_xyz", 40);
zoomRoom.startSession();
// If session ends early:
// zoomRoom.cleanup();
```

---

## 7. Common Mistakes

1. **Expecting exact timing accuracy:**
   `setTimeout` guarantees the code won't run *before* the specified delay, but it doesn't guarantee it will run *exactly* then. If the Call Stack is busy processing a heavy calculation, the callback must wait in the Task Queue.
2. **Leaving orphaned timers active (Memory leak):**
   Failing to call `clearTimeout()` on active timers in single-page apps (like React components) when they are unmounted can cause actions to trigger on missing pages, crashing the UI.
3. **Passing function execution calls instead of references:**
   ```javascript
   // BUG: Runs showWarning() immediately instead of waiting for 5000ms!
   setTimeout(showWarning(), 5000); 
   // Fix: Pass the function name without parentheses
   setTimeout(showWarning, 5000);
   ```

---

## 8. Best Practices

1. **Always clean up active timers:** Clear timeouts inside component destructor hooks (e.g. React `useEffect` cleanups).
2. **Always declare loops using `let`:** Avoids variable hoisting bugs inside loops containing timeouts.
3. **Do not use long-running timeouts:** For delays over a few minutes, save timestamp markers to databases and check elapsed times dynamically instead of holding active JS threads open.

---

## 9. Interview Preparation

### Q1: What is the output of this code?
```javascript
console.log("Start");
setTimeout(() => console.log("Timer"), 0);
console.log("End");
```
**Answer:** The output is:
1. `"Start"`
2. `"End"`
3. `"Timer"`
**Reasoning:** Even though the delay is `0ms`, `setTimeout` is handled asynchronously. The callback is sent to the Task Queue. The Event Loop can only push the callback onto the Call Stack *after* all synchronous code (including `console.log("End")`) is complete.

### Q2: Why does using `var` in a `for` loop print the final loop value inside `setTimeout`?
**Answer:** Variables declared with `var` are function-scoped, not block-scoped. The loop index variable `i` is shared across all iterations. Because the asynchronous timers only run after the synchronous loop completes, they all read the final value of this shared `i` variable (which has become the loop limit value).

### Q3: What is the purpose of `clearTimeout`?
**Answer:** `clearTimeout(timerId)` is used to cancel a scheduled execution timer. It stops the Web API countdown or removes the callback from the Task Queue before it can be pushed onto the Call Stack.

---

## 10. Homework

1. **Timer Offset Analyzer:** Write a script that checks how much `setTimeout` delay diverges from the requested delay. Use high-precision timers (`performance.now()`) to log offset averages.
2. **Debounce Input Form:** Create an HTML page containing a search input box. Debounce typing events using a closure timer to prevent instant logging.
3. **Session Idle Disconnector:** Build a class `IdleTracker(disconnectCallback, idleTime)` that restarts a 5-second disconnect timer every time a user moves their mouse.
4. **Var Loop IIFE Fixer:** Take a loop using `var` that prints duplicate timer indices and fix it using a custom IIFE closure.
5. **Slideshow Controller:** Write an automated banner rotator that displays slide index indicators in order, providing clean start and stop controls.
