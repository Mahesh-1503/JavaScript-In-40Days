# Module 01: Introduction to ReactJS (Notion Workspace UI)

React is a declarative, component-based library for building user interfaces. To build scalable React apps, we must understand the core architecture: declarative programming, the Virtual DOM, and the React 19 Fiber reconciliation reconciliation process.

---

## 1. Mental Model (The Notion Workspace UI)

Think of a document app like **Notion**:
1. **Component-Based UI:** The page is not one giant block of code. It is assembled from independent components: a `Sidebar` containing a list of pages, a `Topbar` with breadcrumbs, and an `EditorBody` containing multiple paragraph nodes.
2. **Declarative State Synchronization:** When you rename a page title in the `EditorBody`, the sidebar link must update immediately. In standard JavaScript, you'd write instructions to manually locate the sidebar element and overwrite its text. In React, you simply change the page title **State** (the source of truth), and React automatically updates every component rendering that state.
3. **Reconciliation (Diffing):** If you edit one line of text, the browser shouldn't reload the entire sidebar, topbar, and page layout. React compares the edited layout with the previous layout and only modifies the single text node in the browser.

---

## 2. Visual Thinking (Virtual DOM Reconciliation Tree)

How React diffs changes in memory before committing pixels to the browser:

```
PREVIOUS STATE (Virtual DOM Tree)        NEW STATE (Virtual DOM Tree)
         [Workspace]                              [Workspace]
         ┌────┴────┐                              ┌────┴────┐
     [Sidebar]  [Editor]                      [Sidebar]  [Editor]
                   │                                        │
               [Paragraph]                              [Paragraph]
               ("Hello")                                ("Hello Node")  ◄── [DIFF DETECTED]
                   
                                     │
                                     ▼ (Reconciliation Phase)
                         
                         [ACTUAL BROWSER DOM UPDATE]
                     Only the single modified Paragraph node
                     is updated in the browser.
```

---

## 3. Beginner Explanation

- **React:** A JavaScript library developed by Facebook for building user interfaces.
- **Component:** A reusable block of code that acts as a UI template (e.g. a Button, Sidebar, or Input box).
- **Virtual DOM:** A lightweight copy of the webpage kept in memory. React edits this copy first because writing to the browser's DOM is slow.
- **Declarative Programming:** Describing *what* you want the page to look like based on the current data (state), instead of writing step-by-step instructions (*how*) to modify elements manually.

---

## 3.5. Syntax & Basic Code Mechanics

Before exploring Notion workspaces, let's understand why React syntax is so powerful by comparing the absolute simplest app—a **Click Counter**—in both standard Vanilla JS and React.

### 1. Vanilla JavaScript (Imperative: Step-by-Step Instructions)
In Vanilla JS, you must write step-by-step instructions telling the browser *how* to find elements and *how* to update them.
```html
<!-- HTML Structure -->
<div>
  <p>Total Clicks: <span id="count-display">0</span></p>
  <button id="click-btn">Click Me</button>
</div>

<!-- JavaScript Logic -->
<script>
  let clicks = 0;
  
  // 1. Manually query the document to find the DOM nodes
  const display = document.getElementById('count-display');
  const button = document.getElementById('click-btn');

  // 2. Bind event listeners
  button.addEventListener('click', () => {
    clicks += 1;
    // 3. Manually modify the text content on the webpage
    display.textContent = clicks;
  });
</script>
```

### 2. React (Declarative: Data-Driven Layout)
In React, you define the data (**State**) and layout (**JSX**). When the data changes, React handles the updates automatically.
```jsx
import React, { useState } from 'react';

export function ClickCounter() {
  // 1. Define the state data: starting value is 0
  const [clicks, setClicks] = useState(0);

  // 2. Describe what the UI should look like based on the current data
  return (
    <div>
      <p>Total Clicks: {clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>
        Click Me
      </button>
    </div>
  );
}
```

### Line-by-Line Breakdown for Beginners

1. **`import React, { useState } from 'react';`**
   - We import `React` and the `useState` hook from the React package. Hooks let us inject states into our functional components.
2. **`export function ClickCounter() { ... }`**
   - We declare a function. React components must be named starting with a capital letter.
3. **`const [clicks, setClicks] = useState(0);`**
   - We initialize our clicks count to `0`. `clicks` holds the number, and `setClicks` is the function we call to change it.
