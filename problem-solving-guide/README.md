# 🧠 The Master JavaScript & React Problem Solving Guide

> [!TIP]
> 📖 **[View the Problem Solutions Manual (SOLUTIONS.md)](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/problem-solving-guide/SOLUTIONS.md)**: A complete code reference guide with step-by-step logic and complexity analysis for core programming interview problems.

Welcome to the **Master Problem Solving & Logic-Building Guide**. Learning syntax is only 20% of the journey; the other 80% is knowing how to translate a complex, ambiguous real-world requirement into clean, performant, and bug-free code.

This guide provides a **4-Step Logic-Building Framework** used by senior engineers to solve coding challenges, followed by **205 curated programming problems** categorized by topic. Each problem includes a difficulty rating, a core logic hint, and a navigation link to the corresponding folder in this repository for learning and reference.

---

## 🧭 The 4-Step Logic-Building Framework

When faced with a programming challenge (in an interview or on the job), follow this systematic approach:

### Step 1: How to Read the Question (Extracting Constraints)
Do not start typing code immediately. Spend the first 2-3 minutes dissecting the problem statement:
1. **Identify the Inputs & Outputs:** What parameters are passed in? What is the expected return type (e.g., boolean, integer, nested array, Promise)?
2. **Clarify Constraints & Boundaries:** 
   * Can the input be empty, null, or undefined?
   * What is the maximum size of the input data? (This determines if you need an $O(N)$ or $O(N \log N)$ algorithm instead of a brute-force $O(N^2)$ solution).
   * Are there negative numbers, empty strings, or special characters?
3. **Ask Clarifying Questions:** "Should the output array be sorted?", "Should we modify the input array in-place?"

### Step 2: How to Approach the Problem (Strategy Formulation)
Map out the theoretical solution before writing syntax:
1. **Start with Brute Force:** Think of the easiest, most straightforward way to solve the problem, even if it is slow.
2. **Identify Bottlenecks:** Where is the brute force solution slow? Are you doing repeated lookups? (e.g., if you are searching an array repeatedly, can you use a `Map` or `Set` for $O(1)$ constant time lookups?)
3. **Draft Pseudo-code:** Write down the steps in plain English or simplified code comments.

### Step 3: How to Build Logic (Whiteboarding & Dry Runs)
Trace your pseudo-code manually:
1. **Choose a Small Input Sample:** Write down a simple trace state (e.g., `arr = [3, 1, 4]`).
2. **Dry Run Line-by-Line:** Walk through your pseudo-code. Track variable values at each iteration:
   ```text
   Iteration 1: i = 0, currentVal = 3, targetSum = 5, neededVal = 2
   Iteration 2: i = 1, currentVal = 1, targetSum = 5, neededVal = 4
   ```
3. **Identify Logic Gaps:** Fix off-by-one errors (like starting at `i = 0` vs `i = 1`) during the dry run before compiling.

### Step 4: How to Think & Write Code (Coding & Edge Cases)
Translate your dry-run logic into clean JavaScript:
1. **Handle Edge Cases First:** Add guard clauses at the top of your function (e.g., `if (!arr || arr.length === 0) return [];`).
2. **Write Clean Variables:** Use descriptive variable names (`seenNumbers` instead of `s` or `temp`).
3. **Refactor:** Clean up duplicate code blocks, extract complex conditionals into helper functions, and check for memory leaks or performance bottlenecks.

---

## 📚 205 Curated Interview Problems & Topic Mapping

---

