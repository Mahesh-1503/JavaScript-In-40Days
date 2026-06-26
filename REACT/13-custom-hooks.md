# Module 13: Stateful Logic Reuse (Robinhood Live Stock Ticker & useWindowSize)

React components manage state and trigger side effects locally. However, when multiple components need to reuse the *same stateful logic* (such as listening to live WebSocket price feeds, tracking network connectivity, or monitoring responsive window dimensions), copying and pasting code creates duplication. Master **Custom Hooks** to extract, encapsulate, and share stateful logic cleanly across your application.

---

## 1. Mental Model (The Robinhood Stock price Feed)

Think of a **Robinhood Trading Platform**:
- Several distinct widgets across the dashboard need to know the live price of a stock (e.g. Tesla - TSLA):
  1. The `HeaderTicker` (displays a scrolling strip of active stock prices)
  2. The `OrderExecutionForm` (needs the exact price to calculate purchase totals)
  3. The `PriceAlertNotification` (triggers alerts if prices cross thresholds)
- Copying and pasting the WebSocket connection logic, state variables, and cleanup functions into all three components would result in massive, duplicate, bug-prone code.
- **The Solution:** A **Custom Hook** (like `useStockPrice('TSLA')`).
- A Custom Hook acts like a **shared data subscription service**. You package the socket connection and state logic into a separate function. Any component can "subscribe" by calling the hook in a single line. The hook manages the connection, handles state updates, and returns the live price to the component.

> [!IMPORTANT]  
> Custom hooks share **stateful logic**, not the state itself. If two components call the same custom hook, they each get their own isolated, independent instance of the state.

---

## 2. Visual Thinking (Stateful Logic Extraction)

How custom hooks isolate and distribute reusable state logic to different components:

```
[ MONOLITHIC COMPONENT ] (Coupled logic and layout)
┌────────────────────────────────────────────────────────┐
│ StockDisplay                                           │
│ ├─ State: const [price, setPrice] = useState(0);       │
│ ├─ Effect: WebSocket connect, listen, parse, set state │
│ └─ Layout: Render price card wrapper                   │
└────────────────────────────────────────────────────────┘

              │
              ▼ (Logic Extraction)
              
[ REUSABLE CUSTOM HOOK ] (Encapsulated Socket Logic)
┌────────────────────────────────────────────────────────┐
│ useStockPrice(ticker)                                  │
│ ├─ State: const [price, setPrice] = useState(0);       │
│ └─ Effect: WebSocket connect & cleanup                 │
│ └─ Returns: { price, isUp }                            │
└────────────────────────────────────────────────────────┘
    │                                                │
    ▼ (Injected)                                     ▼ (Injected)
┌───────────────────────────┐                    ┌───────────────────────────┐
│ HeaderTicker              │                    │ OrderExecutionForm        │
│ └─ useStockPrice('TSLA')  │                    │ └─ useStockPrice('TSLA')  │
└───────────────────────────┘                    └───────────────────────────┘
```

---

## 3. Beginner Explanation

- **Custom Hook:** A JavaScript function whose name starts with `use` and that can call other React hooks (like `useState`, `useEffect`, and `useRef`).
- **Logic Encapsulation:** Extracting complex states and side effects out of component layout files and putting them in reusable hook functions.
- **Rules of Hooks:** Core constraints enforced by React—hooks can only be called at the top level of a component function (never inside loops, conditions, or nested functions), and only from React function components or custom hooks.

---

## 3.5. Syntax & Basic Code Mechanics

Before extracting complex real-time WebSocket feeds, let's look at the absolute simplest, bare-minimum Custom Hook you can write: a custom hook that toggles a boolean state, called **`useToggle`**.

### The Custom Hook Code
```jsx
// useToggle.js
import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue(prev => !prev);
  };

  // Return the state variable and the updater function in an array
  return [value, toggle];
}
```

### The Component Code (Using the Hook)
```jsx
// LightBox.jsx
import React from 'react';
import { useToggle } from './useToggle';

export function LightBox() {
  // We use our custom hook just like standard useState!
  const [isLit, toggleLit] = useToggle(true);

  return (
    <div style={{ padding: '20px' }}>
      <p>The lamp is: {isLit ? "ON 💡" : "OFF 🌑"}</p>
      <button onClick={toggleLit}>
        Toggle Switch
      </button>
    </div>
  );
}
```

### Line-by-Line Breakdown for Beginners

1. **`export function useToggle(initialValue = false) {`**
   - We declare a function starting with **`use`**. This tells React that it is a Custom Hook, and it can call other hooks inside it.
   - We accept an optional parameter `initialValue` (defaulting to `false`).
2. **`const [value, setValue] = useState(initialValue);`**
   - We call React's built-in `useState` hook inside our custom hook. This sets up the local state storage.
3. **`const toggle = () => { setValue(prev => !prev); };`**
   - We create a helper function `toggle` that updates the boolean state to the opposite of its current value.
