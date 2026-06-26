# DOM Manipulation — Clear, practical notes

Short, focused. You get concepts, differences, and full files you can run.

---

# What you will learn

- Create elements and attributes, programmatically.
- Insert elements before and after existing nodes.
- Change content with `innerHTML` and `textContent`.
- Understand `innerHTML` security risks and safer alternatives.
- Remove nodes.
- Traverse the DOM up, down, sideways.
- Change styles and classes.
- Use `classList` methods.
- Control visibility.
- Build three practical tasks and complete code.

---

# Starter files (full, runnable)

Save these three files in one folder and open `index.html`.

## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>DOM Manipulations</title>
    <link rel="stylesheet" href="./index.css" />
    <script defer src="./index.js"></script>
  </head>
  <body>
    <h1>Welcome to the Day 25</h1>
    <p>Hope you are enjoying 40 days of JavaScript</p>

    <div>
      <h2 style="display: none;">test</h2>
    </div>

    <div id="removeMe">I am going to be removed</div>

    <ul id="myList">
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
    </ul>

    <img src="someImage.png" alt="some image" height="200" width="200" />

    <div id="main-id" class="main-class layout">
      <p class="info">
        <span id="text">I love DOM</span>
      </p>
      <!-- I have added a comment here -->
    </div>

    <div>
      <h1 id="something-id">Something</h1>
      <p id="something-id2">Something More</p>
      <p id="something-id3">Something Even more</p>
    </div>

    <p id="p-id" style="background-color: green; color: #fff;">
      Let's do some style
    </p>

    <hr />

    <section id="demo-area"></section>
  </body>
</html>
```

## index.css

```css
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
  padding: 20px;
}

.main-class {
  border: 1px solid #ddd;
  padding: 12px;
  margin-top: 12px;
}

.layout {
  border-radius: 6px;
}

.hidden {
  display: none;
}

.badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 12px;
  background: #eee;
  margin-left: 6px;
}
```

## index.js

```javascript
// helper: log to demo area
const demoArea = document.getElementById("demo-area");
function log(message) {
  const p = document.createElement("p");
  p.textContent = message;
  demoArea.appendChild(p);
}

/*
Create elements
*/
const newDiv = document.createElement("div");
newDiv.id = "created-div";
newDiv.textContent = "I was created with createElement";
document.body.appendChild(newDiv);
log("Created a div and appended to body");

/*
Insert before / after
*/
// insert before the #myList
const myList = document.getElementById("myList");
const beforeNode = document.createElement("li");
beforeNode.textContent = "Before-Item";
myList.insertBefore(beforeNode, myList.firstElementChild);
log("Inserted item before first li");

// insert after using parentNode.insertBefore with nextSibling
const afterNode = document.createElement("li");
afterNode.textContent = "After-Item";
const ref = myList.children[2]; // reference node
ref.parentNode.insertBefore(afterNode, ref.nextSibling);
log("Inserted item after third li");

/*
Modify content: innerHTML
*/
const span = document.getElementById("text");
span.innerHTML = "I <strong>love</strong> DOM";
log("Changed innerHTML of #text to include <strong>");

// Security risk note below

/*
Modify content: textContent
*/
const infoP = document.querySelector(".info");
infoP.textContent = "Plain text set with textContent";
log("Replaced .info inner HTML with plain text via textContent");

/*
Removing elements
*/
const removeMe = document.getElementById("removeMe");
removeMe.remove();
log("#removeMe removed from DOM");

/*
Traversing DOM
*/
const main = document.getElementById("main-id");
log("main-id child count: " + main.childElementCount);
log("main-id parent tag: " + main.parentElement.tagName);
const firstChild = myList.firstElementChild;
log("myList first child text: " + firstChild.textContent);
const siblings = Array.from(firstChild.parentElement.children).map(
  (n) => n.textContent
);
log("myList siblings: " + siblings.join(", "));

/*
Manipulating styles
*/
const styledP = document.getElementById("p-id");
styledP.style.backgroundColor = "black";
styledP.style.color = "#fff";
styledP.style.padding = "8px";
log("Styled #p-id via style property");

/*
Manipulating classes and classList
*/
main.classList.add("highlight");
main.classList.remove("layout");
main.classList.toggle("active"); // adds active
main.classList.toggle("active"); // removes active
log("Used classList methods: add, remove, toggle");

/*
Controlling visibility
*/
const h2 = document.querySelector("div > h2");
h2.style.display = h2.style.display === "none" ? "block" : "none";
log("Toggled h2 display property");

