# 🔑 Complete Solutions Manual: 205 Programming Challenges

This document contains complete, concise code solutions, logic explanations, and complexity analysis for **all 205 problems** listed in the Problem-Solving Guide.

---

## Category 1: Variables, Scopes & Data Types (1–15)

### 1. Scope Leaker (Easy)
* **Logic:** Swap `var` with `let` to prevent loop counter from leaking outside loop block scope.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function runLoop() {
  for (let i = 0; i < 5; i++) {} // let isolates i in loop block
}
```

### 2. Immutable Config (Easy)
* **Logic:** Use `Object.freeze()` to seal properties against updates.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const freezeConfig = (cfg) => Object.freeze(cfg);
```

### 3. Shadowed Auth (Easy)
* **Logic:** Access parent lexical variables by avoiding re-declaration inside inner scopes.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
let user = "Alice";
{
  let innerUser = "Bob"; // Rename to prevent shadowing user
}
```

### 4. Temporal Dead Zone (Medium)
* **Logic:** Move declarations before reference point to satisfy TDZ rules.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const runConfig = () => {
  const cfg = "active"; // Place before calling
  console.log(cfg);
};
```

### 5. Block Constants (Easy)
* **Logic:** Reassigning a `const` reference throws, but modifying its properties is valid.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const state = { count: 0 };
state.count = 1; // Valid mutation
```

### 6. Primitive Reassignment (Easy)
* **Logic:** Strings are primitives and passed by value; changing local variables doesn't affect caller.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function updateName(name) {
  name = "Admin"; // Does not affect outer variable
}
```

### 7. Reference Mutation (Medium)
* **Logic:** Objects are passed by reference. Mutating properties inside helper functions alters the caller's state.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function addTax(cart) {
  cart.total *= 1.1; // Mutates original cart
}
```

### 8. Deep Freeze (Hard)
* **Logic:** Recursively traverse object keys and freeze nested objects.
* **Complexity:** Time: $O(N)$ keys; Space: $O(D)$ depth stack.
```javascript
function deepFreeze(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  for (const key of Object.getOwnPropertyNames(obj)) {
    if (obj[key] && typeof obj[key] === "object") deepFreeze(obj[key]);
  }
  return Object.freeze(obj);
}
```

### 9. Garbage Scopes (Medium)
* **Logic:** De-reference unused memory elements to make them eligible for Garbage Collection.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
let data = { payload: "heavy" };
data = null; // Eligible for GC
```

### 10. Dynamic Env Shadowing (Medium)
* **Logic:** Wrap execution environment blocks in local scopes using bracket blocks.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const env = "prod";
{
  const env = "test"; // Shadowing allowed in local block scope
}
```

### 11. Const Array Safeguard (Easy)
* **Logic:** Use `const` array reference; modify elements using array prototype methods.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const items = [];
items.push("A"); // Allowed
```

### 12. Global Scope Pollution (Easy)
* **Logic:** Activate `"use strict"` to throw errors when assigning variables without keywords.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function init() {
  "use strict";
  // x = 10; // Throws ReferenceError
}
```

### 13. Lexical Chain Resolver (Medium)
* **Logic:** Inner functions hold closures accessing outer scoped variables via the scope chain.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function main(tenant) {
  return function(workspace) {
    return `${tenant}/${workspace}`;
  };
}
```

### 14. Memory Address Matcher (Easy)
* **Logic:** Two distinct objects are stored at different heap locations and thus fail comparison checks.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const o1 = { a: 1 }, o2 = { a: 1 };
console.log(o1 === o2); // false
```

### 15. Closure Scope Leak (Medium)
* **Logic:** Avoid retaining references to large variables inside nested closures.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function leakFix() {
  let element = document.getElementById("heavy");
  element.onclick = () => console.log(element.id);
  element = null; // Break references
}
```

---

## Category 2: Operators & Expressions (16–30)

### 16. Float Invoice Matcher (Easy)
* **Logic:** Check if the absolute difference is smaller than `Number.EPSILON`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const areEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;
```

### 17. Short-Circuit Auth (Easy)
* **Logic:** Use logical AND (`&&`) to run the second operation only if the first is true.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const checkAuth = (isOnline, authenticate) => isOnline && authenticate();
```

### 18. Coalesce Config (Easy)
* **Logic:** Fallback using nullish coalescing `??` which ignores empty strings and `0`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const getConfig = (user, fallback) => user ?? fallback;
```

### 19. Strict Type Sieve (Easy)
* **Logic:** Use strict equality (`===`) to ensure value and type are identical.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const strictCheck = (a, b) => a === b;
```

### 20. Modulo Page Splitter (Easy)
* **Logic:** Use `%` operator to split items by odd/even index parity.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isEven = (idx) => idx % 2 === 0;
```

### 21. Exponent Storage Check (Easy)
* **Logic:** Use `**` exponentiation operator.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const maxBytes = (bits) => 2 ** bits;
```

### 22. Pre vs Post Increment (Easy)
* **Logic:** `++x` updates value before returning; `x++` returns original value, then updates.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
let pre = 5, post = 5;
console.log(++pre, post++); // Prints 6, 5
```

### 23. Compound Fee Calculator (Easy)
* **Logic:** Use `+=` or `*=` compound assignment operators.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const addFee = (total, fee) => total += fee;
```

### 24. Truthy Gateway (Easy)
* **Logic:** Cast to boolean using double negation (`!!`).
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const toBool = (val) => !!val;
```

### 25. Ternary Plan Selector (Easy)
* **Logic:** One-line conditional using `condition ? trueVal : falseVal`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const getPlan = (isPremium) => isPremium ? "Premium" : "Free";
```

### 26. Operator Precedence (Medium)
* **Logic:** Enforce addition order before multiplication using parentheses.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const calcTotal = (price, tax, discount) => (price + tax) * discount;
```

### 27. Logical OR Fallback (Easy)
* **Logic:** Use `||` to return fallback values if the input is falsy (e.g. empty string).
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const getPath = (custom) => custom || "/var/log";
```

### 28. BigInt Allocation (Medium)
* **Logic:** Append `n` to integer literal to support numbers beyond safety limits.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const bigTotal = 9007199254740991n + 5n;
```

### 29. NaN Checker (Easy)
* **Logic:** Use `Number.isNaN()` to strictly check without type coercion.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isValNaN = (val) => Number.isNaN(val);
```

### 30. Price Threshold Gate (Easy)
* **Logic:** Use comparative bounds combining AND logic.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const withinLimit = (val, min, max) => val >= min && val <= max;
```

---

## Category 3: Bitwise Operations & Manipulation (31–50)

### 31. High-Speed Parity (Easy)
* **Logic:** Check rightmost bit with AND: `(n & 1) === 0`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isEvenFast = (n) => (n & 1) === 0;
```

