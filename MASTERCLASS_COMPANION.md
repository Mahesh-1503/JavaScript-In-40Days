# 🎓 JavaScript & React: Masterclass Tutor Companion
*Your personal, conversational guide to mastering coding concepts from absolute scratch—before jumping into repository code!*

Welcome, friend! 

If you've ever opened a programming repository and felt overwhelmed by code like `Object.freeze()`, `structuredClone()`, or bitwise masking operations (`this.mask |= permission`), don't worry. This guide is written specifically for you.

We are going to learn **JavaScript** and **React** together, starting from the **extreme basics**. We will use real-world analogies (like kitchen jars, blenders, fast-food counters, and digital scoreboards) to make abstract code feel tangible. Best of all, we will answer your doubts *before* you even have to ask them.

Once you understand the basic concept, we will show you exactly which folder and file in this repository contains the professional-grade implementation.

---

## 📅 Part 1: JavaScript Basics (The Kitchen Analogy)

### 1. Variables & Memory (Jars and Sticky Notes)
In programming, we need to save data so we can use it later. Think of your computer's memory (RAM) as a massive **kitchen cabinet**.
*   **Variables** are the **jars** inside that cabinet.
*   **Declaring a variable** is like taking a jar and slapping a label on it.

In JavaScript, we have three labels for our jars:
1.  **`const` (Constant):** Think of this as a sealed jar. Once you put a value in it, you cannot open it to change the value. (Use this for values that never change, like `const birthYear = 2000`).
2.  **`let`:** Think of this as a jar with a reusable lid. You can open it, dump the contents out, and put something else inside. (Use this for values that change, like `let cartTotal = 0`).
3.  **`var`:** This is an old, leaky jar from the 1990s. It has bad scoping rules that leak contents onto other shelves. **Never use it.**

---

### 2. Primitives vs. Reference Types (Recipes vs. House Addresses)
If you put a piece of paper with a cookie recipe in a jar and copy it for a friend, they get a *photocopy*. If they scribble on their copy, your original recipe stays clean. This is a **Primitive Type** (Numbers, Strings, Booleans). They are copied by value.

Now, imagine you write the **street address of a house** on a sticky note and copy it for a friend. You now have two sticky notes, but they both point to the *exact same physical house*. If your friend goes to that address and paints the front door green, you will see a green door when you visit! This is a **Reference Type** (Objects, Arrays). They are stored in the Heap and copied by reference.

