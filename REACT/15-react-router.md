# 🛣️ Module 15: React Routing (SaaS Multi-Tenant Client Panel)

Welcome to Module 15! In this module, we will learn how to build Single Page Applications (SPAs) with multiple views. We will study **React Router** (`react-router-dom` V6+)—including nested routes, dynamic URL parameters, layout templates, and programmatic navigation—inside a real-world **SaaS Multi-Tenant Client Panel** context.

---

## 1. Mental Model: Client-Side Routing vs. Server-Side Routing

In traditional websites, navigation requires fetching a new HTML page from the server on every link click:
* **Server-Side Routing:** You click `/billing`. The browser requests a new page, flashes blank, downloads resources, and paints the page from scratch.
* **Client-Side Routing (React Router):** You click `/billing`. The browser stays on the exact same HTML page. React intercepts the click, matches the URL against your route definitions, hides the home view, and renders the billing component instantly in-place. There is no page reload and no blank flash, resulting in desktop-app speed.

---

## 2. Visual Thinking: Nested Layout Routing Architecture

```text
======================= NESTED LAYOUT ROUTES =======================

   Browser URL Path: /workspace/tenant-99/billing
   
   ┌─────────────────────────────────────────────────────────────┐
   │ [ App Layout Component ]  (Static Sidebar & Header)         │
   │                                                             │
   │   ┌─── Side Navigation ───┐   ┌─── Main Display Workspace ──┐
   │   │  - Dashboard          │   │  [ Outlet Wrapper ]         │
   │   │  - Settings           │   │    Displays Child Views!    │
   │   │  * Billing            │   │                             │
   │   └───────────────────────┘   │    ┌──────────────────┐     │
   │                               │    │ [ Billing View ] │     │
   │                               │    │                  │     │
   │                               │    │   Tenant ID:     │     │
   │                               │    │   "tenant-99"    │     │
   │                               │    └──────────────────┘     │
   │                               └─────────────────────────────┘
   └─────────────────────────────────────────────────────────────┘
```

---

## 3. Beginner Explanation: Route Declarations V6+

React Router uses a declarative component system to map URL paths to React components:

* **Router Context Provider:** Wrap your entire application inside a `<BrowserRouter>` wrapper:
  ```jsx
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ```
* **Routes & Route Definitions:** Define matching configurations inside `<Routes>`:
  ```jsx
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
  ```
* **Navigation Links:** Never use standard HTML anchors `<a href="/path">` in React Router because they trigger full page reloads. Always use **`<Link>`** or **`<NavLink>`**:
  ```jsx
  <Link to="/settings">Go to Settings</Link>
  ```
* **Outlet Wrapper:** Use `<Outlet />` inside layout components to define where child nested components should render.

---

## 4. Deep Explanation: Dynamic Parameter Parsing & Programmatic Navigation

### 1. Dynamic Routing (`useParams`)
Dynamic segments in URLs are marked with a colon (`:`) prefix (e.g. `/tenant/:id`). React Router parses these variables and exposes them via the **`useParams`** hook. This allows a single component (like `TenantDashboard`) to display different data dynamically based on the active URL path.

### 2. Programmatic Navigation (`useNavigate`)
Sometimes you need to redirect users automatically (e.g., redirect to `/dashboard` after a successful login, or redirect to `/login` if authentication fails). The **`useNavigate`** hook returns a navigation function that lets you redirect users programmatically.

---

## 5. Real Production Example: Client Panel Routing Configuration

Here is a routing schema containing nested workspace layouts, dynamic parameters, and programmatic login gateways.

```jsx
import React from "react";
import { Routes, Route, Link, Outlet, useParams, useNavigate } from "react-router-dom";

// 1. Root Layout Wrapper
function SidebarLayout() {
  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/workspace/stripe">Stripe Workspace</Link>
        <Link to="/workspace/netflix">Netflix Workspace</Link>
      </nav>
      <main className="content">
        <header>SaaS Control Panel</header>
        {/* Child views render here */}
        <Outlet />
      </main>
    </div>
  );
}

// 2. Child View showing useParams
function WorkspaceDashboard() {
  const { tenantId } = useParams(); // Extracts :tenantId from URL
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Terminating session...");
    navigate("/login"); // Programmatic redirect
  };

  return (
    <div className="workspace-card">
      <h2>Workspace ID: {tenantId}</h2>
      <p>Data stream loaded successfully.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

// 3. Routing Map
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<h2>Login Page</h2>} />
      
      {/* Nested Layout Routing */}
      <Route path="/" element={<SidebarLayout />}>
        <Route index element={<h2>Welcome! Select a Workspace.</h2>} />
        <Route path="workspace/:tenantId" element={<WorkspaceDashboard />} />
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Route>
    </Routes>
  );
}
```

---

## 6. Progressive Coding: Basic vs. Nested Routes

Let's compare the code implementations:

### Basic Route Grid
Flat routing schema without shared layouts. Causes code duplication when adding common elements (like sidebars).
```jsx
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
```

### Nested Layout Route Grid
Clean, professional nesting using `<Outlet />` to render children inside a parent frame template.
```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
```

---

## 7. Common Mistakes & Pitfalls

* **Mistake: Using `<a href="...">` for Navigation:**
  This triggers full page reloads, wiping out all local component states and Redux stores.
* **Mistake: Forgetting `<Outlet />` in Layout Parent Components:**
  Nested routes will fail to render their child views if the parent layout component lacks the `<Outlet />` placement marker.

---

## 8. Best Practices

1. **Protect Private Routes:** Create a wrapper component (e.g. `<ProtectedRoute>`) to verify user authentication status before rendering child routing gateways.
2. **Use Relative Paths in Nested Routes:** In nested routes, omit the parent path prefix in child `path` properties. E.g., inside parent `/dashboard`, write `path="billing"` instead of `path="/dashboard/billing"`.

---

## 9. Interview Prep: FAANG & Top-Tier Questions

### Question 1: How does V6 React Router handle layout nesting?
**Answer:**
React Router V6 uses a nested `<Route>` structure. The parent `<Route>` specifies a layout component containing an `<Outlet />` element. When child routes match (e.g., `/settings`), React Router mounts the parent layout and automatically swaps the `<Outlet />` placeholder with the corresponding child component.

---

## 10. Homework (Job-Ready Assignments)

### Assignment: Build a Workspace Settings Manager
Create a multi-tab workspace settings panel using nested routing. Map the layout to display settings tabs (e.g., `/settings/profile`, `/settings/members`, `/settings/billing`). Clicking tabs must navigate dynamically without page reloads using `<NavLink>` to highlight the active tab.