4. **`return [value, toggle];`**
   - We return an array containing the current state value and the function to toggle it.
5. **`const [isLit, toggleLit] = useToggle(true);`**
   - Inside `LightBox`, we call our hook.
   - React initializes a completely private and isolated state node for this component. If you place *two* `<LightBox />` components on the screen, they will operate independently because their states are completely isolated.

---

## 4. Deep Explanation (Hook Execution & Isolation)

### 1. The "State is Local" Rule
It is a common misconception that custom hooks share actual state values between components. They do not. When a component compiles and runs:
- React registers the hook's internal `useState` and `useEffect` calls directly to **that component's unique Fiber node** in the memory tree.
- Calling `useStockPrice()` in two different components executes the initialization code twice, allocating two completely separate state nodes in the memory heap.

### 2. The `use` Prefix Contract
Custom hooks **must** be prefixed with `use` (e.g. `useWindowSize`, `useAuth`). This is not a stylistic choice; it is a strict contract. The React compiler and lint tools inspect this prefix to apply hook safety checks, ensuring no component calls a hook conditionally or loops through hooks.

---

## 5. Real Production Examples (Robinhood Hooks)

### 1. Live WebSocket Stock Ticker Hook (`useStockPrice`)
Encapsulating socket feeds, state updates, and hardware cleanups.
```jsx
// useStockPrice.js
import { useState, useEffect } from 'react';

export function useStockPrice(ticker) {
  const [price, setPrice] = useState(0);
  const [changeDirection, setChangeDirection] = useState('flat'); // 'up' | 'down' | 'flat'

  useEffect(() => {
    const ws = new WebSocket(`wss://api.robinhood-clone.com/live/${ticker}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(prev => {
        if (data.price > prev) setChangeDirection('up');
        if (data.price < prev) setChangeDirection('down');
        return data.price;
      });
    };

    return () => ws.close(); // Clean up socket connection on unmount/ticker change
  }, [ticker]);

  return { price, changeDirection };
}
```

### 2. Responsive UI Window Grid Hook (`useWindowSize`)
Providing live window width data to adapt layouts dynamically (like switching between desktop layouts and mobile navigation menus).
```jsx
// useWindowSize.js
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
```

### 3. Local Storage Stateful Sync Hook (`useLocalStorage`)
Creating a persistent state hook that writes back to local browser storage automatically.
```jsx
// useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

### 4. Controlled API Fetch Debouncer Hook (`useDebounce`)
Delaying high-frequency actions (like network searches) until the user pauses typing.
```jsx
// useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Clears pending timeout if input changes again fast
    };
  }, [value, delay]);

  return debouncedValue;
}
```

---

## 6. Progressive Coding (Stock Ticker Logic)

### Level 1: Beginner (Monolithic Implementation - Duplicate Code)
```jsx
// BAD: Socket logic is coupled with visual layout. 
// Cannot reuse this logic in another component without copy-pasting the entire file.
export function MonolithicTicker() {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("wss://api.com/stocks/TSLA");
    ws.onmessage = (e) => setPrice(JSON.parse(e.data).price);
    return () => ws.close();
  }, []);

  return <div className="ticker-badge">TSLA: ${price}</div>;
}
```

### Level 2: Better (Isolated Hook - Raw Extraction)
```jsx
// BETTER: Logic extracted into custom hook function. 
// However, does not handle loading/error boundaries or custom tickers.
import { useState, useEffect } from 'react';

function useTslaPrice() {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("wss://api.com/stocks/TSLA");
    ws.onmessage = (e) => setPrice(JSON.parse(e.data).price);
    return () => ws.close();
  }, []);

  return price;
}

export function App() {
  const price = useTslaPrice();
  return <div>TSLA: ${price}</div>;
}
```

### Level 3: Production (Flexible Custom Hook with Parameterization)
```jsx
// PRODUCTION: Custom hook accepts parameters, manages loading/error states, and returns structured data.
import { useState, useEffect } from 'react';

export function useStockTicker(ticker) {
  const [data, setData] = useState({ price: 0, loading: true, error: null });

  useEffect(() => {
    setData(prev => ({ ...prev, loading: true }));
    const ws = new WebSocket(`wss://api.com/stocks/${ticker}`);

    ws.onmessage = (e) => {
      setData({ price: JSON.parse(e.data).price, loading: false, error: null });
    };
    ws.onerror = (err) => {
      setData({ price: 0, loading: false, error: 'Connection Failed' });
    };

    return () => ws.close();
  }, [ticker]);

  return data;
}
```

### Level 4: Enterprise (High-Aesthetic Real-time Trading Card Container)
```jsx
// ENTERPRISE: Sandbox-ready, custom layout dimensions monitoring, live charts, 
// caching connection handlers, and automatic recovery protocols.
import React from 'react';
import PropTypes from 'prop-types';
import { useStockPrice } from './useStockPrice';
import { useWindowSize } from './useWindowSize';

