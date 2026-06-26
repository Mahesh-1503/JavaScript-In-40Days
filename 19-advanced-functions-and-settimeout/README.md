# Day 19: setTimeout, setInterval & Advanced Closures (Zoom Disconnect & Connection Heartbeat)

JavaScript is single-threaded, meaning it can only do one thing at a time. To handle timed tasks (like auto-disconnects, warnings, and delays) without freezing the web page, the engine relies on the browser's **Web APIs** and the **Event Loop**.

---

## 1. Mental Model (The Zoom Auto-Disconnect & Heartbeat)

Think of a free **Zoom Meeting Room**:
1. **The 40-Minute Limit (Timeout):** Free meetings auto-terminate after 40 minutes. We schedule a one-off action to terminate the room using `setTimeout`.
2. **The Connection Heartbeat (Interval):** While the meeting is live, the client app must send a telemetry ping (heartbeat) to the server every 10 seconds to verify the network is active. We schedule this recurring task using `setInterval`.
3. **The Disconnect Scheduler:** When the room starts, the client registers:
   - A one-time timeout: Terminates the session after 40 minutes.
   - A recurring interval: Dispatches telemetry updates every 10 seconds.
4. **The Canceled Meeting (Cleanup):** If the host leaves early, the engine must cancel the timeout (`clearTimeout`) and terminate the recurring telemetry pings (`clearInterval`) to prevent memory leaks and zombie network requests.

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

- **`setTimeout(callback, delay)`:** Schedules a one-time execution of the `callback` function after the specified `delay` (in milliseconds).
- **`clearTimeout(timeoutId)`:** Cancels a scheduled timeout before it has run.
- **`setInterval(callback, interval)`:** Schedules the `callback` function to run repeatedly, with a fixed time delay of `interval` milliseconds between each execution.
- **`clearInterval(intervalId)`:** Cancels a recurring interval timer.
- **Asynchronous Execution:** JavaScript does not block execution threads waiting for timers to tick. It registers them with the browser's Web APIs container and continues executing synchronous code immediately.

---

## 4. Deep Explanation (The Event Loop & Loop Closures)

### 1. The Async Timer Lifecycle
When you call `setTimeout(callback, 1000)` or `setInterval(callback, 1000)`:
1. The call is pushed to the **Call Stack**.
2. The JS engine delegates the timer countdown to the browser's **Web APIs** container and pops the timer reference off the stack.
3. The browser background thread manages the countdown (for `setInterval`, it registers a repeating countdown scheduler).
4. Upon expiration, the callback is queued in the **Task Queue** (Macrotask Queue).
5. The **Event Loop** pushes it to the Call Stack once the stack is completely empty.

### 2. The setInterval Queue Pile-Up Hazard
If a callback inside `setInterval(asyncTask, 1000)` takes longer than 1000ms to execute (for example, a heavy network request taking 2500ms), the callbacks will stack up in the Task Queue. When the execution thread finally clears, these queued callbacks will fire sequentially with no delay between them, causing UI stuttering and thread block.
*   **The Solution:** Use **Recursive Timeouts** to build a self-scheduling loop. This guarantees the next countdown only begins *after* the current callback execution finishes:
    ```javascript
    function customInterval(callback, interval) {
      function run() {
        callback();
        setTimeout(run, interval); // Schedules next execution only after completion!
      }
      setTimeout(run, interval);
    }
    ```

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

### 1. Zoom Disconnect Warnings & Heartbeats (Timeouts & Intervals)
```javascript
const warningDelay = 35 * 60 * 1000;
const disconnectDelay = 40 * 60 * 1000;

// 1. One-time warning warning
const warningTimer = setTimeout(() => {
  console.log("Warning: Your meeting ends in 5 minutes!");
}, warningDelay);

// 2. One-time disconnect action
const disconnectTimer = setTimeout(() => {
  console.log("Meeting terminated.");
  clearInterval(heartbeatInterval); // Terminate pings upon disconnect
}, disconnectDelay);

// 3. Recurring Heartbeat Ping (Every 10 seconds)
const heartbeatInterval = setInterval(() => {
  console.log(`[Heartbeat] User is online at ${new Date().toLocaleTimeString()}`);
}, 10000);
```

