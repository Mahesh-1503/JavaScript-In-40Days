# 💬 Module 20: ReactJS Coding Interview Prep (Junior to Senior Level)

Welcome to Module 20! This guide contains curated ReactJS technical interview questions divided by experience levels: **Junior**, **Mid-Level**, and **Senior**. Study these questions, answers, and deep-dive points to prepare for coding interviews.

---

## 1. Junior Level Questions (0–2 Years Experience)

### Q1: What is the Virtual DOM and how does React use it?
* **Answer:** The Virtual DOM is a lightweight, in-memory representation of the real DOM. When state changes, React updates this virtual tree. Then, it compares the new virtual tree with the previous one (a process called **Diffing**). It computes the minimum set of changes and batches them to update only the modified parts in the real DOM (a process called **Reconciliation**). This prevents slow, full-page layout reflows.

### Q2: Why can't you update state directly in React?
* **Answer:** If you mutate state directly (e.g. `this.state.count = 5` or `state.count = 5`), React has no way of knowing that the value has changed. React relies on state updater functions (`setState` or `setCount`) to trigger its reconciliation pipeline and re-render the view. Directly mutating state bypasses this process, resulting in stale UI.

### Q3: What is the purpose of the `key` prop in React lists?
* **Answer:** The `key` prop acts as a stable identifier for elements in a list. During list updates (insertions, removals, re-ordering), React uses the keys to match virtual DOM elements with real DOM elements. This avoids recreating DOM nodes from scratch, improving list rendering performance.
* **Warning:** Never use `Math.random()` or array indices as keys if the list can be reordered, as it can cause rendering bugs.

---

## 2. Mid-Level Questions (2–5 Years Experience)

### Q4: Explain the difference between Context API and Redux. When would you use which?
* **Answer:**
  * **Context API:** Built-in React feature designed for sharing global data (like themes or auth states) across a component tree, avoiding prop drilling. However, it is not optimized for high-frequency updates. Any update to a Context provider forces all consumer components to re-render.
  * **Redux / Redux Toolkit:** A robust state management library featuring selectors and middlewares. It is optimized for high-frequency state updates. Components subscribe to specific slices of state, re-rendering only when that specific slice changes.
* **Selection Rule:** Use Context API for static global configs. Use Redux for complex, fast-changing business states (like shopping carts or workspace cards).

### Q5: How does the dependency array of `useEffect` control component rendering?
* **Answer:**
  * `useEffect(fn)`: Runs after **every** render.
  * `useEffect(fn, [])`: Runs **only once** on mount.
  * `useEffect(fn, [a, b])`: Runs on mount and whenever variables `a` or `b` change.
* **Internals:** React uses Object.is() to compare the current dependency array values with the previous values. If any value changes, it schedules the effect function.

---

## 3. Senior Level Questions (5+ Years Experience)

### Q6: How do you optimize React rendering performance? Explain tools like `useMemo`, `useCallback`, and `React.memo`.
* **Answer:**
  * **`React.memo`:** A higher-order component that wraps a functional component. It performs a shallow comparison of props, skipping re-renders if props are identical.
  * **`useMemo`:** Caches the return value of an expensive calculation to avoid recalculating on every render.
  * **`useCallback`:** Caches a function definition to maintain referential identity when passing callbacks as props to memoized child components.

### Q7: What are Fiber Architecture and Concurrent Mode?
* **Answer:** 
  * Before React 16, rendering was synchronous and recursive. If a massive render operation took longer than 16ms, the browser frame rate dropped, causing UI lag.
  * **React Fiber** introduced an asynchronous reconciliation engine. It splits rendering work into small units (Fibers) and processes them in loops.
  * **Concurrent Mode** allows React to pause rendering to prioritize high-priority user actions (like keystrokes), resuming lower-priority renders (like search calculations) in the background.

---

## 🧭 How to Prepare for React Live Coding Rounds

1. **Write Clean Custom Hooks:** Interviewers love hooks encapsulation. Practice extracting API calls or event listeners into standard hook structures (e.g. `useFetch`, `useWindowSize`).
2. **Master Error Boundaries:** Be ready to wrap components in custom `<ErrorBoundary>` classes to show fallback screens when child components crash:
   ```jsx
   componentDidCatch(error, errorInfo) {
     this.setState({ hasError: true });
   }
   ```
3. **Optimized Form Scenarios:** Be prepared to explain how uncontrolled components (`useRef`) solve performance bottlenecks in massive input forms.
