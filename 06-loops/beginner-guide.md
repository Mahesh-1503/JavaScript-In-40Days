# Beginner's Guide: JavaScript Loops & Iteration

Hey there, future iteration wizard! 👋 Welcome to your hands-on guide to JavaScript Loops and Iteration. Today, we are going to learn how to repeat blocks of code efficiently using `for`, `while`, and `do...while` loops, control them using break and continue, and analyze loop complexity.

---

## 📂 How to Learn This Folder

To get the most out of your loops experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand loop structures and dry run metrics.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-loops.js`), and run them with `node test-loops.js` in your terminal to see it run.
3.  **Step 3:** Open and read [06-loops/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/06-loops/README.md) to explore time complexity ($O(N)$ vs $O(N^2)$), space usage, and advanced optimization.

---

## Part 1: Why Do We Need Loops?

Imagine you need to print the numbers 1 to 5 to the console. Writing it manually is simple:
```javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```
But what if you need to print the numbers 1 to 10,000? Repeating lines of code is tedious and impossible to maintain.

Instead, we use a **loop** to repeat a block of code until a specific condition becomes false:
```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1, 2, 3, 4, 5
```

---

## Part 2: The `for` Loop

The `for` loop is the most commonly used loop structure. It is ideal when you know exactly how many times the loop needs to run beforehand.

### Syntax:
```javascript
for (initialization; condition; update) {
  // Code block to repeat
}
```

### How the Execution Flow Works:
1.  **Initialization:** `let i = 1` runs **only once** at the very beginning to set up the counter.
2.  **Condition Check:** Checks if `i <= 5`. If `true`, enter the loop. If `false`, exit the loop.
3.  **Execute Code:** Runs `console.log(i)`.
4.  **Update Counter:** Runs `i++` to increment the counter by 1.
5.  **Repeat:** Checks the condition again (Step 2).

### Dry Run Table:
| Step | Counter Value (`i`) | Condition (`i <= 5`) | Console Output | Update (`i++`) |
| :---: | :---: | :---: | :---: | :---: |
| 1 | `1` | `1 <= 5` (True) | `1` | `i` becomes `2` |
| 2 | `2` | `2 <= 5` (True) | `2` | `i` becomes `3` |
| 3 | `3` | `3 <= 5` (True) | `3` | `i` becomes `4` |
| 4 | `4` | `4 <= 5` (True) | `4` | `i` becomes `5` |
| 5 | `5` | `5 <= 5` (True) | `5` | `i` becomes `6` |
| 6 | `6` | `6 <= 5` (False) | *(None)* | *(Loop terminates)* |

---

### Basic Examples:

#### 1. Print Even Numbers (Step by 2)
```javascript
for (let i = 2; i <= 10; i += 2) {
  console.log(i);
}
// Output: 2, 4, 6, 8, 10
```

#### 2. Sum of Numbers (Accumulator Pattern)
```javascript
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log(sum); // 15 (1 + 2 + 3 + 4 + 5)
```

#### 3. Sum of Even Numbers from 1 to 100
```javascript
let evenSum = 0;
for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    evenSum += i;
  }
}
console.log(evenSum); // 2550
```

#### 4. Print Characters of a String
```javascript
let language = "JavaScript";
for (let i = 0; i < language.length; i++) {
  console.log(language.charAt(i));
}
/* Output:
  J
  a
  v
  ...
*/
```

#### 5. Multiplication Table
```javascript
let n = 3;
for (let i = 1; i <= 10; i++) {
  console.log(`${n} x ${i} = ${n * i}`);
}
```

---

## Part 3: The `while` Loop

The `while` loop checks the condition **before** each iteration. Use this loop when you do not know how many times the loop needs to run beforehand.

### Syntax:
```javascript
while (condition) {
  // Code block to repeat
  // Remember to update the counter variable inside!
}
```

### Basic Example:
```javascript
let count = 1;

while (count <= 5) {
  console.log(count);
  count++; // Increment counter
}
```

> [!CAUTION]
> **Avoid Infinite Loops.** If you forget to update the counter variable inside the loop (e.g. leaving out `count++`), the condition will remain `true` forever. This will freeze your browser or crash your script:
> ```javascript
> let count = 1;
> while (count <= 5) {
>   console.log(count); // Infinite Loop!
> }
> ```

---

### Application Example: Reversing the Digits of a Number
```javascript
let number = 6789;
let reversed = 0;

