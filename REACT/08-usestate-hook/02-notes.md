# Advanced State Mechanics (Slack Reactions & Batching)

React handles state updates asynchronously to optimize rendering performance. To design bulletproof interfaces, professional engineers must master the internal state execution mechanics: automatic state batching, state snapshot timing, functional updates, and state updates for complex objects and arrays.

---

## 1. State Updates are Asynchronous (Snapshot Mechanics)

State behaves like a snapshot in time. When you call a state updater function, it does not mutate the variable in the current code line. It schedules a new render pass:
```javascript
const [isMuted, setIsMuted] = useState(false);

const toggleMute = () => {
  setIsMuted(!isMuted);
  console.log(isMuted); // BUG: Prints the OLD state (false), not the updated one!
};
```
Because the JavaScript function executes inside the *current* render snapshot, `isMuted` remains `false` until the function returns, React re-renders the component, and a fresh state snapshot is injected.

---

## 2. Functional State Updates (State History Dependents)

If your state depends on the previous state value, or if you call state setters multiple times inside a single handler block, you must pass a **callback function** to the state setter:
```javascript
// Correctly increments notifications count by 3 in a single event loop
const incrementByThree = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
};
```
The callback function receives the *latest pending state* from React's internal queue, ensuring calculations are accurate.

---

## 3. Automatic State Batching

To prevent layout thrashing and unnecessary render updates, React performs **Batching**:
- If you call three different state set functions inside a click handler, React will wait until the handler finishes executing before triggering a **single** re-render pass.
- In React 18+, automatic batching occurs across all handlers, promises, timeouts, and native asynchronous web APIs (like `fetch` callbacks).

---

## 4. Mutating Arrays & Objects in State

When storing arrays or nested objects in state, you must always update them **immutably** by creating new reference structures. Modifying the original references directly will fail to trigger UI updates.

### Pattern 1: Appending a New Message to a List (Array Spread)
```jsx
const [messages, setMessages] = useState(['Welcome']);

const handleAdd = (newText) => {
  // Correct: spreads existing items and appends new one in a new array reference
  setMessages(prevMessages => [...prevMessages, newText]);
};
```

### Pattern 2: Removing a Message (Array Filter)
```jsx
const [messages, setMessages] = useState([
  { id: '1', text: 'Stale alert' },
  { id: '2', text: 'Active discussion' }
]);

const handleDelete = (id) => {
  // Correct: returns a new array containing only matching elements
  setMessages(prev => prev.filter(msg => msg.id !== id));
};
```

### Pattern 3: Incrementing Emojis (Nested Object Modification)
```jsx
const [reactions, setReactions] = useState({ thumbsUp: 0, rocket: 0 });

const handleReact = (type) => {
  // Correct: shallow copies object first, then overrides reaction keys
  setReactions(prevReactions => ({
    ...prevReactions,
    [type]: prevReactions[type] + 1
  }));
};
```

---

## 5. Homework Assignments

1. **Slack Double-Tap Star Tracker:** Build a component where clicking a star icon increments a count. Use functional updates to prevent duplicate click state drops during fast typing.
2. **Dynamic Draft Text Case-Toggler:** Create a textbox. Add buttons to convert drafts to Uppercase or Lowercase dynamically, updating the input value state.
3. **Multi-Thread Workspace Configurator:** Manage a state containing user notification toggle settings: `{ email: true, desktop: false, phone: false }`. Create independent toggles that safely update nested object properties.
4. **Channel List Deletion Manager:** Render a list of 5 channels. Add a delete button to each card. Cleanly remove items from the array state, and verify key allocations.
5. **Simulate Async State Delay Tracker:** Trigger a setTimeout database callback simulation. Log the state before, during, and after updates, documenting when React executes re-renders.
