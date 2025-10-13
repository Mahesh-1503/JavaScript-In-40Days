# **Array Master Course — Module 4 (Part 2): Advanced Array Methods**

## **6. The reverse() Method**

- Reverses the **elements of an array in place** (mutates original array).

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3,2,1]
```

2. **Intermediate**

```javascript
let arr = ["a", "b", "c"];
console.log([...arr].reverse()); // ['c','b','a'] — original preserved
```

3. **Tricky**

```javascript
let arr = [1, [2, 3], 4];
arr.reverse();
console.log(arr); // [4,[2,3],1] — inner array stays intact
```

4. **Hard**

```javascript
let arr = Array.from({ length: 5 }, (_, i) => i);
arr.reverse();
console.log(arr); // [4,3,2,1,0]
```

5. **Ultra-Hard**

```javascript
let arr = Array.from({ length: 10 }, (_, i) => i);
console.log(arr.slice(0, 5).reverse().concat(arr.slice(5)));
// reverse first 5 elements only
```

### **Common Mistakes**

- `reverse()` **mutates original array**; clone first if needed.

### **Tasks**

1. Reverse an array without modifying the original.
2. Reverse only the first half of an array.
3. Reverse nested arrays and flatten them afterward.
4. Reverse numbers in a dynamic array from 1–10.
5. Use reverse to implement a simple stack pop simulation.

---

## **7. The sort() Method**

- Sorts **elements as strings by default**.
- Can use a **compare function** for numeric sorting.

```javascript
array.sort((a, b) => a - b);
```

### **Examples**

1. **Basic**

```javascript
let arr = [3, 1, 2];
arr.sort();
console.log(arr); // [1,2,3] — works for small integers
```

2. **Intermediate**

```javascript
let arr = [10, 2, 30];
arr.sort((a, b) => a - b);
console.log(arr); // [2,10,30]
```

3. **Tricky**

```javascript
let arr = ["apple", "Banana", "banana"];
arr.sort();
console.log(arr); // ['Banana','apple','banana'] — case sensitive
```

4. **Hard**

```javascript
let arr = [1, 2, 3, 4, 5];
arr.sort((a, b) => Math.sin(a) - Math.sin(b));
console.log(arr); // sorted based on sin values
```

5. **Ultra-Hard**

```javascript
let arr = ["apple", "Banana", "banana", "Apple"];
arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(arr); // case-insensitive sort
```

### **Common Mistakes**

- Sorting numbers **without compare function** results in string sort (`[1,10,2] → [1,10,2]`).
- Forgetting locale considerations for strings.

### **Tasks**

1. Sort numbers ascending and descending.
2. Sort strings ignoring case.
3. Sort an array of objects by a property.
4. Sort based on a custom function (e.g., modulo 5).
5. Sort nested arrays based on first element of inner arrays.

---

## **8. The splice() Method**

- Changes **array content** by **adding/removing elements**.

```javascript
array.splice(start, deleteCount, item1, item2, ...)
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
arr.splice(1, 1);
console.log(arr); // [1,3] — removed 1 element at index 1
```

2. **Intermediate**

```javascript
let arr = [1, 2, 3];
arr.splice(1, 0, 9, 8);
console.log(arr); // [1,9,8,2,3] — inserted at index 1
```

3. **Tricky**

```javascript
let arr = [1, 2, 3, 4];
let removed = arr.splice(1, 2, 10);
console.log(arr, removed); // [1,10,4] [2,3]
```

4. **Hard**

```javascript
let arr = Array.from({ length: 5 }, (_, i) => i + 1);
arr.splice(2, 2, 20, 30);
console.log(arr); // [1,2,20,30,5]
```

5. **Ultra-Hard**

```javascript
let arr = [1, 2, 3, 4, 5, 6];
arr.splice(-3, 2, 100, 200);
console.log(arr); // [1,2,3,100,200,6]
```

### **Common Mistakes**

- Negative start index counts from **end of array**.
- `splice` **modifies original array**.

### **Tasks**

1. Remove middle element from odd-length array.
2. Insert elements at the beginning without using unshift.
3. Replace last two elements of an array dynamically.
4. Use splice to split an array into two arrays.
5. Implement a custom “remove duplicates” using splice.

---

## **9. The at() Method**

- Access elements using **positive or negative index**.

```javascript
arr.at(-1); // last element
arr.at(0); // first element
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
console.log(arr.at(-1)); // 3
```

2. **Intermediate**

```javascript
let arr = ["a", "b", "c"];
console.log(arr.at(-2)); // 'b'
```

3. **Tricky**

```javascript
let arr = [];
console.log(arr.at(-1)); // undefined
```

4. **Hard**

```javascript
let arr = Array.from({ length: 5 }, (_, i) => i * 2);
console.log(arr.at(-3)); // 4
```

5. **Ultra-Hard**

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.at(-arr.length)); // 1
```

### **Common Mistakes**

- Negative indexing using `arr[-1]` does **not work**.
- `at()` is safe for empty arrays (returns undefined).

---

## **10. The copyWithin() Method**

- Copies **part of an array** to another position **in place**.

```javascript
arr.copyWithin(target, start, end);
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3, 4];
arr.copyWithin(1, 2);
console.log(arr); // [1,3,4,4]
```

2. **Intermediate**

```javascript
let arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3, 5);
console.log(arr); // [4,5,3,4,5]
```

3. **Tricky**

```javascript
let arr = [1, 2, 3, 4];
arr.copyWithin(-2, 0, 2);
console.log(arr); // [1,2,1,2]
```

4. **Hard**

```javascript
let arr = Array.from({ length: 5 }, (_, i) => i + 1);
arr.copyWithin(1, 3);
console.log(arr); // [1,4,5,4,5]
```

5. **Ultra-Hard**

```javascript
let arr = [1, 2, 3, 4, 5, 6];
arr.copyWithin(0, 3, 5);
console.log(arr); // [4,5,3,4,5,6]
```

### **Common Mistakes**

- `copyWithin` **mutates original array**.
- End index is **exclusive**, target can overlap source.

---

## **11. The flat() Method**

- Flattens **nested arrays** to a single level.

```javascript
arr.flat(depth);
```

- `depth` default = 1.

### **Examples**

1. **Basic**

```javascript
let arr = [1, [2, 3], [4]];
console.log(arr.flat()); // [1,2,3,4]
```

2. **Intermediate**

```javascript
let arr = [1, [2, [3, 4]]];
console.log(arr.flat(2)); // [1,2,3,4]
```

3. **Tricky**

```javascript
let arr = [1, [[[2]]]];
console.log(arr.flat(2)); // [1,[2]]
```

4. **Hard**

```javascript
let arr = Array.from({ length: 3 }, (_, i) => [i, [i + 1]]);
console.log(arr.flat(2)); // [0,1,1,2,2,3]
```

5. **Ultra-Hard**

```javascript
let arr = [1, [2, [3, [4]]], 5];
console.log(arr.flat(Infinity)); // [1,2,3,4,5]
```

### **Common Mistakes**

- Default depth = 1; deeply nested arrays may need `Infinity`.
- Flat **creates a new array**; original is unchanged.

### **Tasks**

1. Flatten a 2-level nested array.
2. Flatten an array of arrays of arrays.
3. Flatten using `Infinity` and sum elements.
4. Combine `map` and `flat` using `flatMap`.
5. Flatten only first level while preserving deeper nested arrays.
