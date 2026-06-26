# Module 07: Browser Storage & State Hydration (Trello Board Persister)

Web applications must often preserve user configurations, workspace layouts, or unsaved drafts across page refreshes and browser sessions. Master the browser storage APIs (Local Storage, Session Storage, Cookies) and learn how to serialize, store, and hydrate React component state.

---

## 1. Mental Model (The Trello Board Persister)

Think of a **Trello Workspace**:
- A user creates lists ("To Do", "In Progress", "Done") and drags cards containing custom tasks between them.
- If the browser crashes, the user reloads the page, or the internet drops out temporarily, the user expects the cards to remain exactly where they left them.
- To achieve this, the application uses **State Serialization** (converting the React state tree object into a JSON string) and writes it to **Local Storage** every time a card is moved.
- When the page loads, the application runs **State Hydration** (checking the storage, parsing the JSON string back into JavaScript memory, and initializing the React state before the first paint).

---

## 2. Visual Thinking (State Serialization & Hydration Flow)

The lifecycle of state persistence and rendering restoration:

```
[ STATE PERSISTENCE (WRITE LOOP) ]
React State Tree: { todo: ['A'], done: ['B'] }
        │
        ▼ (Serialization)
  JSON.stringify(state)
        │
        ▼ (Disk write)
LocalStorage: "{'todo':['A'],'done':['B']}"

[ STATE HYDRATION (READ ON LOAD) ]
LocalStorage Read: "{'todo':['A'],'done':['B']}"
        │
        ▼ (Deserialization)
  JSON.parse(data)
        │
        ▼ (State Hydration)
useState(() => initialValue) ──► Re-renders UI with saved Trello Cards!
```

---

## 3. Beginner Explanation

- **Local Storage:** A key-value storage engine in the browser that holds data permanently (even after the computer is restarted).
- **Session Storage:** A temporary key-value storage engine in the browser that deletes its data as soon as the user closes the specific tab.
- **Serialization:** Converting an in-memory object or array into a flat string representation (e.g. `JSON.stringify(obj)`).
- **State Hydration:** Reading stored data on page startup and using it to configure the initial state of the application.

---

## 4. Deep Explanation (Blocking APIs, Quotas, & Cross-Tab Sync)

### 1. The Synchronous Blocking Trap
The Web Storage API (`localStorage.setItem` and `getItem`) is **synchronous** and blocks the browser's main execution thread. Reading or writing massive objects (multiple megabytes) will cause visible UI lag, drop animation frames, and ruin the user experience. Large datasets should be stored in asynchronous databases (like IndexedDB) or batched/throttled during storage writes.

### 2. Storage Quota Limits & Safe Failure Modes
Browsers allocate a strict storage limit (typically **5MB to 10MB** per origin). If an application attempts to write beyond this limit, the browser throws a `QuotaExceededError` DOMException, crashing the execution path. Professional code must wrap writes in `try/catch` blocks:
```javascript
try {
  localStorage.setItem('trello:board', serializedData);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    // Graceful recovery: clean up stale cache data or notify user
    console.error('Storage full! Please delete some workspaces.');
  }
}
```

### 3. Cross-Tab Event Synchronization
When a user opens the same Trello board in two separate browser tabs, changes in Tab A must reflect in Tab B. Browsers emit a `storage` event to all other tabs of the same origin whenever a storage value is modified, allowing React applications to keep state synchronized in real time.

---

## 5. Real Production Examples (Trello Persister)

### 1. Lazy State Hydration (Initializer Function)
Using React's lazy initializer function to read from storage once on mount, rather than on every render.
```jsx
import React, { useState } from 'react';

export function TrelloBoardLoader() {
  // Pass a function to useState. React only runs this function on the INITIAL mount.
  const [boardData, setBoardData] = useState(() => {
    try {
      const saved = localStorage.getItem('trello:board');
      return saved ? JSON.parse(saved) : { columns: [] };
    } catch (e) {
      console.warn("Failed to parse board data, falling back to default.", e);
      return { columns: [] };
    }
  });

  return (
    <div className="board">
      <h3>Active Columns: {boardData.columns.length}</h3>
    </div>
  );
}
```

### 2. Tab Synchronization Hook (`storage` Event Listener)
Listening to changes from other tabs to sync board updates.
```jsx
import { useEffect } from 'react';

export function useCrossTabSync(key, onSyncCallback) {
  useEffect(() => {
    const handleStorageChange = (event) => {
      // Trigger update only if the modified storage key matches our key
      if (event.key === key && event.newValue) {
        onSyncCallback(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, onSyncCallback]);
}
```

