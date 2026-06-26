# 🔄 Module 10: React Component Lifecycle (Live Connection Monitor)

Welcome to Module 10! In this module, we will learn how components mount, update, and unmount. We will study **Component Lifecycles**—comparing legacy class lifecycle methods to modern functional hooks—inside a real-world **Live Web Socket Connection Monitor** context.

---

## 1. Mental Model: Lifecycle Phases

Every React component goes through three main phases:
1. **Mounting (Birth):** The component is created, initialized, and inserted into the browser's DOM for the first time.
2. **Updating (Growth):** The component re-renders when its props or state change, updating the visible DOM.
3. **Unmounting (Death):** The component is removed from the DOM, and its resources are cleaned up.

Think of a component like a **smart light bulb**:
* **Mounting:** You screw it in, plug it in, and establish a Wi-Fi connection.
* **Updating:** You adjust the brightness or change the color setting.
* **Unmounting:** You unscrew the bulb and terminate the active Wi-Fi connection so the router isn't left hanging.

---

## 2. Visual Thinking: Class Lifecycle vs. Functional hooks

```text
=================== CLASS COMPONENT LIFECYCLE FLOW ===================

  [Mounting Phase]      ──► constructor() ──► render() ──► componentDidMount()
                                                               │
  [Updating Phase]      ──► render() ────────────────────► componentDidUpdate()
                                                               │
  [Unmounting Phase]    ─────────────────────────────────► componentWillUnmount()


=================== FUNCTIONAL LIFECYCLE FLOW (HOOKS) ===================

  [Mounting Phase]      ──► Run Component Function (Render) ──► useEffect(..., [])
                                                                     │
  [Updating Phase]      ──► Run Component Function (Render) ──► useEffect(..., [dep])
                                                                     │
  [Unmounting Phase]    ──────────────────────────────────────► Run cleanup function
                                                                (returned from useEffect)
```

---

## 3. Beginner Explanation: Lifecycle Hooks

In functional components, we handle lifecycles using the **`useEffect`** hook. The dependency array control determines which phase gets triggered:

* **Mounting (Empty Dependency Array `[]`):**
  This runs *only once* after the initial render. Ideal for setting up API queries or Web Socket connections:
  ```jsx
  useEffect(() => {
    console.log("Component has mounted!");
  }, []);
  ```
* **Updating (With Dependency Array `[variable]`):**
  Runs on mount AND whenever the specified dependency variables change:
  ```jsx
  useEffect(() => {
    console.log("Count updated to:", count);
  }, [count]);
  ```
* **Unmounting (Cleanup Return Function):**
  Return a function from your `useEffect`. React calls this function when the component is unmounting to let you clean up resources (timers, listeners):
  ```jsx
  useEffect(() => {
    return () => {
      console.log("Component is unmounting! Cleaning up...");
    };
  }, []);
  ```

---

## 4. Deep Explanation: Render Phase vs. Commit Phase

React divides rendering into two distinct phases:
1. **Render Phase:** React evaluates the component (runs the function, evaluates JSX) and compares it with the Virtual DOM to calculate changes. This phase is pure and has no side effects. It can be paused, aborted, or restarted by React.
2. **Commit Phase:** React applies the calculated changes directly to the browser DOM.
* **Why this matters for `useEffect`:** Lifecycles like `componentDidMount` and hooks like `useEffect` execute asynchronously *after* the DOM has been updated and painted in the Commit Phase. This ensures side-effects do not block browser rendering.

---

## 5. Real Production Example: Web Socket Connection Monitor

Here is a live connection manager that sets up a Web Socket subscription on mount, updates subscription channels when props change, and disconnects on unmount to prevent resource leaks.

```jsx
import React, { useState, useEffect } from "react";

export function ConnectionMonitor({ channelId }) {
  const [status, setStatus] = useState("disconnected");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // 1. Mount / Update: Setup socket listener
    console.log(`[Socket] Establishing connection to channel: ${channelId}`);
    setStatus("connecting");

    const mockSocket = {
      send: (msg) => console.log(`[Socket] Sent: ${msg}`),
      close: () => console.log(`[Socket] Closed connection to channel: ${channelId}`)
    };

    const timer = setTimeout(() => {
      setStatus("connected");
      setLogs((prev) => [...prev, `Connected to channel ${channelId}`]);
    }, 1000);

    // 2. Unmount / Cleanup: Return function runs before re-running effect OR on unmount
    return () => {
      console.log(`[Cleanup] Closing Web Socket listener...`);
      clearTimeout(timer);
      mockSocket.close();
      setStatus("disconnected");
    };
  }, [channelId]); // Re-runs whenever channelId changes!

  return (
    <div className="monitor-card">
      <h3>Channel ID: {channelId}</h3>
      <p>Status: <span className={status}>{status}</span></p>
      <ul>
        {logs.map((log, index) => <li key={index}>{log}</li>)}
      </ul>
    </div>
  );
}
```

---

## 6. Progressive Coding: Class vs. Functional Lifecycle

Let's compare the code implementations:

### Class Component (Legacy)
```jsx
import React, { Component } from "react";

export class TimerClass extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prev) => ({ count: prev.count + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer); // Crucial cleanup
  }

  render() {
    return <h1>Seconds: {this.state.count}</h1>;
  }
}
```

### Functional Component with Hook (Modern)
```jsx
import React, { useState, useEffect } from "react";

export function TimerFunc() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up returned function
  }, []);

  return <h1>Seconds: {count}</h1>;
}
```

---

## 7. Common Mistakes & Pitfalls

* **Mistake: Forgetting the Cleanup Return Function:**
  If you start `setInterval` or `addEventListener` on mount but fail to return a cleanup function, the listener continues to run in the background, consuming memory and causing state updates on unmounted components (throwing warnings).
* **Mistake: Missing Variables in Dependency Arrays:**
  If you reference a state or prop inside `useEffect` but omit it from the dependency array, the effect will capture a stale closure reference and read outdated values.

---

## 8. Best Practices

1. **Keep Effects Single-Purposed:** Do not pack unrelated API calls and event listeners into a single `useEffect`. Write multiple, isolated `useEffect` hooks for separate concerns.
2. **Always Clear Subscriptions & Timers:** Ensure every listener, interval, and socket has a corresponding cleanup step in the return block.

---

## 9. Interview Prep: FAANG & Top-Tier Questions

### Question 1: How does the functional `useEffect` hook map to class component lifecycles?
**Answer:**
* **`componentDidMount`:** Equivalent to `useEffect(fn, [])` (runs once on mount).
* **`componentDidUpdate`:** Equivalent to `useEffect(fn, [deps])` (runs on mount and whenever deps update).
* **`componentWillUnmount`:** Equivalent to the cleanup function returned from `useEffect` (e.g. `return () => { cleanup }`).

---

## 10. Homework (Job-Ready Assignments)

### Assignment: Build a Workspace Logger Timer
Create an app that tracks active screen time. Start a timer interval on mount. Whenever a user changes their active workspace (a prop value), reset the timer. Clean up all running intervals when the component unmounts.
