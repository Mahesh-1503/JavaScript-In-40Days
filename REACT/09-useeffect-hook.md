# Module 09: React Side Effects & Lifecycle (Zoom Video Stream Client)

React components are pure layout generators: they take props and state and project them into the Virtual DOM. However, real-world applications must interact with systems outside of React—such as WebSockets, camera/microphone hardware, native window listeners, and APIs. These external operations are called **Side Effects** and are managed using the `useEffect` hook.

---

## 1. Mental Model (The Zoom Video Stream Manager)

Think of entering a **Zoom Meeting Room**:
- **Entering the Room (Mounting):** As soon as you join, the application turns on your camera, requests access to your microphone, and establishes a WebSocket connection to the media server.
- **Staying in the Room (Updating):** If you toggle your mute button, or if the screen layout adjusts because someone else starts sharing, the connection updates its settings.
- **Leaving the Room (Unmounting/Cleanup):** When you click "Leave Meeting", the application must release your camera hardware, turn off the microphone light, and close the WebSocket connection.

If you forget to close the camera or microphone connections when leaving, the hardware stays active in the background, draining the user's battery and raising privacy concerns. In React, the `useEffect` hook manages this entire lifecycle, ensuring external hardware and connections are initialized on mount, updated on dependency changes, and safely cleaned up on unmount.

---

## 2. Visual Thinking (The Side Effect Lifecycle)

The execution loop of a side effect and its cleanup phase:

```
                  Component Renders
                          │
                          ▼
                   Browser Paints DOM
                          │
                          ▼
                 Execute useEffect()
                          │
      ┌───────────────────┴───────────────────┐
      │                                       │ (State or Prop changes)
      ▼                                       ▼
  Wait for                              Dependency Changes
  Unmount                                     │
      │                                       ▼
      │                                 Run Cleanup Function ──► Re-run useEffect()
      │                                       │
      ▼                                       ▼
Component Unmounts                      Apply updates to Zoom Sockets
      │
      ▼
Run Cleanup Function (Release Camera, close WebSocket)
```

---

## 3. Beginner Explanation

- **Side Effect:** Any code that interacts with the browser or system outside of the React component's rendering loop (e.g. timers, DOM manipulations, API calls, WebSockets).
- **`useEffect` Hook:** React's built-in function to handle side effects. It takes a callback function containing the effect code and a dependency array.
- **Dependency Array (`[]`):** The control array that tells React *when* to execute the effect.
- **Cleanup Function:** The function returned by your `useEffect` callback that React runs before the component unmounts or before re-running the effect, used to clear timers or disconnect listeners.

---

## 4. Deep Explanation (React Internals & The Clean-up Phase)

### 1. Pure Rendering vs. Side Effects
React's render phase must remain completely pure. Writing network requests or setting intervals directly inside the body of a component function is a critical bug:
```javascript
// CRITICAL BUG: Runs on EVERY render. Schedules infinite intervals!
setInterval(() => { console.log('Ping') }, 1000);
```
`useEffect` delays execution until *after* the browser has painted the screen, ensuring slow side effects do not block user interface updates.

### 2. The Dependency Array Matrix
The second argument to `useEffect` controls its execution frequency:
- **No Array (`useEffect(fn)`):** Runs after **every single render pass** of the component. Use this sparingly.
- **Empty Array (`useEffect(fn, [])`):** Runs **exactly once** after the initial mount, similar to a constructor action.
- **With Dependencies (`useEffect(fn, [roomId, isMuted])`):** Runs on mount, and then re-runs **only if** the values of `roomId` or `isMuted` change between renders.

### 3. The React 18+ Double-Mount in Development
In React 18+ (in Strict Mode and Development), React intentionally mounts, unmounts, and re-mounts every component:
- **Why?** To ensure developers write resilient cleanup functions. If your component leaks memory when mounted twice in development, it will leak memory in production when users navigate pages.

---

## 5. Real Production Examples (Zoom Components)

### 1. WebSocket Signaling Connection (Socket Cleanup)
```jsx
import React, { useState, useEffect } from 'react';

export function ZoomSignalingClient({ roomId }) {
  const [status, setStatus] = useState('Disconnected');

  useEffect(() => {
    // 1. Establish external WebSocket connection
    const socket = new WebSocket(`wss://zoom-clone.com/rooms/${roomId}`);

    socket.onopen = () => setStatus('Connected');
    socket.onclose = () => setStatus('Disconnected');

    // 2. Return Cleanup Function: Runs when roomId changes or component unmounts
    return () => {
      socket.close();
    };
  }, [roomId]); // Re-connects if the user switches rooms

  return <div className="status-indicator">Room: {roomId} ({status})</div>;
}
```

### 2. Microsecond Recording Timer (Interval cleanup)
```jsx
import React, { useState, useEffect } from 'react';

