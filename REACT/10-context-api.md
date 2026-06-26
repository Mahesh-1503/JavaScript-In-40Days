# Module 10: Global State Management (Netflix Auth & Profile Context)

In complex React applications, multiple components across different layout branches must share the same data (such as active user sessions, themes, or localized configurations). Master **React Context API** to eliminate prop drilling, broadcast global state, and structure performant user interfaces.

---

## 1. Mental Model (The Netflix Profile Broadcast System)

Think of a **Netflix User Session**:
- You have a parent application container that holds the data for the currently logged-in user and their active profile (e.g. "Main Profile" or "Kids Profile").
- Many components at the bottom of the layout tree need to know this profile:
  1. `HeaderAvatar` (needs the profile image URL)
  2. `VideoRecommendations` (needs the age-rating limit of the profile to filter movies)
  3. `BillingPortal` (needs the billing tier to show subscription alerts)
  4. `FavoriteList` (needs the user's bookmark list)
- Passing these user session variables down manually through every parent, child, grid, and card container is called **Prop Drilling**. It clutters component signatures with variables they don't use.
- **The Solution:** **React Context**. Context operates like a **radio broadcast tower**. The top-level component broadcasts the user session. Any component in the application—no matter how deep it is nested—can simply tune in and receive the user details directly, skipping all intermediate parent layers.

---

## 2. Visual Thinking (Prop Drilling vs. React Context API)

How React Context solves nested property dependencies:

```
[ PROP DRILLING ] (Data passed manually down every layer)
           [ App ] (Holds User State)
              │
              ▼ (user={user})
          [ Dashboard ]
              │
              ▼ (user={user})
         [ HeaderGrid ]
              │
              ▼ (user={user})
        [ ProfileBadge ] (Only component that actually uses the data!)

[ REACT CONTEXT API ] (Teleportation pipeline)
           [ App ] ───( Broadcasts value via <AuthContext.Provider> )
              │
      ┌───────┴───────┐
      ▼               ▼
 [ Dashboard ]  [ Sidebar ]
      │               │
      ▼               ▼
[ HeaderGrid ]  [ UserProfileBadge ] (Tunes in directly via useContext)
```

---

## 3. Beginner Explanation

- **Prop Drilling:** The anti-pattern of passing props through multiple nested components that do not need them, simply to reach a component deeper in the tree.
- **Context:** A React mechanism that allows a parent component to make data available to any child component anywhere in the tree below it.
- **Provider (`<Context.Provider>`):** The wrapper component that establishes the "broadcast area" and defines the shared values.
- **Consumer (`useContext` Hook):** The hook used by child components to read the shared values from the nearest provider above them.

---

## 4. Deep Explanation (Fiber Trees & Render Bottlenecks)

### 1. Context Resolution in the Fiber Tree
When a component calls `useContext(AuthContext)`, React searches up the Fiber tree (the internal component representation) to find the nearest matching `<AuthContext.Provider>`. If no provider is found, React falls back to the default value specified when the context was created:
```javascript
const AuthContext = React.createContext(defaultValue);
```

### 2. The Render Bottleneck
Whenever a Context Provider's `value` changes:
- **Every component that calls `useContext(MyContext)` is forced to re-render.**
- Intermediate components that do not consume the context are skipped (if they are optimized with `React.memo`), but all consuming components will update.
- **Performance Leak:** If you put high-frequency data (like mouse cursor coordinates or rapidly updating inputs) inside a global context, your entire application will lag due to massive concurrent re-renders.

### 3. Mitigating Bottlenecks
To maintain high performance in enterprise apps:
- Split unrelated states into separate contexts (e.g. `ThemeContext` separate from `UserSessionContext`).
- Memoize the provider value object to prevent reference changes on unrelated parent state updates:
```javascript
const providerValue = useMemo(() => ({ user, login, logout }), [user]);
```

---

## 5. Real Production Examples (Netflix Context)

### 1. Creating the Authentication Context Module
```jsx
// AuthContext.js
import React, { createContext, useState, useMemo, useContext } from 'react';

// 1. Create Context object
const AuthContext = createContext(null);

// 2. Custom hook for easier consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 3. Stateful Provider Wrapper
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = logged out

  const login = (credentials) => {
    // API validation simulation
    setUser({ id: 'u-101', email: credentials.email, tier: 'Premium' });
  };

  const logout = () => {
    setUser(null);
  };

  // Memoize value to avoid reference re-allocation on re-renders
  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 2. Header Profile Avatar Consumer
Consuming user session data deep in the navigation layout.
```jsx
// HeaderAvatar.jsx
import React from 'react';
import { useAuth } from './AuthContext';

export function HeaderAvatar() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <button className="login-btn">Sign In</button>;
  }

  return (
    <div className="avatar-dropdown">
      <img src={`/avatars/${user.id}.jpg`} alt="User profile" />
      <span className="tier-badge">{user.tier}</span>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

### 3. Billing Gate Component (Conditional Access Routing)
Checking users subscription details globally to restrict content views.
```jsx
// MoviePlayer.jsx
import React from 'react';
import { useAuth } from './AuthContext';

export function MoviePlayer({ videoId }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="gate-screen">Please login to watch.</div>;
  }

  if (user.tier !== 'Premium') {
    return (
      <div className="gate-screen">
        <h3>Upgrade Required</h3>
        <p>Premium plans required to stream Ultra-HD content.</p>
      </div>
    );
  }

  return <video src={`/streams/${videoId}.mp4`} controls />;
}
```

---

## 6. Progressive Coding (Prop Drilling to Context API)

### Level 1: Beginner (Manual Prop Drilling - High Clutter)
```jsx
// BAD: Every component signature is cluttered with the user prop just to pass it down.
function UserProfileCard({ user }) {
  return <div className="user-info"><h4>{user.name}</h4></div>;
}

function SettingsSection({ user }) {
  return <div className="settings-box"><UserProfileCard user={user} /></div>;
}

export function AppContainer() {
  const user = { name: "Mahesh" };
  return <SettingsSection user={user} />;
}
```

### Level 2: Better (Basic Unprotected Context Setup)
```jsx
// BETTER: Context created and values consumed. But lacks validation.
import React, { createContext, useContext } from 'react';

const UserContext = createContext();

function UserProfileCard() {
  const user = useContext(UserContext); // Read directly from Context
  return <h4>{user.name}</h4>;
}

export function BetterApp() {
  return (
    <UserContext.Provider value={{ name: "Mahesh" }}>
      <UserProfileCard />
    </UserContext.Provider>
  );
}
```

### Level 3: Production (Stateful Provider & Custom Hook Layer)
```jsx
// PRODUCTION: Hooks handle error bounds, states are clean, API methods isolated.
import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext(null);

export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfiles must be inside ProfileProvider");
  return context;
}

export function ProfileProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState("Adult");

  return (
    <ProfileContext.Provider value={{ activeProfile, setActiveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
```

### Level 4: Enterprise (High-Aesthetic Workspace Context Provider)
```jsx
// ENTERPRISE: Sandbox-ready, implements cache checks, async actions, memoized states, 
// error boundaries, and nested consumer abstractions.
import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const NetflixContext = createContext(null);

export function useNetflixSession() {
  const context = useContext(NetflixContext);
  if (!context) {
    throw new Error('useNetflixSession must be nested inside a NetflixSessionProvider');
  }
  return context;
}

export function NetflixSessionProvider({ children, initialAccount }) {
  const [account, setAccount] = useState(initialAccount);
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const switchProfile = useCallback((profileId) => {
    setIsSyncing(true);
    // Simulate updating recommendations based on the new profile choice
    setTimeout(() => {
      setActiveProfileId(profileId);
      setIsSyncing(false);
    }, 500);
  }, []);

  const activeProfile = useMemo(() => {
    if (!account || !activeProfileId) return null;
    return account.profiles.find(p => p.id === activeProfileId) || null;
  }, [account, activeProfileId]);

  // Memoize whole context payload to prevent child updates when parent re-renders
  const providerValue = useMemo(() => ({
    account,
    activeProfile,
    isSyncing,
    switchProfile,
    setAccount
  }), [account, activeProfile, isSyncing, switchProfile]);

  return (
    <NetflixContext.Provider value={providerValue}>
      {children}
    </NetflixContext.Provider>
  );
}

NetflixSessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isKids: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired
};
```

---

## 7. Common Mistakes

1. **Overusing Context for Local Component State:**
   Putting states that are only used in a single component (like toggling a local modal or input value) in a global context. This triggers unnecessary re-renders of the entire application layout.
2. **Missing error boundaries on consumers:**
   Attempting to call `useContext(MyContext)` in a component that resides *above* the `<MyContext.Provider>` in the tree. The hook will return `null` or default parameters and likely throw runtime errors.
3. **Omitting Value Memoization:**
   ```jsx
   // BUG: Re-creates the value object reference on EVERY render of App,
   // forcing all consumer children to re-render even if data did not change!
   <AuthContext.Provider value={{ user, login }}>
   ```

---

## 8. Best Practices

1. **Keep Contexts Small and Single-Purpose:** Don't bundle billing details, localization strings, and authentication states into one massive context. Separate them.
2. **Abstract Context Consumption:** Wrap raw `useContext(MyContext)` calls in custom hooks (e.g. `useAuth()`). This makes components cleaner and decoupling easier.
3. **Specify Logical Default Values:** Provide meaningful default values during context initialization to support easy testing of isolated components.

---

## 9. Interview Preparation

### Q1: What is Prop Drilling, and how does the Context API resolve it?
**Answer:** Prop Drilling is the practice of passing props through multiple levels of intermediate components that don't need the data, simply to deliver it to a deeply nested child. It creates tight coupling and makes refactoring difficult. The Context API resolves this by providing a provider component that broadcasts values directly down the tree. Any child component can use the `useContext` hook to read the values directly, bypassing all intermediate components.

### Q2: Why is putting rapidly changing values (like scroll position or inputs) in Context considered a performance risk?
**Answer:** When the value of a Context Provider changes, **every component consuming that context is forced to re-render**. If the value changes on every scroll frame (60+ times per second), it will trigger constant re-renders across all consumers, causing noticeable UI lag. High-frequency states should be managed with local state, refs, or specialized state-management libraries (like Zustand or Redux).

### Q3: What is the difference between the Context API and state libraries like Redux?
**Answer:**
- **Context API:** A built-in React dependency-injection tool designed for sharing simple, low-frequency state (like user profiles or dark themes) across a component tree. It does not provide debugging tools or state-tracking pipelines out of the box.
- **Redux:** An external state-management library that uses a central store, actions, and reducers. It is designed for complex, high-frequency state updates, and provides advanced debugging tools (like time-travel debugging) and performance optimizations.

---

## 10. Homework

1. **Build a Profile Swapper Dashboard:** Create a screen with 4 Netflix profiles. Clicking a profile must update the global context and update the navigation avatar.
2. **Implement Multi-Language Context:** Create a localization context (`LocaleContext`). Wrap the app and display buttons to switch between English and Spanish, translating text dynamically.
3. **Cart Badge Count Context:** Build an e-commerce catalog page. Use a global cart context to broadcast addition events, and update header cart counters instantly.
4. **Context Render Efficiency Audit:** Setup a context with 2 independent counters. Check console messages to see how rendering updates all consumers on every change, and optimize using separate providers.
5. **Theme CSS Variables Injector:** Create a theme context. When the theme changes, update CSS variables (`--bg`, `--text`) globally on the document root inside a provider hook.
