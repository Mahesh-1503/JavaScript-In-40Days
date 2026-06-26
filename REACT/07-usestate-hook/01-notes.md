# Core React State Engine (Slack Interface Toggles)

Modern user interfaces must respond dynamically to user interaction. In React, this is achieved by managing component **State** using the `useState` hook. Learn how state variables trigger interface updates, how to structure state hooks, and how to bind them to user events.

---

## 1. The whiteboard Model (State vs. Static Variables)

Imagine a **Slack Sidebar**:
- You have a notification badge showing the number of unread mentions.
- If you declare a normal local variable `let mentions = 0` and increment it inside a click function:
  ```javascript
  let mentions = 0;
  function handleAlert() {
    mentions += 1;
    console.log(mentions); // Increments in JS memory, but the webpage stays showing "0"
  }
  ```
- The browser doesn't know it needs to repaint the screen because normal variables do not notify the rendering engine when they change.
- **The Solution:** We use React **State**. When you update a state variable, React automatically catches the change, re-runs the component function, and repaints the badge on the screen with the new number.

---

## 2. Syntactic Anatomy of `useState`

The basic declaration of a React state hook:
```javascript
const [activeTab, setActiveTab] = useState('messages');
```

1. **`const`:** We use `const` because the structure of the returned array reference is constant, even though the state values inside it will change.
2. **`[activeTab, setActiveTab]` (Array Destructuring):**
   - **Getter (`activeTab`):** The variable holding the current state value for this render cycle. Use this inside your JSX layout.
   - **Setter (`setActiveTab`):** The function you call to update the state value and schedule a re-render of the component.
3. **`useState('messages')`:** The hook function. The argument `'messages'` is the **Initial State** value applied during the component's first mount.

---

## 3. Practical Slack UI Event Bindings

### Pattern 1: Mentions Notification Counter (Number State)
```jsx
import { useState } from 'react';

export function MentionsBadge() {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <div className="mentions-indicator">
      <h3>Unread Mentions: {unreadCount}</h3>
      <button onClick={() => setUnreadCount(unreadCount + 1)}>
        Simulate Incoming Mention
      </button>
      <button onClick={() => setUnreadCount(0)}>
        Mark as Read
      </button>
    </div>
  );
}
```

### Pattern 2: Search Input Filter (String State)
Controlled inputs require binding input value triggers directly to a state setter.
```jsx
import { useState } from 'react';

export function MemberSearch() {
  const [query, setQuery] = useState('');

  return (
    <div className="search-box">
      <p>Searching for: <strong>{query || 'All Members'}</strong></p>
      <input 
        type="text"
        placeholder="Search active users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Binds input typing directly to state
      />
    </div>
  );
}
```

### Pattern 3: Sidebar Collapse Toggle (Boolean Toggle State)
Toggle states are commonly used to show or hide panels in modern layouts.
```jsx
import { useState } from 'react';

export function SlackSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar-layout ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '➡️ Show Sidebar' : '⬅️ Collapse Sidebar'}
      </button>
      
      {!isCollapsed && (
        <nav className="links">
          <a># general</a>
          <a># engineering</a>
          <a># design</a>
        </nav>
      )}
    </div>
  );
}
```

---

## 4. Homework Assignments

1. **Slack Status Set Toggle:** Create a status selector component (Available 🟢, Away 🌙, Do Not Disturb 🔴). Display the selected status badge dynamically beside the user profile image.
2. **Mentions Alert Boundary:** Build a counter component. If unread mentions cross 15, change the badge color to pulsing red and disable the increment button.
3. **Draft Message Autosave Indicator:** Create a text area. As the user types, show an autosave indicator (e.g. "Typing..." -> pause -> "Draft saved").
4. **Interactive Channel Creator Input:** Build a component with a text input and a list. Typing a name and clicking "Create Channel" must append the channel name to the UI list.
5. **Sidebar Theme Toggler Layout:** Build a sidebar panel. Include light, dark, and high-contrast styling buttons that change theme variables using state properties.
