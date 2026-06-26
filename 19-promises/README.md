# Day 19: Mastering Promises (DoorDash Delivery Tracker)

Asynchronous code can quickly become unmanageable when using callbacks. **Promises** solve these issues by providing a structured, stateful container for asynchronous operations, allowing you to chain steps sequentially and handle errors cleanly.

---

## 1. Mental Model (The DoorDash Delivery Tracker)

Think of ordering food on **DoorDash**:
1. **The Order is Placed:** You submit your order. You receive a tracking receipt. This is your **Pending Promise**. The food hasn't arrived, but you have a receipt guaranteeing a result.
2. **The Kitchen Cooks:** The restaurant accepts the order.
3. **The Driver Delivers:** The driver picks up the food and brings it to your door. Your receipt updates to **Fulfilled (Success)**.
4. **The Store is Closed (Failure):** If the restaurant is closed, your order is canceled. Your receipt updates to **Rejected (Failure)**, and you get a refund.

With Promises, you can chain these events sequentially:
`placeOrder() ➔ then(cookFood) ➔ then(deliverFood) ➔ catch(refundUser)`
If *any* step fails (e.g. driver declines), the execution skips the remaining success steps and jumps directly to `catch(refundUser)`.

---

## 2. Visual Thinking (The Promise Lifecycle & State Transitions)

A Promise starts as **Pending** and can transition to exactly **one** of two final states:

```
                          ┌───────────────────────────┐
                          │    PENDING (Order Placed) │
                          └─────────────┬─────────────┘
                                        │
                    Resolve?            │            Reject?
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌───────────────────────────┐                         ┌───────────────────────────┐
│ FULFILLED (Success)       │                         │ REJECTED (Failure)        │
│ Triggers .then() callbacks│                         │ Triggers .catch() hooks   │
└───────────────────────────┘                         └───────────────────────────┘
```

Once a Promise is **Settled** (either Fulfilled or Rejected), its state is locked permanently. It cannot be updated or changed again.

---

## 3. Beginner Explanation

A **Promise** is a JavaScript object that represents a task that will finish in the future.
It has three states:
1. **Pending:** The task is still running (cooking food).
2. **Fulfilled:** The task finished successfully (food delivered). We use `.then()` to decide what to do next.
3. **Rejected:** The task failed (restaurant closed). We use `.catch()` to handle the error.

By using `.then()` chains, you can write clean, step-by-step code without nesting functions.

---

## 4. Deep Explanation (Promise Internals & Microtask Queue)

Under the hood, a Promise object in the JS Engine has private memory slots:

### 1. Internal Slots
- **`[[PromiseState]]`:** Current state (`"pending"`, `"fulfilled"`, or `"rejected"`).
- **`[[PromiseResult]]`:** The value returned when resolved, or the error object when rejected.
- **`[[PromiseFulfillReactions]]`:** A list of callbacks registered via `.then()`.
- **`[[PromiseRejectReactions]]`:** A list of callbacks registered via `.catch()`.

### 2. Resolution Mechanics
When a Promise resolves:
1. The state changes to `"fulfilled"` and `[[PromiseResult]]` is set to the resolved value.
2. The registered `.then()` callbacks are pushed to the **Microtask Queue** immediately.
3. The Event Loop processes these callbacks as high-priority tasks as soon as the Call Stack is empty.

### 3. Error Bubbling
If a Promise in a chain rejects, the engine skips all subsequent `.then()` handlers until it finds the first `.catch()` block. This is called **error propagation** or **bubbling**.

---

## 5. Real Production Examples (DoorDash flows)

### 1. Placing the Order (Instantiating a Promise)
```javascript
function placeOrder(items) {
  return new Promise((resolve, reject) => {
    console.log("Submitting order to kitchen...");
    setTimeout(() => {
      const isStoreOpen = true;
      if (isStoreOpen) {
        resolve({ orderId: "dash_99182", cost: 25.50 });
      } else {
        reject(new Error("Store is closed"));
      }
    }, 200);
  });
}
```

