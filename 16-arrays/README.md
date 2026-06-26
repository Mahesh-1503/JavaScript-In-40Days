# Day 15: Arrays & Methods (Notion Page Database)

Arrays are the standard data structure for holding ordered lists of values in memory. Writing efficient list operations requires understanding how memory is allocated for arrays, the performance differences between operations, and how to query and transform collections safely.

---

## 1. Mental Model (The Notion Page Database)

Think of a **Notion Page Database**:
1. **The Database Rows:** Every database is an ordered list (Array) of page block objects.
2. **Pushing/Popping Blocks:** When you add a block to the end of a page, it's a `push()`. When you remove the last block, it's a `pop()`.
3. **Inserting Blocks (Shift/Unshift):** Adding a block to the very top (`unshift()`) forces all other blocks to shift down one step. This is slow because the engine must re-index every row.
4. **Slicing and Filtering:** Creating a filtered view of the page blocks uses `filter()` and `slice()` to return a sub-array without altering the original database.

---

## 2. Visual Thinking (Array Memory Re-Indexing)

How adding/removing elements from different ends of an array affects execution complexity ($O(N)$ vs $O(1)$):

### Push/Pop (End of Array): $O(1)$ Time Complexity (Fast)
```
Index:    [0]     [1]     [2]
Value:  [Block1][Block2][Block3] ◄── [Push: Block4] (Appends directly at next index)
```

### Shift/Unshift (Start of Array): $O(N)$ Time Complexity (Slow)
```
[Unshift: BlockNew] ──┐
                      ▼
Index:    [0] ◄─── [1] ◄─── [2] ◄─── [3]  (Every existing element must change index)
Value:  [New]   [Block1] [Block2] [Block3]
```

---

## 3. Beginner Explanation

An **array** is a list of items stored in order.
- **Index:** The position of an item in the list, starting at `0`.
- **`push()` / `pop()`:** Add or remove items at the *end* of the list. (Fast).
- **`unshift()` / `shift()`:** Add or remove items at the *start* of the list. (Slow).
- **`slice(start, end)`:** Copies a section of the list without modifying the original.
- **`splice(start, count, items...)`:** Directly edits the list by removing or adding items at any index. (Mutates original).

---

## 4. Deep Explanation (V8 Memory Buffers & Array Performance)

### 1. V8 Array Internal Representations
At the engine level, V8 handles arrays in two modes:
- **Fast Elements (Pack/Linear):** If array indexes are sequential (e.g. `[0, 1, 2]`), V8 stores them in contiguous memory slots. Accessing elements by index is extremely fast.
- **Dictionary Elements (Slow/Sparse):** If an array contains random indexes (e.g. `arr[0] = 'a'; arr[9999] = 'b';`), the engine converts the array into a hash-map table to save memory. This degrades lookup performance.

### 2. Time Complexity of Operations
- **Access by Index:** $O(1)$ — Calculated instantly by multiplying the index by memory offset.
- **Push / Pop:** $O(1)$ — Inserts at the end pointer index.
- **Shift / Unshift:** $O(N)$ — The engine must iterate and shift the memory references of every element in the array.
- **Splice:** $O(N)$ — Requires shifting references behind the splice index.

---

## 5. Real Production Examples (Notion Database flows)

### 1. Notion Block Creator (Push/Pop)
```javascript
const pageBlocks = ["# Title Block", "Paragraph 1"];

// Add new content block to end of page
pageBlocks.push("Bullet point 1");

// Undo block creation: remove last block
const undoneBlock = pageBlocks.pop();
```

### 2. Header Block Prepender (Unshift)
```javascript
// Prepend banner block to top of page (triggers memory re-index)
pageBlocks.unshift("![Banner Image](banner.png)");
```

### 3. Duplicate Page Sub-Section (Slice)
```javascript
const draftBlocks = ["Title", "Heading", "Draft 1", "Draft 2", "Footer"];

// Create a copy of drafts without mutating original list
const workingDrafts = draftBlocks.slice(2, 4); // ["Draft 1", "Draft 2"]
```

### 4. Custom Database Row Inserter (Splice)
Inserts a row at a specific index after user moves it in UI.
```javascript
const databaseRows = ["Row A", "Row B", "Row D"];

// Insert "Row C" at index 2 without deleting any rows
databaseRows.splice(2, 0, "Row C"); // Result: ["Row A", "Row B", "Row C", "Row D"]
```

### 5. Config Array Combiner (Concat)
```javascript
const corePlugins = ["text-editor", "image-uploader"];
const customPlugins = ["latex-support", "code-sandbox"];

// Combine arrays to return a new array
const activePlugins = corePlugins.concat(customPlugins);
```