export function ZoomMeetingTimer({ isStarted }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isStarted) return;

    // Start ticker interval
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Return cleanup to avoid running multiple timers in background
    return () => {
      clearInterval(intervalId);
    };
  }, [isStarted]); // Starts or pauses when boolean toggles

  return <div className="timer-badge">Elapsed Time: {seconds}s</div>;
}
```

### 3. Active Speaker Responsive Layout (Window Event Cleanup)
Adjusting layouts based on window responsiveness.
```jsx
import React, { useState, useEffect } from 'react';

export function ZoomLayoutPresenter() {
  const [isMobileGrid, setIsMobileGrid] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileGrid(window.innerWidth < 768);
    };

    // Listen to native window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup: Avoid zombie listeners in memory
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isMobileGrid ? 'mobile-grid-layout' : 'desktop-theater-layout'}>
      {/* Participant streams grid */}
    </div>
  );
}
```

### 4. Fetch Participant Directory on Room Change
```jsx
import React, { useState, useEffect } from 'react';

export function ParticipantDirectory({ roomId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true; // Prevents race conditions on fast unmounts
    setLoading(true);

    fetch(`https://api.zoom-clone.com/rooms/${roomId}/participants`)
      .then(res => res.json())
      .then(data => {
        if (isCurrentRequest) {
          setUsers(data);
          setLoading(false);
        }
      });

    return () => {
      isCurrentRequest = false; // Ignore result if roomId changed before fetch finished
    };
  }, [roomId]);

  return loading ? <p>Loading participants...</p> : <ul>{/* Users list */}</ul>;
}
```

### 5. Media Stream Keyboard Mute Shortcuts (Global Listener)
```jsx
import React, { useEffect } from 'react';

export function ZoomMuteShortcut({ onToggleMute }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle microphone on Spacebar press
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        onToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleMute]);

  return <div className="helper-bubble">Press Spacebar to toggle mute</div>;
}
```

---

## 6. Progressive Coding (Zoom Room Stream Client)

### Level 1: Beginner (Rendering Loop State Injections - Browser Crash Warning)
```jsx
// BAD: Modifying hardware permissions or scheduling functions directly inside render path.
// This executes on EVERY paint pass, causing infinite hardware requests and lag.
export function BeginnerZoomRoom() {
  const [stream, setStream] = useState(null);

  // CRITICAL BUG: Triggers hardware setup, sets state, triggers re-render, loops infinitely!
  navigator.mediaDevices.getUserMedia({ video: true }).then(s => setStream(s));

  return <div>{stream ? "Camera Connected" : "Connecting..."}</div>;
}
```

### Level 2: Better (Effect Added, But Missing Cleanup - Hardware Leak)
```jsx
// BETTER: Setup is isolated in useEffect, so it runs once. 
// BUG: When component unmounts, the camera stays ON because we forgot to stop media tracks.
import React, { useState, useEffect } from 'react';

export function BetterZoomRoom() {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(setStream);
  }, []); // Run on mount

  return <div>{stream ? "Active Stream" : "No Camera"}</div>;
}
```

### Level 3: Production (Proper Effect Lifecycle with Hardware Track Stop Cleanup)
```jsx
// PRODUCTION: Implements cleanups to turn off hardware lights and release cameras on unmount.
import React, { useState, useEffect } from 'react';

export function ProductionZoomRoom() {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let active = true;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => {
        if (active) setStream(s);
      })
      .catch(console.error);

    // Return cleanup to stop cameras and release mic
    return () => {
      active = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return <div>Video status active.</div>;
}
```

### Level 4: Enterprise (High-Aesthetic Media Connection and Signal Channel Container)
```jsx
// ENTERPRISE: Sandbox-ready, handles custom audio and video constraints, toggles media 
// on prop changes, handles server WebSocket pings, error captures, and graceful device fallback.
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export function ZoomEnterpriseStreamManager({ roomId, videoEnabled, audioEnabled }) {
  const [stream, setStream] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('offline');
  const mediaStreamRef = useRef(null);
  const socketRef = useRef(null);

  // Effect 1: Handle Audio/Video Hardware Feeds
  useEffect(() => {
    let isSubscribed = true;

    async function initializeMediaDevices() {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: videoEnabled,
          audio: audioEnabled
        });
        
        if (isSubscribed) {
          mediaStreamRef.current = localStream;
          setStream(localStream);
        }
      } catch (err) {
        console.error("Hardware access denied:", err);
      }
    }

    initializeMediaDevices();

    return () => {
      isSubscribed = false;
      // Stop all tracks to release webcam and microphone hardware
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoEnabled, audioEnabled]); // Triggers only when hardware settings toggle

  // Effect 2: Handle Socket Signaling Channels
  useEffect(() => {
    setConnectionStatus('connecting');
    
    const ws = new WebSocket(`wss://api.zoom-clone.com/signal/${roomId}`);
    socketRef.current = ws;

    ws.onopen = () => setConnectionStatus('connected');
    ws.onclose = () => setConnectionStatus('disconnected');
    ws.onerror = () => setConnectionStatus('failed');

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId]); // Re-runs signaling on room swaps

  return (
    <div className="zoom-stream-manager-card">
      <div className={`status-badge ${connectionStatus}`}>
        Signaling Status: {connectionStatus.toUpperCase()}
      </div>
      
      <div className="video-viewport">
        {stream ? (
          <video 
            ref={video => {
              if (video && stream) video.srcObject = stream;
            }} 
            autoPlay 
            muted 
            playsInline
          />
        ) : (
          <div className="camera-placeholder">
            <span>📷 Camera is Muted or Off</span>
          </div>
        )}
      </div>
    </div>
  );
}