### 3. Session-Based Unsaved Draft Backup (Session Storage)
Saving a card description draft to Session Storage so it's kept on refreshes but discarded when the tab closes.
```jsx
import React, { useState, useEffect } from 'react';

export function CardDraftEditor({ cardId }) {
  const storageKey = `trello:draft:${cardId}`;
  
  const [text, setText] = useState(() => {
    return sessionStorage.getItem(storageKey) || '';
  });

  useEffect(() => {
    sessionStorage.setItem(storageKey, text);
  }, [text, storageKey]);

  return (
    <div className="draft-editor">
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => sessionStorage.removeItem(storageKey)}>Clear Draft</button>
    </div>
  );
}
```

### 4. Cookie-Based Session Token Checker
Reading cookies manually to verify authentication before loading private workspaces.
```javascript
export function getAuthTokenFromCookie() {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  const tokenCookie = cookies.find(row => row.startsWith('trello_session_token='));
  
  return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
}
```

### 5. Safe Object De-serializer Helper
Handling date strings and nested properties safely.
```javascript
export function safeDeserializeState(serializedString, fallbackState) {
  if (!serializedString) return fallbackState;
  
  try {
    const parsed = JSON.parse(serializedString);
    // Hydrate string dates back into true Date objects
    if (parsed.lastUpdated) {
      parsed.lastUpdated = new Date(parsed.lastUpdated);
    }
    return parsed;
  } catch (error) {
    console.error("Critical error hydrating state. Reverting to empty defaults.", error);
    return fallbackState;
  }
}
```

---

## 6. Progressive Coding (Trello Board Hydration)

### Level 1: Beginner (Direct Storage Calls in Render Flow)
```jsx
// BAD: Reads synchronously from storage on EVERY render pass, severely slowing down interactions.
export function BeginnerTrelloBoard() {
  const data = JSON.parse(localStorage.getItem('board_data')) || { cards: [] };
  const [cards, setCards] = useState(data.cards);

  const addCard = (newCard) => {
    const updated = [...cards, newCard];
    setCards(updated);
    localStorage.setItem('board_data', JSON.stringify({ cards: updated })); // inline write
  };

  return <button onClick={() => addCard("New Task")}>Add ({cards.length})</button>;
}
```

### Level 2: Better (Lazy Initializer & useEffect Persistent Sync)
```jsx
// BETTER: Reads from storage only once on mount. Writes to storage inside useEffect.
import React, { useState, useEffect } from 'react';

export function BetterTrelloBoard() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('trello_cards');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('trello_cards', JSON.stringify(cards));
  }, [cards]);

  return <button onClick={() => setCards([...cards, "Task"])}>Tasks: {cards.length}</button>;
}
```

### Level 3: Production (Generic reusable Custom Hook with Try/Catch protection)
```jsx
// PRODUCTION: Abstracted into a reusable custom hook with safety parsing and try/catch error handling.
import React, { useState, useEffect } from 'react';

export function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving key "${key}" to localStorage:`, error);
    }
  }, [key, state]);

  return [state, setState];
}
```

### Level 4: Enterprise (High-Performance Board Hydrator & Sync Provider)
```jsx
// ENTERPRISE: Implements tab cross-sync listeners, throttled disk writes to prevent thread block, 
// quota safety thresholds, custom parsers, and hydration integrity state flags.
import React, { useState, useEffect, useCallback, useRef } from 'react';

