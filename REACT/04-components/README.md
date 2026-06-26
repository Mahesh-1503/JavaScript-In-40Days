# Module 04: React Component Architecture (WhatsApp Chat List)

React applications are built by composing isolated, reusable building blocks called **Components**. Modern software engineering relies on decomposing complex user interfaces into clean, maintainable, and independent component hierarchies.

---

## 1. Mental Model (The WhatsApp Chat List)

Think of the **WhatsApp Chat screen**:
- You don't build this screen as a single, massive 1,500-line block of HTML and CSS. If you did, fixing a bug in the search input would risk breaking the message history or the profile picture layout.
- Instead, you decompose the screen into a tree of smaller components:
  1. `ChatHeader` (displays user avatar, name, and action menus)
  2. `SearchBar` (captures search inputs to filter threads)
  3. `ChatList` (loops through conversations and prints multiple list entries)
  4. `ChatItem` (shows individual profiles, last message text, timestamp, and unread badges)
  5. `MessageInput` (contains text fields, emojis picker, and send buttons)

Each component works like a Lego block. It has its own layout, handles its own styling, can be tested in isolation, and is combined to form a premium chat interface.

---

## 2. Visual Thinking (WhatsApp UI Component Tree)

Decomposing a complex chat screen into a nested component tree:

```
┌────────────────────────────────────────────────────────┐
│ [ChatHeader] Avatar   User Name            [Actions]   │
├────────────────────────────────────────────────────────┤
│ [SearchBar]  🔍 Search or start a new chat             │
├────────────────────────────────────────────────────────┤
│ [ChatList]                                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [ChatItem] (Avatar) Alice   - Hey!         [12:30]│  │
│  ├──────────────────────────────────────────────────┤  │
│  │ [ChatItem] (Avatar) Bob     - Call me back [10:15]│  │
│  ├──────────────────────────────────────────────────┤  │
│  │ [ChatItem] (Avatar) Project - [DOC] v2.pdf   [9:00]│  │
│  └──────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│ [MessageInput] 📎 [Type message here...]          🎤   │
└────────────────────────────────────────────────────────┘

                     [ WhatsAppScreen ] (Root)
                       ┌──────┴──────┐
             [SidebarContainer]    [ChatContainer]
               ┌──────┴──────┐           ├─────────────┐
         [ChatHeader]  [ChatList]  [ChatHeader]  [MessageInput]
                             │
                        [ChatItem]
```

---

## 3. Beginner Explanation

- **Component:** A reusable JavaScript function that returns JSX, describing a section of the user interface.
- **UI Decomposition:** The process of breaking down a large design mockup into small, modular React components.
- **Root Component:** The main parent component (usually `App.jsx` or `main.jsx`) that wraps all other components in the application.
- **Composition:** The practice of building complex structures by nesting components inside other components (e.g. rendering a `<ChatItem />` inside a `<ChatList />`).

---

## 4. Deep Explanation (React Components & The Render Engine)

### 1. Functional Components under the Hood
Modern React uses **Functional Components**. They are plain JavaScript functions that accept inputs (called Props) and return a Virtual DOM representation (JSX):
```javascript
// A simple functional component
export function ChatBadge({ count }) {
  return count > 0 ? <span className="badge">{count}</span> : null;
}
```
When React executes your application, it calls these functions recursively to resolve the entire Virtual DOM tree.

### 2. Component Lifecycle Phases
Every React component undergoes three distinct lifecycle phases:
1. **Mounting:** The component is created, evaluated, and inserted into the browser DOM for the first time.
2. **Updating:** The component re-evaluates when its state or incoming props change, updating the browser DOM where diffs are found.
3. **Unmounting:** The component is removed from the DOM (e.g. switching chats or closing a sidebar).

### 3. Purity in React Components
React expects components to be **pure functions**:
- They must always return the same JSX given the same inputs (props).
- They must **never** modify external variables or fetch global data directly in the render path. Side effects (e.g., API calls, editing local storage) must be safely isolated inside hooks (like `useEffect`).

---

## 5. Real Production Examples (WhatsApp Components)

### 1. Chat Header Component
```jsx
// ChatHeader.jsx
export function ChatHeader({ avatarUrl, title, statusText, onBackClick }) {
  return (
    <header className="chat-header">
      <button onClick={onBackClick} aria-label="Go back">
        <span className="back-arrow">←</span>
      </button>
      <img src={avatarUrl} alt={`${title} avatar`} className="header-avatar" />
      <div className="header-info">
        <h3>{title}</h3>
        <p className="status">{statusText}</p>
      </div>
    </header>
  );
}
```

