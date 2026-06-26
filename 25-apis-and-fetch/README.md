# Day 24: APIs & Fetch (GitHub Issue Browser)

Modern web applications communicate with external servers using **APIs (Application Programming Interfaces)**. To request data asynchronously without loading a new page, JavaScript provides the native **Fetch API**. Writing production-ready network calls requires managing network stream buffers, handling HTTP error status codes, and cancellation.

---

## 1. Mental Model (The GitHub Issue Browser)

Think of a **GitHub Issue Browser** (like the issues tab of a repository):
1. **The Endpoint Request:** You click the "Issues" tab. The app makes a `GET` request to GitHub's servers (`https://api.github.com/repos/owner/repo/issues`).
2. **The Stream Buffer:** The server responds immediately, sending packets of data in a stream. The browser must wait to parse the entire stream into a readable JSON format.
3. **The Status Check:** What if the repository is private or deleted? The server sends back a `404 Not Found` or `401 Unauthorized` status. The code must catch this status code and display a custom alert message.
4. **The User Aborts:** If the user clicks a different tab while the request is loading, the app must cancel the request to save bandwidth and prevent rendering lag.

---

## 2. Visual Thinking (Fetch Promise Streams Lifecycle)

How the Fetch API resolves network calls in two stages:

```
[Start: fetch(url)] ──► Resolves on Header Received ──► Returns Response Object
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

---

## 3. Beginner Explanation

- **API:** A service that allows two software programs (like your browser app and a database server) to share information.
- **`fetch()`:** A built-in JavaScript function used to make network requests. It returns a Promise.
- **JSON (JavaScript Object Notation):** The text format used to share data across the internet. It looks like standard JavaScript arrays and objects.
- **`response.json()`:** A method that parses the incoming network stream into standard JavaScript objects. It returns a Promise because reading data from streams takes time.

---

## 4. Deep Explanation (Body Streams & Abort Controllers)

To write enterprise-grade API code, we must understand the internals of the Fetch API:

### 1. Two-Step Promise Resolution
The `fetch()` Promise resolves as soon as the HTTP headers are received from the server, *before* the body content has finished downloading.
- This is why you must check `response.ok` (status in 200–299 range) or `response.status` immediately, before loading the body.
- Reading the body requires calling `response.json()`, which returns a second Promise that resolves only when the full stream buffer is parsed.

### 2. Fetch Rejection Quirks
The `fetch()` Promise will **not** reject on HTTP errors (like 404, 500, or 403). It only rejects on network failures (e.g. no internet connection, DNS failure, or CORS issues). You must check `response.ok` manually.

### 3. Canceling Requests (AbortController)
To cancel requests, we use `AbortController`. Passing the controller's `signal` to fetch allows us to abort the network call programmatically:
```javascript
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort(); // Cancels the request immediately, throwing an AbortError
```

---

## 5. Real Production Examples (GitHub Browser flows)

### 1. Fetching GitHub Issues (GET Request)
```javascript
async function getGitHubIssues(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  
  try {
    const response = await fetch(url);
    
    // Check for HTTP errors (like 404 or 403)
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }
    
    const issues = await response.json(); // Wait for body parsing
    return issues;
  } catch (error) {
    console.error("Network request failed:", error.message);
    return [];
  }
}
```

### 2. Submitting a New Issue Ticket (POST Request)
```javascript
async function createGitHubIssue(owner, repo, token, issueData) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `token ${token}`
    },
    body: JSON.stringify(issueData)
  });
  
  if (!response.ok) throw new Error("Failed to create issue");
  return await response.json();
}
```

### 3. Request Cancellation Guard (AbortController)
```javascript
let activeController = null;

