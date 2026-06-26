# Day 03: Operators and Expressions (Uber Price Calculator)

Operators and expressions are the core logic engines of any software. Writing correct logic requires understanding how JavaScript evaluates arithmetic (especially floating-point calculations), handles logical short-circuiting, and processes bitwise flags.

---

## 1. Mental Model (The Uber Fare Engine)

Think about the pricing backend of **Uber**:
1. **Arithmetic Operators:** Calculate the base fare (`distance * ratePerKm + time * ratePerMinute`).
2. **Logical Operators (`&&`, `||`, `??`):** Check if surge pricing is active AND if the user has an active coupon. If the coupon is `null`, fall back to the base fare.
3. **Comparison Operators:** Verify if distance is greater than the driver's maximum range.
4. **Bitwise Operators:** Efficiently store and check driver states (e.g. `Online`, `HasPassenger`, `AcceptingCash`) in a single binary integer flag.

---

## 2. Visual Thinking (Short-Circuit Evaluation Flow)

When evaluating logical expressions, JavaScript reads left-to-right and "short-circuits" (stops executing) as soon as the result is guaranteed:

```
AND (&&) Flow: [Operand 1] ──► Falsy? ──► [STOP & Return Operand 1]
                     │
                   Truthy
                     ▼
              [Return Operand 2]

OR (||) Flow:  [Operand 1] ──► Truthy? ──► [STOP & Return Operand 1]
                     │
                   Falsy
                     ▼
              [Return Operand 2]
```

This behavior is heavily used in production as inline `if` statements or fallback systems.

---

## 3. Beginner Explanation

- **Operators:** Symbols that perform actions on values (like `+`, `-`, `*`, `/`).
- **Operands:** The values being modified. In `x + y`, `x` and `y` are operands, and `+` is the operator.
- **Expressions:** Any line of code that evaluates to a value.
- **Short-circuiting:** Using `&&` and `||` to write conditional fallback code. For example, `userProfile || defaultProfile` tells JavaScript: "use the user profile if it exists, otherwise fall back to the default profile."

---

## 4. Deep Explanation (Floating-Point Precision & Bitwise Engine)

### 1. Floating-Point Precision Issue (IEEE 754)
In JavaScript:
```javascript
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004
```
**Why?** JavaScript uses IEEE 754 double-precision floats. Floating-point numbers are converted to binary internally. Numbers like `0.1` and `0.2` cannot be represented precisely in finite binary digits, leading to tiny rounding errors. 

### 2. Loose vs. Strict Equality
- **`==` (Loose):** Converts operands to the same type (coercion) before comparing.
- **`===` (Strict):** Compares both value and type. No type coercion occurs. **Always use strict comparison.**

### 3. Nullish Coalescing (`??`) vs. OR (`||`)
- **`||`** returns the right-hand operand if the left-hand operand is *any* falsy value (`""`, `0`, `false`, `null`, `undefined`, `NaN`).
- **`??`** returns the right-hand operand *only* if the left-hand operand is nullish (`null` or `undefined`).

---

## 5. Real Production Examples

### 1. Uber Fare Surge Multiplier (Arithmetic)
```javascript
const baseFare = 5.00;
const distanceKm = 12.5;
const ratePerKm = 1.50;
const surgeMultiplier = 1.8;

// Exponentiation operator (**) used for progressive distance penalty calculation
const baseTotal = baseFare + (distanceKm * ratePerKm);
const finalFare = Number((baseTotal * surgeMultiplier).toFixed(2));
```

### 2. User Authentication Fallback (Nullish Coalescing)
If the user's customized theme is an empty string `""` or `0`, we should NOT fallback to default. Hence, `??` is used over `||`.
```javascript
const userVolumeSetting = 0; // Valid setting
const defaultVolume = 50;

const activeVolume = userVolumeSetting ?? defaultVolume; // 0 (using ?? instead of ||)
const faultyVolume = userVolumeSetting || defaultVolume; // 50 (using || replaces the valid 0)
```

### 3. Bitwise Flags for Driver States (High Performance)
Storing multiple boolean states in a single byte saves memory in high-scale systems.
```javascript
const DRIVER_ONLINE = 1 << 0;  // 0001
const ACCEPTING_CASH = 1 << 1; // 0010
const IN_TRIP = 1 << 2;        // 0100

// Initialize driver as Online and Accepting Cash (0011)
let driverState = DRIVER_ONLINE | ACCEPTING_CASH; 

// Check if driver is currently in a trip (0100 & 0011 -> 0000)
const isDriverInTrip = (driverState & IN_TRIP) !== 0; // false
```

### 4. Dynamic Coupon Validator (Short-Circuit evaluation)
```javascript
const isRegisteredUser = true;
const hasMinimumSpend = spendAmount => spendAmount >= 30;

// If first condition is false, second check is skipped completely (short-circuit)
const eligibleForCoupon = isRegisteredUser && hasMinimumSpend(35); 
```