/*
Append vs appendChild differences (short)
*/
const extra = document.createElement("span");
extra.textContent = " badge";
const badge = document.createElement("span");
badge.className = "badge";
badge.append("New"); // append accepts strings and nodes
badge.appendChild(extra); // appendChild accepts node only
document.getElementById("created-div").appendChild(badge);
log("Demonstrated append and appendChild");
```

---

# Topic explanations and clarifications

## Create elements

- Use `document.createElement(tag)` to make a node.
- Use `setAttribute`, `id`, `className`, `textContent` or `innerHTML` to populate it.
- Use `appendChild` or `append` to insert into DOM.

Example

```javascript
const el = document.createElement("button");
el.setAttribute("type", "button");
el.id = "my-btn";
el.textContent = "Click me";
document.body.appendChild(el);
```

Real life analogy

- You build a new chair in the workshop, then place it in the room. `createElement` builds. `appendChild` places.

## Inserting elements — before

- Use `parent.insertBefore(newNode, referenceNode)`.
- If `referenceNode` is `null`, it appends to end.

Example

```javascript
parent.insertBefore(newNode, parent.firstElementChild);
```

## Inserting elements — after

- DOM has no `insertAfter`. Use `parent.insertBefore(newNode, referenceNode.nextSibling)`.

Example

```javascript
const ref = elementToFollow;
ref.parentNode.insertBefore(newNode, ref.nextSibling);
```

## Modify content — innerHTML

- `element.innerHTML = '...html...'` parses string as HTML.
- Use when you need markup inside.
- Faster for many nodes in one update.

Security risk of `innerHTML`

- If you inject user input into `innerHTML` directly you allow script injection.
- Example risk: `el.innerHTML = '<img src=x onerror=alert(1)>'`
- Avoid with untrusted data. Use `textContent` or create nodes.

Safe pattern

- Sanitize on server or use `textContent` and node creation.

## Modify content — textContent

- `textContent` sets plain text. It does not parse HTML.
- Use for untrusted or simple text.
- It removes child nodes and replaces with text.

Example difference

```javascript
el.innerHTML = "<b>bold</b>"; // renders bold text
el.textContent = "<b>bold</b>"; // shows literal <b>bold</b>
```

## Removing elements

- Use `node.remove()` to delete the node itself.
- Or `parent.removeChild(node)` for older style.

Example

```javascript
document.getElementById("removeMe").remove();
```

## Traversing DOM

- Downwards: `children`, `firstElementChild`, `querySelector`, `getElementById`.
- Upwards: `parentElement`, `closest(selector)`.
- Sideways: `nextElementSibling`, `previousElementSibling`.

Real life example

- You stand at one chair. `parentElement` is the table. `children` are other items on the table.

## Manipulating styles

- Inline style: `el.style.propertyName = 'value'` (camelCase).
- Computed style read: `getComputedStyle(el).propertyName`.

Note

- Use classes when possible. Inline style has higher specificity and is harder to manage.

Example

```javascript
const p = document.getElementById("p-id");
p.style.padding = "8px";
```

## Manipulating classes

- `el.className = 'a b'` replaces all classes.
- `el.classList` gives methods that change classes safely.

## Working with classList

- `el.classList.add('x')`
- `el.classList.remove('x')`
- `el.classList.toggle('x')` returns boolean if class present after toggle
- `el.classList.contains('x')` checks presence

Use case

- Toggle a theme class on the root element.

## Controlling visibility

- Two main ways:

  - CSS `display: none` removes element from layout.
  - CSS `visibility: hidden` hides but keeps layout space.

- Use `opacity: 0` with transitions to animate fade.

Example

```javascript
el.style.display = "none"; // hide completely
el.style.visibility = "hidden"; // hide but keep space
```

Confusion cleared: `display` vs `visibility`

- `display: none` removes element from flow. Layout recalculates.
- `visibility: hidden` reserves space. Layout stays same.

---

# Common confusions and short fixes

- innerHTML vs textContent

  - innerHTML parses HTML. Use only for trusted templates.
  - textContent sets plain text, safe for user input.

- append vs appendChild

  - `append` accepts nodes and strings.
  - `appendChild` accepts nodes only and returns the appended node.

- remove vs parent.removeChild

  - `remove()` is modern and clearer. Works in modern browsers.
  - `parent.removeChild(child)` is older but explicit.

- nextSibling vs nextElementSibling

  - `nextSibling` can return text nodes or comments.
  - `nextElementSibling` returns the next element node.

---

# Tasks with complete code and steps

Below are three tasks you asked. Save each task in its folder and open the HTML.

---

## Task 1 — Dynamic Form with behavior

### Goal

- Build form fields dynamically based on selection.
- Submit logs input values as object.
- Reset clears form.
- Use `createElement`, `appendChild`, `setAttribute`, `addEventListener`.

### Files

**task1.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Task 1 - Dynamic Form</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        padding: 12px;
      }
      .field {
        margin: 8px 0;
      }
    </style>
    <script defer src="./task1.js"></script>
  </head>
  <body>
    <h2>Dynamic Form Builder</h2>

    <label>
      Choose field type
      <select id="field-type">
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
      </select>
    </label>

    <button id="add-field">Add Field</button>

    <form id="dynamic-form"></form>

    <button id="submit-btn" type="button">Submit</button>
    <button id="reset-btn" type="button">Reset</button>

    <pre id="output"></pre>
  </body>
</html>
```

**task1.js**

