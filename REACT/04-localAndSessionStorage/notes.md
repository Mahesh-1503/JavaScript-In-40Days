![alt text](image.png)

Local Storage, Session Storage, and Cookies store data in the browser. They solve different problems. Use this as a simple and practical reference.

---

## Local Storage

### What it is

Local Storage stores data in your browser. The data stays even after you close or reopen the browser.

### Key points

• Size is large. About 5 to 10 MB depending on browser
• Works across all tabs of the same site
• Data stays until you delete it
• Browser does not send it to the server
• Useful for settings, themes, cached content, offline mode

### Quick example

```js
localStorage.setItem("user", "Mahesh");
localStorage.getItem("user");
localStorage.removeItem("user");
localStorage.clear();
```

### When to use

• Save user settings
• Save recent items
• Save theme preference
• Save cart data for logged out users
• Save cached API data

---

### 5 tasks for Local Storage

1. Store theme preference. Example: light or dark.
2. Store username and show it when page reloads.
3. Create a simple counter that increases even after reload.
4. Save API response in Local Storage and show it without fetching again.
5. Build a settings page that stores toggles.

### How to proceed

• Use `localStorage.setItem()` to store data
• Use `localStorage.getItem()` to read
• Test by refreshing page
• Try storing objects using `JSON.stringify` and `JSON.parse`
• Bonus: build a “Clear data” button

---

## Session Storage

### What it is

Session Storage stores data only for the current tab. Closing the tab removes data.

### Key points

• Size about 5 MB
• Works only in one tab
• Data clears after closing tab
• Browser does not send it to server
• Good for temporary data

### Quick example

```js
sessionStorage.setItem("id", "123");
sessionStorage.getItem("id");
sessionStorage.removeItem("id");
sessionStorage.clear();
```

### When to use

• Keep form data while navigating pages
• Protect sensitive temporary data
• Store session based values
• Store step progress in multi step forms

---

### 5 tasks for Session Storage

1. Store form input while typing.
2. Store cart items only for the active session.
3. Store page visit count for one session.
4. Prevent users from losing unsaved data when they navigate away.
5. Build a tab based preferences feature.

### How to proceed

• Store a value with `setItem`
• Try using it across same tab
• Open a second tab and see difference
• Close tab and test if data disappears
• Build variable cleanup logic

---

## Cookies

### What it is

Cookies store small data that browser sends to server automatically on every request.

### Key points

• Size is small. About 4 KB
• Works across all tabs
• You set an expiry date
• Sent to server on every request
• Used for login tokens, analytics, tracking, sessions

### Quick example

```js
document.cookie = "name=Mahesh; expires=Thu, 1 Jan 2026 00:00:00 UTC; path=/";
```

To delete:

```js
document.cookie = "name=; expires=Thu, 1 Jan 1970 00:00:00 UTC; path=/";
```

### When to use

• Remember logged in state
• Store authentication token
• Store short information for server
• Session management
• Domain based controls

---

### 5 tasks for Cookies

1. Create a cookie for username.
2. Create a cookie with expiry time.
3. Delete a cookie from browser.
4. Read cookies and show them on screen.
5. Build a “Remember me” button.

### How to proceed

• Set cookie using `document.cookie`
• Use different expiry dates
• Parse cookie string by splitting at `;`
• Test deletion by setting past date
• Inspect cookies in browser DevTools

---

# Simple comparison summary

• Local Storage
Use for long term data in browser.
Large storage. Not sent to server.

• Session Storage
Use for temporary data.
Removed when tab closes.

• Cookies
Use for authentication and server communication.
Small storage. Sent to server.
