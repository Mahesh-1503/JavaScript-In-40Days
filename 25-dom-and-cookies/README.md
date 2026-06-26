# Day 25: DOM & Cookies (Google Docs UI & Auth Engine)

The **DOM (Document Object Model)** is the browser's live, object-oriented representation of HTML documents, allowing JavaScript to dynamically update content and styles. Additionally, **Cookies** manage stateless HTTP connections by persisting session data. Writing premium interfaces requires understanding browser rendering performance (reflows) and security vectors (XSS, CSRF).

---

## 1. Mental Model (The Google Docs Editor)

Think of a document editor like **Google Docs**:
1. **The DOM Tree:** Every page, paragraph, header, and image block in your document is a node in the DOM. The editor acts as the root node.
2. **DOM Manipulation:** When you click "Insert Image" or press Enter to start a new line, JavaScript dynamically creates new DOM elements and inserts them into the document container.
3. **Event Delegation:** A single document can have thousands of characters and lines. Instead of adding click listeners to every single word (which crashes the tab), we attach a single listener to the parent editor box, intercepting clicks as they bubble up (Event Delegation).
4. **Auth Cookies:** When you share or edit a doc, the browser sends an authentication cookie (`session_token`) to verify your identity. This token must be protected against malicious hackers.

---

## 2. Visual Thinking (DOM Tree & Bubbling)

How the browser tree resolves node structures and bubbles events upward:

### The DOM Tree Structure
```
                document (Root)
                    │
                  <html>
                    │
                  <body>
         ┌──────────┴──────────┐
       <head>               <main> (Docs Editor)
         │                     │
      <title>        ┌─────────┴─────────┐
                   <h1>                <div> (Document Body)
                                         │
                                ┌────────┴────────┐
                               <p>               <p>
```

### Event Bubbling Flow (Clicking inside paragraph `<p>`)
```
[1. Target Click: <p>] ──► [2. Bubbles to: <div>] ──► [3. Bubbles to: <main>] (Handled here!)
```

---

## 3. Beginner Explanation

- **DOM:** The live structure of a webpage. JavaScript can edit this structure to add text, modify colors, or remove images.
- **Selector:** A query helper (like `document.querySelector(".class")`) used to locate a specific element in the page.
- **Reflow & Repaint:**
  - **Reflow:** The browser calculating the layout coordinates (size and position) of elements. (Slow).
  - **Repaint:** Drawing colors, text, and styles onto the screen once coordinates are resolved.
- **Bubbling:** When an event (like a click) happens on a child element, it automatically ripples upward to its parents.
- **Cookie:** A small text file stored by your browser containing credentials. The browser attaches cookies to every network request automatically.

---

## 4. Deep Explanation (Critical Rendering Path & Cookies Security)

To write high-performance, secure frontends, we must master DOM rendering pipelines and cookie headers:

### 1. The Critical Rendering Path (CRP)
When you modify the DOM, the browser executes the following pipeline:
1. **Recalculate Style:** Combines DOM and CSSOM to determine final styles.
2. **Layout (Reflow):** Computes geometric boundaries, dimensions, and positions of nodes. Triggered by changing width, height, margin, or layout nodes.
3. **Paint (Repaint):** Re-draws pixels (colors, shadows, background images).
4. **Composite:** Merges layers onto the screen.
- **Performance Rule:** Always minimize Reflows. Changing layout properties repeatedly inside loops blocks the main thread, causing page lag (Layout Thrashing).

### 2. Event Delegation Mechanics
Creating individual listeners for hundreds of list rows consumes memory. Instead, we register a single listener on a shared parent node. When an event fires on a child, it **bubbles** up to the parent. The parent queries `event.target` to identify which child was clicked.

### 3. Cookies Security Flags
Cookies must be protected from Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) using flags:
- **`HttpOnly`:** Prevents JavaScript from reading the cookie (`document.cookie`), blocking token theft via malicious scripts.
- **`Secure`:** Forces the browser to send the cookie only over encrypted HTTPS connections.
- **`SameSite=Strict/Lax`:** Restricts cookies from being sent along with cross-site requests, mitigating CSRF attacks.

---

## 5. Real Production Examples (Google Docs flows)