---

## 6. Progressive Coding (Notion State Updater)

### Level 1: Beginner (Direct Mutation of list arrays)
```javascript
const activeBlocks = ["Title", "Paragraph"];

// BAD: Mutates shared array reference directly, causing UI hydration conflicts
function addBlock(text) {
  activeBlocks.push(text);
}
```

### Level 2: Better (Copying array before editing)
```javascript
// BETTER: Prevents shared mutations by copying arrays locally
function addBlock(blocks, text) {
  const copied = [...blocks]; // Shallow copy
  copied.push(text);
  return copied;
}
```

### Level 3: Production (Immutable ES6 Methods)
```javascript
// PRODUCTION: Utilizing modern non-mutating array methods
function addBlock(blocks, text) {
  return blocks.concat(text); // Returns a new array immediately
}
```

### Level 4: Enterprise (High-Performance Immutable Store)
```javascript
// ENTERPRISE: A transactional state manager that performs deep updates
// on paginated document block arrays, preventing reference leaks.
class DocumentDatabaseStore {
  #blocks;

  constructor(initialBlocks = []) {
    this.#blocks = Object.freeze([...initialBlocks]); // Prevent mutations
  }

  get blocks() {
    return this.#blocks;
  }

  insertBlockAt(index, blockContent) {
    const updated = [
      ...this.#blocks.slice(0, index),
      Object.freeze({ ...blockContent, id: `bk_${Date.now()}` }),
      ...this.#blocks.slice(index)
    ];
    return new DocumentDatabaseStore(updated); // Returns a new store snapshot
  }

  deleteBlockById(id) {
    const updated = this.#blocks.filter(block => block.id !== id);
    return new DocumentDatabaseStore(updated);
  }
}

const doc = new DocumentDatabaseStore([{ id: "bk_1", type: "header", text: "Notes" }]);
const updatedDoc = doc.insertBlockAt(1, { type: "text", text: "Hello Notion" });
```

---

## 7. Common Mistakes

1. **Confusing `.slice()` with `.splice()`:**
   - `.slice()` is pure and returns a copy of a section.
   - `.splice()` mutates the original array by deleting/adding items.
2. **Assigning Arrays to Copy Them:**
   ```javascript
   const arrA = [1, 2];
   const arrB = arrA; // BUG: Copies the heap address. Updating arrB mutates arrA!
   // Fix: const arrB = [...arrA];
   ```
3. **Checking array equality using standard operators:**
   `[1, 2] === [1, 2]` is `false` because they occupy different slots in Heap memory.

---

## 8. Best Practices

1. **Always use Spread `[...arr]` or `slice()` for copy tasks:** Prevents side effects.
2. **Avoid Shift/Unshift on large arrays:** Refactor designs to append items to the end using `push()` to avoid $O(N)$ re-indexing.
3. **Declare Array contents uniformly:** Do not mix types (e.g. `[1, "hello", true]`) to allow V8 to apply fast packing optimizations.

---

## 9. Interview Preparation

### Q1: Why is `unshift()` slower than `push()` in JavaScript?
**Answer:** 
- `push()` appends elements to the end of the array, which requires only adding a value at the next available memory slot ($O(1)$ time complexity).
- `unshift()` prepends elements to the start (index 0). This forces the engine to loop through the entire array and shift the memory index of every existing element down by one ($O(N)$ time complexity).

### Q2: How can you check if a variable is a true Array in JavaScript?
**Answer:** Use `Array.isArray(variable)`. The `typeof` operator returns `"object"` for arrays, making it unreliable.

### Q3: What is the difference between sparse and dense arrays in V8?
**Answer:** 
- **Dense Arrays** have contiguous index ranges. V8 stores them sequentially in memory (Fast Elements) for rapid access.
- **Sparse Arrays** have gaps in indexes. V8 converts them internally to key-value dictionary maps (Slow Elements) to save memory, which slows down property lookups.

---

## 10. Homework

1. **Page Re-indexing Auditor:** Write a script that measures the time taken to prepend (`unshift`) vs append (`push`) 100,000 items in an array. Log and explain the results.
2. **Undo Action Pipeline:** Implement a mock page editor using `push` and `pop` to build an undo/redo stack manager.
3. **Splice Table Inserter:** Write a function `insertRow(list, index, row)` that inserts a row using splice, and write a test preventing input mutations.
4. **Sparse Array Benchmark:** Create a dense array and a sparse array. Measure the lookup times of index calls on both, and document your findings.
5. **Array Immutability Validator:** Write an operations suite that updates nested database objects inside arrays, ensuring all changes produce new object references.
