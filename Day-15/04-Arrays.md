# **Array Master Course — Module 4: Advanced Array Methods**

## **1. The concat() Method**

- Combines **two or more arrays** and returns a **new array**.
- **Does not modify original arrays**.

```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2);
console.log(combined); // [1,2,3,4]
```

### **Examples**

1. **Basic**

```javascript
let a = [1],
  b = [2];
console.log(a.concat(b)); // [1,2]
```

2. **Intermediate**

```javascript
let arr = [1, 2].concat([3, 4], [5]);
console.log(arr); // [1,2,3,4,5]
```

3. **Tricky**

```javascript
let arr = [1, [2, 3]].concat([4, 5]);
console.log(arr); // [1,[2,3],4,5] — shallow concatenation
```

4. **Hard**

```javascript
let nested = [
  [1, 2],
  [3, 4],
];
let flatConcat = nested[0].concat(nested[1]);
console.log(flatConcat); // [1,2,3,4]
```

5. **Ultra-Hard**

```javascript
let arr = [1];
arr = arr.concat(...Array.from({ length: 3 }, (_, i) => [i + 2]));
console.log(arr); // [1,2,3,4]
```

### **Common Mistakes**

- `concat` does **shallow merge only**. Nested arrays remain intact.
- Forgetting to assign result back if modifying reference is needed.

### **Tasks**

1. Merge three arrays and remove duplicates.
2. Concatenate array of arrays into one flat array.
3. Combine numeric and string arrays.
4. Create a shallow copy of an array using `concat`.
5. Merge dynamic arrays generated using `Array.from()`.

---

## **2. The join() Method**

- Converts an array into a **string**, separated by a specified delimiter.

```javascript
let arr = ["a", "b", "c"];
console.log(arr.join("-")); // 'a-b-c'
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
console.log(arr.join()); // '1,2,3'
```

2. **Intermediate**

```javascript
let arr = ["JS", "HTML", "CSS"];
console.log(arr.join(" | ")); // 'JS | HTML | CSS'
```

3. **Tricky**

```javascript
let arr = [1, [2, 3], 4];
console.log(arr.join("-")); // '1-2,3-4' — inner array becomes string
```

4. **Hard**

```javascript
let arr = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(arr.join(" + ")); // '1 + 2 + 3 + 4 + 5'
```

5. **Ultra-Hard**

```javascript
let nested = [
  [1, 2],
  [3, 4],
];
console.log(nested.map((x) => x.join(",")).join(";")); // '1,2;3,4'
```

### **Common Mistakes**

- Inner arrays are **converted to strings** automatically.
- Forgetting delimiter defaults to `,` if not specified.

### **Tasks**

1. Convert an array of numbers to a string separated by `-`.
2. Convert nested array into a semi-colon separated string.
3. Join elements with empty string to make a word.
4. Join a range of numbers 1–10 using `join`.
5. Transform array of objects `[{name:'a'},{name:'b'}]` to string `'a,b'`.

---

## **3. The fill() Method**

- Fills **all or part of an array** with a static value.

```javascript
array.fill(value, start, end);
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
arr.fill(0);
console.log(arr); // [0,0,0]
```

2. **Intermediate**

```javascript
let arr = [1, 2, 3, 4, 5];
arr.fill(9, 2, 4);
console.log(arr); // [1,2,9,9,5]
```

3. **Tricky**

```javascript
let arr = Array(5).fill([]);
arr[0].push(1);
console.log(arr); // [[1],[1],[1],[1],[1]] — shared reference
```

4. **Hard**

```javascript
let arr = Array.from({ length: 5 }, () => 0);
arr.fill(5, 1, 4);
console.log(arr); // [0,5,5,5,0]
```

5. **Ultra-Hard**

```javascript
let arr = Array.from({ length: 4 }, (_, i) => i);
arr.fill(
  arr.map((x) => x * 2),
  1,
  3
);
console.log(arr); // [0,[0,2,4,6],[0,2,4,6],3]
```

### **Common Mistakes**

- Using `fill` with objects or arrays **shares reference**, not values.
- Start index is **inclusive**, end is **exclusive**.

### **Tasks**

1. Fill first 3 elements with `0` in an array of length 6.
2. Fill an empty array with squares of 1–5 using `map` and `fill`.
3. Avoid shared references when filling arrays with arrays.
4. Replace middle elements of an array dynamically.
5. Fill a portion of array generated with `Array.from()`.

---

## **4. The includes() Method**

- Checks if **an array contains a value**. Returns `true/false`.

```javascript
arr.includes(value, start);
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
console.log(arr.includes(2)); // true
```

2. **Intermediate**

```javascript
console.log(["a", "b", "c"].includes("d")); // false
```

3. **Tricky**

```javascript
let arr = [NaN];
console.log(arr.includes(NaN)); // true — unlike indexOf
```

4. **Hard**

```javascript
let arr = [1, 2, 3, 4];
console.log(arr.includes(2, 2)); // false — start index is 2
```

5. **Ultra-Hard**

```javascript
let nested = [
  [1, 2],
  [3, 4],
];
console.log(nested.includes([1, 2])); // false — reference check
```

### **Common Mistakes**

- `includes` uses **strict equality**, nested arrays must match reference.
- `indexOf(NaN)` fails; `includes(NaN)` works.

### **Tasks**

1. Check if an array contains a specific number.
2. Check if a string array contains a substring (convert first).
3. Verify `NaN` is in an array.
4. Search in a portion of array using start index.
5. Check if an array of objects contains a specific object reference.

---

## **5. The indexOf() & lastIndexOf() Methods**

- `indexOf(value)` → first occurrence
- `lastIndexOf(value)` → last occurrence

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3, 2];
console.log(arr.indexOf(2)); // 1
console.log(arr.lastIndexOf(2)); // 3
```

2. **Intermediate**

```javascript
console.log(["a", "b", "c"].indexOf("d")); // -1
```

3. **Tricky**

```javascript
let arr = [NaN];
console.log(arr.indexOf(NaN)); // -1 — can't find NaN with indexOf
```

4. **Hard**

```javascript
let arr = ["a", "b", "a", "b"];
console.log(arr.indexOf("a", 1)); // 2 — start from index 1
```

5. **Ultra-Hard**

```javascript
let arr = [1, 2, 3, 1, 2, 3];
console.log(arr.lastIndexOf(2, 3)); // 1 — search backwards from index 3
```

### **Common Mistakes**

- `indexOf` cannot detect `NaN`.
- `lastIndexOf` searches **backward from a given index**.

### **Tasks**

1. Find first and last index of a repeated element.
2. Search for an element starting from a custom index.
3. Detect `NaN` using `includes` instead of `indexOf`.
4. Find last index before a certain position.
5. Combine `indexOf` and `includes` to validate element presence.
