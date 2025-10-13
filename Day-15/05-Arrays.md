# **Array Master Course — Module 5: Grouping Data, Immutability & Modern Array Methods**

## **1. Grouping Data in Arrays**

- **Grouping data** means transforming an array into a **structured object**, e.g., grouping by a key.
- Commonly done with `reduce()`.

### **Example: Group numbers by odd/even**

```javascript
let numbers = [1, 2, 3, 4, 5, 6];
let grouped = numbers.reduce((acc, n) => {
  let key = n % 2 === 0 ? "even" : "odd";
  acc[key] = acc[key] ?? [];
  acc[key].push(n);
  return acc;
}, {});
console.log(grouped); // {odd:[1,3,5], even:[2,4,6]}
```

### **Tricky Example**

```javascript
let people = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" },
];
let grouped = people.reduce((acc, p) => {
  (acc[p.role] = acc[p.role] || []).push(p.name);
  return acc;
}, {});
console.log(grouped); // {admin:['Alice','Charlie'], user:['Bob']}
```

### **Common Mistakes**

- Forgetting to initialize the array for each key.
- Using `filter` repeatedly is less efficient than `reduce`.

### **Tasks**

1. Group an array of strings by their first letter.
2. Group numbers into ranges 1–10, 11–20, etc.
3. Group an array of objects by a numeric property (age).
4. Count frequency of elements in an array.
5. Group nested arrays by length.

---

## **2. Immutability & New Array Methods**

- **Immutability**: methods that **do not modify the original array**.

### **2.1. toReversed()**

```javascript
let arr = [1, 2, 3];
let reversed = arr.toReversed();
console.log(reversed); // [3,2,1]
console.log(arr); // [1,2,3] — original untouched
```

### **2.2. toSorted()**

```javascript
let arr = [3, 1, 2];
let sorted = arr.toSorted((a, b) => a - b);
console.log(sorted); // [1,2,3]
console.log(arr); // [3,1,2]
```

### **2.3. toSpliced()**

- Removes/inserts elements **without mutating original**.

```javascript
let arr = [1, 2, 3, 4];
let newArr = arr.toSpliced(1, 2, 9, 8);
console.log(newArr); // [1,9,8,4]
console.log(arr); // [1,2,3,4]
```

### **2.4. with()**

- Replaces an element at a given index **immutably**.

```javascript
let arr = [1, 2, 3];
let newArr = arr.with(1, 9);
console.log(newArr); // [1,9,3]
console.log(arr); // [1,2,3]
```

### **Tasks**

1. Reverse an array immutably using `toReversed`.
2. Sort numbers immutably using `toSorted`.
3. Replace 2nd element without mutating original using `with`.
4. Remove middle element immutably using `toSpliced`.
5. Combine `toSpliced` and `toSorted` for advanced manipulation.

---

## **3. Array-Like Objects & Usages**

- **Array-like objects** have numeric keys and `length` but **are not arrays** (e.g., `arguments`, NodeLists).
- Can convert to array for full array methods.

### **Example**

```javascript
function demo() {
  console.log(arguments); // array-like
  let args = Array.from(arguments);
  console.log(args.map((x) => x * 2));
}
demo(1, 2, 3); // [2,4,6]
```

### **Common Mistakes**

- Treating array-like objects as arrays directly (methods like `map` won’t work).

---

## **4. Array.from() Static Method**

- Converts **array-like or iterable** objects into arrays.

```javascript
Array.from("hello"); // ['h','e','l','l','o']
Array.from({ length: 5 }, (_, i) => i); // [0,1,2,3,4]
```

### **4.1 Array.fromAsync()**

- Converts **async iterable** to array asynchronously.

```javascript
async function demo() {
  async function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  let arr = await Array.fromAsync(gen());
  console.log(arr); // [1,2,3]
}
demo();
```

### **4.2 Array.of()**

- Creates an array from **arguments** (avoids ambiguity with `new Array(5)`).

```javascript
Array.of(5); // [5]
Array.of(1, 2, 3); // [1,2,3]
```

### **Common Mistakes**

- Confusing `Array(5)` (empty slots) with `Array.of(5)` ([5]).
- Forgetting `Array.from()` can take a mapping function as second argument.

### **Tasks**

1. Convert string to array of characters.
2. Convert NodeList to array and apply `map`.
3. Create array of squares of 1–10 using `Array.from()`.
4. Use `Array.of()` to create single-element and multi-element arrays.
5. Convert async generator to array using `Array.fromAsync()`.
