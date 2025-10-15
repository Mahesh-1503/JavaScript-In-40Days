# 🧩 Code 1: Using `var` inside a loop

```js
function x() {
  for (var i = 1; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
}
x();
```

---

## 🧠 Step-by-step Explanation

1. The variable `i` is declared using **`var`**, which means:

   - It has **function scope**, not block scope.
   - There is **only one shared `i`** for the entire loop inside the function `x()`.

2. The loop runs quickly from `i = 1` to `i = 4`.
   (By the end of the loop, `i` becomes `5`.)

3. Each `setTimeout()` is registered to run **after** a certain delay:

   - When `i = 1` → runs after 1 second
   - When `i = 2` → runs after 2 seconds
   - When `i = 3` → runs after 3 seconds
   - When `i = 4` → runs after 4 seconds

   But note: The callback functions are **stored**, not executed immediately.

4. By the time any timeout executes, the **loop is already finished**, and `i` is now `5`.

5. So when the timeouts execute, **they all see the same final value of `i` = 5.**

---

### 🧾 Output

```
5
5
5
5
```

(each one appears 1s apart)

---

### ⚙️ Why?

Because all timeout functions **close over (capture)** the same variable `i`,
and when they finally execute, that variable holds the **final value (5)**.

This is a **closure** issue — the function inside `setTimeout` remembers the _variable_, not the _value_.

---

# ✅ Code 2: Using `let` inside the loop

```js
function x() {
  for (let i = 1; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("setTimeout....⌛");
}
x();
```

---

## 🧠 Step-by-step Explanation

1. `let` creates a **new block-scoped variable** for each iteration of the loop.

2. So when the loop runs:

   - On first iteration, a fresh `i = 1` is created.
   - On second iteration, a new `i = 2`, and so on.

3. Each callback captures its own **independent copy** of `i`.

4. The `console.log("setTimeout....⌛")` executes immediately,
   because `setTimeout()` schedules tasks asynchronously.

---

### 🧾 Output

```
setTimeout....⌛
1
2
3
4
```

(each number printed after 1s, 2s, 3s, 4s respectively)

---

### ⚙️ Why?

Each iteration’s callback “remembers” its own `i` value (thanks to `let`’s block scoping).
That’s why you get the **expected increasing sequence**.

---

# 🧠 Code 3: Using `var` + Closure (Manual Fix)

```js
function x() {
  for (var i = 1; i < 5; i++) {
    function close(i) {
      // <- parameter captures current i
      setTimeout(function () {
        console.log(i);
      }, i * 1000);
    }
    close(i);
  }
  console.log("setTimeout....⌛");
}

x();
```

---

## 💡 What’s Happening Here

1. We’re still using `var`, but now we’re introducing a **helper function** called `close(i)`.

2. Each time through the loop:

   - The current value of `i` (1, 2, 3, 4) is **passed as an argument** to `close(i)`.
   - Inside `close()`, a new **parameter variable `i`** is created — unique to that call.
   - The inner `setTimeout()` callback now **closes over that local `i`**, not the outer one.

3. Therefore, each callback gets its own preserved copy of `i` via **function scope**.

---

### 🧾 Output

```
setTimeout....⌛
1
2
3
4
```

(each number appears 1s apart, exactly as intended ✅)

---

### ⚙️ Why It Works

- `var` doesn’t create new scope per iteration.
- But by wrapping each iteration’s logic inside another function (`close(i)`), we **manually create a new scope** each time.
- Each `setTimeout` then closes over that unique `i`.

This was the **traditional way (pre-ES6)** to fix the `var` issue before `let` was introduced.

---

# 🧩 Summary Table

| Version              | Keyword Used    | Scope Type       | Output     | Why                                           |
| -------------------- | --------------- | ---------------- | ---------- | --------------------------------------------- |
| 1️⃣ `var` only        | `var`           | Function-scoped  | 5, 5, 5, 5 | All timeouts share same `i`                   |
| 2️⃣ `let` in loop     | `let`           | Block-scoped     | 1, 2, 3, 4 | Each loop iteration gets new `i`              |
| 3️⃣ `var` + `close()` | `var` + closure | Manual new scope | 1, 2, 3, 4 | Closure captures value via function parameter |

---

# 🧠 Core Takeaways

- **`var`** → one shared variable for entire function.
- **`let`** → new variable per iteration (block scope).
- **Closures** → functions remember variables from their creation context, not just their values.
- **`setTimeout()`** → schedules callbacks to run later (doesn’t block code).
