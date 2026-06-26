# TODO App — Step by step Guide

---

## Goal

- Build a task manager.
- Add tasks. Mark complete. Delete tasks.
- Search tasks by text.
- Keep code simple, accessible, and maintainable.

---

## Files you need

- `index.html` — structure and accessibility.
- `ui.css` — styles.
- `logic.js` — behaviour, storage, and filtering.

Save all three in one folder. Open `index.html` in a browser.

---

## Final code

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>TODO</title>
    <link rel="stylesheet" href="./ui.css" />
    <script defer src="./logic.js"></script>
  </head>
  <body>
    <h2>Task Manager</h2>

    <form id="taskForm" aria-label="Add new task">
      <input
        type="text"
        id="taskInput"
        placeholder="New Task"
        aria-label="Task text"
      />
      <button id="addBtn" type="submit">Add Task</button>
    </form>

    <input
      type="text"
      id="searchInput"
      placeholder="Search Tasks..."
      aria-label="Search tasks"
    />
    <div id="counts" aria-live="polite"></div>

    <ul id="taskList" role="list"></ul>
  </body>
</html>
```

### ui.css

```css
body {
  font-family: system-ui, Arial, sans-serif;
  padding: 18px;
  max-width: 700px;
}

form {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

input[type="text"] {
  padding: 8px;
  flex: 1;
  font-size: 16px;
}

button {
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}

li {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

li .text {
  flex: 1;
}

li.completed .text {
  text-decoration: line-through;
  opacity: 0.7;
}

.btn {
  border: 0;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  padding: 6px;
}

.btn.delete {
  color: #c33;
}

.btn.complete {
  color: #2a9d8f;
}

#counts {
  margin: 8px 0;
  color: #555;
  font-size: 14px;
}
```

### logic.js

```javascript
console.log("Project: TODO");

// selectors
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const counts = document.getElementById("counts");

let tasks = [];

// storage helpers
function loadTasks() {
  const raw = localStorage.getItem("tasks") || "[]";
  try {
    tasks = JSON.parse(raw);
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// render helpers
function renderTasks(filter = "") {
  taskList.innerHTML = "";
  const q = filter.trim().toLowerCase();
  let visible = 0;
  tasks.forEach((task) => {
    if (q && !task.text.toLowerCase().includes(q)) return;
    visible += 1;

    const li = document.createElement("li");
    li.dataset.id = task.id;
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = task.text;

    const completeBtn = document.createElement("button");
    completeBtn.className = "btn complete";
    completeBtn.type = "button";
    completeBtn.title = "Toggle complete";
    completeBtn.textContent = "✅";
    completeBtn.dataset.action = "toggle";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn delete";
    deleteBtn.type = "button";
    deleteBtn.title = "Delete task";
    deleteBtn.textContent = "❌";
    deleteBtn.dataset.action = "delete";

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  const total = tasks.length;
  counts.textContent = `Total ${total} • Showing ${visible}`;
}

// core actions
function addTask(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return;
  const task = {
    id: Date.now().toString(),
    text: trimmed,
    completed: false,
  };
  tasks.unshift(task); // newest first
  saveTasks();
  renderTasks(searchInput.value);
}

function toggleTask(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  saveTasks();
  renderTasks(searchInput.value);
}

function deleteTask(id) {
  tasks = tasks.filter((x) => x.id !== id);
  saveTasks();
  renderTasks(searchInput.value);
}

// events
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

taskList.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;
  const li = e.target.closest("li");
  if (!li) return;
  const id = li.dataset.id;
  if (action === "toggle") toggleTask(id);
  if (action === "delete") deleteTask(id);
});

searchInput.addEventListener("input", () => {
  renderTasks(searchInput.value);
});

// init
loadTasks();
renderTasks();
```

---

## Build steps, one by one

- Create files. Copy code.
- Open `index.html`. Confirm page loads.
- Add a task. Confirm it appears.
- Click the check button. Confirm strike through.
- Click delete. Confirm removal.
- Type in search box. Confirm list filters.
- Reload page. Confirm tasks persist.

---

## Why these choices

Use `defer` for script

- Script runs after HTML loads.
- You avoid `DOMContentLoaded` boilerplate.

Use `addEventListener` instead of inline handlers

- Keeps HTML clean.
- Makes testing easier.
- Allows multiple listeners when needed.

Use event delegation on the list

- You avoid many listeners.
- You handle dynamic items added later.
- You simplify memory use.

Store tasks in `localStorage`

- Keeps tasks across reloads.
- Simple and synchronous for small data.

Use `data-*` attributes for actions and ids

- Keeps button roles explicit.
- Makes event handling simple.

Use `Date.now()` for id

- Simple unique id for this app.
- Good enough for client side lists.

Render from model, not mutate DOM in place

- Keep `tasks` as the single source of truth.
- Re-rendering prevents state drift between data and DOM.

Accessibility

- Use `<button>` for clickable items. Buttons support keyboard by default.
- Use `aria-live` region for counts so screen readers get updates.

---

## Why not to use other approaches

Inline `onclick` in HTML

- Mixes markup and logic.
- Harder to maintain and test.

Manipulating text nodes directly for delete and toggle

- Risk of inconsistent data model.
- You lose easy persistence.

Relying on element index positions for id or delete

- Fragile if list reorders.
- Use data attributes instead.

Using complex frameworks for this small app

- Adds weight and learning overhead.
- Use frameworks when app complexity grows.

Storing tasks only in DOM and not in storage

- Data disappears on reload.
- Harder to sync state across features.

Using `innerHTML` to build list items

- Risk of injection if task text contains HTML.
- Creating elements avoids parsing HTML.

---

## Student extensions (practice tasks)

- Add edit mode for a task.
- Add due date and sort by date.
- Add priority levels with color labels.
- Add clear all completed button.
- Sync tasks between tabs with `storage` event.
- Move persistence to IndexedDB for large task sets.

---

## Debug checklist

- If tasks do not save, check console for JSON parse errors.
- If buttons do nothing, verify `data-action` exists on clicked element.
- If search fails, confirm `renderTasks` uses `toLowerCase()` correctly.
- If DOM shows duplicates, confirm `renderTasks` clears `taskList` at start.