export function EnterpriseTradingCard({ ticker }) {
  const { price, changeDirection } = useStockPrice(ticker);
  const { width } = useWindowSize(); // Dynamic responsive design hook

  // Adapt display grid layout based on screen width dynamically
  const isCompact = width < 480;

  const cardColorClass = 
    changeDirection === 'up' ? 'text-green' : 
    changeDirection === 'down' ? 'text-red' : '';

  return (
    <article className={`trading-card ${isCompact ? 'compact' : 'full'}`}>
      <div className="card-header">
        <h3>{ticker}</h3>
        {!isCompact && <span className="market-badge">NASDAQ</span>}
      </div>

      <div className={`price-container ${cardColorClass}`}>
        <span className="price">
          ${price > 0 ? price.toFixed(2) : '---.--'}
        </span>
        <span className="direction-icon">
          {changeDirection === 'up' ? '▲' : changeDirection === 'down' ? '▼' : '■'}
        </span>
      </div>

      <div className="action-row">
        <button className="trade-btn buy-btn">Buy</button>
        {!isCompact && <button className="trade-btn sell-btn">Sell</button>}
      </div>
    </article>
  );
}

EnterpriseTradingCard.propTypes = {
  ticker: PropTypes.string.isRequired
};
```

---

## 7. Common Mistakes

1. **Calling Custom Hooks Conditionally:**
   ```jsx
   // BUG: Violates the Rules of Hooks! React relies on the call order of hooks remaining 
   // identical on every single render to map state correctly.
   if (isLoggedIn) {
     const data = useStockPrice('AAPL'); // WRONG!
   }
   ```
2. **Expecting State Variables to Sync Globally Across Separate Calls:**
   ```jsx
   // BUG: Component A and Component B get two completely independent state snapshots.
   // Changing local state in Hook A will NOT automatically update Hook B's state variables.
   const dataA = useStockPrice('TSLA'); // Instance 1
   const dataB = useStockPrice('TSLA'); // Instance 2 (Isolated)
   ```
3. **Omitting Dependencies Inside the Custom Hook's Internal Hooks:**
   Forgetting to list ticker parameter dependencies in the custom hook's internal `useEffect` will prevent the connection from switching if the user selects a new stock symbol.

---

## 8. Best Practices

1. **Keep Custom Hooks Single-Purpose:** A hook should manage one clear feature (e.g. `useWindowSize` or `useStockPrice`), not bundle both layout detection and API connections together.
2. **Document Return Signatures:** Clearly structure hook return variables. Returning an object (e.g. `{ price, isUp, error }`) is often better than an array (e.g. `[price, setPrice]`) as it is easier to destructure.
3. **Add Fallback Defaults:** Always return meaningful initial states so that components do not crash during loading phases.

---

## 9. Interview Preparation

### Q1: What makes a custom hook different from a helper function?
**Answer:** A standard helper function is a stateless calculation tool (like formatting dates or filtering arrays). A **custom hook** is a stateful logic utility. It has access to React's state and rendering lifecycle APIs (like `useState`, `useEffect`, and `useContext`), allowing it to schedule re-renders, clean up event listeners, and manage local database caches.

### Q2: If two components call the same custom hook, do they share the same state?
**Answer:** **No, they do not.** Custom hooks share *stateful logic*, not the state data itself. Every time a component calls a custom hook, React runs the hook's internal setup (such as `useState` and `useEffect`) as if it was written directly in that component, allocating a completely isolated block of state variables in memory.

### Q3: What is the benefit of the custom hook pattern in React development?
**Answer:** The custom hook pattern allows developers to follow the DRY (Don't Repeat Yourself) principle. It separates business logic (e.g., connecting to real-time streams or tracking local storage variables) from styling and layout concerns. This makes components smaller, easier to read, and highly testable, while enabling sharing of complex states.

---

## 10. Homework

1. **Live Stock Watchlist Grid:** Build a dashboard. Create a custom hook `useStockPrice` and use it to render a grid tracking TSLA, AAPL, and MSFT stock cards dynamically.
2. **Media Query Responsive Breakpoints Hook:** Build a custom hook `useMediaQuery(query)` that returns a boolean indicating if the document width matches a query list (e.g. `max-width: 600px`).
3. **Form Auto-validator Custom Hook:** Implement a custom hook `useForm(initialValues, validations)` that handles input change events, tracks values, and outputs validation error indicators.
4. **Window Focus Tracker Hook:** Construct a custom hook `useWindowFocus` that listens to window `focus` and `blur` events, returning a boolean indicating if the tab is active.
5. **WebSocket Telemetry Connection Custom Hook:** Create a hook `useSocket(url)` that manages socket lifecycles, parses incoming JSON telemetry data, and implements safety timeouts.
