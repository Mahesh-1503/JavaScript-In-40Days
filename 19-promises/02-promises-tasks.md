## 🧩 **Task 1: Movie Night 🎬**

### Callback Version:

```js
function chooseMovie(callback) {
  setTimeout(() => {
    console.log("🎞️ Movie selected");
    callback();
  }, 1000);
}

function buySnacks(callback) {
  setTimeout(() => {
    console.log("🍿 Snacks ready");
    callback();
  }, 1500);
}

function startMovie(callback) {
  setTimeout(() => {
    console.log("▶️ Movie started");
    callback();
  }, 2000);
}

chooseMovie(() => {
  buySnacks(() => {
    startMovie(() => {
      console.log("✅ Enjoy the movie!");
    });
  });
});
```

### 🎯 Your Task:

- Convert all functions into Promises.
- Chain them using `.then()`.
- Then write an `async/await` version.

---

## 🧩 **Task 2: Morning Routine ☀️**

### Callback Version:

```js
function wakeUp(callback) {
  setTimeout(() => {
    console.log("⏰ Woke up");
    callback();
  }, 1000);
}

function brush(callback) {
  setTimeout(() => {
    console.log("🪥 Brushed teeth");
    callback();
  }, 1000);
}

function eatBreakfast(callback) {
  setTimeout(() => {
    console.log("🍞 Ate breakfast");
    callback();
  }, 1500);
}

wakeUp(() => {
  brush(() => {
    eatBreakfast(() => {
      console.log("✅ Ready to start the day!");
    });
  });
});
```

### 🎯 Your Task:

- Convert to Promises.
- Handle errors using `.catch()` and simulate one error (e.g., breakfast failed).
- Then write the same with `async/await` and `try...catch`.

---

## 🧩 **Task 3: Online Shopping 🛒**

### Callback Version:

```js
function addToCart(callback) {
  setTimeout(() => {
    console.log("🛍️ Item added to cart");
    callback();
  }, 1000);
}

function makePayment(callback) {
  setTimeout(() => {
    console.log("💳 Payment successful");
    callback();
  }, 1500);
}

function generateInvoice(callback) {
  setTimeout(() => {
    console.log("🧾 Invoice generated");
    callback();
  }, 1000);
}

addToCart(() => {
  makePayment(() => {
    generateInvoice(() => {
      console.log("✅ Order complete!");
    });
  });
});
```

### 🎯 Your Task:

- Convert this to Promises with proper chaining.
- Add `.catch()` for payment failure.
- Then rewrite using `async/await`.

---

## 🧩 **Task 4: Exam Preparation 📚**

### Callback Version:

```js
function study(callback) {
  setTimeout(() => {
    console.log("📖 Studied the syllabus");
    callback();
  }, 1000);
}

function revise(callback) {
  setTimeout(() => {
    console.log("✏️ Revision completed");
    callback();
  }, 2000);
}

function writeExam(callback) {
  setTimeout(() => {
    console.log("📝 Exam written");
    callback();
  }, 1500);
}

study(() => {
  revise(() => {
    writeExam(() => {
      console.log("✅ Exam finished!");
    });
  });
});
```

### 🎯 Your Task:

- Convert to Promises.
- Use `.then()` chaining to execute in order.
- Add `.catch()` for an error (e.g., “revision skipped”).
- Then rewrite using `async/await`.

---

## 🧩 **Task 5: Restaurant Order 🍽️**

### Callback Version:

```js
function takeOrder(callback) {
  setTimeout(() => {
    console.log("🧾 Order taken");
    callback();
  }, 1000);
}

function cookFood(callback) {
  setTimeout(() => {
    console.log("🍳 Food cooked");
    callback();
  }, 2000);
}

function serveFood(callback) {
  setTimeout(() => {
    console.log("🍽️ Food served");
    callback();
  }, 1500);
}

takeOrder(() => {
  cookFood(() => {
    serveFood(() => {
      console.log("✅ Customer satisfied!");
    });
  });
});
```

### 🎯 Your Task:

- Convert each step into a Promise.
- Chain with `.then()` and `.catch()`.
- Rewrite using `async/await`.
- Finally, add a fake rejection case (like _“chef not available”_) and handle it gracefully.