### 2. Individual Chat Item Card
```jsx
// ChatItem.jsx
export function ChatItem({ chat, isActive, onSelect }) {
  return (
    <div 
      className={`chat-item ${isActive ? 'active' : ''}`} 
      onClick={() => onSelect(chat.id)}
    >
      <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
      <div className="chat-body">
        <div className="chat-row">
          <span className="chat-name">{chat.name}</span>
          <span className="chat-time">{chat.timestamp}</span>
        </div>
        <div className="chat-row">
          <p className="chat-preview">{chat.lastMessage}</p>
          {chat.unreadCount > 0 && (
            <span className="chat-badge">{chat.unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 3. Chat Input Panel
```jsx
// ChatInput.jsx
export function ChatInput({ onSendMessage, isTyping, onInputChange }) {
  return (
    <div className="chat-input-panel">
      <button className="icon-btn" aria-label="Add attachment">📎</button>
      <input 
        type="text" 
        placeholder="Type a message" 
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
      />
      {isTyping ? (
        <button className="send-btn" onClick={onSendMessage}>🚀</button>
      ) : (
        <button className="mic-btn" aria-label="Voice note">🎤</button>
      )}
    </div>
  );
}
```

### 4. Search Filter Input
```jsx
// SearchBar.jsx
export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <span className="search-icon">🔍</span>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search or start new chat"
        className="search-input"
      />
    </div>
  );
}
```

### 5. Chat List Container Component
```jsx
// ChatList.jsx
import { ChatItem } from './ChatItem';

export function ChatList({ chats, activeChatId, onChatSelect }) {
  if (chats.length === 0) {
    return <div className="no-chats">No conversations found.</div>;
  }

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatItem 
          key={chat.id} 
          chat={chat} 
          isActive={chat.id === activeChatId} 
          onSelect={onChatSelect}
        />
      ))}
    </div>
  );
}
```

---

## 6. Progressive Coding (Monolith to Architecture)

### Level 1: Beginner (The Monolithic Mess - Single Component)
```jsx
// BAD: Massive file size, hard to maintain, zero reusability, difficult to test.
export function MonolithicChatScreen() {
  return (
    <div className="chat-container">
      <div className="header">
        <img src="/avatar.jpg" alt="Avatar" />
        <h2>Alice</h2>
      </div>
      <div className="list">
        <div className="item">
          <p>Alice: Hey there!</p>
        </div>
        <div className="item">
          <p>Me: Hi!</p>
        </div>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Type..." />
        <button>Send</button>
      </div>
    </div>
  );
}
```

### Level 2: Better (Inline Helpers - Split Inside the Same File)
```jsx
// BETTER: Split into functions, but they remain coupled inside the same file.
function HeaderSection() {
  return <div className="header"><h2>Alice</h2></div>;
}

function InputSection() {
  return <div className="input-box"><input type="text" /><button>Send</button></div>;
}

export function SplitChatScreen() {
  return (
    <div className="chat-container">
      <HeaderSection />
      <div className="list">...</div>
      <InputSection />
    </div>
  );
}
```

### Level 3: Production (Proper File Separation and Props Structure)
```jsx
// PRODUCTION: Files are fully modular, importing components as independent blocks.
// File: src/components/ChatScreen.jsx
import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatList } from './ChatList';
import { ChatInput } from './ChatInput';

export function ChatScreen({ chatData }) {
  const [activeChat, setActiveChat] = useState(chatData[0].id);

  return (
    <div className="chat-screen-layout">
      <div className="sidebar">
        <ChatList 
          chats={chatData} 
          activeChatId={activeChat} 
          onChatSelect={setActiveChat} 
        />
      </div>
      <div className="main-chat">
        <ChatHeader title="Alice" statusText="Online" />
        <div className="messages-body">{/* Message log */}</div>
        <ChatInput />
      </div>
    </div>
  );
}
```

### Level 4: Enterprise (Scalable Chat Frame Container with Fallbacks)
```jsx
// ENTERPRISE: Sandbox-ready, handles error boundaries, empty loading skeletons, 
// accessibility features, and isolated functional contexts.
import React, { useState, Suspense } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatList } from './ChatList';
import { SearchBar } from './SearchBar';

