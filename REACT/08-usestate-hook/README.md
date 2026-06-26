# Module 08: React State Management & Lists (Slack Interactive Messaging)

React components are dynamic engines that change their user interface based on user interactions. This interactive behavior is powered by **State**—a component's local memory. Master the core React state engine (the `useState` hook), state updater batching, list rendering, and state immutability.

---

## 1. Mental Model (The Slack Interactive Chat Room)

Think of a **Slack Channel**:
- **The State:** The active screen holds a list of chat messages, an active input text draft, and emoji reaction counters on each message.
- **The Interaction:** When you type into the textbox, the UI displays your draft. When you click "Send", the new message is added to the log. When you click the 🎯 reaction badge, the count increments by one.
- **The Engine:** In vanilla JavaScript, you would have to write multiple DOM queries to select the textbox, create new list tags, and target specific numbers in the badge. In React, you simply change the **State** variables (e.g. `messages`, `inputText`, `reactions`). React detects this change and instantly updates the message list, clears the input box, and increments the badge number.

---

## 2. Visual Thinking (React State Lifecycle & Batching)

How React schedules and batch-processes state mutations before re-rendering components:

```
[ USER INTERACTION ] (User clicks Send or adds a emoji reaction)
         │
         ▼
[ STATE UPDATER CALLED ] ──(setMessages(prev => [...prev, newMsg]))
         │
         ▼
[ STATE BATCHING ENGINE ] (React 18+ bundles updates in the current event call)
         │
         ▼ (React runs the component function again)
[ RE-RENDER TRIGGERED ]
         │
         ▼ (Diffing Virtual DOM trees)
[ RECONCILIATION ] 
         │
         ▼ (Commit Phase)
[ BROWSER DOM UPDATE ] ──► Real-time Slack layout updates!
```

---

## 3. Beginner Explanation

- **State:** A special JavaScript object or variable managed inside a component. Unlike standard variables, changing state triggers React to re-render the component.
- **`useState` Hook:** The built-in React function used to create state variables and their updater functions (e.g., `const [count, setCount] = useState(0)`).
- **Asynchronous State Updates:** React does not update state variables immediately. State setters schedule updates to occur in the next render cycle.
- **Batching:** An optimization feature where React aggregates multiple state updates into a single re-render to avoid layout thrashing.

---

## 4. Deep Explanation (The State Engine & Functional Updates)

### 1. State is a Snapshot
When a component renders, React calls the component function and passes it a snapshot of the state values for *that specific render cycle*. The state variables are immutable constants within a single render:
```javascript
const [score, setScore] = useState(0);

const handleClick = () => {
  setScore(score + 1);
  console.log(score); // PRINTS 0, NOT 1!
};
```
The setter function triggers a *new* render cycle. In the next cycle, the component function runs again, and `score` is evaluated as `1`.

### 2. Functional State Updates
If you trigger multiple state updates sequentially, or if you need to calculate the next state strictly based on the previous state, you must pass a **callback function** to the setter. This callback receives the pending, up-to-date state:
```javascript
// Correctly increments score by 3 in a single event handler call
setScore(prevScore => prevScore + 1);
setScore(prevScore => prevScore + 1);
setScore(prevScore => prevScore + 1);
```

### 3. State Batching (React 18+)
In React 18 and newer, all state updates—regardless of whether they originate inside click handlers, timeouts, promises, or native browser events—are **batched** automatically. This prevents intermediate re-renders from executing, improving performance.

### 4. Array & Object Immutability in State
React checks if it needs to re-render by performing a strict reference comparison (`===`) on states. If you mutate an object or array directly:
```javascript
// BUG: React will NOT trigger a re-render!
const [messages, setMessages] = useState([]);
messages.push(newMsg); 
setMessages(messages); 
```
Because the reference to the `messages` array in memory did not change, React assumes no changes occurred. You must always create a *new* array or object (using spread operators or filters):
```javascript
setMessages([...messages, newMsg]); // CORRECT: Creates a new array reference
```

---

## 5. Real Production Examples (Slack Components)