### 2. Cooking the Food (Promise Chaining Step)
Receives the order result and returns a new Promise.
```javascript
function prepareFood(orderReceipt) {
  return new Promise((resolve) => {
    console.log(`[Kitchen] Preparing food for Order #${orderReceipt.orderId}...`);
    setTimeout(() => {
      resolve({ ...orderReceipt, status: "cooked" });
    }, 200);
  });
}
```

### 3. Dispatching the Driver (Error-Prone Step)
If the driver declines, the promise rejects, skipping to recovery.
```javascript
function dispatchDriver(cookedReceipt) {
  return new Promise((resolve, reject) => {
    console.log("[Dispatch] Searching for active drivers...");
    setTimeout(() => {
      const driverFound = Math.random() > 0.15; // 85% success
      if (driverFound) {
        resolve({ ...cookedReceipt, driverName: "John" });
      } else {
        reject(new Error("No drivers available in area"));
      }
    }, 200);
  });
}
```

### 4. Parallel Shop Verifications (`Promise.all`)
Fetches restaurant menu and user profile in parallel, failing if *either* fails.
```javascript
function verifyCheckoutDetails(userId, restaurantId) {
  return Promise.all([
    fetchUserProfile(userId),
    fetchMenuDetails(restaurantId)
  ]).then(([user, menu]) => {
    return { user, menu };
  });
}

function fetchUserProfile(id) { return Promise.resolve({ name: "Alice" }); }
function fetchMenuDetails(id) { return Promise.resolve({ items: ["Tacos"] }); }
```

### 5. Multi-Driver Query Fallback (`Promise.any`)
Queries multiple drivers and resolves as soon as *the first* one accepts.
```javascript
function requestDrivers(driverList) {
  const requests = driverList.map(driver => pingDriver(driver));
  return Promise.any(requests); // Resolves when first driver accepts
}

function pingDriver(name) {
  return new Promise(resolve => setTimeout(() => resolve(name), Math.random() * 500));
}
```

---

## 6. Progressive Coding (Delivery Chain Pipeline)

### Level 1: Beginner (Nested Callback Hell)
```javascript
// BAD: Deep nesting makes error handling and modifications painful
placeOrder(items, (err, order) => {
  if (!err) {
    prepareFood(order, (err, food) => {
      if (!err) {
        dispatchDriver(food, (err, driver) => {
          if (!err) {
            console.log("Food delivered!");
          }
        });
      }
    });
  }
});
```

### Level 2: Better (Flat Promise Chains)
```javascript
// BETTER: Flat structure, but logs are cluttered and errors aren't caught
placeOrder(["Burger"])
  .then(order => prepareFood(order))
  .then(cooked => dispatchDriver(cooked))
  .then(delivered => console.log("Delivered by:", delivered.driverName));
```

### Level 3: Production (Clean Chain with Catch & Recovery)
```javascript
// PRODUCTION: Complete chain with robust error catches and fallbacks
placeOrder(["Burger"])
  .then(prepareFood)
  .then(dispatchDriver)
  .then(delivered => {
    console.log(`Success: Food delivered by ${delivered.driverName}`);
  })
  .catch(error => {
    console.error(`[DELIVERY-FAILED] Refund initiated: ${error.message}`);
  });
```

### Level 4: Enterprise (Staged Delivery State Machine)
```javascript
// ENTERPRISE: A fully observable transaction class that executes
// promise steps sequentially, logs metrics, and supports retry attempts on failure.
class StagedDeliveryTransaction {
  constructor(orderItems) {
    this.items = orderItems;
    this.history = [];
  }

  async runPipeline() {
    this.logState("INITIATED");

    try {
      const order = await this.executeStep("Order Placed", () => placeOrder(this.items));
      const cooked = await this.executeStep("Kitchen Preparation", () => prepareFood(order));
      const delivery = await this.executeStep("Driver Dispatch", () => this.retryStep(() => dispatchDriver(cooked), 3));
      
      this.logState("DELIVERED");
      return delivery;
    } catch (error) {
      this.logState("FAILED");
      console.error(`CRITICAL: Order failed at step [${this.history[this.history.length - 1].step}]: ${error.message}`);
      throw error;
    }
  }

