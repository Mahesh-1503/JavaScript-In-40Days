# **Array Master Course — Module 3: Cloning, Slicing, Destructuring & Nested Arrays**

## **1. Clone or Copy Arrays: slice()**

### **Definition**

- `slice()` creates a **shallow copy** of an array or part of it.
- Does **not modify the original array**.
- Syntax:

```javascript
array.slice(start, end);
```

- `start` is inclusive, `end` is exclusive.

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3, 4];
let copy = arr.slice();
console.log(copy); // [1,2,3,4]
```

2. **Intermediate**

```javascript
let arr = ["a", "b", "c", "d"];
let part = arr.slice(1, 3);
console.log(part); // ['b','c']
```

3. **Tricky**

```javascript
let arr = [10, 20, 30, 40];
let reversed = arr.slice().reverse();
console.log(reversed); // [40,30,20,10]
console.log(arr); // [10,20,30,40]
```

4. **Hard**

```javascript
let nested = [
  [1, 2],
  [3, 4],
];
let copyNested = nested.slice();
copyNested[0][0] = 99;
console.log(nested); // [[99,2],[3,4]] — shallow copy
```

5. **Ultra-Hard**

```javascript
let arr = Array.from({ length: 10 }, (_, i) => i);
let last3 = arr.slice(-3);
console.log(last3); // [7,8,9]
```

### **Common Mistakes**

- Forgetting `slice()` **does not clone nested arrays deeply**.
- `slice(0)` copies entire array; `slice()` with no arguments does the same.

### **Pro Tips**

- Use `[...arr]` for shallow cloning as an alternative.
- Use `slice()` for immutable operations on subarrays.

### **Tasks**

1. Clone an array and sort the clone without modifying the original.
2. Extract middle 5 elements from a 15-element array.
3. Reverse the last 4 elements using `slice`.
4. Create a shallow copy of a nested array and modify it.
5. Use `slice` to remove first and last elements of an array.

---

## **2. Array Destructuring**

### **Definition**

- Destructuring allows **extracting values from arrays** into separate variables.
- Syntax:

```javascript
let [a, b] = array;
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2];
let [x, y] = arr;
console.log(x, y); // 1 2
```

2. **Intermediate**

```javascript
let arr = [10, 20, 30];
let [first, , third] = arr;
console.log(first, third); // 10 30
```

3. **Tricky**

```javascript
let arr = [1];
let [x = 5, y = 10] = arr;
console.log(x, y); // 1 10 — default value
```

4. **Hard**

```javascript
let nested = [1, [2, 3]];
let [a, [b, c]] = nested;
console.log(a, b, c); // 1 2 3
```

5. **Ultra-Hard**

```javascript
let arr = [1, 2, 3, 4];
let [a, ...rest] = arr;
console.log(a, rest); // 1 [2,3,4] — using rest parameter
```

### **Common Mistakes**

- Destructuring `undefined` or `null` throws an error.
- Ignoring default values can result in `undefined`.

### **Pro Tips**

- Use destructuring for swapping variables:

```javascript
let a = 1,
  b = 2;
[a, b] = [b, a];
```

### **Tasks**

1. Destructure first 3 elements into variables and sum them.
2. Skip the 2nd element and destructure the rest.
3. Destructure nested arrays of a matrix and print the diagonal.
4. Use rest parameter to separate first element from an array.
5. Swap first and last elements of an array using destructuring.

---

## **3. Assign a Default Value in Destructuring**

- Assign default values to handle missing elements.

```javascript
let [a = 1, b = 2] = [10];
console.log(a, b); // 10 2
```

### **Tricky Example**

```javascript
let arr = [];
let [x = 5, y = 10] = arr;
console.log(x, y); // 5 10
```

### **Common Mistakes**

- Default only applies if value is `undefined`, not `null`.

---

## **4. Skipping a Value**

```javascript
let arr = [1, 2, 3];
let [x, , z] = arr;
console.log(x, z); // 1 3
```

---

## **5. Nested Array Destructuring**

- Extract elements from nested arrays.

```javascript
let nested = [1, [2, 3], [4, 5]];
let [a, [b, c], [d, e]] = nested;
console.log(a, b, c, d, e); // 1 2 3 4 5
```

---

## **6. Rest Parameter & Spread Operator**

- **Rest in destructuring**: gathers remaining elements.

```javascript
let [first, ...rest] = [1, 2, 3, 4];
console.log(rest); // [2,3,4]
```

- **Spread in arrays**: expands elements.

```javascript
let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4];
console.log(arr2); // [1,2,3,4]
```

---

## **7. Destructuring Use Case – Swap & Merge**

- **Swap**

```javascript
let a = 10,
  b = 20;
[a, b] = [b, a];
console.log(a, b); // 20 10
```

- **Merge arrays**

```javascript
let arr1 = [1, 2],
  arr2 = [3, 4];
let merged = [...arr1, ...arr2];
console.log(merged); // [1,2,3,4]
```

---

## **8. The Array Length**

- `array.length` gives **number of elements**.

```javascript
let arr = [1, 2, 3];
console.log(arr.length); // 3
arr[10] = 100;
console.log(arr.length); // 11 — sparse array
```

---

## **Tasks (Module 3)**

1. Destructure first 2 and last 2 elements into variables.
2. Clone a nested array, modify the clone, and show original remains intact.
3. Swap first and last elements using destructuring.
4. Merge three arrays into one using spread.
5. Extract a subarray using slice and destructuring with rest parameter.