### 1. Document Paragraph Creator (DOM Manipulation)
Creates a new paragraph block with styling.
```javascript
function insertParagraphBlock(text) {
  const mainEditor = document.getElementById("docs-editor-body");
  
  // 1. Create element
  const paragraph = document.createElement("p");
  
  // 2. Set safe text content (prevents XSS)
  paragraph.textContent = text; 
  paragraph.classList.add("editor-block", "paragraph-spacing");
  
  // 3. Append to DOM
  mainEditor.appendChild(paragraph);
}
```

### 2. Batch Blocks Insertion (DocumentFragment)
When inserting multiple nodes, appending them one by one triggers multiple reflows. We compile them inside an in-memory `DocumentFragment` first, performing a single insertion.
```javascript
function insertMultipleBlocks(blocksArray) {
  const mainEditor = document.getElementById("docs-editor-body");
  const fragment = document.createDocumentFragment(); // Virtual DOM Container
  
  blocksArray.forEach(block => {
    const el = document.createElement("div");
    el.textContent = block.text;
    el.className = `block-${block.type}`;
    fragment.appendChild(el); // Appends to fragment in memory (no reflow)
  });
  
  mainEditor.appendChild(fragment); // Single DOM insert, Single Reflow!
}
```

### 3. Document Editor Events Delegator (Event Delegation)
Intercepts clicks on editor elements dynamically.
```javascript
const editorBody = document.getElementById("docs-editor-body");

editorBody.addEventListener("click", (event) => {
  // Identify target element by class name
  if (event.target.classList.contains("editor-image")) {
    console.log("Image block clicked:", event.target.id);
  }
  if (event.target.classList.contains("editor-heading")) {
    console.log("Heading block clicked:", event.target.textContent);
  }
});
```

### 4. Auth Cookie Creator
Sets a secure session cookie. (Must be set from server responses for HttpOnly, but client-side sets basic configs).
```javascript
function setSessionCookie(token) {
  // Secure SameSite cookie configuration
  document.cookie = `session_token=${token}; max-age=86400; path=/; Secure; SameSite=Strict`;
}
```

### 5. Client Cookie Parser
```javascript
function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  const targetCookie = cookies.find(row => row.startsWith(`${cookieName}=`));
  return targetCookie ? targetCookie.split("=")[1] : null;
}
```

---

## 6. Progressive Coding (Document Builder)

### Level 1: Beginner (Direct InnerHTML - Severe XSS Vulnerability)
```javascript
// BAD: Prone to Cross-Site Scripting (XSS). If input is '<img src=x onerror=alert(1)>', script runs!
function addDocBlock(userInput) {
  const container = document.getElementById("editor");
  container.innerHTML += `<div class="block">${userInput}</div>`; // Reparses entire container!
}
```

### Level 2: Better (TextContent Elements Creation)
```javascript
// BETTER: Safe from XSS, but performs multiple reflows on repetitive runs
function addDocBlock(userInput) {
  const container = document.getElementById("editor");
  const div = document.createElement("div");
  div.className = "block";
  div.textContent = userInput; // Automatically sanitizes tags
  container.appendChild(div);
}
```

### Level 3: Production (Fragment Batch Caching)
```javascript
// PRODUCTION: Fast batch rendering, safe from scripting attacks
function addMultipleBlocks(items) {
  const container = document.getElementById("editor");
  const fragment = document.createDocumentFragment();
  
  items.forEach(text => {
    const div = document.createElement("div");
    div.className = "block";
    div.textContent = text;
    fragment.appendChild(div);
  });
  
  container.appendChild(fragment);
}
```