### 32. Permission Check (Easy)
* **Logic:** Check bit overlap with AND: `(mask & flag) === flag`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const hasRead = (mask, readFlag) => (mask & readFlag) === readFlag;
```

### 33. Permission Grant (Easy)
* **Logic:** Blend bits using OR: `mask |= flag`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const grantWrite = (mask, writeFlag) => mask | writeFlag;
```

### 34. Permission Revoke (Medium)
* **Logic:** Invert flag using NOT, then mask using AND: `mask & ~flag`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const revokeDelete = (mask, deleteFlag) => mask & ~deleteFlag;
```

### 35. Permission Toggle (Easy)
* **Logic:** Flip bit values using XOR: `mask ^ flag`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const toggleEdit = (mask, editFlag) => mask ^ editFlag;
```

### 36. Bitwise Float Floor (Easy)
* **Logic:** Apply OR with zero `| 0` to discard fractions.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const fastFloor = (n) => n | 0;
```

### 37. In-Place Variable Swap (Medium)
* **Logic:** Swap values using XOR: `a ^= b; b ^= a; a ^= b;`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function swap(a, b) {
  a ^= b; b ^= a; a ^= b;
  return [a, b];
}
```

### 38. Power of 2 Gate (Medium)
* **Logic:** Verify if number has a single set bit: `n > 0 && (n & (n - 1)) === 0`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isPowerOfTwo = (n) => n > 0 && (n & (n - 1)) === 0;
```

### 39. Hamming Weight (Medium)
* **Logic:** Loop clearing rightmost bit using Kernighan's algorithm: `n & (n - 1)`.
* **Complexity:** Time: $O(C)$ where $C$ is set bits count; Space: $O(1)$.
```javascript
function countSetBits(n) {
  let count = 0;
  while (n > 0) { n &= (n - 1); count++; }
  return count;
}
```

### 40. Color Extractor (Medium)
* **Logic:** Shift target channel values into lower byte, mask with `0xFF`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const extractRGB = (hexNum) => ({
  r: (hexNum >> 16) & 0xFF,
  g: (hexNum >> 8) & 0xFF,
  b: hexNum & 0xFF
});
```

### 41. Color Packer (Medium)
* **Logic:** Shift channels left, merge using bitwise OR.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const packRGB = (r, g, b) => (r << 16) | (g << 8) | b;
```

### 42. Opposite Sign Matcher (Medium)
* **Logic:** Check if the XOR result's sign bit is set to negative.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const hasOppositeSigns = (a, b) => (a ^ b) < 0;
```

### 43. Multiply by Power of 2 (Easy)
* **Logic:** Shift bits left by $N$ positions.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const multByEight = (n) => n << 3;
```

### 44. Divide by Power of 2 (Easy)
* **Logic:** Shift bits right by $N$ positions.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const divByFour = (n) => n >> 2;
```

### 45. Single Number Sieve (Hard)
* **Logic:** XOR all array items to cancel out duplicates.
* **Complexity:** Time: $O(N)$ array scan; Space: $O(1)$.
```javascript
const findUnique = (arr) => arr.reduce((acc, curr) => acc ^ curr, 0);
```

### 46. Clear Rightmost Bit (Medium)
* **Logic:** Clear rightmost set bit using AND: `mask & (mask - 1)`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const clearLowBit = (mask) => mask & (mask - 1);
```

### 47. Position Set Checker (Medium)
* **Logic:** Shift 1 to position, perform bitwise AND check.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isBitSet = (mask, pos) => (mask & (1 << pos)) !== 0;
```

### 48. Unsigned Cast (Easy)
* **Logic:** Use zero-fill shift `>>> 0` to convert to positive representation.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const toUnsigned = (n) => n >>> 0;
```

### 49. Mask Flip (Easy)
* **Logic:** Apply NOT operator, mask to target bits (e.g. 8-bits: `0xFF`).
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const flipByte = (mask) => ~mask & 0xFF;
```

### 50. Single Bit Isolator (Hard)
* **Logic:** Isolate rightmost set bit: `mask & -mask`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const lowestBit = (mask) => mask & -mask;
```

---

## Category 4: Conditionals & Control Flow (51–65)

### 51. Tiered SaaS Billing (Easy)
* **Logic:** Standard conditional checks.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function getFee(plan) {
  if (plan === "pro") return 10;
  if (plan === "enterprise") return 50;
  return 0;
}
```

### 52. Nested Branch Reducer (Medium)
* **Logic:** Flatten pyramid blocks using early exit guard returns.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function checkAccess(user, server) {
  if (!server.isOnline) return "Offline";
  if (!user.isRegistered) return "Unregistered";
  if (user.role !== "admin") return "Restricted";
  return "Granted";
}
```

### 53. Switch Map Router (Easy)
* **Logic:** Standard switch evaluation.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function route(apiPath) {
  switch (apiPath) {
    case "/login": return handleLogin;
    case "/checkout": return handleCheckout;
    default: return handleNotFound;
  }
}
```

### 54. Short-Circuit Logger (Easy)
* **Logic:** Conditional call using logical `&&` short-circuit.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const triggerLog = (verbose, log) => verbose && log();
```

### 55. Leap Year Auditor (Medium)
* **Logic:** Divisible by 4, not 100, or divisible by 400.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
```

### 56. Ternary Nested Charge (Medium)
* **Logic:** Compact pricing conditions inside a ternary structure.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const getCharge = (surge, rain) => surge ? (rain ? 20 : 15) : 0;
```

### 57. Range Gatekeeper (Easy)
* **Logic:** Compare value against min and max bounds.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const validateAge = (age) => age >= 18 && age <= 65;
```

### 58. Fallback Config Object (Easy)
* **Logic:** Cascade values using OR logic.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const selectConfig = (c, s, g) => c || s || g;
```

### 59. Invalid Type Filter (Easy)
* **Logic:** Use standard typeof and Array checks.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isValidInput = (val) => typeof val === "string" || Array.isArray(val);
```

### 60. Multi-Flag Evaluator (Medium)
* **Logic:** Combine conditions using logical operators.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const runBackup = (online, busy, admin) => online && !busy && admin;
```

### 61. Password Strength Gate (Easy)
* **Logic:** Check length boundaries sequentially.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function strength(pass) {
  if (pass.length < 8) return "Weak";
  if (pass.length < 12) return "Medium";
  return "Strong";
}
```

### 62. Default User Hydra (Easy)
* **Logic:** Trim whitespace and apply fallback.
* **Complexity:** Time: $O(L)$ string trim; Space: $O(L)$.
```javascript
const getUsername = (input) => input.trim() || "Guest";
```