4. **`return ( ... );`**
   - The component returns **JSX** (which looks like HTML code mixed with JS).
5. **`<p>Total Clicks: {clicks}</p>`**
   - The curly braces `{clicks}` are a portal to evaluate JavaScript. React inserts the current value of the `clicks` variable here.
6. **`onClick={() => setClicks(clicks + 1)}`**
   - We bind the click handler directly to the button. When clicked, we call `setClicks(clicks + 1)`. 
   - React detects that `clicks` state has changed, runs the function again, and repaints only the modified text node in the browser DOM. No manual queries (`getElementById`) are needed!

---

## 4. Deep Explanation (React Internals & Fiber)

### 1. The Virtual DOM Diffing Algorithm
When a component's state changes:
1. React runs the component functions to create a new Virtual DOM tree.
2. It executes a **Diffing Algorithm** to compare the new tree with the previous snapshot.
3. It maps out the minimum number of changes needed to sync the browser DOM.

### 2. React 19 Fiber Reconciliation Engine
React uses **Fiber**, a rewrite of its reconciliation algorithm:
- Legacy React reconciled the DOM tree recursively in a single blocking pass, which could cause lag in heavy pages.
- **Fiber** breaks reconciliation into incremental work units. It can pause, resume, or discard rendering work based on priority (e.g., prioritizing user typing events over background data loads).
- In React 19, this is integrated with concurrent features, enabling smooth UI updates during high-compute cycles.

---

## 5. Real Production Examples (Notion Workspace)

### 1. Document Title State Controller (Declarative Sync)
When the user edits the title input, the page title changes automatically.
```jsx
import React, { useState } from 'react';

// Declarative Page Template
export function NotionPageHeader() {
  const [title, setTitle] = useState("Untamed Ideas");

  return (
    <div className="header-container">
      {/* Title automatically syncs between document and input */}
      <h1>Document: {title}</h1>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
    </div>
  );
}
```

### 2. Sidebar Navigation Lists (Component Composition)
Splitting elements into independent components.
```jsx
function SidebarLink({ title, icon }) {
  return (
    <li className="sidebar-link">
      <span>{icon}</span> {title}
    </li>
  );
}

export function NotionSidebar() {
  return (
    <aside className="sidebar">
      <h2>My Workspace</h2>
      <ul>
        <SidebarLink title="Q3 Goals" icon="🎯" />
        <SidebarLink title="Meeting Notes" icon="📝" />
        <SidebarLink title="Personal Vault" icon="🔑" />
      </ul>
    </aside>
  );
}
```

### 3. Editor Blocks Generator (Dynamic Lists)
```jsx
export function EditorBlocks({ blocks }) {
  return (
    <div className="editor-blocks">
      {blocks.map((block) => (
        <div key={block.id} className={`block-${block.type}`}>
          {block.content}
        </div>
      ))}
    </div>
  );
}
```

### 4. Dynamic Theme Switcher Component
```jsx
export function ThemeToggler({ darkTheme, onToggle }) {
  return (
    <button 
      onClick={onToggle} 
      style={{
        background: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
      }}
    >
      Toggle Workspace Theme
    </button>
  );
}
```

### 5. Document Lock Indicator (Conditional Rendering)
```jsx
export function DocumentLockStatus({ isLocked }) {
  return (
    <div className="lock-status-badge">
      {isLocked ? (
        <span>🔒 Read-Only Mode</span>
      ) : (
        <span>✏️ Editable</span>
      )}
    </div>
  );
}
```

---

## 6. Progressive Coding (Workspace Renderer)

### Level 1: Beginner (Imperative JavaScript DOM Manipulation)
```javascript
// BAD: Difficult to track mutations, requires manual selectors, prone to XSS
function updateWorkspaceTitle(newTitle) {
  const titleHeader = document.querySelector("#title-header");
  const inputField = document.querySelector("#title-input");
  
  titleHeader.textContent = newTitle;
  inputField.value = newTitle; // Manually syncing two DOM elements
}
```

### Level 2: Better (Declarative Component Render)
```jsx
// BETTER: Describe layout in React, separating state values from DOM query methods
import React from 'react';

function Header({ title }) {
  return <h1 id="title-header">{title}</h1>;
}
```

