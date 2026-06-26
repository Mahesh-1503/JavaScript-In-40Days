# Day 14: Strict Mode & Error Handling (Robinhood Stock Trader)

In financial and production-grade applications, silent failures are unacceptable. A script that fails silently can cause incorrect transaction reporting or memory corruption. Writing secure code requires enforcing **Strict Mode** to block unsafe actions and implementing robust **Error Handling** to manage runtime failures.

---

## 1. Mental Model (The Robinhood Stock Trader)

Think of a stock trading platform like **Robinhood**:
1. **Accidental Actions (Strict Mode):** If a developer accidentally writes to a read-only variable (like `USER_ID`), strict mode immediately crashes the engine instead of letting the transaction proceed with wrong variables.
2. **Network Failures (Try-Catch):** When buying stock, the server API might fail due to network drops. We wrap the transaction inside a `try...catch` block to handle connections gracefully.
3. **Transaction Rollback (Finally):** If the trade fails, we must release the user's reserved cash and log the session audit. This cleanup happens inside the `finally` block, ensuring it runs no matter what.

---

## 2. Visual Thinking (Try-Catch-Finally Flow)

How JavaScript routes execution during a runtime exception:

```
                  [Start: Execute Trade]
                            │
                            ▼
                     ┌─────────────┐
                     │  Try Block  │
                     └─────────────┘
                            │
               Did an Exception occur?
               ┌────────────┴────────────┐
               ▼ (Yes)                   ▼ (No)
        ┌─────────────┐           ┌──────────────┐
        │ Catch Block │           │ Skip Catch   │
        └─────────────┘           └──────────────┘
               │                         │
               └────────────┬────────────┘
                            ▼
                     ┌─────────────┐
                     │Finally Block│ ◄── [ALWAYS EXECUTES]
                     └─────────────┘
                            │
                            ▼
                  [Release Cache locks]
```

---

## 3. Beginner Explanation

- **Strict Mode (`"use strict"`):** A special setting that locks down JavaScript, turning silent mistakes into loud crashes. It forces you to write cleaner, safer code.
- **`try` Block:** Put the code you want to run here. This is the code that *might* throw an error (e.g. fetching data from a server).
- **`catch` Block:** If an error happens inside the `try` block, execution jumps here. You get access to the `error` object detailing what went wrong.
- **`finally` Block:** A cleanup block. It runs *always*, whether the code in `try` succeeded or failed.
- **`throw`:** Custom triggers. You can force JavaScript to throw an error when inputs are invalid (e.g., `throw new Error("Insufficient funds")`).

---

## 4. Deep Explanation (Strict Mode Locks & Async Errors)

### 1. What `"use strict"` Changes Under the Hood
1. **Prevents accidental globals:** Assigning to an undeclared variable throws a ReferenceError.
2. **Restricts readonly mutations:** Writing to non-writable, getter-only, or non-extensible objects throws a TypeError.
3. **Eliminates scope hazards:** Deleting functions or variables is blocked. Duplicate parameter names (`function sum(a, a)`) are forbidden.
4. **Removes global `this` leakage:** The default value of `this` in standalone calls is `undefined` rather than the `window` object.

### 2. The Exception Event Flow
When an error is thrown, the engine halts normal code execution and scans the Call Stack for the nearest enclosing `try-catch` scope. If none is found, the error bubles up to the global environment (window/process), causing an `Uncaught Exception` crash.

### 3. Asynchronous Error Handling Limits
A standard synchronous `try...catch` block **cannot** catch errors thrown inside asynchronous callbacks (like `setTimeout` or async API calls) because the parent function has already exited the call stack.
- To handle async errors, we must catch them inside the async function or use Promise `.catch()` handlers.

---

## 5. Real Production Examples (Stock Trader flows)

### 1. Enforcing Read-Only Limits (Strict Mode)
```javascript
"use strict";

const accountSettings = {};
Object.defineProperty(accountSettings, "ACCOUNT_ID", {
  value: "acct_8992a",
  writable: false
});

// accountSettings.ACCOUNT_ID = "new_id"; // Throws TypeError in strict mode!
```

### 2. Buying Stock with Failover Catch (Try-Catch)
```javascript
function executeStockPurchase(ticker, shares) {
  try {
    console.log(`Submitting order: ${shares} shares of ${ticker}`);
    
    // Simulate network error
    if (ticker === "CRASH") {
      throw new Error("Order Timeout from Exchange Gateway");
    }
    return { orderId: "ord_99a", success: true };
  } catch (error) {
    console.error(`[TRANSACTION-FAILED] Logged: ${error.message}`);
    return { success: false, error: error.message };
  }
}
```

### 3. API Connection Cleanup (Finally)
Releasing cache locks to prevent resource leaks.
```javascript
function queryExchangeMarket() {
  let socketConnected = true;
  try {
    console.log("Connecting to NASDAQ data stream...");
    throw new Error("Connection Refused");
  } catch (error) {
    console.warn("Retrying connection via backup gateway...");
  } finally {
    socketConnected = false; // Always releases lock
    console.log("Socket connection closed safely.");
  }
}
```

### 4. Custom Trade Exception (Validation Throw)
Creating custom domain-specific error classes allows precise error filtering.
```javascript
class InsufficientFundsError extends Error {
  constructor(message) {
    super(message);
    this.name = "InsufficientFundsError";
    this.code = 402;
  }
}

function processOrder(cost, availableBalance) {
  if (cost > availableBalance) {
    throw new InsufficientFundsError(`Required $${cost}, but only had $${availableBalance}`);
  }
}
```

### 5. Async Error Handling Loader
```javascript
function fetchStockQuote(ticker) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Failed to fetch quote for ${ticker}`));
    }, 100);
  });
}

