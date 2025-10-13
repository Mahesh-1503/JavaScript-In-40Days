# **Array Master Course — Module 6: Functional Array Methods & Chaining**

## **1. The filter() Method**

- Creates a **new array** with elements that satisfy a **condition**.

```javascript
let result = array.filter(callback);
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3, 4];
let even = arr.filter((n) => n % 2 === 0);
console.log(even); // [2,4]
```

2. **Intermediate**

```javascript
let names = ["Alice", "Bob", "Charlie"];
let longNames = names.filter((name) => name.length > 3);
console.log(longNames); // ['Alice','Charlie']
```

3. **Tricky**

```javascript
let arr = [0, 1, false, true, "", null];
let truthy = arr.filter(Boolean);
console.log(truthy); // [1,true] — filters falsy values
```

4. **Hard**

```javascript
let nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
let filtered = nested.filter((sub) => sub[0] % 2 === 0);
console.log(filtered); // [[3,4]]
```

5. **Ultra-Hard**

```javascript
let arr = [1, 2, 3, 4, 5, 6];
let result = arr.filter((n, i, a) => n > a[i - 1] || i === 0);
console.log(result); // [1,2,3,4,5,6] — custom comparator
```

### **Common Mistakes**

- `filter` **does not mutate** original array.
- Must **return boolean** in callback.

### **Tasks**

1. Filter numbers divisible by 3.
2. Filter strings containing letter 'a'.
3. Filter objects with a property value > 10.
4. Filter nested arrays with length > 1.
5. Filter elements greater than their previous element.

---

## **2. The map() Method**

- Creates a **new array** by applying a function to each element.

```javascript
let result = array.map(callback);
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
let squares = arr.map((x) => x ** 2);
console.log(squares); // [1,4,9]
```

2. **Intermediate**

```javascript
let names = ["alice", "bob"];
let upper = names.map((name) => name.toUpperCase());
console.log(upper); // ['ALICE','BOB']
```

3. **Tricky**

```javascript
let arr = [1, 2, 3];
let nested = arr.map((x) => [x]);
console.log(nested); // [[1],[2],[3]]
```

4. **Hard**

```javascript
let arr = [1, 2, 3];
let result = arr.map((x, i, a) => x + a[i - 1] || x);
console.log(result); // [1,3,5]
```

5. **Ultra-Hard**

```javascript
let arr = [1, 2, 3];
let result = arr.map((x, i, a) =>
  a.slice(0, i + 1).reduce((sum, n) => sum + n, 0)
);
console.log(result); // [1,3,6] — cumulative sum
```

### **Common Mistakes**

- `map` **does not mutate** original array.
- Always **return a value** in the callback.

### **Tasks**

1. Square all numbers in an array.
2. Convert array of strings to lengths.
3. Extract a property from array of objects.
4. Flatten using map + spread.
5. Compute cumulative sum using map.

---

## **3. The reduce() Method**

- Reduces array to a **single value** using a callback.

```javascript
let result = array.reduce((accumulator, current, index, array) => {},
initialValue);
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
let sum = arr.reduce((a, b) => a + b, 0);
console.log(sum); // 6
```

2. **Intermediate**

```javascript
let arr = ["a", "b", "c"];
let joined = arr.reduce((acc, v) => acc + v, "");
console.log(joined); // 'abc'
```

3. **Tricky**

```javascript
let arr = [1, 2, 3, 4];
let product = arr.reduce((a, b) => a * b); // no initialValue
console.log(product); // 24
```

4. **Hard**

```javascript
let arr = [1, 2, 3, 4];
let max = arr.reduce((a, b) => (a > b ? a : b));
console.log(max); // 4
```

5. **Ultra-Hard**

```javascript
let arr = [{ x: 1 }, { x: 2 }, { x: 3 }];
let sumX = arr.reduce((a, b) => a + b.x, 0);
console.log(sumX); // 6
```

### **Common Mistakes**

- Forgetting **initialValue** can cause errors on empty arrays.
- `reduce` does **not mutate** the array.

### **Tasks**

1. Sum all numbers.
2. Multiply all numbers.
3. Find max/min value.
4. Flatten array of arrays.
5. Count frequency of elements.

---

## **4. The reduceRight() Method**

- Similar to `reduce()` but **processes from right to left**.

```javascript
let result = array.reduceRight(callback, initialValue);
```

### **Example**

```javascript
let arr = ["a", "b", "c"];
let joined = arr.reduceRight((acc, v) => acc + v, "");
console.log(joined); // 'cba'
```

---

## **5. The some() Method**

- Checks if **at least one element satisfies** condition. Returns `true/false`.

```javascript
arr.some((x) => x > 2);
```

### **Example**

```javascript
let arr = [1, 2, 3];
console.log(arr.some((x) => x > 2)); // true
```

---

## **6. The every() Method**

- Checks if **all elements satisfy** condition.

```javascript
arr.every((x) => x > 0);
```

### **Example**

```javascript
let arr = [1, 2, 3];
console.log(arr.every((x) => x > 0)); // true
```

---

## **7. The find(), findIndex(), findLastIndex(), findLast() Methods**

- `find` → first matching element
- `findIndex` → first matching index
- `findLastIndex` → last matching index
- `findLast` → last matching element

### **Example**

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.find((x) => x > 3)); // 4
console.log(arr.findIndex((x) => x > 3)); // 3
console.log(arr.findLast((x) => x > 3)); // 5
console.log(arr.findLastIndex((x) => x > 3)); // 4
```

---

## **8. Chaining Array Methods**

- Combine methods like `filter`, `map`, `reduce` for **complex operations**.

```javascript
let arr = [1, 2, 3, 4, 5];
let result = arr
  .filter((x) => x % 2 === 1)
  .map((x) => x ** 2)
  .reduce((a, b) => a + b, 0);
console.log(result); // 35 → 1^2 + 3^2 + 5^2
```

---

## **9. The forEach() Method**

- Executes a callback for **each element**. **Does not return a new array**.

```javascript
let arr = [1, 2, 3];
arr.forEach((x) => console.log(x * 2));
```

---

## **10. entries() & values() Methods**

- `entries()` → iterator of `[index,value]`
- `values()` → iterator of values

```javascript
let arr = ["a", "b"];
for (let [i, v] of arr.entries()) {
  console.log(i, v);
} // 0 'a' 1 'b'
for (let v of arr.values()) {
  console.log(v);
} // 'a','b'
```

---

## **11. flatMap() Method**

- Maps each element then **flattens by 1 level**.

```javascript
let arr = [1, 2, 3];
let result = arr.flatMap((x) => [x, x * 2]);
console.log(result); // [1,2,2,4,3,6]
```

---

## **Tasks (Module 6)**

1. Filter numbers > 5, square them, sum the result.
2. Flatten array of arrays and multiply each by 2.
3. Find the last odd number in an array.
4. Check if all elements are positive using `every`.
5. Use `flatMap` to transform nested arrays into single-level arrays with doubled values.