### 63. Switch Case Fallthrough (Medium)
* **Logic:** Group multiple case labels together without breaks.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function getSeason(month) {
  switch (month) {
    case 12: case 1: case 2: return "Winter";
    case 3: case 4: case 5: return "Spring";
    default: return "Other";
  }
}
```

### 64. Safe Invoice Division (Easy)
* **Logic:** Check if divisor is zero before division.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const calcUnitCost = (total, count) => count === 0 ? 0 : total / count;
```

### 65. Input Range Clamp (Easy)
* **Logic:** Clamp values using Math min/max.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const clamp = (val) => Math.min(100, Math.max(0, val));
```

---

## Category 5: Loops & Iteration (66–85)

### 66. Console Pyramid (Easy)
* **Logic:** Loop row numbers, calculate spacing and char counts, and log each line.
* **Complexity:** Time: $O(H^2)$ where $H$ is pyramid height; Space: $O(H)$ string buffer.
```javascript
function printPyramid(height) {
  for (let i = 1; i <= height; i++) {
    const spaces = " ".repeat(height - i);
    const hashes = "#".repeat(2 * i - 1);
    console.log(spaces + hashes);
  }
}
```

### 67. Safe Loop Execution (Easy)
* **Logic:** Track loops against maximum limit threshold to prevent infinite runs.
* **Complexity:** Time: $O(1)$ loop safety check; Space: $O(1)$.
```javascript
function runRetries(action) {
  let attempts = 0;
  while (!action() && attempts < 10) { attempts++; }
}
```

### 68. Key-Value Object Loop (Easy)
* **Logic:** Standard `for...in` loop.
* **Complexity:** Time: $O(K)$ keys count; Space: $O(1)$.
```javascript
function printKeys(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) console.log(key, obj[key]);
  }
}
```

### 70. Breakout Early (Easy)
* **Logic:** Terminate search immediately using the `break` keyword.
* **Complexity:** Time: $O(N)$ search; Space: $O(1)$.
```javascript
function containsBlocked(ips, blockedList) {
  let flag = false;
  for (const ip of ips) {
    if (blockedList.includes(ip)) { flag = true; break; }
  }
  return flag;
}
```

### 71. Skip Deprecated Logs (Easy)
* **Logic:** Skip specific items in loops using the `continue` statement.
* **Complexity:** Time: $O(N)$; Space: $O(1)$.
```javascript
function filterLogs(logs) {
  for (const log of logs) {
    if (log.type === "deprecated") continue;
    console.log(log.msg);
  }
}
```

### 72. Matrix Grid Flattener (Medium)
* **Logic:** Traverse grid dimensions using nested loops.
* **Complexity:** Time: $O(M \times N)$; Space: $O(M \times N)$ array.
```javascript
function flattenGrid(grid) {
  const result = [];
  for (const row of grid) {
    for (const val of row) result.push(val);
  }
  return result;
}
```

### 73. Page Pagination (Easy)
* **Logic:** Initialize loop counter to page offset and limit bounds.
* **Complexity:** Time: $O(L)$ limit count; Space: $O(L)$.
```javascript
function getPageItems(arr, offset, limit) {
  const page = [];
  for (let i = offset; i < offset + limit && i < arr.length; i++) {
    page.push(arr[i]);
  }
  return page;
}
```

### 74. Object Keys Collector (Easy)
* **Logic:** Use a `for...in` loop to manually extract keys.
* **Complexity:** Time: $O(K)$ keys; Space: $O(K)$ array.
```javascript
function collectKeys(obj) {
  const keys = [];
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) keys.push(k);
  }
  return keys;
}
```

### 75. Reverse Log Iterator (Easy)
* **Logic:** Initialize loop at final array index, decrementing to 0.
* **Complexity:** Time: $O(N)$; Space: $O(1)$.
```javascript
function printReverse(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}
```

### 76. Step Increment Log (Easy)
* **Logic:** Increment loop index by custom step value (e.g. `i += 5`).
* **Complexity:** Time: $O(N/S)$ where $S$ is step; Space: $O(1)$.
```javascript
function printSteps(arr, step) {
  for (let i = 0; i < arr.length; i += step) {
    console.log(arr[i]);
  }
}
```

### 77. Nested Array Search (Medium)
* **Logic:** Recursively traverse nested arrays.
* **Complexity:** Time: $O(N)$ elements; Space: $O(D)$ call depth.
```javascript
function findFolder(tree, target) {
  for (const item of tree) {
    if (item.name === target) return item;
    if (item.children) {
      const found = findFolder(item.children, target);
      if (found) return found;
    }
  }
  return null;
}
```

### 78. Object Property Matcher (Medium)
* **Logic:** Check if the object contains all properties of the query object.
* **Complexity:** Time: $O(K)$ query keys; Space: $O(1)$.
```javascript
function matchesQuery(obj, query) {
  for (const key in query) {
    if (obj[key] !== query[key]) return false;
  }
  return true;
}
```

### 79. Loop Index Tracker (Easy)
* **Logic:** Use `.entries()` with `for...of` destructuring.
* **Complexity:** Time: $O(N)$; Space: $O(1)$.
```javascript
function printEntries(arr) {
  for (const [idx, val] of arr.entries()) {
    console.log(idx, val);
  }
}
```

### 80. Fibonacci Calculator (Medium)
* **Logic:** Calculate next terms iteratively.
* **Complexity:** Time: $O(N)$; Space: $O(1)$.
```javascript
function getFibo(n) {
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return n === 0 ? 0 : curr;
}
```

### 81. Array Chunk Creator (Medium)
* **Logic:** Slice elements in steps of the chunk size.
* **Complexity:** Time: $O(N)$; Space: $O(N)$ chunks.
```javascript
function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
```

### 82. Property Exist Check (Easy)
* **Logic:** Loop keys and check for null values.
* **Complexity:** Time: $O(K)$ keys; Space: $O(1)$.
```javascript
function hasNull(obj) {
  for (const key in obj) {
    if (obj[key] === null) return true;
  }
  return false;
}
```

### 83. Safe While Loop Decrement (Easy)
* **Logic:** Verify loop counter decrements inside block body.
* **Complexity:** Time: $O(N)$; Space: $O(1)$.
```javascript
function countdown(start) {
  while (start > 0) {
    console.log(start);
    start--; // Decrement
  }
}
```

### 84. Matrix Transpose (Hard)
* **Logic:** Map matrix columns to rows.
* **Complexity:** Time: $O(R \times C)$; Space: $O(R \times C)$.
```javascript
function transpose(mat) {
  return Array.from({ length: mat[0].length }, (_, c) =>
    Array.from({ length: mat.length }, (_, r) => mat[r][c])
  );
}
```

### 85. Array Difference (Medium)
* **Logic:** Filter elements that are not present in the second array.
* **Complexity:** Time: $O(A \times B)$; Space: $O(A)$ results.
```javascript
const arrDiff = (a, b) => a.filter(x => !b.includes(x));
```

---

## Category 6: Functions, Advanced Closures & Timers (86–110)

### 86. Double-Tap Counter (Medium)
* **Logic:** Track click times inside a closure scope.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function makeDoubleTap(cb) {
  let lastClick = 0;
  return () => {
    const now = Date.now();
    if (now - lastClick < 300) cb();
    lastClick = now;
  };
}
```

