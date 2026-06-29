# Beginner's Guide: JavaScript Arrays & Multidimensional Grids

Hey there, future database architect! 👋 Welcome to your hands-on guide to JavaScript Arrays and 2D Grids. Today, we are going to learn how to store ordered sequences of data, manipulate lists with index methods, transposing matrices, and slice catalog pages for client-side pagination.

---

## 📂 How to Learn This Folder

To get the most out of your array experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand Notion block list structures and conveyor belt shift re-indexing.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-arrays.js`), and run them with `node test-arrays.js` in your terminal to see the outputs.
3.  **Step 3:** Open and read [16-arrays/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/16-arrays/README.md) to explore multidimensional maps, transposing parameters, and array references.
4.  **Step 4:** Inspect and run [16-arrays/multidimensional-arrays.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/16-arrays/multidimensional-arrays.js) to see grid traversal and coordinate swap functions.

---

## Part 1: What is an Array?

An **Array** is an ordered list of values stored sequentially in memory. 

### The Notion Page Database Analogy
Think of a **Notion Database page**:
*   The page is a vertical list of content blocks (paragraphs, headers, images).
*   Each block has a specific position (index) starting from the top.
*   You can add blocks at the end, insert blocks in the middle, or duplicate sections.

In JavaScript, this block sequence is represented as an Array:
```javascript
const pageBlocks = ["# Title Block", "Paragraph 1", "Image Block"];
```

---

## Part 2: Indexing & Basic Operations

Every element in an array is indexed starting from **`0`** up to **`array.length - 1`**.

```text
Index:    [0]            [1]            [2]
Value:  "# Title"   "Paragraph 1"   "Image Block"
```

### 1. Read & Update by Index:
```javascript
console.log(pageBlocks[0]); // "# Title"
pageBlocks[1] = "Paragraph Updated"; // Replaces element at index 1
```

### 2. Append & Remove at the End:
*   **`push(item)`:** Appends a new item to the very end of the list.
*   **`pop()`:** Removes and returns the last item from the list.
```javascript
pageBlocks.push("Bullet 1"); // ["# Title", "Paragraph 1", "Image Block", "Bullet 1"]
const removedBlock = pageBlocks.pop(); // Removes "Bullet 1"
```

### 3. Prepend & Remove at the Start:
*   **`unshift(item)`:** Prepends a new item to the very beginning of the list.
*   **`shift()`:** Removes and returns the first item from the list.
```javascript
pageBlocks.unshift("Banner image"); // ["Banner image", "# Title", "Paragraph 1", "Image Block"]
const shiftedBlock = pageBlocks.shift(); // Removes "Banner image"
```

---

## Part 3: Array Memory Re-Indexing & Time Complexity

Why does JavaScript have different methods for adding elements? The difference lies in **execution speed (performance)**.

### Push/Pop (End of Array): $O(1)$ Time Complexity (Fast)
Adding or removing at the end of an array does not alter the indices of existing elements. The computer calculates the memory address instantly:
```text
Index:    [0]     [1]     [2]
Value:  [Block1][Block2][Block3] ◄── [Push: Block4] (Indices stay: 0, 1, 2)
```

### Shift/Unshift (Start of Array): $O(N)$ Time Complexity (Slow)
Prepending a value at index `0` forces the JavaScript engine to move every single existing element in the array down one index slot. This is like a **conveyor belt**:
```text
[Unshift: NewBlock] ──► [0]
                         │
                         ▼
Index:    [0] ──► [1] ──► [2] ──► [3] (Existing elements shifted right)
Value:  [New]   [Block1][Block2][Block3]
```
> [!TIP]
> Avoid using `shift()` and `unshift()` in large data loops. Use `push()` and `pop()` to keep your scripts fast.

---

## Part 4: Slicing vs. Splicing

### 1. `slice(start, end)` (Copying / Non-Mutating)
Creates a shallow copy of a sub-section of an array without modifying the original array.
```javascript
const draftBlocks = ["Title", "Heading", "Draft 1", "Draft 2", "Footer"];
const subSelection = draftBlocks.slice(2, 4); // ["Draft 1", "Draft 2"] (Index 2 to 3, index 4 is excluded)
console.log(draftBlocks.length); // 5 (Original is unchanged!)
```

### 2. `splice(start, count, items...)` (Modifying / Mutating)
Modifies the original array directly by deleting, replacing, or inserting items at any index.
```javascript
const databaseRows = ["Row A", "Row B", "Row D"];

// At index 2, delete 0 rows, insert "Row C"
databaseRows.splice(2, 0, "Row C");
console.log(databaseRows); // ["Row A", "Row B", "Row C", "Row D"] (Original modified!)
```

---

## Part 5: Concatenation & The Spread Operator

You can merge arrays using `concat()` or the modern **Spread Operator (`...`)**:
```javascript
const primaryColors = ["Red", "Blue"];
const secondaryColors = ["Green", "Yellow"];

// 1. Concat method
const colors1 = primaryColors.concat(secondaryColors);

