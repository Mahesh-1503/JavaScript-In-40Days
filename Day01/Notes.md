# JavaScript Script Placement and Attributes

## 1. `<script>` in `<head>` without `defer` or `async`

- **What happens**: The browser stops parsing HTML to download and run the script immediately.
- **Effect**: Slows down page load because HTML rendering is paused.
- **Use case**: Rarely used, only when the script must run _before_ any HTML loads.

---

## 2. `<script>` just before `</body>` without `defer` or `async`

- **What happens**: HTML is fully parsed before the script runs.
- **Effect**: Faster page load since rendering isn't blocked.
- **Use case**: Common and safe. Script runs after all elements are loaded.

---

## 3. `<script async>` in `<head>`

- **What happens**: Script downloads **in parallel** with HTML parsing and runs **immediately after downloading**.
- **Effect**: HTML parsing may pause unpredictably when the script runs.
- **Use case**: Good for independent scripts (like ads or analytics) that don’t depend on the DOM or other scripts.

---

## 4. `<script defer>` in `<head>`

- **What happens**: Script downloads **in parallel** with HTML parsing but runs **only after the full HTML is parsed**.
- **Effect**: Page loads smoothly; scripts run in order.
- **Use case**: Best for DOM-dependent scripts that can wait till the page is fully parsed.

---

# Summary Table

| Placement/Attribute | Blocks HTML? | Loads In Order? | Runs When?                | Best For                      |
| ------------------- | ------------ | --------------- | ------------------------- | ----------------------------- |
| `<head>` (no attrs) | ✅ Yes       | ✅ Yes          | Immediately (blocks HTML) | Critical early scripts        |
| Bottom of `<body>`  | ❌ No        | ✅ Yes          | After HTML is parsed      | Most normal scripts           |
| `<head async>`      | ❌ No        | ❌ No           | As soon as downloaded     | Independent/3rd-party scripts |
| `<head defer>`      | ❌ No        | ✅ Yes          | After HTML is parsed      | DOM-dependent scripts         |

#### Resources

- [Defer vs Async JavaScript and how this affects the Core Web Vitals](https://www.corewebvitals.io/pagespeed/async-vs-defer-javascript-and-core-web-vitals#:~:text=In%20general%2C%20the%20async%20attribute,widgets%20or%20add%20event%20listeners)