### 87. API Throttler (Debounce) (Hard)
* **Logic:** Clear existing timer, and set a new delay execution timer.
* **Complexity:** Time: $O(1)$; Space: $O(1)$ timer slot.
```javascript
function debounce(fn, delay) {
  let timerId = null;
  return function (...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### 88. API Rate Limiter (Throttle) (Hard)
* **Logic:** Lock calls during limit period, releasing lock after timeout.
* **Complexity:** Time: $O(1)$; Space: $O(1)$ lock state.
```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### 89. Loop Timer Bug (Medium)
* **Logic:** Use block-scoped `let` to bind index to each timeout execution.
* **Complexity:** Time: $O(N)$ timers; Space: $O(N)$ scopes.
```javascript
function runTimers() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 10);
  }
}
```

### 90. Custom Logger Bind (Medium)
* **Logic:** Return a function that prepends prefix.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const makePrefixedLogger = (prefix) => (msg) => console.log(`${prefix} ${msg}`);
```

### 91. State Preserver (Medium)
* **Logic:** Wrap counter variable inside closure scope.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

### 92. Dynamic Callback Runner (Easy)
* **Logic:** Validate type is function before executing.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const runCallback = (cb) => typeof cb === "function" && cb();
```

### 93. Curried Fee Calculator (Medium)
* **Logic:** Return functions sequentially nested.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const calcFee = (tax) => (price) => price + price * tax;
```

### 94. Telemetry Memoizer (Hard)
* **Logic:** Cache results in map using arguments as lookup keys.
* **Complexity:** Time: $O(1)$ average; Space: $O(K)$ keys space.
```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

### 95. Self-Invoking Sandbox (Easy)
* **Logic:** Wrap function, trigger execution immediately.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
(() => {
  const privateConfig = "secret"; // Sandboxed
})();
```

### 96. Context Preserver (Medium)
* **Logic:** Call `.bind()` or use arrow functions to lock surrounding context.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const bindLog = (logger, ctx) => logger.bind(ctx);
```

### 97. Partial Configuration (Medium)
* **Logic:** Pre-apply host argument, leaving port configurable.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const partialConfig = (host) => (port) => ({ host, port });
```

### 98. Once-Only Trigger (Medium)
* **Logic:** Use boolean state variable in closure to track execution.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function once(fn) {
  let executed = false;
  return function (...args) {
    if (!executed) { executed = true; fn.apply(this, args); }
  };
}
```

### 99. Call Stack Overflow (Medium)
* **Logic:** Enforce baseline checks to prevent infinite recursion.
* **Complexity:** Time: $O(1)$ check; Space: $O(1)$.
```javascript
function recurse(n) {
  if (n <= 0) return; // Base case
  recurse(n - 1);
}
```

### 100. Execution Context Trace (Easy)
* **Logic:** Hoisted `var` declarations default to `undefined` in the compilation stage.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function trace() {
  console.log(x); // undefined (hoisted var)
  var x = 10;
}
```

### 101. Closured Loop Arrays (Medium)
* **Logic:** Loop using `let` so each function preserves its own scope.
* **Complexity:** Time: $O(N)$ functions; Space: $O(N)$.
```javascript
function makeFuncArray() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(() => i);
  }
  return arr;
}
```

### 102. Async Queue Runner (Hard)
* **Logic:** Run functions recursively using delay timers.
* **Complexity:** Time: $O(N \times \text{delay})$; Space: $O(N)$ stack frames.
```javascript
function runQueue(tasks, interval) {
  if (tasks.length === 0) return;
  tasks[0]();
  setTimeout(() => runQueue(tasks.slice(1), interval), interval);
}
```

### 103. Poll Status Timer (Medium)
* **Logic:** Recursively poll endpoint until condition returns truthy.
* **Complexity:** Time: $O(T)$ attempts; Space: $O(1)$.
```javascript
function poll(checkStatus, interval) {
  if (checkStatus()) return;
  setTimeout(() => poll(checkStatus, interval), interval);
}
```

### 104. Dynamic Method Maker (Medium)
* **Logic:** Return custom method closures dynamically.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const makeMethod = (name, action) => ({ [name]: action });
```

### 105. Lexical Environment Dump (Easy)
* **Logic:** Function scope references parent environments dynamically.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function outer(x) {
  return function inner(y) { return x + y; };
}
```

### 106. Arrow Context Lexical (Easy)
* **Logic:** Arrow functions bind `this` lexically to enclosing scope.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const boundObj = {
  name: "Host",
  log: function() {
    return () => this.name; // Inherits from object log method context
  }
};
```

### 107. Function Expression Hoist (Easy)
* **Logic:** Function expressions assigned to variables are not hoisted.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
// foo(); // TypeError (foo is undefined)
var foo = function() {};
```

### 108. Arguments Sum Rest (Easy)
* **Logic:** Use rest parameters to parse arbitrary inputs.
* **Complexity:** Time: $O(N)$ sum scan; Space: $O(1)$.
```javascript
const sumAll = (...args) => args.reduce((s, v) => s + v, 0);
```

### 109. Context Override Call (Medium)
* **Logic:** Run target function with a custom object context.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const runLogCall = (fn, ctx, val) => fn.call(ctx, val);
```

### 110. Context Array Apply (Easy)
* **Logic:** Call apply, passing arguments as array.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const runLogApply = (fn, ctx, argsArray) => fn.apply(ctx, argsArray);
```

---

## Category 7: Objects & `this` Context (111–130)

### 111. Safe Deep Copier (Hard)
* **Logic:** Recursively clone properties, breaking object references.
* **Complexity:** Time: $O(N)$ properties; Space: $O(D)$ stack.
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  const clone = Array.isArray(obj) ? [] : {};
  for (const key of Object.keys(obj)) clone[key] = deepClone(obj[key]);
  return clone;
}
```

### 112. Context Binder (Medium)
* **Logic:** Bind method to context using `.bind()`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const bindMethod = (fn, ctx) => fn.bind(ctx);
```

### 113. Dynamic Key Injector (Easy)
* **Logic:** Assign keys using bracket notation: `obj[key] = value`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const injectKey = (obj, key, val) => { obj[key] = val; return obj; };
```

