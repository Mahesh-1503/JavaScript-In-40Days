# Day 20: Async / Await (Airbnb Booking Dashboard)

While Promises are a massive improvement over callbacks, complex promise chains with multiple `.then()` blocks can still be difficult to read. **Async/Await** is a modern syntax that allows you to write asynchronous code that reads like synchronous code, improving maintainability and error handling.

---

## 1. Mental Model (The Airbnb Booking Dashboard)

Think of loading your **Airbnb Booking Dashboard**:
1. **The Data Sources:** To render the dashboard, the page must fetch:
   - **Service A:** User profile data.
   - **Service B:** Room booking reservation details.
   - **Service C:** Current weather forecast for the booking location.
2. **The Dependency Chain:** You can't fetch the weather (Service C) until you know the booking location (Service B).
3. **The Concurrency Pattern:** You *can* fetch the user profile (Service A) and the booking details (Service B) in parallel, as they don't depend on each other.

Async/await lets you write this complex combination of parallel and sequential requests in a clean, readable layout.

---

## 2. Visual Thinking (Sequential vs Parallel Await)

How execution time changes when running independent tasks sequentially vs in parallel:

### Sequential Await (Slow: Total Time = 600ms)
```
[Start]
  │
  ▼
[Fetch User Profile (300ms)] ──(Wait)──► [Fetch Room Bookings (300ms)] ──► [Done]
```

### Parallel Await with `Promise.all` (Fast: Total Time = 300ms)
```
[Start]
  ├──► [Fetch User Profile (300ms)] ──┐
  │                                    ├─► [Await Promise.all] ──► [Done]
  └──► [Fetch Room Bookings (300ms)] ──┘
```

---

## 3. Beginner Explanation

- **`async` Keyword:** Put this before a function declaration to declare it asynchronous. An `async` function automatically returns a Promise.
- **`await` Keyword:** Can only be used inside an `async` function. It pauses the function execution until the Promise resolves and returns the value.
- **`try...catch`:** The standard way to handle errors in async functions, replacing `.catch()` chains.

---

## 4. Deep Explanation (Generator Mechanics & Thread Suspension)

### 1. Syntactic Sugar for Generators
Under the hood, `async/await` is compiled into **Generator Functions** (`function*`) and yield expressions combined with a Promise runner.
- When the engine encounters `await promise`, it saves the current execution context state (local variables, scope pointers, and code position) on the heap.
- The function execution is **suspended**, and control is handed back to the main Event Loop thread.
- Once the awaited Promise resolves, the Event Loop schedules a task to restore the saved execution context and resume function execution from the exact line where it was paused.
- **Crucial Fact:** This suspension does NOT block the browser thread. The browser can still handle user clicks, hover states, and rendering while the function is paused.

---

## 5. Real Production Examples (Airbnb flows)

### 1. Booking Dashboard Aggregator (Parallel + Sequential)
Fetches user and bookings in parallel, then uses booking data to fetch weather sequentially.
```javascript
async function loadAirbnbDashboard(userId) {
  try {
    console.log("Loading dashboard...");
    
    // 1. Parallel Fetch: User Profile and Booking details
    const [user, booking] = await Promise.all([
      fetchUserProfile(userId),
      fetchUserBookings(userId)
    ]);
    
    // 2. Sequential Fetch: Weather (depends on booking destination)
    const weather = await fetchLocalWeather(booking.destination);
    
    return { user, booking, weather };
  } catch (error) {
    console.error("Failed to load dashboard:", error.message);
  }
}

// Mock API endpoints
function fetchUserProfile(id) { return Promise.resolve({ name: "Alice" }); }
function fetchUserBookings(id) { return Promise.resolve({ destination: "Paris" }); }
function fetchLocalWeather(dest) { return Promise.resolve({ temp: "22°C" }); }
```

### 2. Booking Cancellation Guard (Error Handling)
Using standard try-catch-finally inside async workflows.
```javascript
async function cancelBooking(bookingId) {
  let loadingState = true;
  try {
    console.log(`[Cancel] Cancelling booking #${bookingId}...`);
    const status = await submitCancellation(bookingId);
    return status;
  } catch (error) {
    console.error("Cancellation failed:", error.message);
    throw error;
  } finally {
    loadingState = false; // Always clear loading states
    console.log("Cleanup: Loading state cleared.");
  }
}
```

### 3. Login Session Token Refresher
A helper that checks token age and refreshes it asynchronously before processing transactions.
```javascript
async function getAuthenticatedHeaders() {
  const token = localStorage.getItem("jwt_token");
  if (isTokenExpired(token)) {
    const newToken = await refreshAuthToken();
    localStorage.set("jwt_token", newToken);
  }
  return { Authorization: `Bearer ${token}` };
}
```

### 4. Fetch JSON Helper
```javascript
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return await response.json(); // Wait for body parsing
}
```

### 5. Multi-Room Pricing Search (Promise.allSettled)
Queries prices from multiple hotels in parallel, returning those that succeeded and ignoring those that failed.
```javascript
async function queryHotelPrices(hotelIds) {
  const requests = hotelIds.map(id => fetchHotelPrice(id));
  const results = await Promise.allSettled(requests);
  
  return results
    .filter(res => res.status === "fulfilled")
    .map(res => res.value);
}
```

---

## 6. Progressive Coding (Dashboard Loader)

### Level 1: Beginner (Nested Promise Chains)
```javascript
// BAD: Deeply nested `.then()` blocks look like callback hell
function getDashboardData(userId) {
  return fetchUserProfile(userId).then(user => {
    return fetchUserBookings(userId).then(booking => {
      return fetchLocalWeather(booking.destination).then(weather => {
        return { user, booking, weather };
      });
    });
  });
}
```

### Level 2: Better (Flat Promise Chains)
```javascript
// BETTER: Flat, but passing variables between steps requires scoping hacks
function getDashboardData(userId) {
  let userData;
  return fetchUserProfile(userId)
    .then(user => {
      userData = user;
      return fetchUserBookings(userId);
    })
    .then(booking => {
      return Promise.all([booking, fetchLocalWeather(booking.destination)]);
    })
    .then(([booking, weather]) => {
      return { user: userData, booking, weather };
    });
}
```

### Level 3: Production (Async/Await)
```javascript
// PRODUCTION: Straightforward sequential-looking asynchronous layout
async function getDashboardData(userId) {
  const user = await fetchUserProfile(userId);
  const booking = await fetchUserBookings(userId);
  const weather = await fetchLocalWeather(booking.destination);
  return { user, booking, weather };
}
```

### Level 4: Enterprise (Optimized Parallel Dashboard Controller)
```javascript
// ENTERPRISE: A fully optimized, stateful manager that runs requests concurrently,
// checks dependencies dynamically, and applies timeout fallbacks to prevent page hangs.
class AirbnbDashboardController {
  constructor(userId) {
    this.userId = userId;
  }

