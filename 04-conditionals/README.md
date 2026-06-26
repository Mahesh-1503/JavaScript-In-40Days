# Day 04: Conditionals (SaaS Billing & Access Gateway)

Conditionals control the routing paths of execution in an application. Writing clean conditionals requires understanding code complexity, performance (branch prediction), and architectural patterns that avoid "nested conditional hell."

---

## 1. Mental Model (SaaS Access Gateway)

Think about the access gateway of a **SaaS Subscription Product** (like Notion or Slack):
1. **Free Tier:** Access to basic blocks, max 3 members.
2. **Pro Tier:** Access to advanced blocks, unlimited members, priority support.
3. **Enterprise Tier:** Custom security features, Audit logs, SLA support.

Every time a user clicks a button, the SaaS system checks their subscription status:
- If a Pro feature is clicked, check if `tier === "pro"` or `"enterprise"`.
- If an Enterprise feature is clicked, block access unless `tier === "enterprise"`.

Naively writing this leads to nested `if/else` ladders that are impossible to test. Experienced engineers use clean branching architectures.

---

## 2. Visual Thinking (Access Branching Flow)

Compare a nested branching structure with a clean, flat, early-exit control flow:

### Naive Nested Branches (Messy & Hard to Track)
```
[Request] ──► Authenticated? ──► No ──► [Show Login]
                   │
                  Yes
                   ▼
             Active Subscription? ──► No ──► [Show Billing]
                   │
                  Yes
                   ▼
             Has Permissions? ──► No ──► [Block Action]
                   │
                  Yes
                   ▼
             [Execute Action]
```

### Early Exit Return Pattern (Flat & Scalable)
```
[Request] ──► Not Authenticated? ───────► [Return/Show Login]
     │
 Authenticated
     ▼
[Request] ──► No Active Subscription? ──► [Return/Show Billing]
     │
  Active
     ▼
[Request] ──► No Permissions? ──────────► [Return/Block Action]
     │
Authorized
     ▼
[Execute Action]
```

---

## 3. Beginner Explanation

Conditionals allow your code to make decisions using boolean values (`true` or `false`):
- **`if` / `else if` / `else`:** Branching statements that run specific blocks of code depending on whether a condition is true.
- **Ternary Operator (`condition ? doThis : doThat`):** A shorthand, inline version of `if/else`, useful for simple assignments.
- **`switch`:** A clean way to match a single variable against multiple potential static values.

---

## 4. Deep Explanation (V8 Compiler & Jump Tables)

### 1. Branch Prediction in CPU & V8
At the machine code level, the processor tries to predict which branch of an `if/else` statement will run before the condition is evaluated. If the prediction is correct, execution is extremely fast. If it is wrong (a branch misprediction), the CPU pipeline must stall and discard pre-fetched operations. 

- Keep the **most common path** as the first `if` branch to optimize CPU branch prediction.
- Keep conditions pure (avoid side effects inside conditions).

### 2. Switch Statements vs Nested If/Else
In V8, when a `switch` statement has many sequential or close integer cases, the compiler optimizes it into a **Jump Table** (an array of memory addresses). Instead of evaluating each case line by line (like `if/else`), the engine performs a single math operation to jump directly to the correct code memory address.
- Switch statements can be faster than nested `if/else` for matching multiple values of a single variable.

---

## 5. Real Production Examples

### 1. The Early-Exit Guard (Access Validator)
Standard pattern to avoid deeply nested code in APIs.
```javascript
function processBillingTransaction(user, paymentDetails) {
  // 1. Guard: Check authentication
  if (!user.isAuthenticated) {
    return { success: false, error: "Authentication Required" };
  }

  // 2. Guard: Check payment card validity
  if (!paymentDetails.cardNumber || !paymentDetails.cvv) {
    return { success: false, error: "Invalid Card Formats" };
  }

  // 3. Main execution path (Safe, flat, no nesting)
  return executeCharge(user.id, paymentDetails.amount);
}
```

### 2. SaaS Billing Tier Router (Switch Jump Table)
```javascript
function getFeatureLimits(subscriptionTier) {
  switch (subscriptionTier) {
    case "free":
      return { maxMembers: 3, storageGb: 5, auditLogs: false };
    case "pro":
      return { maxMembers: 50, storageGb: 100, auditLogs: false };
    case "enterprise":
      return { maxMembers: Infinity, storageGb: 5000, auditLogs: true };
    default:
      return { maxMembers: 1, storageGb: 1, auditLogs: false };
  }
}
```

### 3. Inline Theme Class Assignment (Ternary Operator)
```javascript
const activeTheme = "dark";
const bodyClass = activeTheme === "dark" ? "theme-dark-bg" : "theme-light-bg";
```

### 4. Dynamic Device Render Router (Logical Branching)
```javascript
const viewportWidth = window.innerWidth;
const isMobile = viewportWidth < 768;
const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

if (isMobile) {
  loadMobileNavigation();
} else if (isTablet) {
  loadTabletNavigation();
} else {
  loadDesktopNavigation();
}
```

### 5. Multi-Condition Permission Flag Check
```javascript
const user = { role: "admin", isBlocked: false, verifiedEmail: true };

// Check if user is eligible to edit SaaS configurations
if (user.role === "admin" && !user.isBlocked && user.verifiedEmail) {
  enableConfigPanel();
}
```

---

## 6. Progressive Coding (Refactoring Complex Branching)

