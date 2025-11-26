# JavaScript Events

Self-learning notes by **Pothu Mahesh Kumar**

---

## 1. What Is an Event

You use events to react when something happens in the browser.

Examples

- User clicks a button
- User types in a text box
- Page finishes loading
- Mouse moves over an image

When an event happens, JavaScript runs your function.
That function is called an event handler or listener.

Think of a doorbell

- Event: Someone presses the bell
- Handler: The bell sound
- JavaScript event: user action
- JavaScript handler: your function

### Full example: simple click event

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>What Is an Event</title>
  </head>
  <body>
    <h1>Click Event Demo</h1>

    <button onclick="showMessage()">Click me</button>

    <script>
      function showMessage() {
        alert("Button clicked. This is an event in action.");
      }
    </script>
  </body>
</html>
```

Real life example

- In a shopping site

  - You click “Add to Cart”
  - Click event triggers
  - Handler adds item to your cart and updates count

### Tasks for this concept

1. Create a new HTML file with a button. When you click, show alert `"Hello Events"`.
2. Add a button that, when clicked, adds a new paragraph with text `"Welcome"` at the bottom of the page.
3. Put an image on the page. When the user clicks the image, show alert `"Image clicked"`.
4. Add a button `"Change Background"`. On click, change `document.body.style.backgroundColor` to a different color.
5. Display a number starting from 0 in a `<span>`. Each time you click a button, increase the number by 1 and update the text.

---

## 2. Ways to Attach Event Handlers

You attach code to events in three main ways.

- HTML event attributes
- DOM properties
- `addEventListener`

Real life example

- Think of three ways to instruct a student

  - Write instruction directly on the desk (HTML attribute)
  - Tell the student once directly (DOM property)
  - Maintain a list of instructions for the same student (addEventListener)

### 2.1 HTML Event Attributes

You write the handler directly in HTML.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Event Attribute</title>
  </head>
  <body>
    <h1>HTML Event Attribute Example</h1>

    <button onclick="sayHello()">Click using onclick</button>

    <script>
      function sayHello() {
        alert("Hello from onclick attribute.");
      }
    </script>
  </body>
</html>
```

Pros

- Easy to start for beginners

Cons

- Mixes HTML and JS
- Hard to maintain for large apps

---

### 2.2 DOM Property

You set `element.onclick` in JavaScript.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DOM Property Handler</title>
  </head>
  <body>
    <h1>DOM Property Event Example</h1>

    <button id="btn">Click using DOM property</button>

    <script>
      const btn = document.getElementById("btn");

      btn.onclick = function () {
        alert("Hello from DOM property onclick.");
      };

      // Overwriting the handler
      // Uncomment this to see that it replaces the old handler
      /*
      btn.onclick = function () {
        alert("This replaces the previous handler.");
      };
      */
    </script>
  </body>
</html>
```

Key point

- Only one function at a time
- New assignment overwrites old handler

---

### 2.3 addEventListener

This is the recommended modern way.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>addEventListener Example</title>
  </head>
  <body>
    <h1>addEventListener Demo</h1>

    <button id="btn2">Click using addEventListener</button>

    <script>
      const btn2 = document.getElementById("btn2");

      function handlerOne() {
        console.log("Handler One");
      }

      function handlerTwo() {
        console.log("Handler Two");
      }

      btn2.addEventListener("click", handlerOne);
      btn2.addEventListener("click", handlerTwo);
    </script>
  </body>
</html>
```

Pros

- Multiple handlers for same event
- Works with both bubbling and capturing
- Cleaner separation of HTML and JS

Real life example

- School notice board

  - DOM property: one notice at a time
  - addEventListener: many notices on the same board, all valid

### Tasks for this concept

1. Create one page that shows the same button used in all three ways
   HTML `onclick`, `btn.onclick` in JS, and `addEventListener`.
2. Use `btn.onclick` to show alert `"First handler"`, then reassign it to show `"Second handler"`. Notice the first one is gone.
3. Use `addEventListener` to attach two different click handlers to a button, both logging different messages.
4. Write code where you first attach a handler using `addEventListener`, then remove it using `removeEventListener`.
5. Take an existing inline `onclick` example and refactor it to use `addEventListener` only.

---

## 3. Common Event Types

You use many types of events in daily web work.

### 3.1 Mouse Events