### 2. Meeting Ended Early (Clearing Timeouts & Intervals)
```javascript
function terminateMeetingEarly() {
  console.log("Host ended meeting. Clearing all active timers...");
  
  // Cancel the scheduled warning and disconnect timeouts
  clearTimeout(warningTimer);
  clearTimeout(disconnectTimer);

  // Cancel the recurring heartbeat ping
  clearInterval(heartbeatInterval);
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
// disconnect, recurring heartbeat pings, and cleanup tasks with safe cancellation hooks.
class ZoomSessionController {
  #timers = new Map(); // Private timer references

  constructor(roomId, limitMinutes) {
    this.roomId = roomId;
    this.limitMs = limitMinutes * 60 * 1000;
  }

  startSession() {
    console.log(`Session started in Room [${this.roomId}]`);

    // 1. Schedule One-time Warning (5 minutes before end)
    const warningTime = Math.max(0, this.limitMs - (5 * 60 * 1000));
    const warnTimer = setTimeout(() => {
      console.warn(`[ROOM-${this.roomId}] Warning: 5 minutes remaining!`);
    }, warningTime);
    this.#timers.set("warning", warnTimer);

    // 2. Schedule One-time Disconnect
    const disconnectTimer = setTimeout(() => {
      this.#disconnect();
    }, this.limitMs);
    this.#timers.set("disconnect", disconnectTimer);

    // 3. Schedule Recurring Connection Heartbeat (Every 10 seconds)
    const heartbeatTimer = setInterval(() => {
      console.log(`[ROOM-${this.roomId} TELEMETRY] Heartbeat sent to server.`);
    }, 10000);
    this.#timers.set("heartbeat", heartbeatTimer);
  }

  #disconnect() {
    console.log(`[ROOM-${this.roomId}] Auto-disconnected: Limit reached.`);
    this.cleanup();
  }

  cleanup() {
    console.log(`[ROOM-${this.roomId}] Cleaning all active timers and heartbeats...`);
    
    // Clear timeouts
    if (this.#timers.has("warning")) clearTimeout(this.#timers.get("warning"));
    if (this.#timers.has("disconnect")) clearTimeout(this.#timers.get("disconnect"));

    // Clear intervals
    if (this.#timers.has("heartbeat")) clearInterval(this.#timers.get("heartbeat"));

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
   `setTimeout` and `setInterval` guarantee that callbacks will not run *before* the delay, but they do not guarantee execution at the *exact* millisecond. If the Event Loop stack is busy, callbacks wait.
2. **Allowing setInterval overlap loops:**
   If a task takes longer than the interval time, callbacks stack up. Use recursive timeouts to ensure tasks never run concurrently.
3. **Leaving orphaned timers and intervals active (Memory leaks):**
   Failing to call `clearTimeout()` or `clearInterval()` in single-page apps (or React component cleanups) causes zombie calls that trigger on unmounted components, causing memory leaks and browser lag.
4. **Passing function execution calls instead of references:**
   ```javascript
   // BUG: Runs showWarning() immediately instead of waiting for 5000ms!
   setTimeout(showWarning(), 5000); 
   // Fix: Pass the function name without parentheses
   setTimeout(showWarning, 5000);
   ```

---

## 8. Best Practices

1. **Always clean up active timers:** Clear timeouts and intervals inside component destructor hooks (e.g. React `useEffect` cleanups or custom page tear-downs).
2. **Always declare loops using `let`:** Avoids variable hoisting bugs inside loops containing timeouts.
3. **Prefer recursive timeouts over setInterval:** For complex async tasks, recursive `setTimeout` ensures you wait for the current call to finish before scheduling the next one, preventing overlapping call pile-ups.
4. **Do not use long-running timers:** For delays over a few minutes, save timestamp markers to databases and check elapsed times dynamically instead of holding active JS threads open.

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

### Q3: What is the purpose of `clearTimeout` and `clearInterval`?
**Answer:** `clearTimeout(id)` and `clearInterval(id)` cancel scheduled async actions. They stop the browser's background Web API timer threads and prevent their callbacks from queuing in the Event Loop Task Queue.

### Q4: How do you build a custom `setInterval` using recursive `setTimeout`?
**Answer:**
```javascript
function customSetInterval(callback, delay) {
  let timerId;
  function run() {
    callback();
    timerId = setTimeout(run, delay);
  }
  timerId = setTimeout(run, delay);
  return {
    clear: () => clearTimeout(timerId)
  };
}
```

---

## 10. Homework

1. **Timer Offset Analyzer:** Write a script that checks how much `setTimeout` delay diverges from the requested delay. Use high-precision timers (`performance.now()`) to log offset averages.
2. **Debounce Input Form:** Create an HTML page containing a search input box. Debounce typing events using a closure timer to prevent instant logging.
3. **Session Idle Disconnector:** Build a class `IdleTracker(disconnectCallback, idleTime)` that restarts a 5-second disconnect timer every time a user moves their mouse.
4. **Var Loop IIFE Fixer:** Take a loop using `var` that prints duplicate timer indices and fix it using a custom IIFE closure.
5. **Slideshow Controller:** Write an automated banner rotator that displays slide index indicators in order, providing clean start and stop controls.
6. **Recursive Interval Builder:** Implement the custom interval function using recursive timeouts shown in Q4. Test its behavior by running a task that takes 1.5 seconds, set the delay to 1 second, and verify that executions do not stack up.