async function loadIssueSearch(query) {
  // Cancel active search request if user is still typing
  if (activeController) activeController.abort();
  
  activeController = new AbortController();
  
  try {
    const url = `https://api.github.com/search/issues?q=${query}`;
    const response = await fetch(url, { signal: activeController.signal });
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Search request was canceled.");
    } else {
      console.error("Search failed:", error.message);
    }
  }
}
```

### 4. Reading Headers Cursor Link (Pagination)
```javascript
async function fetchPaginatedIssues(url) {
  const response = await fetch(url);
  const linkHeader = response.headers.get("Link"); // Query pagination links
  const data = await response.json();
  return { data, nextLink: parseLinkHeader(linkHeader) };
}
function parseLinkHeader(header) { ... }
```

### 5. Automatic Request Retry Interceptor
```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`Retry attempt ${i + 1} failed. Re-connecting...`);
    }
  }
}
```

---

## 6. Progressive Coding (HTTP Client)

### Level 1: Beginner (Raw XMLHttpRequests - Legacy)
```javascript
// BAD: Verbose, callback-hell syntax, difficult to maintain
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.github.com/issues");
xhr.onload = function() {
  console.log(JSON.parse(xhr.responseText));
};
xhr.send();
```

### Level 2: Better (Raw Fetch Promise Chaining)
```javascript
// BETTER: Clean promises, but lacks HTTP error validation checks
fetch("https://api.github.com/issues")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Level 3: Production (Async/Await with Guards)
```javascript
// PRODUCTION: Modern async await with explicit status checking
async function getIssues() {
  try {
    const res = await fetch("https://api.github.com/issues");
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

### Level 4: Enterprise (Configurable HTTP Client Wrapper)
```javascript
// ENTERPRISE: A robust, reusable API Client class that enforces JSON headers,
// attaches auth tokens dynamically, handles parameters, and intercepts errors.
class APIClient {
  constructor(options = {}) {
    this.baseURL = options.baseURL || "";
    this.defaultHeaders = options.headers || { "Content-Type": "application/json" };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...options.headers };
    
    // Inject token dynamically if available in storage
    const token = localStorage.getItem("jwt_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const config = {
      ...options,
      headers
    };

    if (options.body && typeof options.body === "object") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Transaction Failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`[API-ERROR] Endpoint ${endpoint} failed:`, error.message);
      throw error; // Re-throw to allow component-level catch
    }
  }

  get(endpoint, headers) { return this.request(endpoint, { method: "GET", headers }); }
  post(endpoint, body, headers) { return this.request(endpoint, { method: "POST", body, headers }); }
}

const github = new APIClient({ baseURL: "https://api.github.com" });
// const issues = await github.get("/repos/owner/repo/issues");
```

---

## 7. Common Mistakes

1. **Assuming Fetch rejects on 404 or 500 status codes:**
   ```javascript
   // BUG: If URL returns 404, code inside catch block will NOT execute!
   fetch("https://api.example.com/missing-url")
     .then(res => res.json())
     .catch(err => console.log("Caught:", err)); 
   ```
2. **Forgetting `await` on `response.json()`:**
   Calling `.json()` starts parsing the stream, returning a Promise. You must await it to get the raw object.
3. **Leaving duplicate requests active on tabs switching:**
   Not canceling previous pending requests using AbortController causes state collisions when slow network requests complete out of order.

---

## 8. Best Practices

1. **Always verify `response.ok`:** Do this before parsing body streams.
2. **Abstract network logic to API Clients:** Avoid writing raw `fetch` calls directly inside UI components.
3. **Use AbortController signals for tab/route switches:** Cancels requests immediately on unmount.

---

## 9. Interview Preparation

### Q1: Why does `fetch` not reject on an HTTP 404 or 500 error code?
**Answer:** The `fetch()` Promise checks if the HTTP request completed successfully over the network. If the server responds with an HTTP status code (even a 404 or 500), the network round-trip was completed, so the Promise resolves. It only rejects if a true network failure occurs (e.g. no connection, DNS failure, or CORS block).

### Q2: What is the purpose of `AbortController`?
**Answer:** `AbortController` is an API used to cancel asynchronous operations like fetch requests. You pass the controller's `signal` object as an option to the fetch request. Calling `controller.abort()` cancels the request immediately, causing the fetch promise to reject with an `AbortError`.

### Q3: Why does `response.json()` return a Promise?
**Answer:** The HTTP response body is sent over the network as a stream of raw bytes. Reading and parsing this stream into a JavaScript object requires reading data packets asynchronously as they arrive, which takes CPU time. To prevent blocking the main execution thread, `response.json()` returns a Promise.

---

## 10. Homework

1. **GitHub Issue Browser:** Write an async function that fetches issues from a public repository. Validate that the URL exists, and throw a custom error on 404 failures.
2. **Tab Search Cancellation:** Create an input search box that triggers a fetch request on input. Use `AbortController` to cancel the active request if a new search is typed.
3. **Auto-Retry Client:** Write a fetch wrapper that automatically retries a failed request up to 3 times, delaying 1 second between attempts.
4. **Header Scraper:** Write an API request that fetches a mock endpoint, logs all response headers to the console, and parses the metadata safely.
5. **CORS Block Simulator:** Attempt to fetch a URL that blocks CORS (e.g. Google's homepage). Catch the network error, check its properties, and write a summary of why it failed.