### 114. Keys & Values Zip (Easy)
* **Logic:** Iterate and map keys to index matching values.
* **Complexity:** Time: $O(N)$; Space: $O(N)$.
```javascript
function zip(keys, values) {
  const obj = {};
  keys.forEach((k, idx) => obj[k] = values[idx]);
  return obj;
}
```

### 115. Constructor Factory (Easy)
* **Logic:** Return standard object templates.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const createUser = (name, role) => ({ name, role });
```

### 116. Method Delegate (Medium)
* **Logic:** Execute a method on a target object using call.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const delegate = (fn, obj) => fn.call(obj);
```

### 117. Property Descriptor Lock (Hard)
* **Logic:** Configure descriptors with writable/configurable set to false.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function lockProp(obj, prop, val) {
  Object.defineProperty(obj, prop, {
    value: val,
    writable: false,
    configurable: false,
    enumerable: true
  });
}
```

### 118. Object Property Count (Easy)
* **Logic:** Return length of `Object.keys()` array.
* **Complexity:** Time: $O(K)$ keys; Space: $O(K)$ keys array.
```javascript
const getKeysCount = (obj) => Object.keys(obj).length;
```

### 119. Deep Equality Auditor (Hard)
* **Logic:** Compare keys, structural types, and nested fields recursively.
* **Complexity:** Time: $O(N)$ properties; Space: $O(D)$ stack depth.
```javascript
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null || typeof a !== "object" || typeof b !== "object") return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!keysB.includes(k) || !deepEqual(a[k], b[k])) return false;
  }
  return true;
}
```

### 120. Computed Object Schema (Easy)
* **Logic:** Use ES6 computed key notation `{[key]: val}`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const buildSchema = (keyName, val) => ({ [keyName]: val });
```

### 121. Prototype Polluter Check (Medium)
* **Logic:** Use `hasOwnProperty` to skip prototype chain elements.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const safeHas = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
```

### 122. Optional Chaining Guard (Easy)
* **Logic:** Access nested properties safely using `?.`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const readNested = (obj) => obj?.profile?.features?.billing;
```

### 123. Nullish Coalesce Assign (Easy)
* **Logic:** Assign value if target property is nullish using `??=`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const setPort = (config) => config.port ??= 8080;
```

### 124. Prototype Extender (Medium)
* **Logic:** Implement wrapper classes instead of modifying original prototype structures.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class ExtendedArray extends Array {
  first() { return this[0]; }
}
```

### 125. Object Sieve (Medium)
* **Logic:** Rebuild object from filtered entries: `Object.fromEntries()`.
* **Complexity:** Time: $O(K)$ keys; Space: $O(K)$ filtered entries.
```javascript
const filterObj = (obj, check) => Object.fromEntries(
  Object.entries(obj).filter(([k, v]) => check(v))
);
```

### 126. Arrow Object Return (Easy)
* **Logic:** Wrap returned object literal inside parentheses: `() => ({ key: val })`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const getObject = (val) => ({ data: val });
```

### 127. Object Reference Freeze (Medium)
* **Logic:** Seal object against additions/removals using `Object.seal()`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const sealConfig = (obj) => Object.seal(obj);
```

### 128. Object Merging Conflicts (Easy)
* **Logic:** Apply overrides using object spread syntax: `{ ...defaults, ...user }`.
* **Complexity:** Time: $O(D + U)$ where $D, U$ are sizes; Space: $O(D + U)$.
```javascript
const mergeConfigs = (def, user) => ({ ...def, ...user });
```

### 129. Method Chaining Engine (Medium)
* **Logic:** Return `this` references from each object method.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const calculator = {
  val: 0,
  add(n) { this.val += n; return this; },
  mult(n) { this.val *= n; return this; }
};
```

### 130. Object Values Aggregator (Medium)
* **Logic:** Extract values, aggregate using reduce: `Object.values(obj).reduce()`.
* **Complexity:** Time: $O(K)$ keys; Space: $O(K)$ values list.
```javascript
const sumValues = (obj) => Object.values(obj).reduce((s, v) => s + v, 0);
```

---

## Category 8: Arrays, Iterators & Aggregation (131–155)

### 131. Transaction Accumulator (Easy)
* **Logic:** Filter active records, sum amounts using reduce.
* **Complexity:** Time: $O(N)$ scan; Space: $O(1)$.
```javascript
const sumActive = (txs) => txs.filter(t => t.status === "success").reduce((s, t) => s + t.amount, 0);
```

### 132. Unique IP Filter (Easy)
* **Logic:** Map array into Set constructor, spread back to array.
* **Complexity:** Time: $O(N)$ average; Space: $O(U)$ unique items.
```javascript
const getUniqueIps = (ips) => [...new Set(ips)];
```

### 133. Active Session Sieve (Easy)
* **Logic:** Filter records matching active status and editor role.
* **Complexity:** Time: $O(N)$; Space: $O(N)$ filtered elements.
```javascript
const getEditors = (users) => users.filter(u => u.active && u.role === "editor");
```

### 134. Payload Normalizer (Easy)
* **Logic:** Map records, formatting name to uppercase.
* **Complexity:** Time: $O(N)$ mapping; Space: $O(N)$ array allocation.
```javascript
const normalizeNames = (users) => users.map(u => ({ ...u, name: u.name.toUpperCase() }));
```

### 135. Group Users by Role (Medium)
* **Logic:** Aggregate records into accumulator arrays dynamically using reduce.
* **Complexity:** Time: $O(N)$; Space: $O(N)$ grouped maps.
```javascript
const groupUsers = (users) => users.reduce((acc, u) => {
  acc[u.role] ??= [];
  acc[u.role].push(u);
  return acc;
}, {});
```

### 136. Array Matrix Rotator (Hard)
* **Logic:** Transpose rows and reverse columns for 90-deg rotation.
* **Complexity:** Time: $O(N^2)$ grid scan; Space: $O(N^2)$ new grid.
```javascript
const rotateMatrix = (mat) => mat[0].map((_, idx) => mat.map(row => row[idx]).reverse());
```

### 137. Sub-array Sum Search (Hard)
* **Logic:** Track sum using sliding window algorithm or prefix sum map.
* **Complexity:** Time: $O(N)$; Space: $O(N)$ cache.
```javascript
function subarraySum(nums, k) {
  let count = 0, sum = 0;
  const map = new Map([[0, 1]]);
  for (const n of nums) {
    sum += n;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}
```

### 138. Array Intersection (Easy)
* **Logic:** Filter array A to find values included in array B.
* **Complexity:** Time: $O(A \times B)$ average; Space: $O(A)$ intersections.
```javascript
const getOverlap = (a, b) => a.filter(val => b.includes(val));
```

### 139. Array De-duplicator (Easy)
* **Logic:** Filter items keeping only the first matching index.
* **Complexity:** Time: $O(N^2)$ scans; Space: $O(N)$.
```javascript
const uniq = (arr) => arr.filter((val, idx) => arr.indexOf(val) === idx);
```

### 140. Array Flat Mapper (Medium)
* **Logic:** Extract tags list using flatMap.
* **Complexity:** Time: $O(P \times T)$ where $P$ is posts, $T$ is tags; Space: $O(P \times T)$.
```javascript
const getTags = (posts) => posts.flatMap(p => p.tags);
```

### 141. Sorting Objects by Key (Easy)
* **Logic:** Use `.sort()` with `localeCompare` for string values.
* **Complexity:** Time: $O(N \log N)$ average; Space: $O(1)$ in-place.
```javascript
const sortByName = (users) => users.sort((a, b) => a.name.localeCompare(b.name));
```

### 142. Array Binary Finder (Medium)
* **Logic:** Divide and conquer on sorted list bounds.
* **Complexity:** Time: $O(\log N)$; Space: $O(1)$.
```javascript
function binarySearch(arr, val) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (arr[mid] === val) return mid;
    if (arr[mid] < val) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
```

### 143. Array Chunker (Medium)
* **Logic:** Slice elements in steps of the chunk size.
* **Complexity:** Time: $O(N)$ iterations; Space: $O(N)$ chunks.
```javascript
function makeChunks(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}
```

### 144. Every/Some Status Auditor (Easy)
* **Logic:** Use `.every()` for universal match, `.some()` for single match.
* **Complexity:** Time: $O(N)$ scans; Space: $O(1)$.
```javascript
const checkStatus = (nodes) => ({
  allOk: nodes.every(n => n.online),
  anyOverload: nodes.some(n => n.load > 90)
});
```

### 145. Array Diff Extractor (Medium)
* **Logic:** Filter elements that are missing from the target.
* **Complexity:** Time: $O(A \times B)$; Space: $O(A)$.
```javascript
const getDiff = (a, b) => a.filter(x => !b.includes(x));
```

### 146. Safe Clone Reverse (Easy)
* **Logic:** Clone using array spread operator before reversing.
* **Complexity:** Time: $O(N)$; Space: $O(N)$.
```javascript
const reverseCopy = (arr) => [...arr].reverse();
```

### 147. Array In-Place Filter (Hard)
* **Logic:** Loop backward and splice matching index locations.
* **Complexity:** Time: $O(N^2)$ average shifts; Space: $O(1)$.
```javascript
function filterInPlace(arr, check) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!check(arr[i])) arr.splice(i, 1);
  }
}
```

### 148. Median Calculator (Medium)
* **Logic:** Sort array, return middle item or average of two middles.
* **Complexity:** Time: $O(N \log N)$ sort; Space: $O(1)$ in-place.
```javascript
function calcMedian(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
```

### 149. Value Frequency Map (Medium)
* **Logic:** Accumulate item occurrences in map.
* **Complexity:** Time: $O(N)$; Space: $O(U)$ unique occurrences.
```javascript
const freqMap = (arr) => arr.reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {});
```

### 150. Target Sum Index Finder (Medium)
* **Logic:** Match targets against values in a lookup Map.
* **Complexity:** Time: $O(N)$; Space: $O(N)$ indices space.
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
  return [];
}
```