ZoomEnterpriseStreamManager.propTypes = {
  roomId: PropTypes.string.isRequired,
  videoEnabled: PropTypes.bool.isRequired,
  audioEnabled: PropTypes.bool.isRequired
};
```

---

## 7. Common Mistakes

1. **Omitting the Dependency Array:**
   ```jsx
   // BUG: Running effects without a dependency array executes the callback 
   // on EVERY render, which often leads to infinite loop crashes.
   useEffect(() => {
     fetchData();
   }); // Missing []!
   ```
2. **Updating a State Variable Listed in the Dependencies:**
   ```jsx
   // BUG: Updating 'count' inside the effect triggers a re-render. Since 'count' 
   // changed, the effect runs again, triggering an infinite loop crash.
   useEffect(() => {
     setCount(count + 1);
   }, [count]);
   ```
3. **Forgetting to Return Cleanup Functions for Events or Sockets:**
   Failing to remove window resize event listeners or clear intervals. These stay active in memory even after the component unmounts, leaking memory and slowing down the app.

---

## 8. Best Practices

1. **Keep Effects Focused:** Write multiple, single-purpose `useEffect` hooks rather than grouping unrelated operations (like fetching users and initializing timers) into a single giant hook.
2. **Use Refs for Persistent Variables:** Store references to hardware streams or socket objects inside `useRef` to avoid re-triggering effects on standard re-renders.
3. **Declare Helper Functions Inside the Effect:** If a helper function is only used inside a `useEffect`, declare it inside the effect body. This makes dependencies cleaner and more explicit.

---

## 9. Interview Preparation

### Q1: What is the purpose of returning a function from a `useEffect` hook?
**Answer:** The returned function is the **Cleanup Function**. React executes this function before the component unmounts from the DOM, and before re-running the effect due to a dependency change. It is critical for cleaning up side effects to prevent memory leaks—such as clearing intervals, removing window event listeners, canceling pending API subscriptions, or turning off camera streams.

### Q2: Why does React 18 run `useEffect` twice on initial mount in development mode?
**Answer:** React 18 Strict Mode mounts, unmounts, and re-mounts components in development to verify that side effects are properly cleaned up. If an effect fails to cleanup (like leaving a socket connection open), it will cause memory leaks in production. The double mount quickly exposes these bugs in development.

### Q3: What is a race condition in data fetching, and how do you prevent it in `useEffect`?
**Answer:** A race condition occurs when multiple async requests are sent in rapid succession (e.g. typing quickly in a search box), and a slower earlier request resolves *after* a faster later request. This overwrites the state with outdated data. You can prevent this by setting a boolean flag (e.g., `let active = true`) inside the effect, and setting it to `false` in the cleanup function. When requests resolve, only update state if the flag is still `true`.

---

## 10. Homework

1. **WebSocket Chat Connection:** Build a component that establishes a socket connection to a channel when a prop changes. Safely close the socket on unmount.
2. **Keyboard Music Controller Shortcut:** Write a global event listener inside `useEffect` that listens for key presses (e.g., Spacebar for play/pause). Clean up the listener correctly.
3. **Dynamic Tab Window Title Updater:** Build a component that synchronizes the browser tab's document title (`document.title`) with a local input field, using clean dependencies.
4. **Preventing API Fetch Race Conditions:** Write a directory search list component that triggers api fetches on query changes. Implement a boolean cancel flag in cleanup to avoid race conditions.
5. **Autosave Form Draft Timer:** Create a text editor. Use `useEffect` to trigger a simulated database save exactly 2 seconds after the user stops typing (implementing a custom debounce interval).