while (number > 0) {
  let digit = number % 10; // Extract rightmost digit (9, then 8, 7, 6)
  reversed = (reversed * 10) + digit; // Build reversed number
  number = Math.floor(number / 10); // Remove rightmost digit
}

console.log(reversed); // 9876
```

#### Dry Run Steps (Number = 6789):
1.  **Step 1:** `digit = 6789 % 10 = 9` ──► `reversed = (0 * 10) + 9 = 9` ──► `number = Math.floor(678.9) = 678`
2.  **Step 2:** `digit = 678 % 10 = 8` ──► `reversed = (9 * 10) + 8 = 98` ──► `number = Math.floor(67.8) = 67`
3.  **Step 3:** `digit = 67 % 10 = 7` ──► `reversed = (98 * 10) + 7 = 987` ──► `number = Math.floor(6.7) = 6`
4.  **Step 4:** `digit = 6 % 10 = 6` ──► `reversed = (987 * 10) + 6 = 9876` ──► `number = Math.floor(0.6) = 0` (Loop Ends)

---

## Part 4: The `do...while` Loop

The `do...while` loop executes its code block **first**, and then checks the condition. This guarantees the block runs **at least once**, regardless of whether the condition is true or false.

### Syntax:
```javascript
do {
  // Code block to repeat
  // Remember to update counter
} while (condition);
```

### Comparison Examples:

#### Standard `while` loop (Checks first, runs 0 times):
```javascript
let num = 10;
while (num < 5) {
  console.log("This will never print");
}
```

#### `do...while` loop (Runs 1 time, then checks):
```javascript
let num = 10;
do {
  console.log("This prints once!");
} while (num < 5);
// Output: "This prints once!"
```

| Type | Order of Operations | Minimum Iterations |
| :---: | :--- | :---: |
| **`while`** | Condition Checked ──► Code Runs | 0 |
| **`do...while`** | Code Runs ──► Condition Checked | 1 |

---

## Part 5: Loop Control: `break` and `continue`

These keywords let you change the flow of a loop dynamically.

### 1. `break` (Exit immediately)
Exits the loop entirely, bypassing any remaining iterations:
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) break;
  console.log(i);
}
// Output: 1, 2 (Stops immediately when i reaches 3)
```

#### Application: E-commerce Product Search
```javascript
const products = [{ id: 101, name: "Book" }, { id: 102, name: "Phone" }, { id: 103, name: "Cup" }];
const targetId = 102;

for (let i = 0; i < products.length; i++) {
  if (products[i].id === targetId) {
    console.log("Product found at index:", i);
    break; // Exit the loop because we found the target
  }
}
```

---

### 2. `continue` (Skip current step)
Skips the rest of the current iteration and jumps directly to the next counter update:
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
// Output: 1, 2, 4, 5 (Skips printing 3, then continues loop)
```

#### Example: Skip Multiples of 3
```javascript
for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0) {
    continue; // Skip multiples of 3
  }
  console.log(i);
}
```

---

## Part 6: Nested Loops

A loop nested inside another loop. For every single iteration of the outer loop, the inner loop executes its entire cycle.

### Basic Grid Coordinates Example:
```javascript
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`Row: ${i}, Col: ${j}`);
  }
}
/* Output:
  Row: 1, Col: 1
  Row: 1, Col: 2
  Row: 1, Col: 3
  Row: 2, Col: 1
  ...
*/
```

---

## Part 7: Star and Number Pattern Problems

Nested loops are commonly used to draw shapes and console pattern outputs.

### Pattern 1: Right-Angled Star Triangle
```text
* 
* * 
* * * 
* * * * 
* * * * * 
```
```javascript
for (let i = 1; i <= 5; i++) {
  let rowOutput = "";
  for (let j = 1; j <= i; j++) {
    rowOutput += "* ";
  }
  console.log(rowOutput);
}
```

### Pattern 2: Number Triangle
```text
1
12
123
1234
12345
```
```javascript
for (let i = 1; i <= 5; i++) {
  let rowOutput = "";
  for (let j = 1; j <= i; j++) {
    rowOutput += j;
  }
  console.log(rowOutput);
}
```

---

## Part 8: Multiple Variables in a Single Loop

You can initialize and update multiple counters simultaneously inside a single `for` loop declaration:
```javascript
for (let i = 1, j = 10; i <= 10 && j >= 1; i++, j--) {
  console.log(`i: ${i}, j: ${j}`);
}
/* Output:
  i: 1, j: 10
  i: 2, j: 9
  ...
  i: 10, j: 1
*/
```

---

## Part 9: Real-World Application Code

### 1. Feed Card Card Filter Generator
Traverse a list of objects and skip rendered cards based on conditions using `continue`:
```javascript
const restaurants = [
  { name: "Pasta Place", isOpen: true },
  { name: "Burger Bistro", isOpen: false },
  { name: "Pizza Parlor", isOpen: true }
];