### Level 1: Beginner (Nested if/else Hell)
```javascript
function getShippingCost(country, itemWeight) {
  let cost;
  if (country === "US") {
    if (itemWeight > 10) {
      cost = 15;
    } else {
      cost = 5;
    }
  } else if (country === "CA") {
    if (itemWeight > 10) {
      cost = 20;
    } else {
      cost = 8;
    }
  } else {
    cost = 30;
  }
  return cost;
}
```

### Level 2: Better (Flat Guards and Ternary Operators)
```javascript
function getShippingCost(country, itemWeight) {
  if (country === "US") {
    return itemWeight > 10 ? 15 : 5;
  }
  if (country === "CA") {
    return itemWeight > 10 ? 20 : 8;
  }
  return 30;
}
```

### Level 3: Production (Configuration Object Lookup - O(1) Speed)
```javascript
// Remove conditional logic completely using a map object
const SHIPPING_RATES = {
  US: weight => (weight > 10 ? 15 : 5),
  CA: weight => (weight > 10 ? 20 : 8)
};

function getShippingCost(country, itemWeight) {
  const calculateRate = SHIPPING_RATES[country];
  if (!calculateRate) return 30; // Fallback default
  return calculateRate(itemWeight);
}
```

### Level 4: Enterprise (Strategy Design Pattern for SaaS Gates)
```javascript
// ENTERPRISE: A fully extensible validation engine where strategies can be injected
class SaaSFeatureGate {
  constructor() {
    this.strategies = [];
  }

  addValidationRule(ruleFn) {
    this.strategies.push(ruleFn);
  }

  canAccessFeature(userContext, featureId) {
    // Every rule must return true for authorization to pass
    return this.strategies.every(rule => rule(userContext, featureId));
  }
}

const accessGate = new SaaSFeatureGate();

// Rule 1: Account must not be suspended
accessGate.addValidationRule(user => !user.isSuspended);

// Rule 2: Premium features require pro/enterprise tiers
accessGate.addValidationRule((user, feature) => {
  if (feature.isPremium) {
    return user.tier === "pro" || user.tier === "enterprise";
  }
  return true;
});

const user = { tier: "free", isSuspended: false };
const targetFeature = { id: "video_export", isPremium: true };

const isAllowed = accessGate.canAccessFeature(user, targetFeature); // false
```

---

## 7. Common Mistakes

1. **Accidental Variable Assignment instead of Equality Check:**
   ```javascript
   let isAdmin = false;
   if (isAdmin = true) { ... } // BUG: Assigns true, so block always executes!
   ```
2. **Nested Ternary Operators (Unreadable Code):**
   ```javascript
   const status = isRegistered ? (hasPaid ? "member" : "pending") : "guest";
   // Hard to read. Refactor to early returns or standard if/else.
   ```
3. **Implicit Coercion Bugs (Truthy vs Falsy):**
   Evaluating empty arrays or objects inside conditionals returns `true`:
   ```javascript
   const itemsList = [];
   if (itemsList) {
     console.log("Rendering items..."); // Runs even though array is empty!
   }
   // Fix: if (itemsList.length > 0)
   ```

---

## 8. Best Practices

1. **Early Return Principle:** Return as early as possible to keep code indentation shallow and clear.
2. **Favor Object Mapping over huge switch/if-else:** Increases scalability and readability.
3. **Group complex checks:** Extract long conditional expressions into named boolean constants to document the code naturally:
   ```javascript
   const isBillingEligible = user.age >= 18 && user.hasCard && !user.isTrialExpired;
   if (isBillingEligible) { ... }
   ```

---

## 9. Interview Preparation

### Q1: What is the "Early Return" pattern and why is it preferred?
**Answer:** The Early Return pattern involves returning from a function as soon as an invalid or edge-case state is detected, using guards at the top of the function. It is preferred because it eliminates deep nested blocks, reduces cognitive complexity, and makes debugging and reading code significantly easier.

### Q2: What are the truthy and falsy values in JavaScript?
**Answer:** There are exactly 8 falsy values in JavaScript. Everything else is truthy:
1. `false`
2. `0` (and `-0`, `0n` BigInt)
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`
*(Note: Empty arrays `[]` and empty objects `{}` are truthy).*

### Q3: How does V8 handle a switch statement differently than an if/else chain?
**Answer:** For sequential cases, V8 compiles a `switch` statement into a **Jump Table** in machine code. It calculates the offset based on the switch variable and jumps directly to that case block, achieving $O(1)$ lookup performance. An `if/else` chain must evaluate conditions sequentially, resulting in $O(N)$ lookup.

---

## 10. Homework

1. **Early Return Guard Refactoring:** Take a deeply nested logic block (provided in exercises) and rewrite it using early return guards.
2. **Access Control Strategy Map:** Write a function `checkAccess(role, resource)` using a configuration object mapper instead of `switch` or `if/else` statements.
3. **Falsy Safety Checker:** Create a validator function that takes an input and returns `true` only if the input is a valid non-empty collection (string, array, or object) and does not trigger false positives on `0` or `false`.
4. **Device Feature Gates:** Write a feature gate system that branches depending on screen size, touch availability, and network connection properties.
5. **Switch Benchmark Analysis:** Write a benchmark loop using `console.time()` comparing a switch statement of 10 cases vs an if/else chain of 10 cases, and write down your performance findings.