// 2. Spread operator (Cleaner, preferred)
const colors2 = [...primaryColors, ...secondaryColors];
console.log(colors2); // ["Red", "Blue", "Green", "Yellow"]
```

---

## Part 6: Multidimensional Arrays (2D Grids)

A **Multidimensional Array** is an array containing other arrays inside it. This is used to build coordinate grids, spreadsheets, or game boards (like Chess or Tic-Tac-Toe).

```javascript
// 3x3 Coordinate Grid Matrix
const grid = [
  [1, 2, 3], // Row 0
  [4, 5, 6], // Row 1
  [7, 8, 9]  // Row 2
];
```

### Accessing Grid Elements:
*   **Syntax:** `matrix[row_index][column_index]`
```javascript
console.log(grid[0][0]); // 1 (Row 0, Col 0)
console.log(grid[1][2]); // 6 (Row 1, Col 2)
```

---

## Part 7: Matrix Traversal & Transposing Dimensions

### 1. Traversing a Grid (Nested Loops)
To read all numbers inside a 2D array, run a loop for the rows and a nested loop for columns:
```javascript
const testGridForTraversal = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let r = 0; r < testGridForTraversal.length; r++) {
  for (let c = 0; c < testGridForTraversal[r].length; c++) {
    console.log(`Val at [${r}][${c}] = ${testGridForTraversal[r][c]}`);
  }
}
```

### 2. Transposing a Matrix (Swap Rows and Columns)
Transposing flips a grid over its diagonal, turning rows into columns and vice-versa:
```text
Original:                  Transposed:
  [1, 2, 3]                  [1, 4, 7]
  [4, 5, 6]       ──►        [2, 5, 8]
  [7, 8, 9]                  [3, 6, 9]
```
```javascript
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  // Initialize empty grid template
  const result = Array.from({ length: cols }, () => new Array(rows));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[c][r] = matrix[r][c]; // Swap coordinates!
    }
  }
  return result;
}

const gridToTranspose = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log("Transposed Matrix:", transposeMatrix(gridToTranspose));
```

---

## Part 8: Real-World Application Code

Here is how pagination row slicers copy page datasets cleanly in applications:
```javascript
const apiProductCatalog = ["iPhone", "Laptop", "Cup", "Book", "Pen"];
const maxPageSize = 3;

function getPage(pageNumber) {
  const startIndex = (pageNumber - 1) * maxPageSize;
  const endIndex = startIndex + maxPageSize;
  
  // Return sliced copy safely
  return apiProductCatalog.slice(startIndex, endIndex);
}

console.log("Page 1:", getPage(1)); // ["iPhone", "Laptop", "Cup"]
console.log("Page 2:", getPage(2)); // ["Book", "Pen"]
```

---

## 🚀 Modern ES2023 Upgrades: Change Array by Copy

In modern application state management (like React state or Redux), it is a major bug to directly mutate an array using methods like `sort()`, `reverse()`, or `splice()`, because they edit the original array in place (mutating by reference). Previously, you had to clone the array first using `[...arr]` before performing operations.

ES2023 introduces **Change Array by Copy** methods to return new, modified copies of the array without altering the original source data:
1. `toReversed()` instead of `reverse()`
2. `toSorted()` instead of `sort()`
3. `toSpliced()` instead of `splice()`
4. `with(index, value)` to replace a specific item instead of `arr[index] = value`

### The Mutation Problem:
```javascript
const originalList = ["Banana", "Apple", "Orange"];

// ❌ Bad: reverse() mutates the original array in memory!
const reversedList = originalList.reverse();
console.log("Original changed unexpectedly:", originalList); // ["Orange", "Apple", "Banana"]
```

### The ES2023 Immutable Solution:
```javascript
const fruits = ["Banana", "Apple", "Orange"];

// 1. toReversed() - Returns a reversed copy
const cleanReversed = fruits.toReversed();
console.log("fruits remains untouched:", fruits);      // ["Banana", "Apple", "Orange"]
console.log("cleanReversed copy:", cleanReversed);      // ["Orange", "Apple", "Banana"]

// 2. toSorted() - Returns a sorted copy
const cleanSorted = fruits.toSorted();
console.log("cleanSorted copy:", cleanSorted);          // ["Apple", "Banana", "Orange"]

// 3. with() - Replaces an item at a specific index by copying
const updatedFruits = fruits.with(1, "Grape");
console.log("updatedFruits copy:", updatedFruits);      // ["Banana", "Grape", "Orange"]
```

*When to use:* Use these methods when building state updates (such as React lists, shopping cart filters, sorting dropdowns, or transaction logs) to avoid side effects and silent reference mutation bugs.

---

## Part 9: Essential Interview Questions & Practice Exercises

### Q1: Why is `unshift()` slower than `push()` in JavaScript?
**Answer:** `push()` inserts an element directly at the end index ($O(1)$ complexity). `unshift()` inserts at index `0`, forcing the engine to shift all existing array elements in memory to the next index ($O(N)$ complexity).

### Q2: What does `arr.length = 0` do?
**Answer:** It completely clears the array, truncating it instantly and releasing all referenced elements in memory.

### Practice Exercises:
1.  **Conveyor re-index test:** Create an array with 5 numbers. Write a function prepending a number using `unshift()`, and another appending using `push()`. Compare execution time profiles.
2.  **Tic-Tac-Toe Checker:** Write a function accepting a 3x3 Tic-Tac-Toe matrix grid and verifying if there is a horizontal row containing identical symbols (e.g. `["X", "X", "X"]`).
3.  **Unique Array merger:** Merge two arrays and filter out duplicate items.
