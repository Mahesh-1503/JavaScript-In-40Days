# **Project 1: Text Highlighter (Using querySelectorAll)**

---

### **Goal**

Highlight specific paragraphs when a user clicks a button.

---

### **Real-world scenario**

Imagine a blog site. You want to highlight all “important” paragraphs marked by a special class when the reader clicks _Highlight_.
You don’t want every paragraph, only the ones tagged as “info”.

---

### **HTML**

```html
<h1 id="heading">Welcome to the Day 17</h1>
<p class="info">Hope you are enjoying 40 days of JavaScript!</p>
<p class="info">Make sure to Subscribe to tapaScript!</p>
<p>Hope you are enjoying it!</p>
<button onclick="highlightText()">Highlight</button>
```

---

### **JavaScript**

```js
function highlightText() {
  console.log("About to highlight a text...");

  let elements = document.querySelectorAll("p.info");

  elements.forEach((element) => {
    element.style.backgroundColor = "yellow";
  });
}
```

---

### **Step-by-step build**

1. Start with multiple `<p>` tags.
2. Give a few of them a shared class name like `"info"`.
3. Add a button that calls `highlightText()` when clicked.
4. Inside the function:

   - Use `document.querySelectorAll("p.info")` to select all paragraphs with class “info”.
   - Loop through them using `forEach()`.
   - Apply a yellow background color.

---

### **Why `querySelectorAll`**

- It uses **CSS-style selectors**, so `"p.info"` directly targets all `<p>` tags with class “info”.
- It returns a **NodeList** that you can loop through easily using `forEach`.

---

### **Why not `getElementById`**

- `getElementById()` can only target **one element** by unique ID.
- We have multiple `<p>` tags to change, not one.

---

### **Why not `getElementsByClassName`**

- It returns an **HTMLCollection**, which doesn’t support `forEach()` directly.
- You’d need to manually convert it into an array using `Array.from()`.
- `querySelectorAll()` is simpler for this task.

---

### **Practice tasks**

1. Change the highlight color to light green.
2. Add a counter below the button showing how many paragraphs were highlighted.
3. Add another button “Remove Highlight” that resets background colors.

---

### **Real-life example**

This same logic powers:

- “Find keyword” highlight features in online editors.
- “Mark as Important” actions in dashboards.
- “Filter by tag” functions in blog management tools.

---

# **Project 2: Dynamic List Filter (Using getElementById + querySelectorAll)**

---

### **Goal**

Filter visible list items based on what the user types in an input box.

---

### **Real-world scenario**

Think of the search bar in your phone’s contact list or an e-commerce product filter.
As you type, only items that match stay visible.

---

### **HTML**

```html
<input
  type="text"
  id="searchInput"
  placeholder="Search..."
  onkeyup="filterList()"
/>
<ul id="itemList">
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
  <li>Grapes</li>
  <li>Orange</li>
</ul>
```

---

### **JavaScript**

```js
function filterList() {
  const inputElem = document.getElementById("searchInput");
  const input = inputElem.value;

  const items = document.querySelectorAll("ul#itemList li");

  items.forEach((item) => {
    item.style.display = item.innerText
      .toLowerCase()
      .includes(input.toLowerCase())
      ? "block"
      : "none";
  });
}
```

---

### **Step-by-step build**

1. Add an input field (`type="text"`) with an `onkeyup` event calling `filterList()`.
2. Create a `<ul>` with `<li>` items (like a grocery list).
3. In JavaScript:

   - Use `getElementById("searchInput")` to access the text input.
   - Store its `.value` in a variable.
   - Use `querySelectorAll("ul#itemList li")` to get all `<li>` inside the list.
   - For each `<li>`, check if the text includes the input value.
   - Show or hide items based on match.

---

### **Why `getElementById` for input**

- The input field has a **unique ID**, so `getElementById` is direct and efficient.
- It’s the best method for single, unique elements.

---

### **Why `querySelectorAll` for list items**

- It lets you use a **CSS chain selector** (`ul#itemList li`) to get all list items inside a specific `<ul>`.
- Returns a NodeList that supports `forEach()` — ideal for iteration.

---

### **Why not `getElementsByTagName`**

- `getElementsByTagName("li")` would return **every `<li>` on the page**, not just inside the `#itemList`.
- `querySelectorAll("ul#itemList li")` restricts the search precisely where you want.

---

### **Why not `getElementsByClassName`**

- List items don’t share a class; they’re plain `<li>` tags.
- You’d need to manually add a class to each, which is unnecessary here.

---

### **Practice tasks**

1. Add more list items and test your filter.
2. Make the search case-insensitive (already handled with `.toLowerCase()` here).
3. Display a message like “No match found” when nothing matches.
4. Clear the search box automatically after pressing Enter.

---

### **Real-life examples**

This logic is used in:

- Real-time search bars (e.g., contacts, products).
- Admin dashboards for filtering users.
- Online dictionaries or glossary lookup fields.

---

# **Comparison Summary: When to Use Which DOM Selector**

| Selector                 | Best For                     | Returns        | Loop Support     | Example Use         |
| ------------------------ | ---------------------------- | -------------- | ---------------- | ------------------- |
| `getElementById`         | Single unique element        | Element        | ❌               | Input, Header       |
| `getElementsByClassName` | Multiple same-class elements | HTMLCollection | Needs conversion | Product cards       |
| `getElementsByTagName`   | All elements of one type     | HTMLCollection | Needs conversion | All `<p>` or `<li>` |
| `querySelector`          | First element match          | Element        | ❌               | First `.btn`        |
| `querySelectorAll`       | All matches (CSS selector)   | NodeList       | ✅               | `.info`, `ul li`    |

---

# **Instructor Challenge (Applied Extension)**

Build a combined mini tool:

- One section to highlight all “special” paragraphs.
- One section with a search bar to filter a list.
- Add a “Reset” button that clears both highlights and search filters.

This blends both projects into a real-world DOM-driven dashboard page.
