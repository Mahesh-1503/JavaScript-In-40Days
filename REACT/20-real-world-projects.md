# 🛠️ Module 20: Real-World React Consolidation Projects

Welcome to Module 20! In this module, we will apply everything we have learned across the JavaScript and React curriculum. You will find step-by-step specifications for **3 real-world consolidation projects** designed to help you build a professional portfolio.

---

## 🏗️ Project 1: Multi-Step Checkout Wizard (Forms & Routing)

### Goal
Build a checkout wizard that guides users through a multi-step purchase flow, validating inputs in real-time, persisting intermediate data, and routing between steps.

```text
=================== CHECKOUT WIZARD FLOW ===================

   [ Step 1: Account ]  ──► Validate Email ──► Navigate to Step 2
           │
   [ Step 2: Shipping ] ──► Address / Zip  ──► Navigate to Step 3
           │
   [ Step 3: Payment ]  ──► Card CVV Mask  ──► Submit Order (API mock)
```

### Key Requirements
1. **Routing Navigation:** Use `react-router-dom` to manage checkout step views (e.g. `/checkout/step1`, `/checkout/step2`).
2. **Controlled Forms:** Track all inputs (name, address, billing details) in a centralized React state or Redux store.
3. **Validation Gates:** Block navigation to the next step if inputs are invalid. Show clear, inline validation messages.
4. **Data Persistence:** Hydrate shipping details from `localStorage` on mount so refreshing the page does not wipe out progress.

---

## 📸 Project 2: Suspense Image Gallery (Performance & Lazy Loading)

### Goal
Build a high-performance image search directory that loads list elements dynamically, uses lazy loading for images, and implements code-splitting boundaries.

```text
================ IMAGE GALLERY COMPONENT MAP =================

    [ App Component ]
           │
     (Suspense boundary)
           │
     [ Lazy List Component ]  ◄── Loaded dynamically with React.lazy
           │
     [ Image Card Items ]     ◄── Lazy loads image files as they enter viewport
```

### Key Requirements
1. **Dynamic Code Splitting:** Import the image list component dynamically using `React.lazy()` and `<Suspense>`.
2. **Viewport Scroll Loading:** Implement lazy-loading for image cards using the `IntersectionObserver` Web API to load image URLs only when they scroll into the viewport.
3. **Memoized Filter Engine:** Use `useMemo` to filter and sort images by tags to prevent expensive recalculations during render sweeps.
4. **DOM Refs:** Use `useRef` to track active grid resize layout ratios without triggering re-renders.

---

## 📋 Project 3: Task Kanban Board (Redux & Animations)

### Goal
Build an interactive team Kanban Board (Todo, In Progress, Review, Done) with state management powered by Redux Toolkit and animations powered by Framer Motion.

```text
=================== KANBAN BOARD SYSTEM ===================

  [ Todo List ]         [ In Progress ]         [ Done ]
  ┌──────────┐          ┌──────────┐            ┌──────────┐
  │ Task A   │ ─Drag─►  │ Task B   │  ─Drag─►   │ Task C   │
  └──────────┘          └──────────┘            └──────────┘
```

### Key Requirements
1. **Centralized State:** Manage tasks (create, delete, edit status, assignees) inside a Redux Toolkit slice store.
2. **Micro-Animations:** Use Framer Motion to animate card movements, task list expansions, and deletion fades.
3. **Interactive Drag & Drop:** Allow users to update task status by dragging cards across lists.
4. **Form Submissions:** Provide a modal overlay styled with Tailwind CSS to create new tasks, validating task descriptions before dispatching actions.