### 1. Controlled Typing Input (Controlled Component)
Binding an input's value directly to React state so the app has full control of what is typed.
```jsx
// MessageInput.jsx
import React, { useState } from 'react';

export function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText(''); // Reset input field state
  };

  return (
    <form onSubmit={handleSubmit} className="input-bar">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Send message to #general"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

### 2. Add New Message (Immutability Array Append)
```jsx
// Channel.jsx
import React, { useState } from 'react';
import { MessageInput } from './MessageInput';

export function Channel() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the workspace!", timestamp: "12:00 PM" }
  ]);

  const handleSendMessage = (newText) => {
    const newMsg = {
      id: Date.now(), // Unique ID key
      text: newText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // SAFE: Appends new message while preserving immutable principles
    setMessages(prevMessages => [...prevMessages, newMsg]);
  };

  return (
    <div className="channel-feed">
      {messages.map(msg => (
        <div key={msg.id} className="message-bubble">
          <span className="time">{msg.timestamp}</span>
          <p>{msg.text}</p>
        </div>
      ))}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
```

### 3. Reaction Count Incrementor (Updating Objects in Arrays)
Updating properties of a specific object within a state array.
```jsx
// MessageFeed.jsx
import React, { useState } from 'react';

export function MessageFeed() {
  const [messages, setMessages] = useState([
    { id: 101, text: "Has anyone reviewed the Q3 specs?", reactions: { "🚀": 0 } }
  ]);

  const handleAddReaction = (messageId, emoji) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id !== messageId) return msg;
        
        // Return a brand new object to trigger change detection
        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [emoji]: (msg.reactions[emoji] || 0) + 1
          }
        };
      })
    );
  };

  return (
    <div className="feed">
      {messages.map(msg => (
        <div key={msg.id} className="message">
          <p>{msg.text}</p>
          <button onClick={() => handleAddReaction(msg.id, "🚀")}>
            🚀 {msg.reactions["🚀"] || 0}
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 4. Interactive Channel Toggle (Primitive Toggle State)
```jsx
// ChannelSelector.jsx
import React, { useState } from 'react';

export function ChannelSelector({ activeChannel, onSelectChannel }) {
  const channels = ['general', 'engineering', 'announcements', 'random'];

  return (
    <div className="channels-list">
      {channels.map(name => {
        const isActive = name === activeChannel;
        return (
          <button 
            key={name}
            className={`channel-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectChannel(name)}
          >
            # {name}
          </button>
        );
      })}
    </div>
  );
}
```

### 5. Multi-Step Form Batch Update Loader
Resetting multiple independent state parameters cleanly.
```jsx
import React, { useState } from 'react';

export function ResetWorkspaceConfig() {
  const [workspaceName, setWorkspaceName] = useState('MyOrg');
  const [allowGuestInvite, setAllowGuestInvite] = useState(true);
  const [maxMembers, setMaxMembers] = useState(100);

  const handleResetDefaults = () => {
    // React 18 batches these 3 updates together, causing exactly 1 render cycle
    setWorkspaceName('Default Workspace');
    setAllowGuestInvite(false);
    setMaxMembers(10);
  };

  return (
    <div className="config-box">
      <h4>{workspaceName} Configuration</h4>
      <button onClick={handleResetDefaults}>Reset All Admin Settings</button>
    </div>
  );
}
```

---

## 6. Progressive Coding (Slack Feed Implementation)

### Level 1: Beginner (Direct State Mutation - Buggy)
```jsx
// BAD: Mutates message array directly, keys mapped to array indexes (causes ghost states on delete)
export function BeginnerSlackFeed() {
  const [messages, setMessages] = useState(["Welcome"]);

  const onAddMessage = (text) => {
    messages.push(text); // WRONG: Direct array mutation
    setMessages(messages); // BUG: Reference is identical, UI won't update!
  };

  return (
    <div>
      {messages.map((m, idx) => <p key={idx}>{m}</p>)}
      <button onClick={() => onAddMessage("Hello")}>Send</button>
    </div>
  );
}
```

### Level 2: Better (Immutable State and Primitive Keying)
```jsx
// BETTER: Spread operator creates new array reference, elements use string value as keys
export function BetterSlackFeed() {
  const [messages, setMessages] = useState(["Welcome"]);

  const onAddMessage = (text) => {
    setMessages([...messages, text]); // CORRECT: Spreads to create a new array
  };

  return (
    <div>
      {messages.map((m) => <p key={m}>{m}</p>)}
      <button onClick={() => onAddMessage("Hello")}>Send</button>
    </div>
  );
}
```

### Level 3: Production (State Updaters & Database ID Keying)
```jsx
// PRODUCTION: Uses functional state updates, stable uuid keys, and clean modular props
import React, { useState } from 'react';