// Consuming async errors safely
async function displayTicker(ticker) {
  try {
    const data = await fetchStockQuote(ticker);
    console.log(data);
  } catch (error) {
    console.warn(`Display halted: ${error.message}`);
  }
}
```

---

## 6. Progressive Coding (Transaction Failures)

### Level 1: Beginner (Silent Fails / Empty catch blocks)
```javascript
// BAD: Swallows errors, leaving the application state corrupt and untraceable
try {
  executeTrade();
} catch (e) {
  // Silence...
}
```

### Level 2: Better (Logging Errors)
```javascript
// BETTER: Logs, but provides no recovery or failure alerts to the user
try {
  executeTrade();
} catch (error) {
  console.error("Error occurred:", error);
}
```

### Level 3: Production (Contextual Error Filtering & Recovery)
```javascript
// PRODUCTION: Checks error types and applies targeted recovery/rollbacks
try {
  executeTrade();
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    promptAddFunds();
  } else {
    rollbackTransaction();
    logAlertToDatadog(error);
  }
}
```

### Level 4: Enterprise (Staged Transaction Rollback Engine)
```javascript
// ENTERPRISE: A transactional unit-of-work container that registers operations
// and automatically rolls back all successful stages if a later step fails.
class StockTransactionUnit {
  constructor(userAccount) {
    this.account = userAccount;
    this.rollbackQueue = [];
  }

  addStep(operationFn, rollbackFn) {
    this.rollbackQueue.push({ operationFn, rollbackFn });
    return this;
  }

  async commit() {
    const executedSteps = [];
    console.log("Committing trade pipeline stages...");
    
    try {
      for (const step of this.rollbackQueue) {
        await step.operationFn();
        executedSteps.push(step); // Log successful steps
      }
      console.log("Transaction committed successfully!");
    } catch (error) {
      console.warn(`Transaction failed: ${error.message}. Initiating rollback...`);
      
      // Rollback in reverse order
      for (let i = executedSteps.length - 1; i >= 0; i--) {
        try {
          await executedSteps[i].rollbackFn();
        } catch (rollbackErr) {
          console.error("CRITICAL: Rollback failed!", rollbackErr);
        }
      }
      throw error; // Re-throw to inform caller
    }
  }
}

// Usage
const account = { balance: 1000, reserved: 0 };
const tradeUnit = new StockTransactionUnit(account);

tradeUnit.addStep(
  () => { account.reserved += 500; account.balance -= 500; }, // step 1: reserve funds
  () => { account.balance += 500; account.reserved -= 500; }  // rollback step 1
).addStep(
  () => { throw new Error("Stock Exchange is offline"); },     // step 2: fails
  () => { console.log("Rollback step 2 (no-op)"); }
);

// tradeUnit.commit(); // Triggers step 1 rollback
```

---

## 7. Common Mistakes

1. **Empty Catch Blocks (Error Swallowing):**
   Catching an error and doing nothing prevents debuggers from tracing issues and leaves code running in corrupt states.
2. **Synchronous catch blocks on async code:**
   ```javascript
   // BUG: try-catch block exits BEFORE setTimeout throws, crashing the node process!
   try {
     setTimeout(() => { throw new Error("Crash"); }, 100);
   } catch (err) {
     console.log("Caught:", err); // Never runs!
   }
   ```
3. **Throwing non-Error primitives:**
   `throw "Insufficient funds";` throws a string, not an Error object. This destroys stack traces, making debugging impossible. Always use `throw new Error()`.

---

## 8. Best Practices

1. **Always throw native `Error` instances:** Ensures stack traces are captured correctly.
2. **Clean up resource locks in `finally`:** Close file streams, clear sockets, and reset loading indicators inside `finally` blocks.
3. **Write custom error classes:** Simplifies handling different categories of errors dynamically.

---

## 9. Interview Preparation

### Q1: How does strict mode prevent accidental global variables?
**Answer:** In normal JavaScript, assigning to an undeclared variable (e.g. `x = 5`) automatically attaches that variable to the global `window` object. In strict mode, the JS engine halts execution and throws a `ReferenceError: x is not defined`, preventing memory pollution and scope leaks.

### Q2: What is the behavior of a `finally` block when a return statement is present in both `try` and `finally`?
**Answer:** The `finally` block is guaranteed to run. If the `finally` block contains a `return` statement, it will override any `return` statement written inside the `try` or `catch` blocks.
```javascript
function test() {
  try { return 1; }
  finally { return 2; } // Overrides try return
}
console.log(test()); // 2
```

### Q3: Why can't a synchronous `try-catch` block capture errors inside a promise?
**Answer:** The event loop handles Promise resolution asynchronously. When the Promise fails and throws an error, the execution context of the synchronous `try-catch` wrapper has already run to completion and been popped off the Call Stack. To catch Promise errors, use `.catch()` or wrapper `async/await` try-catch blocks.

---

## 10. Homework

1. **Stock Transaction Rollback:** Write a transaction manager where steps (credit check, stock allocation, ledger logging) rollback in reverse order if one fails.
2. **Accidental Global Interceptor:** Write a script containing strict mode toggles. Demonstrate how undeclared variable assignments behave with and without strict mode active.
3. **Custom Validation Class:** Implement a `ValidatorException` class that retains error codes and parameters, and write an validation dispatcher that handles instances cleanly.
4. **Async Error Catcher:** Write a script that executes parallel asynchronous operations. Ensure that errors in single calls are caught without crashing adjacent tasks.
5. **Finally Override Test:** Build a function containing returns in `try`, `catch`, and `finally` blocks. Trace the execution path and write down the behavior analysis.