  logState(status) {
    console.log(`[STATUS-UPDATE] Order status is: ${status}`);
  }

  executeStep(stepName, stepFn) {
    this.history.push({ step: stepName, time: Date.now() });
    return stepFn();
  }

  async retryStep(stepFn, maxRetries) {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        return await stepFn();
      } catch (err) {
        attempts++;
        console.warn(`[RETRY] Step failed. Retrying... Attempt ${attempts}/${maxRetries}`);
        if (attempts === maxRetries) throw err;
      }
    }
  }
}

const tx = new StagedDeliveryTransaction(["Tacos", "Soda"]);
// tx.runPipeline();
```

---

## 7. Common Mistakes

1. **Forgetting to return a Promise inside `.then()`:**
   If you don't return the promise, the next `.then()` block runs immediately with `undefined` instead of waiting for the asynchronous operation to complete.
   ```javascript
   // BUG: prepareFood starts but next .then runs instantly without waiting!
   placeOrder(["Tacos"])
     .then(order => { prepareFood(order); }) // Missing return!
     .then(cooked => { ... }); // cooked is undefined
   ```
2. **Nesting Promises (Nested Promise Hell):**
   Writing `.then()` blocks inside other `.then()` blocks defeats the purpose of Promises. Keep chains flat by returning the next Promise.
3. **Leaving Rejections Unhandled:**
   Failing to add a `.catch()` block at the end of a chain causes an `UnhandledPromiseRejection` warning, which can crash the application in modern environments.

---

## 8. Best Practices

1. **Always end promise chains with a `.catch()`:** Catches failures from any previous step.
2. **Keep chains flat:** Return Promises from `.then()` callbacks instead of nesting them.
3. **Use `Promise.allSettled()` instead of `Promise.all` if some tasks can fail:** This ensures you get the results of all tasks even if one of them rejects.

---

## 9. Interview Preparation

### Q1: What is the difference between `Promise.all()` and `Promise.allSettled()`?
**Answer:**
- `Promise.all()` runs tasks in parallel. It rejects immediately if *any* promise rejects, discarding the results of the other tasks.
- `Promise.allSettled()` runs tasks in parallel. It waits for *all* promises to settle (either resolve or reject) and returns an array of objects detailing the status and value/error of each task.

### Q2: What is the output of this code?
```javascript
const promise = new Promise((resolve, reject) => {
  resolve("Success 1");
  reject(new Error("Error"));
  resolve("Success 2");
});
promise.then(console.log).catch(console.error);
```
**Answer:** The output is `"Success 1"`.
A Promise can only settle once. Once `resolve("Success 1")` is called, the state is locked to `"fulfilled"`. Subsequent attempts to reject or resolve the Promise are ignored.

### Q3: What is "Promise Promisification"?
**Answer:** Promisification is the process of wrapping a legacy callback-based function (e.g. Node's `fs.readFile`) inside a function that returns a Promise, allowing it to be used in modern async/await workflows.

---

## 10. Homework

1. **Delivery Steps Chain:** Write a 4-step DoorDash tracking chain using `.then()` promises. Simulate random failures (e.g. kitchen runs out of ingredients) and verify the `.catch()` triggers.
2. **Retry Mechanism:** Implement a function `retryPromise(promiseCreator, retries)` that attempts to execute a Promise-based action multiple times before finally rejecting.
3. **Custom Promise.all:** Write a custom function `myPromiseAll(promisesArray)` that behaves exactly like native `Promise.all()`.
4. **AllSettled Audit:** Write an operations program that queries 5 mock services in parallel. Use `Promise.allSettled()` and filter the succeeded items from the failed items.
5. **JSON Fetch Validator:** Write a utility that fetches a mock API URL, verifies the response status is 200, and returns the parsed JSON payload, handling HTTP errors cleanly inside `.catch()`.