// Lazy loading component to improve bundle chunk loads
const ChatArea = React.lazy(() => import('./ChatArea'));

export function WhatsAppEnterpriseLayout({ initialChats }) {
  const [chats, setChats] = useState(initialChats);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChatId, setSelectedChatId] = useState(null);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <div className="whatsapp-app-container" role="main">
      <nav className="whatsapp-sidebar" aria-label="Chat threads">
        <ChatHeader 
          avatarUrl="/my-profile.jpg" 
          title="My Profile" 
          statusText="Available" 
        />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ChatList 
          chats={filteredChats} 
          activeChatId={selectedChatId} 
          onChatSelect={setSelectedChatId} 
        />
      </nav>
      
      <main className="whatsapp-chat-pane" aria-label="Conversation space">
        {selectedChat ? (
          <Suspense fallback={<div className="skeleton-loader">Loading messages...</div>}>
            <ChatArea chat={selectedChat} />
          </Suspense>
        ) : (
          <div className="chat-placeholder">
            <div className="placeholder-icon">💬</div>
            <h2>WhatsApp Web Clone</h2>
            <p>Select a contact from the sidebar to begin messaging securely.</p>
          </div>
        )}
      </main>
    </div>
  );
}
```

---

## 7. Common Mistakes

1. **Defining a component inside another component:**
   ```jsx
   // BUG: Defining Child inside Parent re-allocates the component function memory 
   // on EVERY single render, destroying Child's state and killing performance.
   function Parent() {
     function Child() { return <p>I am nested</p>; } // WRONG!
     return <Child />;
   }
   ```
2. **Naming components with lowercase letters:**
   React compiles `<chatItem />` as a plain HTML tag rather than calling your component function. Always use PascalCase: `<ChatItem />`.
3. **Modifying incoming props directly:**
   Props are strictly read-only. Modifying them causes unexpected state inconsistencies.
   `props.chat.name = "New Name"` ❌ -> Always use state setters in parent components instead.

---

## 8. Best Practices

1. **One Component per File:** Keep code focused. Put each component in a dedicated file (e.g. `ChatHeader.jsx`).
2. **Follow the Rule of Single Responsibility:** If a component does multiple things (e.g. lists chats, processes payments, and updates profiles), split it into separate, focused components.
3. **Use Descriptive Alt Text:** Ensure custom images on avatars have meaningful alt tags to pass accessibility audits.

---

## 9. Interview Preparation

### Q1: Why should we never define a React component inside another component?
**Answer:** When you define a component `B` inside component `A`, a new reference for component `B` is created on every single render of `A`. React's diffing engine treats this as a brand-new component type. As a result, it completely destroys (unmounts) the old DOM elements of `B` and mounts new ones, causing the UI to flicker, losing input focus, and destroying the internal state of component `B`.

### Q2: What is the difference between Component Composition and Inheritance in React?
**Answer:**
- **Inheritance** is a design pattern where class structures extend other parent classes to inherit functionalities (like OOP).
- **Composition** is React's preferred pattern. Components are combined by nesting them or passing them as child elements (`props.children`). Composition is more flexible because components can be configured dynamically without binding them to a rigid class structure.

### Q3: What is a Pure Component in React, and why is purity important?
**Answer:** A pure component is a component that returns the exact same JSX output for the same props and state. Purity is important because it allows React to optimize rendering. If a component is pure and its props/state have not changed, React can skip rendering the component and its children entirely, preventing unnecessary CPU and memory usage.

---

## 10. Homework

1. **WhatsApp Header Decomposition:** Build a `ChatHeader` component that renders a profile avatar, contact name, online status indicator, and dynamic action buttons.
2. **Chat Item List Builder:** Build a `ChatList` that maps through a mocked array of 5 chat profiles, and passes the selection click event back to the parent.
3. **Filterable Search Box:** Construct a search component. Ensure typing values updates the parent filters to narrow down contacts lists dynamically.
4. **Virtual Conversation Feed Mock:** Design a component container showing a list of chat bubbles. Render dynamic classes on text bubbles based on sender (`sent` vs `received`).
5. **Component Hierarchy Audit Report:** Take a monolithic component block from a legacy tutorial, decompose it into 4 separate files, and write a text explanation of your architecture.