### 151. Array Maximum Gap (Hard)
* **Logic:** Sort array and check differences between adjacent elements.
* **Complexity:** Time: $O(N \log N)$ sort; Space: $O(1)$.
```javascript
function maxGap(nums) {
  if (nums.length < 2) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  let max = 0;
  for (let i = 1; i < sorted.length; i++) {
    max = Math.max(max, sorted[i] - sorted[i - 1]);
  }
  return max;
}
```

### 152. Sparse Array Compact (Easy)
* **Logic:** Filter out null/undefined elements.
* **Complexity:** Time: $O(N)$; Space: $O(N)$.
```javascript
const compact = (arr) => arr.filter(v => v !== null && v !== undefined);
```

### 153. Sub-array Max Sum (Hard)
* **Logic:** Track local and global max values using Kadane's algorithm.
* **Complexity:** Time: $O(N)$ single scan; Space: $O(1)$.
```javascript
function kadane(arr) {
  let local = arr[0], global = arr[0];
  for (let i = 1; i < arr.length; i++) {
    local = Math.max(arr[i], local + arr[i]);
    global = Math.max(global, local);
  }
  return global;
}
```

### 154. Array Right Rotation (Medium)
* **Logic:** Slice array using modulo of rotation step count.
* **Complexity:** Time: $O(N)$ copy; Space: $O(N)$ array allocations.
```javascript
const rotateRight = (arr, k) => {
  const steps = k % arr.length;
  return [...arr.slice(-steps), ...arr.slice(0, -steps)];
};
```

### 155. Array Value Interpolator (Medium)
* **Logic:** Replace nulls with average values calculated from adjacent indices.
* **Complexity:** Time: $O(N)$; Space: $O(N)$ array values.
```javascript
function interpolate(arr) {
  return arr.map((val, idx) => {
    if (val !== null) return val;
    const prev = arr[idx - 1] ?? 0;
    const next = arr[idx + 1] ?? 0;
    return (prev + next) / 2;
  });
}
```

---

## Category 9: Promises, Asynchronous Flow & APIs (156–180)

### 156. API Request Retrier (Hard)
* **Logic:** Catch error, wait for retry timer, and execute recursively.
* **Complexity:** Time: $O(R)$ where $R$ is retry count; Space: $O(R)$ stack frames.
```javascript
async function retryFetch(fn, retries = 3, delay = 100) {
  try { return await fn(); }
  catch (err) {
    if (retries <= 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return retryFetch(fn, retries - 1, delay);
  }
}
```

### 157. Parallel Fast Resolver (Medium)
* **Logic:** Fetch records concurrently using `Promise.all()`.
* **Complexity:** Time: $O(\max(\text{TaskTime}))$; Space: $O(T)$ values.
```javascript
const fetchAll = async (t1, t2, t3) => Promise.all([t1(), t2(), t3()]);
```

### 158. Promise Race Timeout (Medium)
* **Logic:** Match target Promise execution against a setTimeout reject promise.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const fetchWithTimeout = (promise, limit) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), limit))
]);
```

### 159. Sequential Execution (Medium)
* **Logic:** Iterate and await each asynchronous task sequentially.
* **Complexity:** Time: $O(\sum(\text{TaskTime}))$; Space: $O(1)$.
```javascript
async function runSequential(tasks) {
  const results = [];
  for (const task of tasks) results.push(await task());
  return results;
}
```

### 160. Fetch Response Handler (Easy)
* **Logic:** Check response ok status before parsing JSON payload.
* **Complexity:** Time: $O(\text{network})$; Space: $O(\text{payload})$.
```javascript
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