### 5. Safe Floating-Point Comparison
For high-scale calculations (checkout invoices):
```javascript
const areEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;
console.log(areEqual(0.1 + 0.2, 0.3)); // true
```

---

## 6. Progressive Coding (Conditional Evaluators)

### Level 1: Beginner (Naive nested if/else statements)
```javascript
let finalPrice;
if (promoCode !== null) {
  if (promoCode === "SAVE10") {
    finalPrice = basePrice - 10;
  } else {
    finalPrice = basePrice;
  }
} else {
  finalPrice = basePrice;
}
```

### Level 2: Better (Ternary Operator)
```javascript
const finalPrice = (promoCode === "SAVE10") ? (basePrice - 10) : basePrice;
```

### Level 3: Production (Inline Short-Circuit Fallbacks)
```javascript
// Fallback setup using nullish coalescing and short circuit
const discount = (promoCode === "SAVE10" && 10) || 0;
const finalPrice = basePrice - discount;
```

### Level 4: Enterprise (Dynamic Calculation Pipeline Engine)
```javascript
// ENTERPRISE: Functional Pipeline that maps and reduces pricing charges dynamically
const pricingEngine = {
  applyBaseFare: fare => fare + 2.50,
  applyDistanceFare: (fare, km) => fare + (km * 1.20),
  applySurge: (fare, multiplier) => fare * (multiplier ?? 1.0),
  applyPromo: (fare, discount) => Math.max(0, fare - (discount ?? 0))
};

const calculateInvoice = (km, surge, discount) => {
  let invoice = 0;
  invoice = pricingEngine.applyBaseFare(invoice);
  invoice = pricingEngine.applyDistanceFare(invoice, km);
  invoice = pricingEngine.applySurge(invoice, surge);
  invoice = pricingEngine.applyPromo(invoice, discount);
  return Number(invoice.toFixed(2));
};

const bill = calculateInvoice(15.4, 1.5, 5.00); // Dynamic pipeline calculation
```

---

## 7. Common Mistakes

1. **Floating Point Comparison Bugs:**
   ```javascript
   if (amountPayable === 0.3) { ... } // Will fail if amountPayable was evaluated as 0.1 + 0.2
   ```
2. **Using standard OR (`||`) for valid `0` or `false` defaults:**
   ```javascript
   const itemsInStock = 0;
   const displayCount = itemsInStock || 10; // BUG: displayCount becomes 10 because 0 is falsy.
   ```
3. **Operator Precedence Confusion:**
   ```javascript
   const total = 5 + 3 * 2; // 11 (Multiplication runs first). Use (5 + 3) * 2 to get 16.
   ```

---

## 8. Best Practices

1. **Always use strict equality (`===` / `!==`):** Avoids unexpected type coercion.
2. **Be explicit with parentheses:** Even if operators have precedence, use parentheses to make formulas readable (e.g. `(base + tax) * multiplier`).
3. **Use nullish coalescing (`??`) for configuration properties:** Prevents overwriting numbers set to `0` or flags set to `false`.

---

## 9. Interview Preparation

### Q1: Why does `0.1 + 0.2` not equal `0.3` in JavaScript? How do you fix it?
**Answer:** JavaScript represents numbers as IEEE 754 double-precision floats. Binary cannot represent decimals like `0.1` and `0.2` with exact precision. To fix this, you can round the results using `.toFixed()`, scale numbers to integers before operations (e.g. working in cents: `(10 + 20) / 100`), or compare them using `Number.EPSILON`:
```javascript
const areAlmostEqual = (num1, num2) => Math.abs(num1 - num2) < Number.EPSILON;
```

### Q2: What is the difference between `==` and `===`?
**Answer:**
- `==` performs type coercion if the types of operands are different before comparing values (e.g., `"5" == 5` is `true`).
- `===` checks both value and type, returning `false` if types do not match (e.g., `"5" === 5` is `false`).

### Q3: What is "short-circuit" evaluation in JavaScript?
**Answer:** Short-circuiting is when evaluation stops as soon as the result can be determined:
- In `A && B`, if `A` is falsy, `B` is never evaluated because the entire expression is guaranteed to be false.
- In `A || B`, if `A` is truthy, `B` is never evaluated because the expression is guaranteed to be true.

---

## 10. Homework

1. **Precision Check Utility:** Write a function `compareFloats(a, b)` that safely compares floating-point arithmetic calculations.
2. **Config Loader Engine:** Write a configuration merger function that takes user configurations and merges them with default values using `??` to prevent overriding valid `0` or `false` settings.
3. **Access Permissions Manager:** Create a bitwise permissions grid for a CMS system (e.g., `READ = 1`, `WRITE = 2`, `DELETE = 4`). Implement checks for permissions addition and deletion.
4. **Surge Pricing Formula:** Code a function that takes distance, duration, rushHour boolean, and weather boolean, and returns an Uber-like fare using short-circuit logic for surge triggers.
5. **Type Coercion Test Suite:** Run comparison tests for weird JS expressions (e.g. `[] == ![]`, `null == undefined`, `NaN == NaN`) and document the internal JS engine reasons behind each output.