export function ProductionSlackFeed() {
  const [messages, setMessages] = useState([
    { id: 'msg-1', text: 'Production Feed Ready.', reactionsCount: 0 }
  ]);

  const addMessage = (newText) => {
    setMessages(prev => [
      ...prev,
      { id: `msg-${Date.now()}`, text: newText, reactionsCount: 0 }
    ]);
  };

  const likeMessage = (id) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, reactionsCount: msg.reactionsCount + 1 } : msg
    ));
  };

  return (
    <div className="feed">
      {messages.map(msg => (
        <div key={msg.id} className="msg-row">
          <span>{msg.text}</span>
          <button onClick={() => likeMessage(msg.id)}>👍 {msg.reactionsCount}</button>
        </div>
      ))}
      <button onClick={() => addMessage("Test message")}>Add Message</button>
    </div>
  );
}
```

### Level 4: Enterprise (High-Aesthetic Slack Channel Controller Container)
```jsx
// ENTERPRISE: Implements typing indicator timers, character validation limits, message delete, 
// list filtering, custom emoji picker state maps, and full keyboard-accessible controls.
import React, { useState, useTransition } from 'react';
import PropTypes from 'prop-types';

export function SlackEnterpriseChannel({ channelName, initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();

  const CHAR_LIMIT = 500;

  const handleInputChange = (value) => {
    if (value.length > CHAR_LIMIT) return; // Enforce character limits
    setInputText(value);
    setIsTyping(value.trim().length > 0);
  };

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `msg-${crypto.randomUUID()}`,
      sender: "Current User",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: {}
    };

    startTransition(() => {
      setMessages(prev => [...prev, newMsg]);
      setInputText('');
      setIsTyping(false);
    });
  };

  const handleDeleteMessage = (id) => {
    // Safe deletion: returns a filtered array containing all messages EXCEPT target ID
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const handleIncrementReaction = (msgId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id !== msgId) return msg;
      return {
        ...msg,
        reactions: {
          ...msg.reactions,
          [emoji]: (msg.reactions[emoji] || 0) + 1
        }
      };
    }));
  };

  return (
    <section className="slack-channel-container" aria-label={`Conversation feed for #${channelName}`}>
      <header className="channel-header">
        <h3># {channelName}</h3>
        <span className="members-indicator">🟢 {messages.length + 3} users active</span>
      </header>

      <div className="message-scroller" role="log">
        {messages.map(msg => (
          <article className="slack-message-bubble" key={msg.id}>
            <div className="msg-meta">
              <span className="sender-name">{msg.sender}</span>
              <span className="msg-time">{msg.timestamp}</span>
            </div>
            
            <p className="msg-body-text">{msg.text}</p>
            
            <div className="msg-interactions-row">
              <button 
                className="reaction-btn" 
                onClick={() => handleIncrementReaction(msg.id, '🎯')}
                aria-label="Add reaction"
              >
                🎯 {msg.reactions['🎯'] || 0}
              </button>
              
              <button 
                className="delete-msg-btn"
                onClick={() => handleDeleteMessage(msg.id)}
                aria-label="Delete message"
              >
                🗑️
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer className="channel-input-area">
        <form onSubmit={handleAddMessage}>
          <textarea 
            value={inputText}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Message #${channelName}`}
            rows={2}
          />
          <div className="input-toolbar">
            <span className={`char-counter ${inputText.length > CHAR_LIMIT - 50 ? 'warning' : ''}`}>
              {inputText.length}/{CHAR_LIMIT}
            </span>
            <button 
              type="submit" 
              className="send-message-btn"
              disabled={!inputText.trim() || isPending}
            >
              {isPending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
        {isTyping && <div className="typing-notifier">Someone is typing...</div>}
      </footer>
    </section>
  );
}

SlackEnterpriseChannel.propTypes = {
  channelName: PropTypes.string.isRequired,
  initialMessages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      reactions: PropTypes.object
    })
  ).isRequired
};
