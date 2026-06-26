# Day 01: Script Loading Behaviors (Synchronous, Async, Defer)

Mastering how the browser downloads, parses, and executes JavaScript is the foundation of web performance engineering. In this guide, we use the real-world scenario of a **Netflix Landing Page** to understand how script loading affects page load speed and user experience.

---

## 1. Mental Model

Imagine you are loading the **Netflix Landing Page**. The page has:
1. **Critical HTML/CSS** (The movie billboard and sign-up form).
2. **Stripe Payment SDK** (Needed only when users click "Get Started").
3. **Google Analytics & Facebook Pixel** (Needed to track user visits, but shouldn't delay rendering).

If you load these scripts naively (synchronously in the `<head>`), the browser stops displaying the page while downloading and executing each script. Users see a blank screen, get frustrated, and leave. 

To prevent this "parser blocking," we use script attributes to control *when* scripts are downloaded and *when* they run.

---

## 2. Visual Thinking

Here is how the browser handles the HTML Parser, Script Download, and Script Execution phases:

### 🔴 Synchronous Script (Parser Blocking)
```
HTML Parsing:    =======[PAUSED]===================> (Blocked)
Script Download:        [Download]
Script Execution:                 [Execute]
```

### 🟠 Async Script (Download in Parallel, Block Parser to Execute)
```
HTML Parsing:    ======[PAUSED]====================> (Blocked during execution)
Script Download:        [Download]
Script Execution:                 [Execute]
```

### 🟢 Defer Script (Download in Parallel, Execute After Parsing Ends)
```
HTML Parsing:    ===================================> (Never Blocked!)
Script Download:        [Download]
Script Execution:                                   [Execute]
```

---

## 3. Beginner Explanation

When a browser opens Netflix:
1. It reads the HTML file line by line (this is called **parsing**).
2. When it sees `<script src="analytics.js">`, it stops parsing the page immediately.
3. It downloads the file from the internet, runs the code, and only then continues reading the rest of the HTML.

By using **`async`** or **`defer`** attributes, you tell the browser: *"Hey, don't stop reading the HTML. Go download this script in the background while I continue displaying the page."*
- **`async` (Asynchronous):** Run the script the very second it finishes downloading, even if it interrupts HTML parsing.
- **`defer` (Deferred):** Wait until the HTML parser has completely finished, then run the scripts in the order they appear.

---

## 3.5. Syntax & Basic Code Mechanics

Before parsing complex enterprise conditional scripts, let's look at the absolute simplest way to declare these three loading modes inside your HTML files.

### The HTML Code
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Loading Syntax</title>

  <!-- 1. Normal/Synchronous Script: Blocks HTML parsing while downloading/running -->
  <script src="normal-script.js"></script>

  <!-- 2. Asynchronous Script: Downloads in background, runs immediately when downloaded -->
  <script async src="async-script.js"></script>

  <!-- 3. Deferred Script: Downloads in background, runs ONLY after HTML parsing is fully finished -->
  <script defer src="defer-script.js"></script>
</head>
<body>
  <h1>Hello, Script Loading!</h1>
</body>
</html>
```

### Line-by-Line Breakdown for Beginners

1. **`<script src="normal-script.js"></script>`**
   - The browser parses the HTML from top to bottom.
   - When it hits this line, it immediately stops reading the rest of the HTML. It downloads `normal-script.js`, runs it, and then continues parsing. This is **blocking behavior**.
2. **`<script async src="async-script.js"></script>`**
   - The browser sees the `async` keyword.
   - It starts downloading `async-script.js` in the background (non-blocking).
   - The moment the file is completely downloaded, HTML parsing pauses, the script runs, and HTML parsing resumes. Use this for independent scripts like analytics.
3. **`<script defer src="defer-script.js"></script>`**
   - The browser sees the `defer` keyword.
   - It downloads `defer-script.js` in the background (non-blocking).
   - Even if the download finishes early, the browser will wait until the entire page is parsed (all HTML is read and DOM is built) before running it. Use this for scripts that need to manipulate page elements.

---

## 4. Deep Explanation (Browser Engine Internals)

To understand this deeply, we must look at the **Critical Rendering Path (CRP)**:

1. **DOM Tree Construction:** The browser parses HTML and converts tags into DOM Nodes.
2. **Parser Blocking:** When the parser encounters a synchronous script, it must wait for the script to download and execute because JavaScript can modify the DOM (using `document.write` or DOM manipulation APIs).
3. **CSSOM Blocking:** JavaScript execution is blocked until the CSS is fully downloaded and parsed into the **CSSOM Tree**. This is because JavaScript can query styles (e.g., `getComputedStyle()`).
4. **Execution Phase:**
   - **`async` scripts** block the DOM construction at an unpredictable time—whenever the network download completes. They do not guarantee execution order.
   - **`defer` scripts** guarantee execution order. They run *after* the DOM parser is complete, but *before* the browser fires the `DOMContentLoaded` event.

---

## 5. Real Production Examples

### 1. Synchronous App Bootstrapper
Used for critical system variables (e.g., immediately setting light/dark theme variables to prevent page flashing).
```html
<head>
  <script>
    // Critical block: Runs immediately before rendering body
    const theme = localStorage.getItem('netflix-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  </script>
</head>
```

### 2. Google Analytics Tracking (Async)
Analytics scripts are independent of the DOM and other libraries. They should run as fast as possible without blocking the initial render.
```html
<head>
  <script async src="https://www.google-analytics.com/analytics.js"></script>
</head>
```

### 3. Stripe Checkout Integration (Defer)
The checkout bundle requires the payment DOM elements to be ready. It must execute only after the parser completes.
```html
<head>
  <script defer src="https://js.stripe.com/v3/"></script>
</head>
```

### 4. Third-Party Ads Widget (Dynamic Async Loading)
Creating a script element dynamically programmatically forces async execution.
```javascript
function loadAdWidget(widgetId) {
  const script = document.createElement('script');
  script.src = `https://ads.partner.com/widget-${widgetId}.js`;
  script.async = true; // Non-blocking dynamic load
  document.head.appendChild(script);
}
```

### 5. Multi-Module Dependencies (Defer for Ordering)
When scripts depend on one another (e.g., `plugin.js` depends on `core-framework.js`), `defer` preserves order.
```html
<head>
  <script defer src="core-framework.js"></script>
  <script defer src="plugin.js"></script>
</head>
```

---

## 6. Progressive Coding

Here is the evolution of script loading architectures on our Netflix landing page:

### Level 1: Beginner (Blocking Script in Head)
```html
<!-- BAD: Blocks rendering of landing page during network download -->
<head>
  <script src="stripe-payment.js"></script>
  <script src="google-analytics.js"></script>
</head>
```

### Level 2: Better (Moved to Bottom of Body)
```html
<!-- BETTER: Page renders first, but download only starts after HTML parsing is complete -->
<body>
  <h1>Netflix Billboard</h1>
  <script src="stripe-payment.js"></script>
  <script src="google-analytics.js"></script>
</body>
```

### Level 3: Production (Modern Async & Defer in Head)
```html
<!-- PRODUCTION: Background download starts immediately in parallel with parser -->
<head>
  <!-- Analytics downloaded in background, runs ASAP -->
  <script async src="google-analytics.js"></script>
  <!-- Stripe downloaded in background, runs only after HTML parser completes -->
  <script defer src="stripe-payment.js"></script>
</head>
```

### Level 4: Enterprise (Programmatic Conditional Loading)
```javascript
// ENTERPRISE: Only load Stripe payment bundle when user clicks "Get Started" to save bandwidth
const loadStripeOnDemand = () => {
  return new Promise((resolve, reject) => {
    if (window.Stripe) return resolve(window.Stripe);
    
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => resolve(window.Stripe);
    script.onerror = (err) => reject(new Error("Failed to load payment gateway"));
    document.head.appendChild(script);
  });
};

document.getElementById('get-started-btn').addEventListener('click', async () => {
  try {
    const stripe = await loadStripeOnDemand();
    // Initialize payments
  } catch (error) {
    console.error(error);
  }
});
```

---

## 7. Common Mistakes

1. **Assuming `async` preserves order:**
   ```html
   <!-- BUG: If plugin.js downloads faster than core.js, plugin.js throws "Uncaught ReferenceError: core is not defined" -->
   <script async src="core.js"></script>
   <script async src="plugin.js"></script>
   ```
2. **Using `document.write()` in async scripts:**
   Modern browsers block `document.write` inside asynchronous scripts because it completely halts parsing and destroys layout flows.
3. **Double loading:**
   Loading the same script with and without `defer` causes multiple network requests and duplicate executions in some browser engines.

---

## 8. Best Practices

1. **Place App Core Script in Head with `defer`:** This ensures download begins immediately parallel with parser, and runs right before `DOMContentLoaded`.
2. **Self-Contained Scripts Use `async`:** Analytics, trackers, logging libraries.
3. **Preconnect to Critical Origins:** If loading scripts from external CDNs (e.g. Stripe), use preconnect hints:
   ```html
   <link rel="preconnect" href="https://js.stripe.com">
   ```

---

## 9. Interview Preparation

### Q1: What is the main difference between `async` and `defer`?
**Answer:** Both download scripts in the background without blocking the HTML parser. The difference is:
- `async` runs the script *immediately* after download completes, pausing the HTML parser. It does not guarantee execution order.
- `defer` waits until the HTML parser has completed entirely. It executes scripts in the exact order they are declared in the HTML document.

### Q2: Does `defer` work on inline scripts?
**Answer:** No, the `defer` and `async` attributes are ignored on inline scripts (scripts without a `src` attribute). They only apply to external files.

### Q3: When does `DOMContentLoaded` fire in relation to `defer` scripts?
**Answer:** The browser guarantees that all `defer` scripts are downloaded and executed *before* the `DOMContentLoaded` event fires.

---

## 10. Homework

1. **Audit a Script:** Look at your favorite website using Chrome DevTools. Check if their analytics tags are loaded using `async`, `defer`, or synchronously.
2. **Analytics Delay Simulator:** Create an HTML page containing a mock analytics script. Set a network delay of 3 seconds and prove that `async` prevents the main text from blocking.
3. **Execution Order Logger:** Create two scripts, `first.js` and `second.js`, where `second.js` depends on variables in `first.js`. Load them using `async` and force `second.js` to finish downloading first to observe the ReferenceError. Then fix it using `defer`.
4. **Dynamic Script Promise:** Write a utility function `loadScript(url)` that returns a Promise which resolves when the script completes loading and rejects on network failures.
5. **Theme Switcher Flash Fixer:** Build a theme toggle app where the theme configuration is read from `localStorage`. Prevent the screen from flashing white when reloading the page by placing a blocking inline script in the `<head>`.
