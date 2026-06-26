## 💡 Common Mistakes

| ❌ Mistake                   | ✅ Correct                               |
| ---------------------------- | ---------------------------------------- |
| Forgetting `response.json()` | Always convert body properly             |
| Not checking `response.ok`   | Use error handling                       |
| Missing headers for JSON     | Set `"Content-Type": "application/json"` |
| Forgetting `await`           | Use `await` inside async functions       |
| Not handling network failure | Wrap in `try...catch`                    |

---

## 🧠 When to Use Fetch vs Axios

| Feature                     | Fetch                    | Axios             |
| --------------------------- | ------------------------ | ----------------- |
| Built-in                    | ✅                       | ❌ (external lib) |
| Automatically converts JSON | ❌                       | ✅                |
| Cancel requests             | ✅ (via AbortController) | ✅                |
| Interceptors                | ❌                       | ✅                |
| Simpler syntax              | ⚙️ Medium                | ✅ Easy           |

---

## 🧩 Student Tasks for Mastery

### 🧠 Level 1 — Basics

1. Fetch data from a public API and display it in console.
2. Handle 404 and 500 responses gracefully.
3. Convert response to text, JSON, and blob formats.

### ⚙️ Level 2 — Intermediate

4. Make POST, PUT, and DELETE requests with dummy data.
5. Send custom headers and authentication token.
6. Use `async/await` syntax with `try...catch`.

### 🚀 Level 3 — Advanced

7. Use `AbortController` to cancel a long fetch.
8. Fetch two APIs in parallel using `Promise.all`.
9. Build a simple web page that fetches and displays GitHub users.

### 💼 Bonus Project

10. Create a **“Mini Weather App”**

    - Input city name
    - Fetch data from OpenWeather API
    - Display temperature and conditions
    - Handle loading & error states

---

## 🔑 Summary Table

| Concept                       | Key Idea              |
| ----------------------------- | --------------------- |
| `fetch()`                     | Makes HTTP request    |
| `.then()` / `await`           | Handles promises      |
| `response.ok`                 | Checks for success    |
| `.json() / .text() / .blob()` | Converts response     |
| Headers                       | Send auth / type info |
| AbortController               | Cancel fetch          |
| `Promise.all`                 | Fetch parallel APIs   |
