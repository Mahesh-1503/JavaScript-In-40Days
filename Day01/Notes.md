# JavaScript Script Loading: Placement & Attributes

---

## 1. `<script>` in `<head>` without `defer` or `async`

### ✅ What:

- Script is placed in the `<head>` with **no** `async` or `defer`.

### ⏱ When:

- Only when the script **must run before anything else**.

### ❓ Why:

- Useful for scripts that set up critical configuration before the page loads.

### ✅ Advantages:

- Ensures the script runs **before** any part of the page is rendered.
- Script is guaranteed to run in order if there are multiple.

### ❌ Disadvantages:

- **Blocks HTML parsing** — slows down page load.
- Bad for performance and user experience.

---

## 2. `<script>` just before `</body>` without `defer` or `async`

### ✅ What:

- Script is placed at the **end of the body**.

### ⏱ When:

- Most common way to load scripts in older HTML practices.

### ❓ Why:

- HTML is fully loaded before the script runs.

### ✅ Advantages:

- Does **not block** HTML parsing.
- Script has full access to DOM since it's already loaded.

### ❌ Disadvantages:

- Still loads **after** all HTML, so can delay interactivity.
- Doesn’t allow early parallel loading.

---

## 3. `<script async>` in `<head>`

### ✅ What:

- Script is placed in `<head>` with the `async` attribute.

### ⏱ When:

- When the script is **independent** and doesn't rely on other scripts or the DOM.

### ❓ Why:

- Loads in parallel and runs **as soon as it's ready** — even before the rest of HTML is done parsing.

### ✅ Advantages:

- **Fast loading** — no blocking.
- Good for performance and third-party tools (analytics, ads, etc).

### ❌ Disadvantages:

- Scripts **may run out of order**.
- Might run before DOM is ready.

---

## 4. `<script defer>` in `<head>`

### ✅ What:

- Script is in `<head>` with `defer` attribute.

### ⏱ When:

- Best choice for most modern scripts that manipulate the DOM.

### ❓ Why:

- Loads in parallel but waits to execute until **after the HTML is fully parsed**.

### ✅ Advantages:

- **Non-blocking**.
- Scripts **run in order**.
- DOM is ready when script runs.

### ❌ Disadvantages:

- Slightly more complex for beginners to understand.
- Doesn’t run immediately — waits until parsing is done.

---

# ✅ Summary Table

| Placement / Attribute | Blocks HTML? | Runs in Order? | Runs When?                | Use Case                                  |
| --------------------- | ------------ | -------------- | ------------------------- | ----------------------------------------- |
| `<head>` (no attrs)   | ✅ Yes       | ✅ Yes         | Immediately (blocks HTML) | Critical setup scripts                    |
| Bottom of `<body>`    | ❌ No        | ✅ Yes         | After HTML parsed         | General scripts in older setups           |
| `<head async>`        | ❌ No        | ❌ No          | As soon as downloaded     | Independent scripts (ads, analytics)      |
| `<head defer>`        | ❌ No        | ✅ Yes         | After HTML parsed         | Modern best practice for DOM-related code |

#### Resources

- [Defer vs Async JavaScript and how this affects the Core Web Vitals](https://www.corewebvitals.io/pagespeed/async-vs-defer-javascript-and-core-web-vitals#:~:text=In%20general%2C%20the%20async%20attribute,widgets%20or%20add%20event%20listeners)