- `click`
- `dblclick`
- `mouseover`
- `mouseout`
- `mousedown`
- `mouseup`

### 3.2 Keyboard Events

- `keydown`
- `keyup`
- `keypress` (older, avoid now)

### 3.3 Form Events

- `submit`
- `input`
- `change`
- `focus`
- `blur`

### 3.4 Window and Document Events

- `load`
- `DOMContentLoaded`
- `resize`
- `scroll`

Real life example

- In a registration form

  - `input` as user types
  - `change` when field loses focus with new value
  - `submit` when user presses the submit button

### Full example: many events in one page

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Common Events Demo</title>
    <style>
      #hoverBox {
        width: 200px;
        height: 100px;
        border: 1px solid black;
        margin-bottom: 16px;
      }
      #log {
        border: 1px solid gray;
        padding: 8px;
        height: 120px;
        overflow-y: auto;
        font-size: 14px;
      }
      body {
        height: 2000px;
      }
      .fixed-box {
        position: fixed;
        right: 10px;
        bottom: 10px;
        background-color: white;
        padding: 8px;
        border: 1px solid gray;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <h1>Common JavaScript Events</h1>

    <div id="hoverBox">Move your mouse over me</div>

    <form id="sampleForm">
      <label>
        Name:
        <input type="text" id="nameInput" />
      </label>
      <button type="submit">Submit</button>
    </form>

    <div id="log"></div>

    <div class="fixed-box" id="scrollInfo">Scroll Y: 0</div>

    <script>
      const hoverBox = document.getElementById("hoverBox");
      const log = document.getElementById("log");
      const form = document.getElementById("sampleForm");
      const nameInput = document.getElementById("nameInput");
      const scrollInfo = document.getElementById("scrollInfo");

      function addLog(message) {
        const p = document.createElement("p");
        p.textContent = message;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
      }

      hoverBox.addEventListener("mouseover", function () {
        hoverBox.style.backgroundColor = "lightblue";
        addLog("Mouse over box");
      });

      hoverBox.addEventListener("mouseout", function () {
        hoverBox.style.backgroundColor = "";
        addLog("Mouse left box");
      });

      document.addEventListener("keydown", function (e) {
        addLog("Key down: " + e.key);
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        addLog("Form submitted with name: " + nameInput.value);
      });

      nameInput.addEventListener("focus", function () {
        addLog("Name input focused");
      });

      nameInput.addEventListener("blur", function () {
        addLog("Name input blurred");
      });

      document.addEventListener("scroll", function () {
        scrollInfo.textContent = "Scroll Y: " + window.scrollY;
      });

      document.addEventListener("DOMContentLoaded", function () {
        addLog("DOM fully loaded");
      });
    </script>
  </body>
</html>
```

### Tasks for this concept

1. Log every key the user presses using `keydown`. Display it in a `<div>` instead of console.
2. Create a heading. On `mouseover`, change its color to red. On `mouseout`, change it back.
3. Make a form with an email input. On submit, prevent default and display `"Thank you, [email]"` below the form.
4. Create a box in the bottom-right corner that shows current scroll Y position, updating on every `scroll`.
5. Use `DOMContentLoaded` to show `"Page is ready"` inside a `<p>` when the HTML is parsed.

---

## 4. The Event Object

When an event runs your handler, the browser passes an event object.

Typical parameter name: `event` or `e`.

It contains details about

- What happened
- Which element got interacted with
- Extra data like mouse position or key pressed

Think of it like a report slip

- Teacher gives student a slip with subject, marks, remarks
- Browser gives your function an object with type, target, position, keys

Key properties

- `type`
- `target`
- `currentTarget`
- `key`
- `clientX`, `clientY`
- `ctrlKey`, `shiftKey`, `altKey`

### Full example: event inspector

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Event Object Demo</title>
    <style>
      #clickArea {
        width: 300px;
        height: 150px;
        border: 2px dashed gray;
        margin-bottom: 16px;
      }
      #info {
        border: 1px solid black;
        padding: 8px;
        min-height: 80px;
        font-size: 14px;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <h1>Event Object Example</h1>

    <div id="clickArea">Click or move your mouse here</div>

    <input type="text" id="keyInput" placeholder="Type here and press keys" />

    <div id="info"></div>

    <script>
      const clickArea = document.getElementById("clickArea");
      const keyInput = document.getElementById("keyInput");
      const info = document.getElementById("info");

      function show(message) {
        info.textContent = message;
      }

      clickArea.addEventListener("click", function (event) {
        const message =
          "Click Event\n" +
          "Type: " +
          event.type +
          "\n" +
          "Target tag: " +
          event.target.tagName +
          "\n" +
          "Position: (" +
          event.clientX +
          ", " +
          event.clientY +
          ")";
        show(message);
      });

      clickArea.addEventListener("mousemove", function (event) {
        const message =
          "Mouse Move\n" +
          "Position: (" +
          event.clientX +
          ", " +
          event.clientY +
          ")";
        show(message);
      });

      keyInput.addEventListener("keydown", function (event) {
        const message =
          "Key Down\n" +
          "Key: " +
          event.key +
          "\n" +
          "Ctrl: " +
          event.ctrlKey +
          "\n" +
          "Shift: " +
          event.shiftKey +
          "\n" +
          "Alt: " +
          event.altKey;
        show(message);
      });
    </script>
  </body>
</html>
```

Real life example

- Gaming controls

  - If `event.key === "ArrowUp"`, move player up
  - If `event.key === "Space"`, make player jump

### Tasks for this concept

1. Build a page where clicking anywhere shows the clicked element’s tag name and text inside a fixed info box.
2. Show real-time mouse coordinates in the bottom-left corner of the page using `mousemove`.
3. In an input field, when user presses Enter (`event.key === "Enter"`), show alert with the entered text.
4. Create buttons inside a container. On click, use `event.target.textContent` to alert which button was clicked.
5. Create a box that changes color only when user `Ctrl + Click`s on it. Use `event.ctrlKey` in the handler.

---

## 5. Event Bubbling, Capturing, stopPropagation, preventDefault

When you click an element inside another element, the event travels through a path.

Phases

- Capturing phase: top to target
- Target phase
- Bubbling phase: target back to top

By default, handlers run in bubbling phase.

Real life example

- School announcement

  - Principal tells vice principal
  - Vice principal tells heads
  - Heads tell class teachers
  - Information “flows” through levels

### Bubbling demo with stopPropagation and preventDefault

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Event Bubbling and Capturing</title>
    <style>
      .outer {
        padding: 30px;
        background-color: #f0c0c0;
      }
      .middle {
        padding: 30px;
        background-color: #c0f0c0;
      }
      .inner {
        padding: 30px;
        background-color: #c0c0f0;
      }
      a {
        display: inline-block;
        margin-top: 10px;
      }
      #log {
        margin-top: 16px;
        border: 1px solid black;
        padding: 8px;
        height: 120px;
        overflow-y: auto;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <h1>Event Bubbling, Capturing, and Control</h1>

    <div class="outer" id="outer">
      Outer
      <div class="middle" id="middle">
        Middle
        <div class="inner" id="inner">Inner (click here)</div>
      </div>
    </div>

    <p>
      <a href="https://example.com" id="demoLink">Click this link</a>
      (we will prevent navigation)
    </p>

    <div id="log"></div>

    <script>
      const outer = document.getElementById("outer");
      const middle = document.getElementById("middle");
      const inner = document.getElementById("inner");
      const log = document.getElementById("log");
      const demoLink = document.getElementById("demoLink");

      function addLog(message) {
        const p = document.createElement("p");
        p.textContent = message;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
      }

      outer.addEventListener("click", function () {
        addLog("Outer clicked (bubbling).");
      });

      middle.addEventListener("click", function () {
        addLog("Middle clicked (bubbling).");
      });

      inner.addEventListener("click", function (event) {
        addLog("Inner clicked (bubbling).");
        // Try commenting and uncommenting to see effect
        // event.stopPropagation();
      });

      outer.addEventListener(
        "click",
        function () {
          addLog("Outer clicked (capturing).");
        },
        { capture: true }
      );

      middle.addEventListener(
        "click",
        function () {
          addLog("Middle clicked (capturing).");
        },
        { capture: true }
      );

      inner.addEventListener(
        "click",
        function () {
          addLog("Inner clicked (capturing).");
        },
        { capture: true }
      );

      demoLink.addEventListener("click", function (event) {
        event.preventDefault();
        addLog("Link click prevented. No navigation.");
      });
    </script>
  </body>
</html>
```

Key ideas

- Bubbling: inner to outer
- Capturing: outer to inner
- `stopPropagation()` stops event from traveling further
- `preventDefault()` stops default browser action (like navigation, form submit)

Real life example

- `preventDefault()`

  - Teacher stops a student before submitting wrong exam sheet and asks to correct it

### Tasks for this concept

1. Rebuild outer–middle–inner nested divs and log which one receives click first in bubbling.
2. Use capturing handlers (`{ capture: true }`) on those divs and log order again. Compare both orders.
3. Call `stopPropagation()` in the inner div handler and confirm that middle and outer bubbling handlers do not run.
4. Create a form with a submit button. Use `preventDefault()` to stop the form, then show `"Form blocked for validation"` instead.
5. Place a button inside a link. Use `stopPropagation()` on the button so that clicking the button does not trigger the link click.

---

## 6. Event Delegation and Custom Events

### 6.1 Event Delegation

Instead of adding handlers to each child item, you add one handler to the parent and use `event.target` to check what was clicked.

Real life example

- Teacher tells class monitor

  - “If anyone raises hand, ask what they want”
  - Teacher does not talk to each student separately

This is powerful for dynamic lists and tables.

### 6.2 Custom Events

You define your own event types with `CustomEvent` and `dispatchEvent`.

Useful for

- Communication between components
- Broadcasting changes

Real life example

- You run a coding club

  - You create your own code “STATUS_UPDATED”
  - Whenever status changes, all listeners respond to this event

### Full example: delegation + custom event

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Event Delegation and Custom Events</title>
    <style>
      #studentList li {
        cursor: pointer;
        padding: 4px;
      }
      #studentList li.selected {
        background-color: lightgreen;
      }
      #log {
        margin-top: 16px;
        border: 1px solid black;
        padding: 8px;
        height: 120px;
        overflow-y: auto;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <h1>Delegation and Custom Events</h1>

    <button id="addStudent">Add New Student</button>

    <ul id="studentList">
      <li data-name="Anita">Anita</li>
      <li data-name="Rahul">Rahul</li>
      <li data-name="Sita">Sita</li>
    </ul>

    <div id="log"></div>

    <script>
      const studentList = document.getElementById("studentList");
      const addStudent = document.getElementById("addStudent");
      const log = document.getElementById("log");

      function addLog(message) {
        const p = document.createElement("p");
        p.textContent = message;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
      }

      studentList.addEventListener("click", function (event) {
        if (event.target.tagName !== "LI") {
          return;
        }

        const li = event.target;

        const previous = studentList.querySelector(".selected");
        if (previous) {
          previous.classList.remove("selected");
        }

        li.classList.add("selected");

        const selectedName = li.dataset.name;

        const studentSelectedEvent = new CustomEvent("student-selected", {
          detail: { name: selectedName },
        });

        studentList.dispatchEvent(studentSelectedEvent);
      });

      studentList.addEventListener("student-selected", function (event) {
        addLog("Student selected: " + event.detail.name);
      });

      let counter = 4;

      addStudent.addEventListener("click", function () {
        const li = document.createElement("li");
        li.textContent = "Student " + counter;
        li.dataset.name = "Student " + counter;
        counter++;
        studentList.appendChild(li);
      });
    </script>
  </body>
</html>
```

Key points

- Only one click handler on `<ul>`
- Works for all existing and future `<li>` items
- Custom event `"student-selected"` created and dispatched
- Listener logs which student is selected

### Tasks for this concept

1. Create a `<ul>` of fruits. Use event delegation on the `<ul>` to alert the clicked fruit name.
2. Add a button that appends a new `<li>` fruit. Verify delegation works for new items also.
3. Build a todo list where clicking on a todo toggles a `completed` class using a single delegated handler.
4. Create a custom event `"cart-updated"` on `document` that logs `"Cart updated"` in console when fired.
5. After clicking an “Add to Cart” button, dispatch `"cart-updated"` instead of logging directly in the button handler.

---

## Capstone Task

Create a Dynamic Tabbed Interface

This project will combine events, delegation, keyboard events, classList, and custom events.

Requirements

- Clicking a tab header shows matching content
- Only one content is visible at a time
- Active tab has a highlight
- Pressing 1, 2, or 3 switches to that tab
- Use event delegation for tab clicks
- Use `classList` to manage `active` state
- Use custom event to broadcast tab change and log the tab name
- Use `stopPropagation()` if you add nested clickable items inside content and want to stop tab-level handlers

### Full code: tab interface

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Dynamic Tabs - Pothu Mahesh Kumar</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }

      .tabs {
        width: 500px;
        margin: 40px auto;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .tab-headers {
        display: flex;
        border-bottom: 1px solid #ccc;
      }

      .tab-headers .tab {
        flex: 1;
        padding: 10px;
        border: none;
        background-color: #f5f5f5;
        cursor: pointer;
      }

      .tab-headers .tab.active {
        background-color: #ffffff;
        border-bottom: 2px solid #007bff;
        font-weight: bold;
      }

      .tab-contents .content {
        display: none;
        padding: 16px;
      }

      .tab-contents .content.active {
        display: block;
      }

      #log {
        width: 500px;
        margin: 16px auto;
        border: 1px solid #ccc;
        padding: 8px;
        font-size: 14px;
        height: 100px;
        overflow-y: auto;
      }

      .inner-button {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <h1 style="text-align: center;">Dynamic Tabs Example</h1>

    <div class="tabs" id="tabs">
      <div class="tab-headers">
        <button class="tab active" data-tab="1">Home</button>
        <button class="tab" data-tab="2">About</button>
        <button class="tab" data-tab="3">Contact</button>
      </div>
      <div class="tab-contents">
        <div class="content active" data-tab="1">
          <h2>Home</h2>
          <p>Welcome to the Home tab.</p>
          <button class="inner-button">Inner Button (no tab change)</button>
        </div>
        <div class="content" data-tab="2">
          <h2>About</h2>
          <p>Information about our website.</p>
        </div>
        <div class="content" data-tab="3">
          <h2>Contact</h2>
          <p>Contact info is shown here.</p>
        </div>
      </div>
    </div>

    <div id="log"></div>

    <script>
      const tabsRoot = document.getElementById("tabs");
      const tabHeaders = tabsRoot.querySelector(".tab-headers");
      const tabButtons = tabHeaders.querySelectorAll(".tab");
      const tabContents = tabsRoot.querySelectorAll(".content");
      const log = document.getElementById("log");

      function addLog(message) {
        const p = document.createElement("p");
        p.textContent = message;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
      }

      function switchToTab(tabNumber) {
        tabButtons.forEach(function (btn) {
          const isActive = btn.dataset.tab === String(tabNumber);
          btn.classList.toggle("active", isActive);
        });

        tabContents.forEach(function (content) {
          const isActive = content.dataset.tab === String(tabNumber);
          content.classList.toggle("active", isActive);
        });

        const activeButton = tabsRoot.querySelector(".tab-headers .tab.active");
        const tabName = activeButton ? activeButton.textContent : "";

        const tabChangedEvent = new CustomEvent("tab-changed", {
          detail: {
            tabNumber: tabNumber,
            tabName: tabName,
          },
        });

        tabsRoot.dispatchEvent(tabChangedEvent);
      }

      tabHeaders.addEventListener("click", function (event) {
        if (!event.target.classList.contains("tab")) {
          return;
        }

        const tabNumber = event.target.dataset.tab;
        switchToTab(tabNumber);
      });

      tabsRoot.addEventListener("tab-changed", function (event) {
        addLog(
          "Tab changed to: " +
            event.detail.tabName +
            " (Tab " +
            event.detail.tabNumber +
            ")"
        );
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "1") {
          switchToTab(1);
        } else if (e.key === "2") {
          switchToTab(2);
        } else if (e.key === "3") {
          switchToTab(3);
        }
      });

      tabsRoot.addEventListener("click", function (event) {
        if (event.target.classList.contains("inner-button")) {
          event.stopPropagation();
          addLog("Inner button clicked. Tab header click not triggered.");
          alert("Inner button in content clicked.");
        }
      });
    </script>
  </body>
</html>
```

Suggested practice steps

- Change tab names and contents to match your own project
- Add a fourth tab and extend keyboard shortcuts to key `"4"`
- Add visual effects on active content
- Add validation inside one tab, for example a small form
- Try moving the `tab-changed` custom event listener to `document` and compare behavior