  async fetchWithTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Service Request Timeout")), ms)
    );
    return Promise.race([promise, timeout]);
  }

  async load() {
    console.log(`[LOAD-START] Loading user context [${this.userId}]...`);

    try {
      // 1. Fetch user profile and bookings concurrently
      const [profileResult, bookingResult] = await Promise.allSettled([
        this.fetchWithTimeout(fetchUserProfile(this.userId), 2000),
        this.fetchWithTimeout(fetchUserBookings(this.userId), 2000)
      ]);

      const user = profileResult.status === "fulfilled" ? profileResult.value : { name: "Guest" };
      
      if (bookingResult.status === "rejected") {
        throw new Error("Unable to retrieve booking details. Dashboard halted.");
      }
      
      const booking = bookingResult.value;

      // 2. Fetch weather sequentially (requires booking destination)
      let weather = null;
      try {
        weather = await this.fetchWithTimeout(fetchLocalWeather(booking.destination), 1000);
      } catch (err) {
        console.warn("Weather service offline. Displaying layout without weather.");
      }

      console.log("[LOAD-SUCCESS] Dashboard ready.");
      return { user, booking, weather };
    } catch (error) {
      console.error(`[LOAD-FAILED] ${error.message}`);
      throw error;
    }
  }
}
```

---

## 7. Common Mistakes

1. **Forgetting the `await` keyword:**
   If you forget `await`, the function doesn't wait. It returns the raw Promise object instead of the resolved data.
   ```javascript
   const data = fetchUserProfile("u_1"); 
   console.log(data.name); // BUG: undefined (data is a Promise, not the user object!)
   ```
2. **Running Independent Requests Sequentially:**
   ```javascript
   // BUG: Slower! booking 2 waits for booking 1, even though they are independent.
   const hotel1 = await fetchHotelPrice("h_1");
   const hotel2 = await fetchHotelPrice("h_2"); 
   // Fix: const [h1, h2] = await Promise.all([fetchHotelPrice("h_1"), fetchHotelPrice("h_2")]);
   ```
3. **Adding `async` to every function declaration blindly:**
   Declaring a function `async` wraps the return value in a Promise. Do not use it for simple synchronous operations to avoid unnecessary heap allocations.

---

## 8. Best Practices

1. **Run independent async calls in parallel:** Use `Promise.all` or `Promise.allSettled` to fetch data concurrently.
2. **Always wrap async code in `try/catch`:** Catches rejections and handles them gracefully.
3. **Avoid nesting async functions:** Keep your control flows flat.

---

## 9. Interview Preparation

### Q1: What does an `async` function always return?
**Answer:** An `async` function always returns a Promise. If the function returns a primitive value (like a string or number), JavaScript automatically wraps that value in a resolved Promise. If the function throws an error, it returns a rejected Promise containing the error.

### Q2: How does `async/await` work under the hood? Does it block the execution thread?
**Answer:** No, it does not block the thread. Under the hood, `async/await` is syntactic sugar for Generator functions (`function*`) combined with Promises. When the engine encounters `await`, it pauses the function execution, saves its state to the heap, and hands control back to the Event Loop. Once the awaited Promise settles, the engine resumes the function from the saved state. The main JS execution thread remains free to handle other tasks while the function is paused.

### Q3: How do you handle multiple async requests concurrently using async/await?
**Answer:** To run requests concurrently, initiate the requests *before* awaiting them, or use `Promise.all()`:
```javascript
// Starts both requests immediately in parallel, then awaits both
const [res1, res2] = await Promise.all([apiCall1(), apiCall2()]);
```

---

## 10. Homework

1. **Dashboard Aggregator:** Write a dashboard builder function using async/await that fetches user information and room rates in parallel, then queries hotel reviews sequentially.
2. **Concurrency Benchmark:** Write a test script comparing the execution time of 5 independent mock network calls run sequentially vs in parallel using `Promise.all()`. Log the duration differences.
3. **Session Refresher Wrapper:** Code a function wrapper that checks authentication token validity and runs a refresh token update asynchronously before processing user actions.
4. **Fallback Logger:** Create a search component that queries hotel lists. Use `Promise.allSettled()` and output success details while logging warnings for failed queries.
5. **Backoff Scheduler:** Write a retry loop using `async/await` and an exponential timer delay helper (`setTimeout` wrapped in a Promise) to attempt failed fetches up to 5 times.
