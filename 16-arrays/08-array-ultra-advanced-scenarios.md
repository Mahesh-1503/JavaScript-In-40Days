# **Array Master Course — Module 7: Ultra-Advanced & Tricky Array Scenarios**

## **1. Nested Destructuring & Complex Patterns**

- Extract values from **deeply nested arrays** efficiently.

```javascript
let nested = [1, [2, 3, [4, 5]]];
let [a, [b, c, [d, e]]] = nested;
console.log(a, b, c, d, e); // 1 2 3 4 5
```

### **Tricky Examples**

1. Skip elements and assign defaults:

```javascript
let arr = [1, , 3];
let [x = 10, , z] = arr;
console.log(x, z); // 1 3
```

2. Swap and flatten nested destructuring:

```javascript
let arr = [
  [1, 2],
  [3, 4],
];
let [[a, b], [c, d]] = arr;
[a, b, c, d] = [d, c, b, a];
console.log(a, b, c, d); // 4 3 2 1
```

3. Nested with rest parameter:

```javascript
let arr = [1, [2, 3, 4], [5, 6]];
let [x, [y, ...rest1], [z, ...rest2]] = arr;
console.log(x, y, rest1, z, rest2); // 1 2 [3,4] 5 [6]
```

---

## **2. Chaining Advanced Methods**

- Combine multiple array methods **without mutating original array**.

```javascript
let arr = [1, 2, 3, 4, 5];
let result = arr
  .filter((x) => x % 2 === 1)
  .map((x) => x ** 2)
  .toSorted((a, b) => b - a)
  .toReversed();
console.log(result); // [1,9,25]
console.log(arr); // [1,2,3,4,5] — original intact
```

### **Tricky Patterns**

- Filter, map, reduce in one chain:

```javascript
let arr = [1, 2, 3, 4, 5, 6];
let sum = arr
  .filter((x) => x % 2 === 0)
  .map((x) => x * 3)
  .reduce((a, b) => a + b, 0);
console.log(sum); // 36 → (2*3 + 4*3 + 6*3)
```

---

## **3. Real-World Task: Student Score Analysis**

- Scenario: You have an array of student objects and want top scorers.

```javascript
let students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 },
  { name: "David", score: 95 },
];

let topStudents = students
  .filter((s) => s.score > 80)
  .map((s) => s.name)
  .toSorted();
console.log(topStudents); // ['Alice','Bob','David']
```

### **Tricky Variant**

- Extract top 2 students by score:

```javascript
let top2 = students
  .toSorted((a, b) => b.score - a.score)
  .slice(0, 2)
  .map((s) => s.name);
console.log(top2); // ['David','Bob']
```

---

## **4. Immutability & Performance Tips**

1. Use `toReversed`, `toSorted`, `toSpliced`, `with` for **non-mutating operations**.
2. Clone arrays before sorting or reversing if original needed.
3. Avoid unnecessary nested loops — prefer `map`, `reduce`, `flatMap`.
4. Use `Array.from({length:n},(_,i)=>…)` for dynamic arrays.
5. Prefer `includes` over `indexOf` for **NaN detection**.

---

## **5. Edge Cases & Gotchas**

| Scenario                       | Gotcha                                   | Solution                               |
| ------------------------------ | ---------------------------------------- | -------------------------------------- |
| Empty arrays in `reduce`       | Throws error if no initialValue          | Always provide initialValue            |
| `splice` with negative indices | Counts from end, careful with boundaries | Use `arr.length + negativeIndex`       |
| `fill` with object             | Shares reference across all positions    | Use `.map(()=>({}))` or `Array.from()` |
| Nested arrays in `concat`      | Shallow only, inner arrays remain        | Use `flat` after concat if needed      |
| `sort` numbers                 | Default sorts as strings                 | Provide compare function `(a,b)=>a-b`  |

---

## **6. Tasks (Ultra-Advanced)**

1. Given nested array `[[1,2],[3,4],[5,[6,7]]]`, flatten it completely.
2. Swap first and last elements in a deep nested array using destructuring.
3. Compute cumulative product of elements greater than 2 in an array.
4. Extract top 3 unique scorers from an array of student objects.
5. Chain `filter`, `map`, `flatMap`, `toSorted` to produce a sorted flat array from nested numbers arrays.