### Category 1: Variables, Scopes & Data Types (1–15)
*Learn the core concepts in:* 📂 [Day 02: Variables & Data Types](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/02-variables-and-data-types/) & 📂 [Day 10: Scopes & Scope Chaining](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/10-scopes-and-scope-chaining/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **1** | Scope Leaker | Easy | Prevent dynamic loop counter variable from leaking to global scope. | Use `let` instead of `var` in loop init. |
| **2** | Immutable Config | Easy | Protect an API configuration object from being mutated at runtime. | Apply `Object.freeze()` to the object. |
| **3** | Shadowed Auth | Easy | Recover an outer scoped username that was shadowed by an inner block variable. | Reorganize lexical scope or avoid re-declaring. |
| **4** | Temporal Dead Zone | Medium | Catch and handle errors caused by referencing a config value before declaration. | Understand TDZ hoisting; place declarations first. |
| **5** | Block Constants | Easy | Verify that constant variables cannot be reassigned but their properties can change. | Use `const` and mutate object property directly. |
| **6** | Primitive Reassignment | Easy | Show how primitive strings are passed by value and do not affect the original. | Primitives are immutable and copied by value. |
| **7** | Reference Mutation | Medium | Detect side-effects when passing a shopping cart object to a calculator function. | Object refs point to same memory address in Heap. |
| **8** | Deep Freeze | Hard | Create a function that recursively freezes nested configuration objects. | Check type recursively and run `Object.freeze()`. |
| **9** | Garbage Scopes | Medium | Identify variables that remain in memory due to scope references vs cleaned ones. | Clean reference pointers (assign to `null`). |
| **10** | Dynamic Env Shadowing | Medium | Setup a sandbox where block level variables override default node environments safely. | Wrap sandbox logic in a block `{ }`. |
| **11** | Const Array Safeguard | Easy | Allow item insertions in an array constant but block complete reassignment. | Use `const arr = []` and call `.push()`. |
| **12** | Global Scope Pollution | Easy | Detect and remove variables declared without keywords inside functions. | Run in `"use strict"` to throw errors on global writes. |
| **13** | Lexical Chain Resolver | Medium | Traverse a 4-level deep nested scope block to log tenant and workspace identifiers. | Lexical scope chains resolve outward. |
| **14** | Memory Address Matcher | Easy | Compare two distinct objects with identical keys to explain why they return false. | Object comparisons check reference, not value. |
| **15** | Closure Scope Leak | Medium | Identify memory leaks where an inner scope retains large DOM elements. | Nullify references to unused DOM nodes inside closures. |

---

### Category 2: Operators & Expressions (16–30)
*Learn the core concepts in:* 📂 [Day 03: Operators & Expressions](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/03-operators-and-expressions/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **16** | Float Invoice Matcher | Easy | Match invoice amount `0.1 + 0.2` safely against user payment `0.3`. | Use `Math.abs(a - b) < Number.EPSILON`. |
| **17** | Short-Circuit Auth | Easy | Validate user logins: check credentials only if server is online. | Use logical AND short-circuit: `isOnline && log()`. |
| **18** | Coalesce Config | Easy | Retrieve user display name, falling back to email, then guest fallback. | Use nullish coalescing: `name ?? email ?? "Guest"`. |
| **19** | Strict Type Sieve | Easy | Filter inputs: strip values that loose-match but fail strict comparison. | Strict equality `===` checks both type and value. |
| **20** | Modulo Page Splitter | Easy | Determine if a database item index belongs to an even or odd layout column. | Use `index % 2 === 0` to check parity. |
| **21** | Exponent Storage Check | Easy | Compute max storage states for a system using powers of 2. | Use the exponentiation operator: `2 ** n`. |
| **22** | Pre vs Post Increment | Easy | Track state change increments in a loop using `++i` vs `i++`. | `++i` returns new value, `i++` returns old value. |
| **23** | Compound Fee Calculator | Easy | Update a billing ledger account using compound arithmetic operators. | Use `balance += fee` instead of `balance = balance + fee`. |
| **24** | Truthy Gateway | Easy | Coerce truthy/falsy database variables (strings/zeros) to strict booleans. | Double negation `!!value` casts to boolean. |
| **25** | Ternary Plan Selector | Easy | Return billing plan text ("Free" or "Premium") in a single line comparison. | Use ternary `isPremium ? "Premium" : "Free"`. |
| **26** | Operator Precedence | Medium | Fix a math formula evaluating `tax + price * discount` instead of adding tax first. | Group operations using parentheses `(tax + price)`. |
| **27** | Logical OR Fallback | Easy | Assign a default logging path if the custom configuration string is empty. | Use `customPath || "/var/log"`. |
| **28** | BigInt Allocation | Medium | Process high-precision financial numbers beyond safety limits ($2^{53} - 1$). | Append `n` to numerical literal to initiate `BigInt`. |
| **29** | NaN Checker | Easy | Safeguard user numeric inputs: detect `NaN` safely without false positives. | Use `Number.isNaN(value)` instead of global `isNaN`. |
| **30** | Price Threshold Gate | Easy | Check if customer spending is within a minimum and maximum threshold. | Combine operators: `spend >= min && spend <= max`. |

---

### Category 3: Bitwise Operations & Manipulation (31–50)
*Learn the core concepts in:* 📂 [Day 03b: Bitwise Operators & Manipulation](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/03b-bitwise-operators-and-bit-manipulation/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **31** | High-Speed Parity | Easy | Check if a positive integer is even or odd without using modulo (`%`). | Perform bitwise AND: `(num & 1) === 0`. |
| **32** | Permission Check | Easy | Check if a POSIX file permission integer mask grants `READ` access. | Use bitwise AND: `(mask & READ) === READ`. |
| **33** | Permission Grant | Easy | Add `WRITE` permission to an existing permission bitmask. | Use bitwise OR: `mask |= WRITE`. |
| **34** | Permission Revoke | Medium | Strip `DELETE` permissions from a user mask. | Use bitwise AND with NOT: `mask &= ~DELETE`. |
| **35** | Permission Toggle | Easy | Toggle a user's `EDIT` status flag between active and inactive. | Use bitwise XOR: `mask ^= EDIT`. |
| **36** | Bitwise Float Floor | Easy | Truncate decimal fractions of positive numbers quickly without Math.floor. | Bitwise OR with zero: `value | 0` or `~~value`. |
| **37** | In-Place Variable Swap | Medium | Swap two configuration port numbers without allocating helper variables. | Use XOR chain: `a ^= b; b ^= a; a ^= b;`. |
| **38** | Power of 2 Gate | Medium | Verify if a user seat license count is a power of 2. | Perform bitwise check: `(n & (n - 1)) === 0`. |
| **39** | Hamming Weight | Medium | Count the number of active status flags (1s) inside a telemetry mask. | Brian Kernighan's Algorithm: `n = n & (n - 1)`. |
| **40** | Color Extractor | Medium | Parse hex color `#FF5733` into Red, Green, and Blue component values. | Red: `(hex >> 16) & 0xFF`, Green: `(hex >> 8) & 0xFF`. |
| **41** | Color Packer | Medium | Pack separate Red, Green, Blue integers into a single 24-bit RGB number. | Use shifting and ORing: `(r << 16) | (g << 8) | b`. |
| **42** | Opposite Sign Matcher | Medium | Determine if two system temperature inputs have opposite signs. | XOR check: `(a ^ b) < 0`. |
| **43** | Multiply by Power of 2 | Easy | Multiply an integer count by 8 quickly using bitwise shifts. | Shift left by 3: `count << 3`. |
| **44** | Divide by Power of 2 | Easy | Divide an integer count by 4 quickly using bitwise shifts. | Shift right by 2: `count >> 2`. |
| **45** | Single Number Sieve | Hard | Find the single unique ID in an array where all other IDs appear twice. | XOR all numbers in the array. Duplicates cancel out. |
| **46** | Clear Rightmost Bit | Medium | Clear the rightmost active flag (1) of a system status mask. | Perform `mask & (mask - 1)`. |
| **47** | Position Set Checker | Medium | Check if the Nth bit of a configuration variable is set to 1. | Use bitwise check: `(mask & (1 << n)) !== 0`. |
| **48** | Unsigned Cast | Easy | Cast a signed 32-bit integer result to an unsigned positive integer. | Perform zero-fill right shift: `value >>> 0`. |
| **49** | Mask Flip | Easy | Invert all system status flags in an 8-bit status register. | Use NOT: `~mask & 0xFF`. |
| **50** | Single Bit Isolator | Hard | Find the position of the lowest set bit in a status byte. | Isolate: `mask & -mask`. |

---

### Category 4: Conditionals & Control Flow (51–65)
*Learn the core concepts in:* 📂 [Day 04: Conditionals](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/04-conditionals/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **51** | Tiered SaaS Billing | Easy | Calculate subscription fee: Pro ($10), Enterprise ($50), else Free. | Implement standard `if-else if-else` checks. |
| **52** | Nested Branch Reducer | Medium | Refactor 4-level deep nested `if` checks into guard clauses. | Return early from the function to flatten code structure. |
| **53** | Switch Map Router | Easy | Route api paths to processors using switch-cases. | Use `switch(route)` with string matches. |
| **54** | Short-Circuit Logger | Easy | Trigger security warnings only if the log level is set to "verbose". | Use `isDebug && writeLog()`. |
| **55** | Leap Year Auditor | Medium | Audit log timestamps: verify if log year is a leap year. | Year divisible by 4, not 100, unless divisible by 400. |
| **56** | Ternary Nested Charge | Medium | Calculate surge fees dynamically in a nested ternary line. | `isSurge ? (isRain ? 20 : 15) : 0`. |
| **57** | Range Gatekeeper | Easy | Check if user age falls between a range to allow beta testing registrations. | Combine boundaries: `age >= 18 && age <= 65`. |
| **58** | Fallback Config Object | Easy | Choose a custom API setting, standard fallback, or global default object. | Use OR logic: `custom || standard || globalDefault`. |
| **59** | Invalid Type Filter | Easy | Check if variable is a valid string or array before processing. | Use `typeof` and `Array.isArray()`. |
| **60** | Multi-Flag Evaluator | Medium | Run database backup tasks if server is online, not busy, and admin is active. | Evaluate: `isOnline && !isBusy && isAdmin`. |
| **61** | Password Strength Gate | Easy | Classify passwords as "Weak" (<8 chars), "Medium" (<12), or "Strong". | Check `.length` sequentially in conditional branches. |
| **62** | Default User Hydra | Easy | Inject default name if input username is falsy or blank spaces. | Trim string and use short-circuit: `username.trim() || "Guest"`. |
| **63** | Switch Case Fallthrough | Medium | Map months to seasons: group multiple cases to return single outputs. | Omit `break` to execute shared logic blocks. |
| **64** | Safe Invoice Division | Easy | Avoid division-by-zero crashes when calculating unit costs. | Return 0 immediately if unit count is `0`. |
| **65** | Input Range Clamp | Easy | Bound user volume slider input values between `0` and `100`. | Use `Math.min(100, Math.max(0, val))`. |

---

### Category 5: Loops & Iteration (66–85)
*Learn the core concepts in:* 📂 [Day 05: Loops](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/05-loops/) & 📂 [Day 22: Looping Objects & Arrays](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/22-for-in-for-of-foreach/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **66** | Console Pyramid | Easy | Render an ASCII pyramid pattern in the console for layout rendering. | Use nested loops; outer manages rows, inner prints characters. |
| **67** | Safe Loop Execution | Easy | Ensure a retry loop terminates safely and avoids infinite loops. | Implement a maximum iteration limit sentinel check. |
| **68** | Key-Value Object Loop | Easy | Iterate through a server configuration object to print key-value pairs. | Use the `for...in` loop to iterate keys. |
| **69** | Value Iterable Loop | Easy | Sum numerical array records using the modern ES6 collection iterator. | Use the `for...of` loop to iterate values directly. |
| **70** | Breakout Early | Easy | Scan a user list for blocked IPs and stop searching once one is found. | Use the `break` statement inside your loop. |
| **71** | Skip Deprecated Logs | Easy | Scan server events, processing normal logs while skipping warning levels. | Use the `continue` statement to skip specific iterations. |
| **72** | Matrix Grid Flattener | Medium | Flatten a 2D grid array into a single list of coordinates. | Use nested `for...of` loops to flatten dimensions. |
| **73** | Page Pagination | Easy | Extract slice records from an offset based on active page configuration. | Initialize loop: `for (let i = offset; i < offset + limit; i++)`. |
| **74** | Object Keys Collector | Easy | Collect all config properties into an array without using Object.keys. | Loop keys: `for (let key in obj) { arr.push(key) }`. |
| **75** | Reverse Log Iterator | Easy | Loop through log files starting from the most recent to the oldest. | Loop backward: `for (let i = length - 1; i >= 0; i--)`. |
| **76** | Step Increment Log | Easy | Sample analytics inputs by logging every 5th item. | Loop increment: `for (let i = 0; i < len; i += 5)`. |
| **77** | Nested Array Search | Medium | Scan a nested workspace hierarchy array for a target folder. | Recursive function loop, checking children. |
| **78** | Object Property Matcher | Medium | Filter objects that match specific key-value search parameters. | Check parameters matching using `for...in` checks. |
| **79** | Loop Index Tracker | Easy | Loop through elements, tracking both item index and value. | Use `for (const [index, val] of arr.entries())`. |
| **80** | Fibonacci Calculator | Medium | Calculate the Nth value of the Fibonacci sequence. | Loop addition: `[prev, curr] = [curr, prev + curr]`. |
| **81** | Array Chunk Creator | Medium | Group a list of users into sub-arrays of a maximum size. | Loop increments of size, slicing items. |
| **82** | Property Exist Check | Easy | Check if any key in a nested configuration object has a null value. | Run `for...in` loop with strict check `=== null`. |
| **83** | Safe While Loop Decrement| Easy | Run a countdown function, ensuring the decrement executes. | Verify decrement `i--` runs inside the loop body. |
| **84** | Matrix Transpose | Hard | Swap rows and columns in a 2D matrix array. | Loop row/col coordinates: `transposed[j][i] = matrix[i][j]`. |
| **85** | Array Difference | Medium | Extract all items present in array A that are missing in array B. | Loop array A and check `!B.includes(item)`. |

---

### Category 6: Functions, Advanced Closures & Timers (86–110)
*Learn the core concepts in:* 📂 [Day 06: Functions](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/06-functions/), 📂 [Day 11: Closures](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/11-closures/) & 📂 [Day 16: setTimeout & Advanced Closures](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/16-advanced-functions-and-settimeout/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **86** | Double-Tap Counter | Medium | Build a click function that increments values only within a 300ms window. | Store last click time inside closure memory scope. |
| **87** | API Throttler (Debounce) | Hard | Limit search API calls so they trigger only after typing pauses for 400ms. | Reset `clearTimeout(timerId)` inside closure scope. |
| **88** | API Rate Limiter (Throttle) | Hard | Ensure a webhook trigger fires at most once every 1000ms. | Check throttle cooldown flag inside closure. |
| **89** | Loop Timer Bug | Medium | Fix a `var` loop timer bug where all outputs print the final index value. | Swap `var` for `let` to isolate block scope. |
| **90** | Custom Logger Bind | Medium | Bind a system logger's output structure to prefix all logs with "SYS:". | Return partial application function using closures. |
| **91** | State Preserver | Medium | Create a count function that increments a private state variable. | Enclose private counter inside closure function scope. |
| **92** | Dynamic Callback Runner | Easy | Execute custom processing logic passed as a parameter. | Verify argument is a function `typeof callback === "function"`. |
| **93** | Curried Fee Calculator | Medium | Create a billing function: `calc(tax)(price)` to reuse tax rates. | Use currying pattern (functions returning functions). |
| **94** | Telemetry Memoizer | Hard | Cache expensive API calculations based on function arguments. | Store results in a cache map inside the closure. |
| **95** | Self-Invoking Sandbox | Easy | Run configuration setups immediately without polluting namespace. | Use an IIFE: `(function() { ... })()`. |
| **96** | Context Preserver | Medium | Preserve the calling context (`this`) inside async callbacks. | Use arrow functions or call `.bind(this)`. |
| **97** | Partial Configuration | Medium | Preset default server host parameters, leaving port configurable later. | Return a function configured with the host parameter. |
| **98** | Once-Only Trigger | Medium | Create a webhook event listener that triggers at most once. | Set flag `executed = true` in closure to ignore repeat calls. |
| **99** | Call Stack Overflow | Medium | Identify and fix a recursive function lacking a base exit check. | Ensure recursive functions have a base exit condition. |
| **100**| Execution Context Trace | Easy | Trace variables through Creation vs Execution compilation stages. | Hoisted variables are initialized as `undefined`. |
| **101**| Closured Loop Arrays | Medium | Create an array of functions where each prints its loop index. | Use block-scoped `let` to bind index to each function. |
| **102**| Async Queue Runner | Hard | Run an array of functions sequentially with 500ms intervals between each. | Run recursively using `setTimeout` triggers. |
| **103**| Poll Status Timer | Medium | Poll an API status endpoint every 2 seconds; stop once "ready" is returned. | Check condition and recursively trigger `setTimeout`. |
| **104**| Dynamic Method Maker | Medium | Create an object creator function that adds methods dynamically. | Return objects containing reference methods inside closures. |
| **105**| Lexical Environment Dump | Easy | Explain how nested functions retain access to their parent variables. | Functions preserve access to parent lexical scopes. |
| **106**| Arrow Context Lexical | Easy | Use arrow functions to inherit the surrounding parent context. | Arrow functions inherit `this` from lexical scope. |
| **107**| Function Expression Hoist | Easy | Explain why calling a function variable before its declaration fails. | Function expressions are not hoisted like declarations. |
| **108**| Arguments Sum Rest | Easy | Create a function that accepts any number of arguments and returns their sum. | Use rest parameter syntax `(...args)`. |
| **109**| Context Override Call | Medium | Invoke a logging function with a custom object context. | Use `logFunction.call(customContext, arg1)`. |
| **110**| Context Array Apply | Easy | Pass array arguments to a math function using explicit binding. | Use `mathFunction.apply(context, arrayOfArgs)`. |

---

### Category 7: Objects & `this` Context (111–130)
*Learn the core concepts in:* 📂 [Day 12: Objects](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/12-objects/) & 📂 [Day 13: `this` Keyword & Explicit Binding](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/13-this-keyword-and-explicit-binding/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **111**| Safe Deep Copier | Hard | Clone a nested system state object containing configurations. | Use recursive copy or `structuredClone(obj)`. |
| **112**| Context Binder | Medium | Bind a transaction runner method to its gateway processor object. | Use `runnerMethod.bind(gatewayProcessor)`. |
| **113**| Dynamic Key Injector | Easy | Inject database parameters dynamically into a settings object. | Use bracket notation: `config[dynamicKey] = value`. |
| **114**| Keys & Values Zip | Easy | Combine an array of keys and values into a single object. | Reduce keys: `acc[key] = values[index]`. |
| **115**| Constructor Factory | Easy | Instantiate standardized user profile templates. | Create class constructor or factory function returning objects. |
| **116**| Method Delegate | Medium | Borrow a payment validator function to check standard checkout cards. | Borrow method: `validator.call(cardObject)`. |
| **117**| Property Descriptor Lock | Hard | Create a read-only configuration property that cannot be deleted. | Define property with `writable: false, configurable: false`. |
| **118**| Object Property Count | Easy | Count the number of active settings in a configuration object. | Use `Object.keys(config).length`. |
| **119**| Deep Equality Auditor | Hard | Compare two deeply nested configuration state objects. | Recursively check types, key count, and values. |
| **120**| Computed Object Schema | Easy | Create a schema object where properties are named dynamically. | Enhanced object literals syntax: `{[computedKey]: value}`. |
| **121**| Prototype Polluter Check| Medium | Validate objects safely, ignoring properties added to the prototype. | Check property: `obj.hasOwnProperty(key)`. |
| **122**| Optional Chaining Guard | Easy | Safely read nested user features without throwing null pointer errors. | Use optional chaining: `user?.profile?.features`. |
| **123**| Nullish Coalesce Assign | Easy | Assign a default value to an object property only if it is null/undefined. | Use nullish assignment: `config.port ??= 8080`. |
| **124**| Prototype Extender | Medium | Extend built-in objects safely with helper methods. | Avoid extending built-ins; use class wrappers instead. |
| **125**| Object Sieve | Medium | Filter keys of an object based on a validation check. | Get entries, filter values, and convert back using `Object.fromEntries()`. |
| **126**| Arrow Object Return | Easy | Return an object literal directly from an implicit arrow function. | Wrap the returned object in parentheses: `() => ({ key: val })`. |
| **127**| Object Reference Freeze | Medium | Prevent additions and removals on an object, allowing property edits. | Use `Object.seal(configObject)`. |
| **128**| Object Merging Conflicts | Easy | Merge user customizations over default app configurations. | Spread overrides: `const config = { ...defaults, ...user }`. |
| **129**| Method Chaining Engine | Medium | Create a calculator object that supports chained method calls. | Return `this` from each method. |
| **130**| Object Values Aggregator | Medium | Sum values of a numeric setting object (e.g. workspace storage limits). | Use `Object.values(limits).reduce()`. |

---

### Category 8: Arrays, Iterators & Aggregation (131–155)
*Learn the core concepts in:* 📂 [Day 15: Arrays](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/15-arrays/) & 📂 [Day 23: Array Iterators](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/23-array-iterators-map-filter-reduce/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **131**| Transaction Accumulator | Easy | Sum all successful charges in a ledger list. | Filter by status and use `reduce` to sum values. |
| **132**| Unique IP Filter | Easy | Extract unique IP addresses from a web access log array. | Convert array to a `Set` and spread back: `[...new Set(ips)]`. |
| **133**| Active Session Sieve | Easy | Filter user records whose accounts are active and role is "editor". | Filter: `arr.filter(u => u.active && u.role === "editor")`. |
| **134**| Payload Normalizer | Easy | Standardize API response fields: format names to uppercase. | Map: `arr.map(u => ({ ...u, name: u.name.toUpperCase() }))`. |
| **135**| Group Users by Role | Medium | Group user records into categorized lists based on their role name. | Reduce: `acc[user.role] ??= []; acc[user.role].push(user)`. |
| **136**| Array Matrix Rotator | Hard | Rotate a 2D dashboard layout grid (matrix) 90 degrees clockwise. | Transpose and reverse rows. |
| **137**| Sub-array Sum Search | Hard | Find a contiguous sub-array that sums to a target value. | Use sliding window algorithm or prefix sum map. |
| **138**| Array Intersection | Easy | Find overlapping user IDs between two registration databases. | Filter A check B: `A.filter(id => B.includes(id))`. |
| **139**| Array De-duplicator | Easy | Remove duplicates from a list without using the `Set` class. | Filter: `arr.filter((item, idx) => arr.indexOf(item) === idx)`. |
| **140**| Array Flat Mapper | Medium | Extract and flatten nested tag lists from a posts collection. | Use `arr.flatMap(post => post.tags)`. |
| **141**| Sorting Objects by Key | Easy | Sort user profiles alphabetically based on their display names. | Sort: `arr.sort((a, b) => a.name.localeCompare(b.name))`. |
| **142**| Array Binary Finder | Medium | Search a sorted list of workspace files for a target size. | Implement binary search algorithm ($O(\log N)$). |
| **143**| Array Chunker | Medium | Group a list of users into sub-arrays of a maximum size. | Slice blocks: `arr.slice(i, i + size)`. |
| **144**| Every/Some Status Auditor | Easy | Check if all servers are online, or if at least one is overloaded. | Use `arr.every()` and `arr.some()`. |
| **145**| Array Diff Extractor | Medium | Find elements that are unique to array A compared to array B. | Filter: `A.filter(x => !B.includes(x))`. |
| **146**| Safe Clone Reverse | Easy | Reverse an array of log records without modifying the original. | Spread and reverse: `[...logs].reverse()`. |
| **147**| Array In-Place Filter | Hard | Remove banned user IDs from an array without creating a new array. | Loop backward and use `.splice(i, 1)`. |
| **148**| Median Calculator | Medium | Calculate the median value of a transaction fee list. | Sort array and return middle element or average of two middles. |
| **149**| Value Frequency Map | Medium | Count occurrences of each error type inside a log array. | Reduce: `acc[err] = (acc[err] || 0) + 1`. |
| **150**| Target Sum Index Finder | Medium | Find indices of two numbers in an array that sum to a target. | Store value index maps: `seen[target - val]` for matching. |
| **151**| Array Maximum Gap | Hard | Find the maximum difference between successive elements in a sorted array. | Sort array and check difference between adjacent elements. |
| **152**| Sparse Array Compact | Easy | Remove empty slots and null/undefined values from a sparse array. | Filter: `arr.filter(item => item !== null && item !== undefined)`. |
| **153**| Sub-array Max Sum | Hard | Find the sum of the contiguous sub-array with the largest sum. | Implement Kadane's Algorithm ($O(N)$). |
| **154**| Array Right Rotation | Medium | Rotate array elements right by K steps. | Slice and join: `[...arr.slice(-k), ...arr.slice(0, -k)]`. |
| **155**| Array Value Interpolator | Medium | Interpolate missing data points in a numeric array with average values. | Average adjacent indices to fill missing points. |

---

### Category 9: Promises, Asynchronous Flow & APIs (156–180)
*Learn the core concepts in:* 📂 [Day 19: Promises](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/19-promises/), 📂 [Day 20: Async / Await](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/20-async-await/) & 📂 [Day 24: APIs & Fetch](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/24-apis-and-fetch/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **156**| API Request Retrier | Hard | Retry a failing API request up to 3 times before returning an error. | Catch error and call recursively with decrementing retry counter. |
| **157**| Parallel Fast Resolver | Medium | Fetch layout, billing, and user details in parallel. | Use `await Promise.all([task1, task2, task3])`. |
| **158**| Promise Race Timeout | Medium | Cancel a network request if the response takes longer than 3000ms. | Use `Promise.race([fetchPromise, timeoutPromise])`. |
| **159**| Sequential Execution | Medium | Run an array of async functions sequentially, waiting for each to complete. | Loop using `for...of` with `await`. |
| **160**| Fetch Response Handler | Easy | Fetch API details, verify status codes, and parse JSON response payload. | Check `response.ok` before calling `response.json()`. |
| **161**| API Loading Spinner | Easy | Handle loading state: ensure spinner is hidden when API completes or fails. | Place spinner toggle in `finally` block: `promise.finally(hide)`. |
| **162**| Custom Promise Class | Hard | Create a simple version of the `Promise` class with resolve and reject states. | Track callbacks in arrays; invoke them on state changes. |
| **163**| Async Error Boundaries | Easy | Catch errors thrown inside async functions safely to prevent app crashes. | Wrap async calls in `try/catch` blocks. |
| **164**| Batch Request Limit | Hard | Run 100 API requests in batches of 5 to avoid overloading the server. | Recursively manage pool: replace completed task in queue. |
| **165**| Promise Settled Auditor | Medium | Run multiple tasks; list which succeeded and which failed. | Use `Promise.allSettled(promises)`. |
| **166**| API Response Cache | Medium | Serve cached results for repeat requests; fetch only if cache is expired. | Check cache map before instantiating new fetch calls. |
| **167**| Promise Promisify | Easy | Wrap a legacy callback function inside a modern Promise wrapper. | Return `new Promise((resolve, reject) => cb(err, res))`. |
| **168**| Microtask Execution Priority| Medium | Determine execution order between timeouts, resolved promises, and logs. | Resolved promises (microtasks) run before timeouts (macrotasks). |
| **169**| Promise Resolve Value | Easy | Return a resolved Promise containing a static default value. | Use `Promise.resolve(defaultValue)`. |
| **170**| Promise Reject Handler | Easy | Handle rejected Promises cleanly using catch parameters. | Append `.catch(err => ...)` to promise chain. |
| **171**| Dynamic API Endpoint Url | Easy | Build API search query URLs safely with parameters. | Use `new URLSearchParams(params).toString()`. |
| **172**| Cancelable Promise | Hard | Create a promise wrapper that can be canceled mid-flight. | Expose cancel function that triggers internal reject logic. |
| **173**| Double Fetch Fast Return | Medium | Send requests to 2 mirror endpoints; use whichever returns first. | Use `Promise.any([fetchA, fetchB])` or `Promise.race()`. |
| **174**| Fetch JSON File Local | Easy | Fetch configuration details from a local settings file path. | Call `fetch("./config.json")`. |
| **175**| Fetch Post Payload | Easy | Post billing data to a server API using JSON request headers. | Set `method: "POST", headers: { "Content-Type": "application/json" }`. |
| **176**| Async Generator Loop | Hard | Stream database items page by page using async generators. | Use `async function*` with `for await...of` loops. |
| **177**| Auto Sync Cache | Medium | Poll API endpoint every 10 seconds; write data to cache memory. | Call recursively: `setTimeout(poll, 10000)`. |
| **178**| Await Thenable Object | Medium | Await an object containing a `.then()` method to verify custom bindings. | JavaScript engine automatically evaluates "thenable" objects. |
| **179**| API Gateway Route Fallback| Medium | Try secondary gateways sequentially if the primary gateway fails. | Loop gateways in `try/catch` blocks; break on success. |
| **180**| Promise Flow Visualizer | Easy | Track promise resolution lifecycles: Pending, Fulfilled, Rejected. | Use logs inside then, catch, and finally callbacks. |

---

### Category 10: OOP, Prototypes & Classes (181–195)
*Learn the core concepts in:* 📂 [Day 21: OOP & Prototypes](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/21-oop-and-prototypes/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **181**| Encapsulated Account | Medium | Protect bank ledger: make balances readable only via getters. | Declare class property with `#balance` private prefix. |
| **182**| Polymorphic Renderer | Medium | Create a base UI element class; override the paint method in sub-classes. | Subclass implements custom method, overriding parent method. |
| **183**| Prototype Link Finder | Easy | Inspect prototype chain link: find the parent constructor. | Use `Object.getPrototypeOf(instance)` or `instance.__proto__`. |
| **184**| Factory Class Generator | Medium | Dynamically generate distinct user profile roles from a single base class. | Static method returns subclasses: `return new AdminUser()`. |
| **185**| Super Inheritance Chain | Easy | Call parent constructor from a subclass. | Use `super(args)` inside subclass constructor. |
| **186**| Static Config Collector | Easy | Create a class that stores shared API config details across all instances. | Define configurations using the `static` keyword. |
| **187**| Private Method Secure | Medium | Encapsulate decryption algorithm inside payment handler class. | Prefix helper method with `#` to make it private: `#decrypt()`. |
| **188**| Class Instance Check | Easy | Verify if an object belongs to a specific class hierarchy. | Use the `instanceof` comparison operator. |
| **189**| Prototype Method Binding | Medium | Share helper methods across object instances without repeating allocations. | Add method to `ConstructorName.prototype`. |
| **190**| OOP Shape Area Calculator | Easy | Create Shape class; expose area getter while hiding geometry math. | Implement getters: `get area() { ... }`. |
| **191**| Abstract Class Safeguard | Hard | Throw error if user attempts to instantiate base parent Class directly. | Check class constructor: `if (new.target === BaseClass) throw`. |
| **192**| Prototype Property Shadow| Medium | Override prototype property locally on a single instance. | Write property directly to instance object `instance.key = val`. |
| **193**| Class Event Dispatcher | Hard | Create a custom event emitter class that supports register, trigger, and remove listener. | Store event arrays in map; call callbacks on emission. |
| **194**| Object Prototype Null | Easy | Create an object with no prototype, completely safe from prototype pollution. | Create using `Object.create(null)`. |
| **195**| OOP Class Mixin | Hard | Add logging capabilities to a payment class without inheriting from a base logger class. | Copy prototype methods: `Object.assign(Target.prototype, Mixin)`. |

---

### Category 11: DOM Manipulation & Browser Web APIs (196–205)
*Learn the core concepts in:* 📂 [Day 25: DOM & Cookies](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/25-dom-and-cookies/) & 📂 [Day 29: DOM Tips, Tricks & Web APIs](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/29-dom-tips-tricks-and-browser-apis/)

| ID | Problem Name | Difficulty | Problem Scenario & Logic Goal | Core Logic Hint / Trick |
| :---: | :--- | :---: | :--- | :--- |
| **196**| Batch Dom Injector | Medium | Render a list of 100 transactions without causing layout thrashing. | Create elements in memory, append to `DocumentFragment`, then inject. |
| **197**| Click Handler Delegation | Easy | Handle clicks on a dynamic list using a single parent event listener. | Use `event.target` inside container click listener. |
| **198**| Computed Style Fetcher | Easy | Fetch actual CSS values calculated by the browser engine. | Use `window.getComputedStyle(element)`. |
| **199**| Lazy Loading Scroll Observer| Medium | Trigger image loading checks only as elements enter the viewport. | Implement checking using `IntersectionObserver`. |
| **200**| Panel Resizer Observer | Medium | Log container coordinates only when sidebar dimensions change. | Attach listener to container using `ResizeObserver`. |
| **201**| Clipboard Copy Helper | Easy | Copy API access token strings to the user's clipboard. | Use `navigator.clipboard.writeText(text)`. |
| **202**| Live Coordinate Geolocation| Easy | Fetch current device GPS coordinates. | Get location using `navigator.geolocation.getCurrentPosition()`. |
| **203**| Cookie Authentication Parse| Medium | Parse the browser cookies string into a key-value object map. | Split cookie string by `; ` and map key-values. |
| **204**| Cookie Expiry Write | Easy | Write an authentication token cookie that expires in 7 days. | Set cookie header: `document.cookie = "token=...; max-age=604800"`. |
| **205**| Event Bubble Stopper | Easy | Prevent parent list click events from firing when a child button is clicked. | Use `event.stopPropagation()` inside child click listener. |

---

## 🛠️ How to Use This Guide to Crack Interviews

1. **Don't Jump to Solutions:** Choose a problem, open a blank JavaScript file in the scratchpad, and spend 15 minutes trying to implement the logic.
2. **Review Repository Concepts:** If you get stuck, click the navigation link to the corresponding Day folder. Read the **Mental Model** and the **Deep Explanation** to review the core concepts.
3. **Trace Edge Cases:** Always verify your code outputs against edge cases (like `null` variables, single item lists, empty strings, and large numbers).
4. **Dry Run on Paper:** If you cannot visualize how a loop executes, draw the stack frames and variable states on a whiteboard or paper.