### Level 4: Enterprise (Virtual DOM Diffing & Render Queue Engine)
```javascript
// ENTERPRISE: A robust rendering controller that batches DOM writes using 
// RequestAnimationFrame, protecting the layout from thrashing and reflow bottlenecks.
class DOMRenderQueue {
  constructor() {
    this.writeQueue = [];
    this.frameRequested = false;
  }

  enqueueWrite(actionFn) {
    this.writeQueue.push(actionFn);
    this.requestFrame();
  }

  requestFrame() {
    if (this.frameRequested) return;
    this.frameRequested = true;

    // Run queue inside browser's layout frame tick (60fps optimized)
    requestAnimationFrame(() => {
      this.flushQueue();
    });
  }

  flushQueue() {
    console.log(`Flushing DOM Queue: Processing ${this.writeQueue.length} operations.`);
    
    // Execute all pending DOM alterations in a single render pass
    while (this.writeQueue.length > 0) {
      const action = this.writeQueue.shift();
      try {
        action();
      } catch (err) {
        console.error("DOM Write Failed:", err);
      }
    }
    
    this.frameRequested = false;
  }
}

const renderQueue = new DOMRenderQueue();
const editorContainer = document.getElementById("editor");

// Queue multiple DOM operations safely
renderQueue.enqueueWrite(() => {
  const title = document.createElement("h1");
  title.textContent = "Annual Financial Audit";
  editorContainer.appendChild(title);
});
```

---

## 7. Common Mistakes

1. **Writing raw HTML strings using `.innerHTML`:**
   Exposes the application to Cross-Site Scripting (XSS) attacks. Always sanitize inputs or use `.textContent` / `.innerText`.
2. **Layout Thrashing (Read/Write interleaved loops):**
   Reading layout values (like `offsetWidth`) immediately after writing them inside a loop forces the browser to recalculate the layout on every iteration.
   ```javascript
   // BUG: Forces reflow 100 times!
   for (let i = 0; i < divList.length; i++) {
     divList[i].style.width = container.offsetWidth + "px"; 
   }
   // Fix: const width = container.offsetWidth; cache it outside the loop header.
   ```
3. **Leaving Event Listeners active on deleted elements:**
   Failing to clean up event listeners on elements that are removed from the DOM can create memory leaks (Retained Nodes).

---

## 8. Best Practices

1. **Always use Event Delegation:** Bind a single listener on parent containers instead of attaching listeners to multiple child elements.
2. **Use DocumentFragment for batch inserts:** Keeps layout calculations minimal.
3. **Set Cookie flags appropriately:** Always enforce `Secure`, `HttpOnly` (for sensitive tokens), and `SameSite` flags.

---

## 9. Interview Preparation

### Q1: What is the difference between Reflow (Layout) and Repaint?
**Answer:**
- **Reflow (Layout):** The process where the browser calculates the positions and sizes of all elements on the page. Triggered by geometric changes (e.g. altering width, height, padding, margins, or fonts). It is computationally expensive.
- **Repaint:** The process where the browser draws the colors, text, borders, and shadows of elements based on the computed layout. Triggered by non-geometric styling changes (e.g. color, background-color, visibility). It is faster than reflow.

### Q2: How does Event Delegation work?
**Answer:** Event Delegation is a pattern that leverages **Event Bubbling**. Instead of attaching listeners to individual child elements, you attach a single listener to a common parent element. When a child is clicked, the event bubbles up to the parent. The parent handler inspects `event.target` to identify which child was clicked and runs the appropriate logic.

### Q3: What is the difference between `HttpOnly`, `Secure`, and `SameSite` cookie flags?
**Answer:**
- **`HttpOnly`:** Prevents client-side scripts (JavaScript) from reading the cookie, blocking token theft via Cross-Site Scripting (XSS).
- **`Secure`:** Ensures the cookie is sent only over HTTPS connections, protecting it from network sniffing.
- **`SameSite`:** Restricts the cookie from being sent on cross-site requests (values: `Strict`, `Lax`, `None`), mitigating Cross-Site Request Forgery (CSRF).

---

## 10. Homework

1. **Text Highlighter Selectors:** Write a script containing selector filters (`querySelectorAll`). Target specific headings and highlight matching keyword search text nodes.
2. **Todo Manager with Fragments:** Code a todo list task loader that takes an array of tasks and renders them using a `DocumentFragment` to limit reflow calculations.
3. **Clicks Auditor Delegator:** Set up a click delegator on an HTML page container. Log the tag name, class name, and text content of any clicked child element.
4. **Session Cookie Manager:** Create client-side cookie helpers `setSessionCookie(name, val)` and `getSessionCookie(name)` enforcing Secure and SameSite rules.
5. **Layout Thrashing Benchmark:** Write a loop that creates 1,000 divs and updates their dimensions. Benchmark reading-then-writing values inside the loop vs caching values outside. Log the millisecond durations.