### Level 3: Production (Stateful Declarative Binding)
```jsx
// PRODUCTION: Integrated state hooks managing bidirectional data sync automatically
import React, { useState } from 'react';

export function Workspace() {
  const [title, setTitle] = useState("Dashboard");

  return (
    <div>
      <h1 id="title-header">{title}</h1>
      <input 
        id="title-input" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
    </div>
  );
}
```

### Level 4: Enterprise (State-Driven Component Middleware Container)
```jsx
// ENTERPRISE: A fully sandboxed workspace model that manages document history snapshots, 
// validates content, and triggers audit changes without touching DOM references directly.
import React, { useState, useTransition } from 'react';

export function NotionEnterpriseWorkspace({ initialDoc }) {
  const [documentState, setDocumentState] = useState(initialDoc);
  const [history, setHistory] = useState([initialDoc]);
  const [isPending, startTransition] = useTransition(); // React 19 Concurrent API

  const handleUpdate = (updatedText) => {
    // Concurrent update transition (non-blocking)
    startTransition(() => {
      const updatedDoc = {
        ...documentState,
        content: updatedText,
        lastModified: Date.now()
      };
      
      setDocumentState(updatedDoc);
      setHistory(prev => [...prev, updatedDoc]); // Append to history stack
    });
  };

  return (
    <div className="enterprise-workspace">
      <h2>Document: {documentState.title}</h2>
      <textarea 
        value={documentState.content} 
        onChange={(e) => handleUpdate(e.target.value)} 
      />
      {isPending && <div className="loader">Autosaving to cloud...</div>}
      
      <div className="history-count">
        Versions Logged: {history.length}
      </div>
    </div>
  );
}
```

---

## 7. Common Mistakes

1. **Manipulating the browser DOM directly:**
   Calling `document.getElementById().innerText = "val"` bypasses React's virtual DOM, causing the UI state to get out of sync.
2. **Mutating state objects directly:**
   ```jsx
   // BUG: React uses object reference checks to trigger re-renders.
   // Mutating state directly won't trigger updates!
   const [user, setUser] = useState({ name: "Alice" });
   user.name = "Bob"; 
   setUser(user); 
   // Fix: setUser({ ...user, name: "Bob" });
   ```
3. **Omitting the `key` prop in maps:**
   Failing to provide a unique `key` to items in lists prevents React from identifying which items changed, causing layout bugs and performance issues during diffing.

---

## 8. Best Practices

1. **Keep State Immutable:** Always create new objects/arrays when updating state.
2. **Decompose components:** Keep components small, reusable, and single-purpose.
3. **Prefer Declarative Styles:** Describe UI states based on data, and avoid direct DOM queries.

---

## 9. Interview Preparation

### Q1: What is the Virtual DOM, and how does it work?
**Answer:** The Virtual DOM is a lightweight copy of the browser DOM kept in memory by React. When a component's state changes, React updates the Virtual DOM tree first. It then runs a diffing algorithm (Reconciliation) to compare this new tree with the previous one. Finally, it commits only the changed nodes to the actual browser DOM, preventing expensive full-page layouts.

### Q2: What is the difference between Declarative and Imperative programming?
**Answer:**
- **Imperative Programming** involves writing step-by-step instructions describing *how* to achieve a result (e.g. creating elements, setting classes, and appending them to the DOM manually).
- **Declarative Programming** involves describing *what* the final UI should look like based on the current data (state). React manages the rendering steps automatically.

### Q3: What is React Fiber?
**Answer:** React Fiber is the internal reconciliation engine introduced to support incremental rendering. It allows React to split rendering work into smaller chunks and pause, resume, or prioritize updates (like prioritizing user keystrokes over low-priority background loads), keeping applications responsive under high loads.

---

## 10. Homework

1. **Workspace Sidebar:** Build a React component hierarchy (Sidebar, BoardList, BoardItem) displaying a list of workspaces dynamically.
2. **State Sync Input:** Write a text input component where typing synchronously updates three different layout badges in different locations of the page.
3. **Immutability Sandbox:** Create a component with an array of objects. Write functions to add, delete, and edit elements while strictly maintaining immutability.
4. **DOM Mutation Audit:** Write a short experiment comparing the performance of rendering a list of 1,000 items in React vs manually creating and inserting elements in vanilla JavaScript.
5. **Conditional Status Badges:** Build a component that renders document status tags (Draft, Review, Approved) using different colors based on state parameters.