export function TrelloEnterpriseWorkspace({ boardId }) {
  const storageKey = `trello:board:${boardId}`;
  
  // Track load status to avoid hydration mismatch
  const [isHydrated, setIsHydrated] = useState(false);
  const [boardState, setBoardState] = useState({ lists: {}, lastModified: 0 });
  const writeThrottleRef = useRef(null);

  // 1. Initial State Hydration on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setBoardState(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Hydration process failed:", error);
    } finally {
      setIsHydrated(true); // Complete loading sequence
    }
  }, [storageKey]);

  // 2. Throttled persistent writes to disk
  const updateBoard = useCallback((updatedLists) => {
    const nextState = {
      lists: updatedLists,
      lastModified: Date.now()
    };
    
    setBoardState(nextState);

    // Throttle writing to disk to protect main thread from frame drops
    if (writeThrottleRef.current) return;
    writeThrottleRef.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextState));
      } catch (err) {
        console.error("Disk save failed:", err);
      } finally {
        writeThrottleRef.current = null;
      }
    }, 1000); // Max once per second
  }, [storageKey]);

  // 3. Cross-Tab synchronizations
  useEffect(() => {
    const handleEventSync = (e) => {
      if (e.key === storageKey && e.newValue) {
        const receivedState = JSON.parse(e.newValue);
        if (receivedState.lastModified > boardState.lastModified) {
          setBoardState(receivedState);
        }
      }
    };

    window.addEventListener('storage', handleEventSync);
    return () => window.removeEventListener('storage', handleEventSync);
  }, [storageKey, boardState.lastModified]);

  if (!isHydrated) {
    return <div className="workspace-skeleton">Hydrating workspace from disk...</div>;
  }

  return (
    <div className="workspace-view">
      <h2>Workspace ID: {boardId}</h2>
      <p>Last Autosaved: {new Date(boardState.lastModified).toLocaleTimeString()}</p>
      {/* Active board columns grid */}
    </div>
  );
}
```

---

## 7. Common Mistakes

1. **Attempting to save raw objects directly:**
   ```jsx
   // BUG: LocalStorage only stores strings! This results in key="data", value="[object Object]".
   localStorage.setItem("data", { name: "Trello" });
   
   // Fix: Convert to string first
   localStorage.setItem("data", JSON.stringify({ name: "Trello" }));
   ```
2. **Synchronous reads in high-frequency rendering loops:**
   Putting `localStorage.getItem()` directly inside the component body. This forces the browser to query the disk on *every single render pass*, degrading UI performance. Always wrap reads inside a lazy state initializer function.
3. **No error boundaries for JSON parser failures:**
   If local storage becomes corrupted, `JSON.parse` will throw a crash error, breaking the entire React component mount sequence. Always use `try/catch` checks.

---

## 8. Best Practices

1. **Namespace Storage Keys:** Prefix storage keys with your app name (e.g. `trello:settings` instead of just `settings`) to prevent conflicts with other applications running on the same domain.
2. **Avoid Storing Sensitive Data:** Never store authentication tokens, private passwords, or credit card numbers in Local Storage. It is highly susceptible to Cross-Site Scripting (XSS) extraction attacks.
3. **Use Lazy Initializers:** Write `useState(() => getStoredData())` instead of `useState(getStoredData())` so the storage retrieval runs exactly once.

---

## 9. Interview Preparation

### Q1: What is state hydration, and what is a hydration mismatch in React?
**Answer:** State hydration is the process of setting a component's initial state using data loaded from an external source (like LocalStorage) on mount. A **hydration mismatch** occurs when using Server-Side Rendering (SSR). The server compiles HTML assuming default initial values, but when the browser loads, the client loads stored values and tries to render a different UI structure, causing React to throw error warnings about layout mismatches.

### Q2: Why is storing JWTs or sensitive authentication tokens in LocalStorage considered a security risk?
**Answer:** LocalStorage is accessible by any JavaScript code running on the same origin. If your page is infected by a Cross-Site Scripting (XSS) attack (e.g., through a malicious third-party script, library dependency, or user-injected comment), the attacker can execute `localStorage.getItem()` and steal your authentication keys. The secure alternative is storing session credentials in an `HttpOnly` cookie, which is inaccessible to JavaScript.

### Q3: How do Local Storage, Session Storage, and Cookies differ?
**Answer:**
- **Local Storage:** Stores up to 5-10MB. Persistent until cleared manually. Not sent to the server. Scoped to origin.
- **Session Storage:** Stores up to 5MB. Cleared automatically when the specific browser tab closes. Scoped to the individual tab session.
- **Cookies:** Store up to 4KB. Persistent until manual expiration date. Automatically sent to the server on every HTTP request. Used for server-side session management.

---

## 10. Homework

1. **Build a Trello Column Persister:** Write a component displaying 3 columns. Store card IDs in Local Storage. Verify cards stay in columns on reload.
2. **Implement cross-tab board syncing:** Setup a listener hook that updates the current column lists automatically if cards are rearranged in a different browser tab.
3. **Create Session Draft Autosave:** Build a text editor for a card description. Store drafts in Session Storage. Verify input clears if tab is closed but remains on refresh.
4. **Build a Storage Quota Boundary Test:** Write a script that writes dummy items to Local Storage inside a loop until a `QuotaExceededError` is thrown. Safely catch the exception and display storage warning elements.
5. **Autosave Throttle Middleware:** Implement a custom persistence hook that throttles saving updates to local disk so that writes are restricted to once every 1,500ms maximum.
