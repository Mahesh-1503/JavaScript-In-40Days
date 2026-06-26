# **Array Master Course — Module 1: Introduction & Basics of Arrays**

## **1. What is an Array?**

An **array** is a **list-like object** used to store multiple values in a single variable. Values can be of any type (numbers, strings, objects, other arrays). Arrays are **ordered**, **zero-indexed**, and **mutable**.

### **Key Points**

- Arrays are objects in JavaScript.
- Can hold **mixed data types**.
- Elements are **indexed starting from 0**.

### **Examples**

1. **Basic**

```javascript
let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]); // 'Apple'
```

2. **Intermediate**

```javascript
let mixed = [42, "Hello", true, { name: "Alice" }];
console.log(mixed[3].name); // 'Alice'
```

3. **Tricky**

```javascript
let arr = [];
arr[100] = "End";
console.log(arr.length); // 101 — sparse array!
```

4. **Hard**

```javascript
let nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
console.log(nested[1][0]); // 3
```

5. **Ultra-Hard**

```javascript
let arr = Array(5)
  .fill(0)
  .map((_, i) => i ** 2);
console.log(arr); // [0,1,4,9,16]
```

### **Common Mistakes**

- Using non-integer indices creates **object properties**, not array elements.

```javascript
let arr = [];
arr["foo"] = "bar";
console.log(arr.length); // 0
```

- Forgetting arrays are **mutable**, so you can change elements directly.

### **Pro Tips**

- Use `Array.isArray()` to check if a variable is an array.
- Sparse arrays behave differently in loops like `forEach`.

### **Tasks (Intermediate → Hard)**

1. Create an array of first 20 prime numbers.
2. Create a nested array of a 3x3 matrix and access the diagonal elements.
3. Convert an array of strings to an array of string lengths.
4. Find the largest number in a sparse array.
5. Create an array that holds a mix of objects, strings, and arrays. Loop and print the type of each element.

---

## **2. How to Create Arrays?**

Arrays can be created in multiple ways:

### **Syntax**

1. **Array Literal (Recommended)**

```javascript
let arr = [1, 2, 3];
```

2. **Array Constructor**

```javascript
let arr = new Array(3); // creates empty array of length 3
```

3. **Array.of()**

```javascript
let arr = Array.of(3); // [3]
```

4. **Array.from()**

```javascript
let arr = Array.from("Hello"); // ['H','e','l','l','o']
```

### **Examples**

1. **Basic**

```javascript
let numbers = [1, 2, 3];
```

2. **Intermediate**

```javascript
let chars = Array.from("JavaScript");
console.log(chars); // ['J','a','v','a','S','c','r','i','p','t']
```

3. **Tricky**

```javascript
let arr = Array(5).fill(0);
arr[2] = 7;
console.log(arr); // [0,0,7,0,0]
```

4. **Hard**

```javascript
let squares = Array.from({ length: 5 }, (_, i) => i ** 2);
console.log(squares); // [0,1,4,9,16]
```

5. **Ultra-Hard**

```javascript
let nested = Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => i + j)
);
console.log(nested); // [[0,1,2],[1,2,3],[2,3,4]]
```

### **Common Mistakes**

- `new Array(5)` creates **empty slots**, not zeros. Avoid unless intended.
- Confusing `Array.of(5)` vs `Array(5)` — the former creates `[5]`, the latter `[ , , , , ]`.

### **Pro Tips**

- Prefer **array literals** for clarity.
- Use `Array.from()` with mapping function for dynamic arrays.

### **Tasks**

1. Create an array of 10 random numbers between 1–100.
2. Convert a string into an array of words.
3. Create a 4x4 multiplication table using nested `Array.from()`.
4. Generate an array `[1,4,9,16,...,100]` dynamically.
5. Convert an array-like object `{0:'a',1:'b',length:2}` to an array.