> **Doubt Cleared:** This is why you can mutate properties inside a `const` object!
> ```javascript
> const profile = { name: "Arun" };
> profile.name = "Vijay"; // Allowed!
> ```
> The `const` label only locks the *sticky note* (you can't make `profile` point to a different address), but you can still walk into the house and change the furniture (mutate properties)!

---

### 3. Operators & Logic (The Club Gatekeeper)
Operators are the gatekeepers of control flow.
*   **`&&` (AND):** Think of a strict club. You need an invitation **AND** you must be wearing a suit. If either is missing, you can't enter.
*   **`||` (OR):** Think of a movie theater. You can enter if you have a ticket **OR** if you have a press pass. You only need one of them.
*   **`??` (Nullish Coalescing):** Think of a backup driver. You only call the backup if the main driver is `null` or `undefined` (completely missing). If the main driver is present but just tired (e.g. value is `0` or `""`), you still use them.

---

### 4. Loops (The Running Track)
Loops repeat code until a condition changes.
*   **`for` Loop:** Like running exactly 5 laps around a track. You have a counter (`let lap = 1`), a target (`lap <= 5`), and an increment (`lap++`).
*   **`while` Loop:** Like running until it starts raining. You don't know how many laps it will take, but you check the sky before each lap.
*   **`do...while` Loop:** Like running one lap *first*, and then checking if it's raining. **Guaranteed to run at least once.**
*   **`break`:** Instantly hopping over the fence to leave the track.
*   **`continue`:** Skipping the rest of your current lap and jumping directly to the start of the next lap.

---

## 📅 Part 2: Functions & Core Mechanics (The Event Loop)

### 1. Functions (The Juice Blender)
A function is a reusable machine.
*   **Parameters** are the holes at the top of the blender (placeholders for inputs like fruits).
*   **Arguments** are the actual ingredients you throw in (e.g., `"Banana"` or `"Apple"`).
*   **The Code Block `{...}`** is the spinning blade that blends them.
*   **`return`** is the spout at the bottom that pours out the juice. If you forget to write `return`, the blender grinds the fruit, but you get nothing out (returns `undefined`).

---

### 2. Closures (The Hiker's Backpack)
A **Closure** is one of JavaScript's most magical features.
Imagine a hiker (a function) walking out of a mountain lodge (parent function scope). As they leave, they pack some food and water into their backpack. Even when they are miles away from the lodge, they can still open their backpack and eat the food.

In code:
```javascript
function createCounter() {
  let count = 0; // The lodge variable
  return function() { // The hiker leaving the lodge
    count++; // Accessing variables in the backpack!
    return count;
  };
}
```
The inner function "closes over" (remembers) variables from its parent scope, keeping them alive even after the parent function has finished executing.

---

### 3. Asynchronous JavaScript & The Event Loop (The Fast-Food Counter)
JavaScript is single-threaded—it only has *one* hand to process code. How does it handle long operations (like fetching database profiles) without freezing your browser?

Think of a **Fast-Food Restaurant**:
1.  **Synchronous code (The Counter):** You order a burger. The cashier tells you to wait. They stand there, doing nothing, waiting for the chef to cook the burger. The queue behind you grows. This is **Blocking**.
2.  **Asynchronous code (The Pager System):** You order a burger. The cashier hands you a **Buzzer/Pager** (a **Promise**) and tells you to take a seat. The cashier immediately helps the next customer.
3.  **The Web API (The Kitchen):** The chef cooks your burger in the background.
4.  **The Callback Queue:** Once your burger is ready, your pager vibrates (**Promise resolves**). You line up in the pickup zone.
5.  **The Event Loop (The Food Passer):** The food passer checks the main counter. If the cashier is currently talking to a customer (Call Stack is busy), the passer makes you wait. The second the cashier finishes (Call Stack is empty), the passer calls you up to collect your food (**Callback runs**).

*   **Promise:** A receipt that represents a future value (pending, resolved, or rejected).
*   **Async/Await:** Syntactic sugar. `await` tells JavaScript: *"Pause this specific function, put down my pager, let the Event Loop process other things, and wake me up when my burger is ready."*

---

## 📅 Part 3: ReactJS Demystified (LEGO and Scoreboards)

If JavaScript is the engine, React is the chassis.

### 1. Components & JSX (LEGO Blocks)
In standard HTML, you write a massive, single document. In React, you build websites using **LEGO blocks (Components)**.
*   Instead of writing a huge page, you build a `Header` block, a `Sidebar` block, and a `Footer` block.
*   **JSX:** A syntax extension that lets you write HTML-like structures directly inside your JavaScript code.

---

### 2. Props (Custom LEGO Stickers)
Imagine you have a basic LEGO block called `Button`. You want to use it three times, but you want one to be red, one blue, and one green.
*   **Props (Properties)** are inputs passed into components, like custom stickers or paint specifications.
*   Props are **read-only**; a component can never change the props it receives.

---

### 3. State & `useState` (The Digital Scoreboard)
If props are external settings, **State** is the internal memory of a component.
Think of a **Digital Scoreboard** at a basketball game:
*   The scoreboard has an internal score of `0`.
*   When a player scores a basket, the operator presses a button (**State Updates**).
*   The scoreboard instantly clears the screen and paints the new number `2` (**Re-render**).

> **Doubt Cleared: Why can't we use a regular variable like `let score = 0` in React?**
> If you change a regular variable, React has no way of knowing it changed! It won't trigger a re-render. `useState` gives React a setter function (e.g. `setScore`) that tells the engine: *"Hey! The score changed! Redraw this component on the screen right now!"*

---

### 4. `useEffect` (The Smart Light Sensor)
A component's main job is to draw UI. But sometimes it needs to perform a **Side Effect** (like connecting to a chat room or fetching data from an API).
Think of `useEffect` like a **Smart Light Sensor**:
*   *Rule:* "Turn on the light when the sun sets."
*   In React, `useEffect` lets you synchronize your component with systems outside of React, based on a list of triggers (called **Dependencies**).

---

## 📅 Part 4: Preemptive Q&A & Tricky Interview Gotchas (Cracking the JavaScript Interview)

Both freshers and experienced developers often run into JavaScript's unique runtime architecture features during code evaluations or interview discussions. Here are the 6 most confusing interview gotchas explained with precision, along with strategy guidelines on how to tackle interviewer questions.

---

### Q1: The Temporal Dead Zone (TDZ)
**Question:** *"If `let` and `const` variables are hoisted, why do we get a `ReferenceError` when trying to access them before their declaration line?"*
*   **The Trap:** Many think `let` and `const` are not hoisted at all. That is false.
*   **The Perfect Answer:** 
    *   Yes, `let` and `const` variables *are* hoisted. During the Memory Creation Phase, the V8 engine scans the scope and registers the variable name.
    *   However, unlike `var` (which is initialized to `undefined`), a `let` or `const` variable remains **uninitialized** in a region called the **Temporal Dead Zone (TDZ)**. 
    *   It is physically in memory, but V8 forbids any read/write operations on it until the interpreter evaluates the actual assignment line. The moment that line executes, the variable exits the TDZ and becomes safe to use.
    *   *Code Example:*
        ```javascript
        // Memory created for 'a', but kept in TDZ:
        // console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization
        let a = 10; // Exits TDZ here
        console.log(a); // 🟢 10
        ```

---

### Q2: The Coercion Paradox (`[] == ![]`)
**Question:** *"Why does the equality expression `[] == ![]` return `true`? Show the exact step-by-step conversion."*
*   **The Trap:** An array (`[]`) is truthy, so how can it equal its negated self?
*   **The Perfect Answer:**
    *   This happens because of JS's implicit type coercion rules for the abstract equality operator (`==`).
    *   **Step 1:** The right-hand side `![]` is evaluated first. Since `[]` is an object (truthy), negating it with `!` converts it to the boolean value `false`. The expression becomes `[] == false`.
    *   **Step 2:** When comparing an object to a boolean, the JS spec converts the boolean to a number: `false` becomes `0`. The expression becomes `[] == 0`.
    *   **Step 3:** Next, the object `[]` is coerced to a primitive. The array converts to an empty string `""` via `.toString()`. The expression becomes `"" == 0`.
    *   **Step 4:** Comparing a string to a number coerces the string to a number: `Number("")` is `0`. The expression resolves to `0 == 0`, which is **`true`**.
    *   *The Strategy:* Explain that this is why we always use strict equality (`===`), which checks both type and value without coercion.

---

### Q3: Event Loop and Priority Queues
**Question:** *"What is the exact output order of the following snippet, and why do microtasks take precedence over macrotasks?"*
```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise (Microtask)");
});

console.log("End");
```
*   **The Trap:** Thinking `setTimeout` with `0`ms runs immediately before the promise because it was declared first.
*   **The Perfect Answer:**
    1.  **"Start"** is logged (Synchronous code executes on the Call Stack).
    2.  `setTimeout` is registered with the Web API. When the timer (0ms) expires, its callback is pushed to the **Macrotask Queue** (or Callback Queue).
    3.  `Promise.resolve().then()` registers its callback directly to the **Microtask Queue** (Job Queue).
    4.  **"End"** is logged (Synchronous code finishes, emptying the Call Stack).
    5.  Before checking the Macrotask Queue, the Event Loop checks and flushes **all tasks** inside the Microtask Queue. Hence, **"Promise (Microtask)"** is executed first.
    6.  Once the Microtask Queue is completely clear, the Event Loop processes the next task from the Macrotask Queue: **"Timeout (Macrotask)"**.
    *   *Output:* `Start` ──► `End` ──► `Promise (Microtask)` ──► `Timeout (Macrotask)`

---

### Q4: Arrow Functions and Context Binding Methods
**Question:** *"Can you use `.call()`, `.apply()`, or `.bind()` to change the context of an arrow function? Why or why not?"*
*   **The Trap:** Thinking these methods work on all function scopes equally.
*   **The Perfect Answer:**
    *   **No.** Arrow functions do not possess their own dynamic `this` context binding at all.
    *   Instead, they bind `this` **lexically** at compile time, inheriting the context of their enclosing lexical parent block.
    *   Because they have no dynamic `this` reference, calling `.call(obj)`, `.apply(obj)`, or `.bind(obj)` on an arrow function has absolutely no effect. JavaScript will parse the call but completely ignore the custom context argument, resolving `this` from the parent scope regardless.

---

### Q5: Name Collision Hoisting Priority
**Question:** *"If a function declaration and a `var` variable share the same identifier name in the global scope, what will the variable hold after loading?"*
```javascript
var hero;
function hero() {
  console.log("Superman");
}
console.log(typeof hero); // What prints here?
```
*   **The Trap:** Thinking it will log `undefined` or crash due to duplicate names.
*   **The Perfect Answer:**
    *   It will print **`"function"`**.
    *   Here is how the Memory Creation phase handles this: 
        1. V8 hoists the variable `var hero` and registers the name initialized as `undefined`.
        2. V8 then hoists the function declaration `function hero()`. Because function declarations take priority, V8 overwrites the `undefined` reference, storing the entire function block in global memory under the name `hero`.
        3. During the Execution phase, the declaration `var hero;` has no assignment attached to it, so it does not overwrite the memory. The name `hero` still references the function, printing `"function"`.
    *   *Follow-up Trap:* If the code had `var hero = "Batman";`, the assignment *would* run during the Execution phase, changing `hero` to the string `"Batman"`, logging `"string"`.

---

### Q6: React State Batching & Stale Closures
**Question:** *"Why does logging a state value immediately after calling its setter function return the old value? How do you access the updated state immediately?"*
```javascript
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // ❌ Logs 0, not 1!
};
```
*   **The Trap:** Thinking the state update is synchronous or that React is lagging.
*   **The Perfect Answer:**
    *   This is caused by **React's Batching Architecture** and **JavaScript Closures**:
    *   **1. Batching:** React does not re-render component cycles instantly for every state setter. Instead, it batches state updates inside event handlers to prevent layout thrashing and keep screen draws performant.
    *   **2. Stale Closures:** The `handleClick` function was created during a render pass where `count` was `0`. The function closes over the variable `count` at that specific snapshot in time. When `setCount` is called, it schedules an update, but the current function context still references the snapshot of `count = 0`.
    *   *The Fix:* If you need to perform an action using the most up-to-date state immediately, pass a functional updater callback to the state setter, or run the logic inside a `useEffect` hook watching the `count` state:
        ```javascript
        // Functional updater gets the fresh state directly from React's state queue:
        setCount(prev => {
          const nextVal = prev + 1;
          console.log(nextVal); // 🟢 Logs 1
          return nextVal;
        });
        ```

---

### 💡 Interview Tip: How to Answer Tricky Questions Like a Pro

When an interviewer asks you a question that looks like a trick or has confusing outputs:
1.  **Don't Guess:** Avoid shouting out answers instantly. Take 10 seconds to trace the execution steps out loud.
2.  **Speak in Engine Terms:** Use high-quality technical terms (e.g. *Memory Creation Phase*, *Lexical Environment*, *Macrotask vs Microtask Queue*, *Dynamic vs. Lexical Binding*). This instantly shows the interviewer you understand the core compilation spec, not just syntax rules.
3.  **Explain the "Why":** Explain the design trade-off. For example, when talking about coercion (`[] == ![]`), mention that this behavior is why strict equality (`===`) is standard practice in production codebases.

---

## 📅 Part 5: Mapping Index (Analogies to Code Repository Lookup)

When you are ready to move from these simple mental models to production code, use this index to find the target implementation in this repository:

| Tutoring Topic | Conceptual Analogy | Repository Directory Link | Core Code Demonstration File / Guide |
| :--- | :--- | :--- | :--- |
| **01 Script Loading** | Car Ignition Order | 📂 [01-script-loading-behaviors](01-script-loading-behaviors/) | [03-async-script.html](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/01-script-loading-behaviors/03-async-script.html) |
| **02 Variables & Scope** | Kitchen Cabinet Jars | 📂 [02-variables-and-data-types](02-variables-and-data-types/) | [variables-and-data-types.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/02-variables-and-data-types/variables-and-data-types.js) |
| **02 Casting & Coercion** | Recipes Copies / Coercion rules | 📂 [02-variables-and-data-types](02-variables-and-data-types/) | [type-conversion-and-primitives.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/02-variables-and-data-types/type-conversion-and-primitives.js) |
| **03 Operators & Expressions**| Club Gatekeeper | 📂 [03-operators-and-expressions](03-operators-and-expressions/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/03-operators-and-expressions/beginner-guide.md) |
| **04 Bitwise Operators** | Digital Scoreboards | 📂 [04-bitwise-operators-and-bit-manipulation](04-bitwise-operators-and-bit-manipulation/) | [demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/04-bitwise-operators-and-bit-manipulation/demo.js) |
| **05 Conditionals** | Branching Paths | 📂 [05-conditionals](05-conditionals/) | [conditionals.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/05-conditionals/conditionals.js) |
| **06 Control Flow & Loops** | Running Track & do-while | 📂 [06-loops](06-loops/) | [loops.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/06-loops/loops.js) |
| **07 Blenders & HOFs** | Juice Blender | 📂 [07-functions](07-functions/) | [functions.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/07-functions/functions.js) |
| **07 Recursion** | Folder Directory Crawler | 📂 [07-functions](07-functions/) | [recursion-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/07-functions/recursion-demo.js) |
| **08 Mini Projects** | Game Arenas | 📂 [08-mini-projects](08-mini-projects/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/08-mini-projects/beginner-guide.md) |
| **09 Execution Context** | Office Desk Allocation | 📂 [09-execution-context](09-execution-context/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/09-execution-context/beginner-guide.md) |
| **10 Hoisting** | Wet Paint Sign | 📂 [10-hoisting](10-hoisting/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/10-hoisting/beginner-guide.md) |
| **11 Scopes & Chain** | Russian Nesting Dolls | 📂 [11-scopes-and-scope-chaining](11-scopes-and-scope-chaining/) | [scopes.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/11-scopes-and-scope-chaining/scopes.js) |
| **12 Closures** | Hiker's Backpack | 📂 [12-closures](12-closures/) | [closures.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/12-closures/closures.js) |
| **13 Objects & JSON** | House Addresses & JSON rules | 📂 [13-objects](13-objects/) | [json-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/13-objects/json-demo.js) |
| **14 `this` Keyword** | Actors on a Stage | 📂 [14-this-keyword-and-explicit-binding](14-this-keyword-and-explicit-binding/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/14-this-keyword-and-explicit-binding/beginner-guide.md) |
| **15 Strict Mode & Errors** | Wild West to Highway Patrol | 📂 [15-strict-mode-and-error-handling](15-strict-mode-and-error-handling/) | [error-handling.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/15-strict-mode-and-error-handling/error-handling.js) |
| **16 Matrices & 2D Grids** | Game Boards / Rotations | 📂 [16-arrays](16-arrays/) | [multidimensional-arrays.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/16-arrays/multidimensional-arrays.js) |
| **17 Looping Collections** | Spreadsheet Row Reader | 📂 [17-for-in-for-of-foreach](17-for-in-for-of-foreach/) | [looping-methods.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/17-for-in-for-of-foreach/looping-methods.js) |
| **18 Array Iterators** | Spreadsheet Audits | 📂 [18-array-iterators-map-filter-reduce](18-array-iterators-map-filter-reduce/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/18-array-iterators-map-filter-reduce/beginner-guide.md) |
| **19 Event Loop & Timers** | Telemetry heartbeats | 📂 [19-advanced-functions-and-settimeout](19-advanced-functions-and-settimeout/) | [02-settimeout-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/19-advanced-functions-and-settimeout/02-settimeout-demo.js) |
| **20 Sync vs Async** | Cashier vs kitchen background | 📂 [20-sync-vs-async-javascript](20-sync-vs-async-javascript/) | [event-loop-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/20-sync-vs-async-javascript/event-loop-demo.js) |
| **21 Callbacks & Hell** | Car pickup phone alerts | 📂 [21-callbacks-and-callback-hell](21-callbacks-and-callback-hell/) | [callback-hell-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/21-callbacks-and-callback-hell/callback-hell-demo.js) |
| **22 Promises & Async** | Fast Food pagers / receipts | 📂 [22-promises](22-promises/) | [promises-basics.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/22-promises/promises-basics.js) |
| **23 Async / Await** | Smart booking dashboards | 📂 [23-async-await](23-async-await/) | [async-await.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/23-async-await/async-await.js) |
| **24 OOP & Prototypes** | Figma Component Blueprints | 📂 [24-oop-and-prototypes](24-oop-and-prototypes/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/24-oop-and-prototypes/beginner-guide.md) |
| **25 APIs & Fetch** | Restaurant Menu Dispatcher | 📂 [25-apis-and-fetch](25-apis-and-fetch/) | [fetch-api-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/25-apis-and-fetch/fetch-api-demo.js) |
| **26 DOM & Cookies** | Word Processor Tree Structure | 📂 [26-dom-and-cookies](26-dom-and-cookies/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/26-dom-and-cookies/beginner-guide.md) |
| **27 DOM tips & Web APIs** | Parking sensors and clipboard | 📂 [27-dom-tips-tricks-and-browser-apis](27-dom-tips-tricks-and-browser-apis/) | [index.html](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/27-dom-tips-tricks-and-browser-apis/index.html) |
| **28 DevTools Debugging** | Race Car Pit Crew | 📂 [28-browser-developer-tools-and-debugging](28-browser-developer-tools-and-debugging/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/28-browser-developer-tools-and-debugging/beginner-guide.md) |
| **29 Performance** | Rate limit gates | 📂 [29-javascript-performance-debouncing-throttling-memoization](29-javascript-performance-debouncing-throttling-memoization/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/29-javascript-performance-debouncing-throttling-memoization/beginner-guide.md) |
| **30 Modular systems** | Compartmental boxes | 📂 [30-javascript-modules-esm-commonjs](30-javascript-modules-esm-commonjs/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/30-javascript-modules-esm-commonjs/beginner-guide.md) |
| **31 GC & Memory Leaks** | Garbage truck heap collector | 📂 [31-memory-management-and-garbage-collection](31-memory-management-and-garbage-collection/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/31-memory-management-and-garbage-collection/beginner-guide.md) |
| **32 Date formats** | World time zones Intl | 📂 [32-javascript-dates-and-browser-dialogs](32-javascript-dates-and-browser-dialogs/) | [beginner-guide.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/32-javascript-dates-and-browser-dialogs/beginner-guide.md) |
| **33 Proxies & Reactivity**| Private Property Gatekeeper | 📂 [33-modern-es6-plus-features](33-modern-es6-plus-features/) | [demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/33-modern-es6-plus-features/demo.js) |
| **34 Regular Expressions**| Text Scan Detectors | 📂 [34-regular-expressions-and-regex](34-regular-expressions-and-regex/) | [regex-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/34-regular-expressions-and-regex/regex-demo.js) |
| **React Component Setup**| LEGO setup frameworks | 📂 [REACT](REACT/) | [02-react-setup.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/REACT/02-react-setup.md) |
| **React state & hooks** | Digital Scoreboards | 📂 [REACT/07-usestate-hook](REACT/07-usestate-hook/) | [01-notes.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/REACT/07-usestate-hook/01-notes.md) |
| **React side effects** | Smart Light Sensor | 📂 [REACT](REACT/) | [09-useeffect-hook.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/REACT/09-useeffect-hook.md) |