### 161. API Loading Spinner (Easy)
* **Logic:** Set loading state flag inside a `finally()` chain block.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const runWithSpinner = (promise, hideSpinner) => promise.finally(hideSpinner);
```

### 162. Custom Promise Class (Hard)
* **Logic:** Track status state values and callback handler lists.
* **Complexity:** Time: $O(1)$; Space: $O(\text{listeners})$.
```javascript
class MiniPromise {
  constructor(executor) {
    this.status = "pending";
    this.val = undefined;
    this.thenCallbacks = [];

    const resolve = (val) => {
      if (this.status !== "pending") return;
      this.status = "fulfilled";
      this.val = val;
      this.thenCallbacks.forEach(cb => cb(val));
    };

    try { executor(resolve); } catch (e) { /* error handler omit */ }
  }

  then(cb) {
    if (this.status === "fulfilled") cb(this.val);
    else this.thenCallbacks.push(cb);
    return this;
  }
}
```

### 163. Async Error Boundaries (Easy)
* **Logic:** Wrap await tasks in try-catch wrapper blocks.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
async function safeRun(fn) {
  try { return await fn(); } catch (err) { console.error(err.message); return null; }
}
```

### 164. Batch Request Limit (Hard)
* **Logic:** Run tasks in batches, waiting for workers to complete.
* **Complexity:** Time: $O(N)$ iterations; Space: $O(L)$ pool size.
```javascript
async function limitPool(tasks, limit) {
  const results = [];
  const executing = new Set();
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    if (limit <= tasks.length) {
      executing.add(p);
      const clean = () => executing.delete(p);
      p.then(clean, clean);
      if (executing.size >= limit) await Promise.race(executing);
    }
  }
  return Promise.all(results);
}
```

### 165. Promise Settled Auditor (Medium)
* **Logic:** Run tasks concurrently using settled resolver API.
* **Complexity:** Time: $O(1)$ trigger; Space: $O(T)$ values.
```javascript
const auditTasks = (tasks) => Promise.allSettled(tasks.map(t => t()));
```

### 166. API Response Cache (Medium)
* **Logic:** Check local Cache Map before invoking fetch queries.
* **Complexity:** Time: $O(1)$; Space: $O(M)$ cache maps.
```javascript
const cache = new Map();
async function fetchCached(url) {
  if (cache.has(url)) return cache.get(url);
  const data = await (await fetch(url)).json();
  cache.set(url, data);
  return data;
}
```

### 167. Promise Promisify (Easy)
* **Logic:** Return Promise wrapper executing target callback signature.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
  fn(...args, (err, res) => err ? reject(err) : resolve(res));
});
```

### 168. Microtask Execution Priority (Medium)
* **Logic:** Microtasks (Promises) resolve before macrotasks (Timeouts).
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
// Order: Log (sync) -> Promise (micro) -> Timeout (macro)
```

### 169. Promise Resolve Value (Easy)
* **Logic:** Instantiate a resolved Promise wrapper.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const resolveVal = (val) => Promise.resolve(val);
```

### 170. Promise Reject Handler (Easy)
* **Logic:** Append `.catch` callback onto Promise chain.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const catchErr = (promise, fallback) => promise.catch(fallback);
```

### 171. Dynamic API Endpoint Url (Easy)
* **Logic:** Construct URL using native URLSearchParams.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const makeUrl = (base, params) => `${base}?${new URLSearchParams(params).toString()}`;
```

### 172. Cancelable Promise (Hard)
* **Logic:** Return cancel method exposing reject controls outside wrapper.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function makeCancelable(promise) {
  let rejectFn;
  const wrapped = new Promise((resolve, reject) => {
    rejectFn = reject;
    promise.then(resolve, reject);
  });
  return { promise: wrapped, cancel: () => rejectFn(new Error("Canceled")) };
}
```

### 173. Double Fetch Fast Return (Medium)
* **Logic:** Return the first resolved value using Promise.any.
* **Complexity:** Time: $O(\text{FastestTime})$; Space: $O(1)$.
```javascript
const fetchAny = (p1, p2) => Promise.any([p1, p2]);
```

### 174. Fetch JSON File Local (Easy)
* **Logic:** Call standard local file path fetch.
* **Complexity:** Time: $O(\text{read})$; Space: $O(\text{payload})$.
```javascript
const fetchConfig = () => fetch("./config.json").then(res => res.json());
```

### 175. Fetch Post Payload (Easy)
* **Logic:** Call fetch with header post configuration parameters.
* **Complexity:** Time: $O(\text{network})$; Space: $O(1)$.
```javascript
const postData = (url, data) => fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
```

### 176. Async Generator Loop (Hard)
* **Logic:** Retrieve elements dynamically inside an async generator loop.
* **Complexity:** Time: $O(N)$ reads; Space: $O(1)$ active buffer.
```javascript
async function* getPages(fetchPage) {
  let page = 1;
  while (true) {
    const data = await fetchPage(page++);
    if (data.length === 0) break;
    yield data;
  }
}
```

### 177. Auto Sync Cache (Medium)
* **Logic:** Trigger poll loop execution using recursive Timeout delays.
* **Complexity:** Time: $O(T)$ attempts; Space: $O(1)$.
```javascript
function syncCache(syncTask, interval) {
  syncTask().finally(() => setTimeout(() => syncCache(syncTask, interval), interval));
}
```

### 178. Await Thenable Object (Medium)
* **Logic:** Await any object containing a valid `.then` callback.
* **Complexity:** Time: $O(1)$ execution; Space: $O(1)$.
```javascript
const thenable = {
  then: (resolve) => resolve("success")
};
// await thenable => "success"
```

### 179. API Gateway Route Fallback (Medium)
* **Logic:** Loop gateway URLs in try-catch blocks; exit on first success.
* **Complexity:** Time: $O(G)$ gateways attempts; Space: $O(1)$.
```javascript
async function tryGateways(urls, fetchTask) {
  for (const url of urls) {
    try { return await fetchTask(url); } catch (e) { /* ignore and fallback */ }
  }
  throw new Error("All gateways failed");
}
```