for (let i = 0; i < restaurants.length; i++) {
  if (!restaurants[i].isOpen) {
    continue; // Skip closed restaurants
  }
  console.log("Rendering card for:", restaurants[i].name);
}
```

### 2. Pagination Page Slicer
Exit page extraction once the batch size is reached:
```javascript
const feedPosts = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5"];
const pageBatch = [];

for (let i = 0; i < feedPosts.length; i++) {
  if (pageBatch.length === 3) {
    break; // Stop adding items once we reach our page limit of 3
  }
  pageBatch.push(feedPosts[i]);
}
console.log("Rendered Page:", pageBatch); // ["Post 1", "Post 2", "Post 3"]
```

### 3. API Retry Logic with Max Attempts
```javascript
let attempts = 0;
const maxAttempts = 3;
let apiSuccess = false;

while (attempts < maxAttempts) {
  try {
    console.log(`API Call Attempt #${attempts + 1}...`);
    
    // Simulate successful API call on attempt 2
    if (attempts === 1) {
      apiSuccess = true;
      console.log("API Connection Successful!");
      break; // Exit retry loop early
    }
    throw new Error("Timeout Exception");
  } catch (error) {
    attempts++;
    console.log(`Attempt Failed: ${error.message}`);
  }
}
```

---

## Part 10: Time Complexity Analysis

How does the nesting level of loops impact performance?

### Single Loop: $O(N)$ (Linear Time)
If you double the size of the inputs, the execution time doubles:
```javascript
for (let i = 0; i < n; i++) {
  // Runs N times
}
```

### Nested Loops: $O(N^2)$ (Quadratic Time)
If you double the size of the inputs, the execution time quadruples (2x elements takes 4x longer):
```javascript
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // Runs N * N times
  }
}
```
> [!TIP]
> Try to avoid nesting loops whenever possible for large data collections. Instead, convert nested loops into hash map lookups.

---

## Part 11: Common Developer Mistakes

### 1. Off-by-One Array Boundaries (`<= array.length`)
JavaScript array indices range from `0` to `length - 1`. Checking `i <= length` will access a non-existent index and return `undefined`:
```javascript
const arr = [10, 20, 30];

// ❌ Bug: i <= arr.length checks index 3 (which is undefined)
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); 
}

// 🟢 Correct: i < arr.length
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

### 2. Modifying the Counter Variable Multiple Times
Modifying the counter variable (`i`) inside the loop body as well as in the loop definition makes code hard to read and causes bugs:
```javascript
// ❌ Confusing counter behavior
for (let i = 0; i < 10; i++) {
  i += 2; // Changes i value mid-execution!
  console.log(i);
}
```

---

## Part 12: Selector Cheat Sheet & Practice Exercises

### Loop Selector Reference Table
| Selection Condition | Recommended Loop | Syntax Example |
| :--- | :--- | :--- |
| **Number of loops is known** | `for` | `for (let i=0; i<10; i++)` |
| **Number of loops is unknown** | `while` | `while (hasMoreData)` |
| **Run at least once** | `do...while` | `do { ... } while (hasErrors)` |
| **Iterate over Array items** | `for...of` | `for (const item of array)` |
| **Iterate over Object keys** | `for...in` | `for (const key in object)` |

### Practice Exercises:
1.  **Count to Hundred:** Print numbers 1 to 100 using a `for` loop.
2.  **Odd List:** Print all odd numbers from 1 to 50 using `while`.
3.  **Sum Collector:** Calculate the sum of all numbers between 1 and 50.
4.  **Digit Adder:** Given an integer (e.g. `1234`), return the sum of its individual digits (`1 + 2 + 3 + 4 = 10`) using a `while` loop.
5.  **Multiplication Grid:** Output the multiplication table for numbers 1 to 5 using nested loops.
6.  **API Fallback Retry:** Write an API retry wrapper that tries to reconnect 5 times before failing.
7.  **Reverse Star Pyramid:** Draw a star triangle that prints 5 stars on line one, and decreases line-by-line down to 1.
