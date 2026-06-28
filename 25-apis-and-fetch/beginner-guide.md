# Beginner's Guide: APIs & The Fetch API

Hey there, future web integrator! 👋 Welcome to your hands-on guide to APIs and the Fetch API. Today, we will learn how to connect your application to external services, perform GET and POST requests, handle HTTP errors, and cancel pending requests safely.

---

## 📂 How to Learn This Folder

To get the most out of this chapter, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand API request flow and error handling.
2.  **Step 2:** Copy the code examples into a file like `test-fetch.js` and run them with `node test-fetch.js` to observe fetch stage behavior.
3.  **Step 3:** Open and read [25-apis-and-fetch/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/25-apis-and-fetch/README.md) to explore API patterns and practical tasks.

---

## 📅 Learning Roadmap

*   **Part 1:** What is an API? (The GitHub Issue Browser Analogy)
*   **Part 2:** Making GET Requests (The Two-Step Resolution)
*   **Part 3:** The Fetch Rejection Gotcha (HTTP 404 / 500 Errors)
*   **Part 4:** Sending Data: POST, PUT, and DELETE Requests
*   **Part 5:** Advanced: Cancelling Network Calls (AbortController)
*   **Part 6:** Real-World Application Code
*   **Part 7:** Essential Interview Questions & Practice Exercises

---

## Part 1: What is an API?

An **API (Application Programming Interface)** is an intermediary service that allows two software programs (like your browser app and a server database) to speak to each other.

### The GitHub Issue Browser Analogy:
Think of browsing **GitHub Issues**:
*   When you click the "Issues" tab, the browser doesn't download the entire GitHub codebase.
*   Instead, it sends a query (a **GET Request**) to a specific endpoint address: `https://api.github.com/repos/owner/repo/issues`.
*   GitHub's server receives this query, retrieves list rows from its database, and replies with structured text data (called **JSON**).
*   Your browser reads this JSON and draws the issue lists on the screen.

---

## Part 2: Making GET Requests: The Two-Step Resolution

To fetch data, we use JavaScript's built-in **`fetch()`** API. It resolves in two separate stages:

```text
[Start: fetch(url)] ──► Resolves on Headers Received ──► Returns Response Object
                                                              │
                                            ┌─────────────────┴─────────────────┐
                                            ▼                                   ▼
                                     [Check response.ok]             [Read body buffer]
                                     - Status 200: ok=true           - response.json()
                                     - Status 404: ok=false            (Returns Promise)
                                                                                │
                                                                                ▼
                                                                     [Final Parsed JSON]
```

1.  **Stage 1 (HTTP Headers):** The `fetch()` Promise resolves as soon as the server sends back HTTP status headers, *before* the actual content (body) is downloaded.
2.  **Stage 2 (Response Body):** To read the actual body payload, you must call `response.json()`. This returns a second Promise because parsing text data streams into JavaScript objects takes time.

```javascript
async function getUsers() {
  try {
    // Stage 1: Send request
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // Check if the server responded successfully (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    
    // Stage 2: Parse body stream
    const data = await response.json();
    console.log(data); // Array of user objects!
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}
getUsers();
```

---

## Part 3: The Fetch Rejection Gotcha

> [!IMPORTANT]
> **The `fetch()` Promise will NOT reject on HTTP error codes (like 404 Not Found or 500 Server Error).**
> It only rejects if the browser is completely unable to send the request (e.g. no internet connection, invalid domains, or CORS errors). 

Because of this, you must **always check `response.ok` manually** to ensure the request succeeded:
```javascript
// ❌ Bug: catch() will NOT run if status code is 404!
fetch("https://api.com/nonexistent-page")
  .then(res => res.json())
  .catch(err => console.log("Caught page error")); // Never fires!
```

---

## Part 4: Sending Data: POST, PUT, and DELETE

To send or modify data on a server, pass an configuration options object as the second argument to `fetch()`:

### 1. Creating Resources (POST Request)
```javascript
async function createUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST", // Specify method
      headers: {
        "Content-Type": "application/json" // Inform server about content type
      },
      body: JSON.stringify(userData) // Convert object to JSON string
    });
    
    const newUser = await response.json();
    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
createUser({ name: "Mahesh", email: "mahesh@example.com" });
```

### 2. Updating (PUT) & Deleting (DELETE)
*   **PUT:** Replaces/updates an existing resource.
*   **DELETE:** Removes a resource.
```javascript
// PUT Option config:
// method: "PUT", body: JSON.stringify(updatedInfo)

// DELETE Option config:
// method: "DELETE" (no body required)
```

---

## Part 5: Advanced: Cancelling Requests with AbortController

If a user clicks on different tabs quickly, older pending network requests can resolve out of order and slow down the browser. We can cancel requests using **`AbortController`**:

```javascript
const controller = new AbortController();
const signal = controller.signal;

async function fetchHeavyData() {
  try {
    const res = await fetch("https://api.com/data", { signal });
    const data = await res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request successfully cancelled!");
    } else {
      console.error("Other network errors:", error);
    }
  }
}

fetchHeavyData();

// Cancel the network request immediately!
controller.abort();
```

---

## Part 6: Real-World Application Code

Here is how configuration loaders safely perform fallbacks on connection timeouts:
```javascript
async function fetchConfigWithFallback() {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 3000); // 3-second timeout limit

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      signal: controller.signal
    });
    clearTimeout(id); // Clear timeout alert on success
    
    if (!response.ok) throw new Error("HTTP error status code.");
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn("Connection lost or timed out. Falling back to default settings.");
    return { theme: "Dark", version: "1.0.0" }; // Fallback settings
  }
}
```

---

## Part 7: Essential Interview Questions & Practice Exercises

### Q1: Why does `response.json()` return a Promise?
**Answer:** The server responds immediately on headers receipt. The body payload downloads over the network in chunks (data streams). Because loading and parsing the complete text data stream into a JavaScript object takes time, V8 runs this operation asynchronously and returns a Promise.

### Q2: How do you send credentials (like Auth Tokens) in fetch?
**Answer:** Auth credentials must be passed in the options configuration inside the `headers` object, typically using the `Authorization` key (e.g. `headers: { "Authorization": "Bearer TOKEN" }`).

### Practice Exercises:
1.  **JSONPlaceholder inspector:** Write a script fetching users from `https://jsonplaceholder.typicode.com/users`. If the request succeeds, map the array to extract only the user's name and email keys.
2.  **Fail-safe validation trial:** Query `https://jsonplaceholder.typicode.com/invalid-page`. Verify why no catch blocks run, and handle the error correctly using `response.ok` checks.
3.  **Abort Simulator:** Build a fetch caller aborting connection lines inside a 500ms timeout threshold.