```javascript
const form = document.getElementById("dynamic-form");
const addFieldBtn = document.getElementById("add-field");
const fieldTypeSelect = document.getElementById("field-type");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const output = document.getElementById("output");
let fieldCount = 0;

addFieldBtn.addEventListener("click", () => {
  const type = fieldTypeSelect.value;
  fieldCount += 1;
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  wrapper.dataset.fieldId = fieldCount;

  const label = document.createElement("label");
  label.textContent = `Field ${fieldCount} (${type}) `;

  const input = document.createElement("input");
  input.type = type;
  input.name = `field_${fieldCount}`;
  input.placeholder = `Enter ${type}`;

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => wrapper.remove());

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  wrapper.appendChild(delBtn);
  form.appendChild(wrapper);
});

submitBtn.addEventListener("click", () => {
  const data = {};
  const inputs = form.querySelectorAll("input");
  inputs.forEach((inp) => {
    data[inp.name] = inp.value;
  });
  output.textContent = JSON.stringify(data, null, 2);
  console.log(data);
});

resetBtn.addEventListener("click", () => {
  form.innerHTML = "";
  output.textContent = "";
  fieldCount = 0;
});
```

### How you test

- Add fields of various types.
- Type values.
- Click Submit to see JSON.
- Click Reset to clear form.

---

## Task 2 — Dynamic table: add, delete, search

### Goal

- Form to add rows (Name, Age, Role)
- Each row has Delete button
- Search filters by name

### Files

**task2.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Task 2 - Dynamic Table</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        padding: 12px;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      .controls {
        margin-bottom: 12px;
      }
    </style>
    <script defer src="./task2.js"></script>
  </head>
  <body>
    <h2>Dynamic Table</h2>

    <div class="controls">
      <input id="search" placeholder="Search by name" />
    </div>

    <form id="add-form">
      <input id="name" placeholder="Name" required />
      <input id="age" placeholder="Age" type="number" required />
      <input id="role" placeholder="Role" required />
      <button type="submit">Add Row</button>
    </form>

    <table id="people-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </body>
</html>
```

**task2.js**

```javascript
const addForm = document.getElementById("add-form");
const tableBody = document.querySelector("#people-table tbody");
const search = document.getElementById("search");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const role = document.getElementById("role").value.trim();
  addRow({ name, age, role });
  addForm.reset();
});

function addRow({ name, age, role }) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="name-cell">${name}</td>
    <td>${age}</td>
    <td>${role}</td>
    <td><button type="button" class="delete">Delete</button></td>
  `;
  tableBody.appendChild(tr);
  tr.querySelector(".delete").addEventListener("click", () => tr.remove());
}

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  Array.from(tableBody.rows).forEach((row) => {
    const nameCell = row.querySelector(".name-cell").textContent.toLowerCase();
    row.style.display = nameCell.includes(q) ? "" : "none";
  });
});
```

How it uses `insertRow`, `deleteRow`, `textContent`

- This example uses `innerHTML` to build row. If you need `insertRow`:

```javascript
const newRow = tableBody.insertRow();
const cell1 = newRow.insertCell();
cell1.textContent = name;
```

---

## Task 3 — Theme switcher with persistence

### Goal

- Toggle theme on button click
- Save choice in `localStorage`
- Apply persisted theme on load

### Files

**task3.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Task 3 - Theme Switcher</title>
    <style>
      :root {
        --bg: #fff;
        --text: #000;
      }
      body {
        background: var(--bg);
        color: var(--text);
        font-family: Arial, Helvetica, sans-serif;
        padding: 12px;
      }
      .dark {
        --bg: #222;
        --text: #eee;
      }
      .switch {
        margin-top: 12px;
      }
    </style>
    <script defer src="./task3.js"></script>
  </head>
  <body>
    <h2>Theme Switcher</h2>
    <button id="toggle-theme">Toggle Theme</button>
    <p class="switch">Current theme will persist across reloads</p>
  </body>
</html>
```

**task3.js**

```javascript
const btn = document.getElementById("toggle-theme");
const root = document.documentElement; // <html>

function applyTheme(theme) {
  if (theme === "dark") {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

btn.addEventListener("click", () => {
  const isDark = root.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});

// apply on load
const saved = localStorage.getItem("theme") || "light";
applyTheme(saved);
```

How to test

- Click Toggle Theme.
- Reload. Theme persists.

---

# Extra tips and best practices

- Prefer `textContent` for user supplied text.
- Use `createDocumentFragment()` to batch many nodes before appending. This reduces reflow.
- Keep style changes in CSS classes, toggle classes from JS. This keeps separation of concerns.
- Use `closest` to find the nearest ancestor matching selector. That helps event delegation.
- Use event delegation for lists and tables to reduce many listeners.

Example: event delegation for delete buttons

```javascript
tableBody.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    const tr = e.target.closest("tr");
    tr.remove();
  }
});
```

---

# Short checklist for debugging DOM issues

- Is element selected correctly? Check `console.log(element)`
- Are you running code before DOM loads? Use `defer` or `DOMContentLoaded`
- Is the node a text node? Use `firstElementChild` or `children` to skip text nodes
- Are styles overridden by CSS specificity? Check computed style