### 180. Promise Flow Visualizer (Easy)
* **Logic:** Log state indicators inside then and catch callbacks.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const tracePromise = (p) => p.then(v => "Fulfilled").catch(e => "Rejected");
```

---

## Category 10: OOP, Prototypes & Classes (181–195)

### 181. Encapsulated Account (Medium)
* **Logic:** Prepend class variables with `#` to make them private.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class Account {
  #balance = 0;
  get balance() { return this.#balance; }
  deposit(n) { this.#balance += n; }
}
```

### 182. Polymorphic Renderer (Medium)
* **Logic:** Override base methods inside inherited subclasses.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class Element { paint() { return "base"; } }
class Box extends Element { paint() { return "box"; } } // Polymorphism
```

### 183. Prototype Link Finder (Easy)
* **Logic:** Read parent link using prototype accessor tools.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const getParentProto = (instance) => Object.getPrototypeOf(instance);
```

### 184. Factory Class Generator (Medium)
* **Logic:** Use a static method to dynamically create subclass instances.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class UserFactory {
  static create(type) {
    return type === "admin" ? new AdminUser() : new GuestUser();
  }
}
class AdminUser {}
class GuestUser {}
```

### 185. Super Inheritance Chain (Easy)
* **Logic:** Call parent class setup using the `super()` keyword.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class Parent { constructor(name) { this.name = name; } }
class Child extends Parent {
  constructor(name, age) { super(name); this.age = age; }
}
```

### 186. Static Config Collector (Easy)
* **Logic:** Declare shared properties using the `static` keyword.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class APIConfig {
  static host = "https://api.saas.com";
}
```

### 187. Private Method Secure (Medium)
* **Logic:** Encapsulate internal methods using the `#` private prefix.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class Gateway {
  #encrypt(data) { return `enc_${data}`; }
  send(val) { return this.#encrypt(val); }
}
```

### 188. Class Instance Check (Easy)
* **Logic:** Verify class lineage using `instanceof`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const isUser = (obj) => obj instanceof User;
class User {}
```

### 189. Prototype Method Binding (Medium)
* **Logic:** Add shared helper methods to the Constructor's prototype.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
function OldStyleUser(name) { this.name = name; }
OldStyleUser.prototype.logName = function() { console.log(this.name); };
```

### 190. OOP Shape Area Calculator (Easy)
* **Logic:** Expose computed properties using getter methods.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class Square {
  constructor(side) { this.side = side; }
  get area() { return this.side * this.side; }
}
```

### 191. Abstract Class Safeguard (Hard)
* **Logic:** Check if the target instantiation matches the abstract class itself.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
class AbstractService {
  constructor() {
    if (new.target === AbstractService) {
      throw new Error("Cannot instantiate abstract class directly");
    }
  }
}
```

### 192. Prototype Property Shadow (Medium)
* **Logic:** Override prototype properties by writing them directly to the instance.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const userInstance = Object.create({ role: "viewer" });
userInstance.role = "admin"; // Shadows prototype property
```

### 193. Class Event Dispatcher (Hard)
* **Logic:** Aggregate listener arrays inside an events object map.
* **Complexity:** Time: $O(1)$ register, $O(L)$ emit; Space: $O(E \times L)$.
```javascript
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, cb) {
    this.events[event] ??= [];
    this.events[event].push(cb);
    return () => this.off(event, cb);
  }
  off(event, cb) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(x => x !== cb);
  }
  emit(event, ...args) {
    if (this.events[event]) this.events[event].forEach(cb => cb(...args));
  }
}
```

### 194. Object Prototype Null (Easy)
* **Logic:** Create prototype-free objects using `Object.create(null)`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const createPureMap = () => Object.create(null);
```

### 195. OOP Class Mixin (Hard)
* **Logic:** Copy prototype methods from helper structures to target prototypes.
* **Complexity:** Time: $O(M)$ methods; Space: $O(1)$.
```javascript
const LoggerMixin = { log(msg) { console.log(msg); } };
Object.assign(PaymentService.prototype, LoggerMixin);
class PaymentService {}
```

---

## Category 11: DOM Manipulation & Browser Web APIs (196–205)

### 196. Batch Dom Injector (Medium)
* **Logic:** Append nodes to a virtual `DocumentFragment` before writing to the DOM.
* **Complexity:** Time: $O(N)$ single browser reflow; Space: $O(N)$ elements.
```javascript
function injectList(parent, items) {
  const frag = document.createDocumentFragment();
  for (const item of items) {
    const el = document.createElement("li");
    el.textContent = item;
    frag.appendChild(el);
  }
  parent.appendChild(frag); // Single insertion
}
```

### 197. Click Handler Delegation (Easy)
* **Logic:** Handle child interactions using a single listener on the parent container.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
container.addEventListener("click", (event) => {
  if (event.target.matches(".action-btn")) {
    console.log("Button clicked:", event.target.dataset.id);
  }
});
```

### 198. Computed Style Fetcher (Easy)
* **Logic:** Fetch computed style properties using `getComputedStyle()`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const getBgColor = (el) => window.getComputedStyle(el).backgroundColor;
```

### 199. Lazy Loading Scroll Observer (Medium)
* **Logic:** Monitor element viewports using IntersectionObserver.
* **Complexity:** Time: $O(1)$ setup; Space: $O(1)$ observer instance.
```javascript
const lazyLoad = (img) => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      img.src = img.dataset.src;
      observer.disconnect();
    }
  });
  observer.observe(img);
};
```

### 200. Panel Resizer Observer (Medium)
* **Logic:** Monitor dimension changes using ResizeObserver.
* **Complexity:** Time: $O(1)$ setup; Space: $O(1)$ observer instance.
```javascript
const trackResize = (element, cb) => {
  const observer = new ResizeObserver(entries => cb(entries[0].contentRect));
  observer.observe(element);
  return observer;
}
```

### 201. Clipboard Copy Helper (Easy)
* **Logic:** Copy text strings using the async clipboard API.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const copyText = (text) => navigator.clipboard.writeText(text);
```

### 202. Live Coordinate Geolocation (Easy)
* **Logic:** Fetch current device location coordinates.
* **Complexity:** Time: $O(\text{sensor})$; Space: $O(1)$.
```javascript
const getCoords = (cb) => navigator.geolocation.getCurrentPosition(
  pos => cb(pos.coords.latitude, pos.coords.longitude)
);
```

### 203. Cookie Authentication Parse (Medium)
* **Logic:** Split cookies string by delimiter and map key-values.
* **Complexity:** Time: $O(C)$ cookies count; Space: $O(C)$ map.
```javascript
function getCookies() {
  return document.cookie.split("; ").reduce((acc, current) => {
    const [k, v] = current.split("=");
    if (k) acc[k] = decodeURIComponent(v);
    return acc;
  }, {});
}
```

### 204. Cookie Expiry Write (Easy)
* **Logic:** Set cookie values with explicit `max-age` values in seconds.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
const setCookie = (k, v) => document.cookie = `${k}=${encodeURIComponent(v)}; max-age=604800; path=/`;
```

### 205. Event Bubble Stopper (Easy)
* **Logic:** Stop event bubbling using `event.stopPropagation()`.
* **Complexity:** Time: $O(1)$; Space: $O(1)$.
```javascript
element.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevents bubbling to parent elements
});
```
