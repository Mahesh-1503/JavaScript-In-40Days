# **Array Master Course — Module 2: Accessing & Modifying Arrays**

## **1. How to Access Elements from an Array**

Arrays are **zero-indexed**, so elements are accessed using their index inside square brackets `[]`.

### **Syntax**

```javascript
array[index];
```

### **Examples**

1. **Basic**

```javascript
let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]); // 'Apple'
console.log(fruits[2]); // 'Mango'
```

2. **Intermediate**

```javascript
let nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
console.log(nested[2][1]); // 6
```

3. **Tricky**

```javascript
let arr = [10, 20, 30];
console.log(arr[-1]); // undefined
console.log(arr.at(-1)); // 30
```

4. **Hard**

```javascript
let arr = ["a", "b", "c", "d", "e"];
console.log(arr.slice(1, 4)); // ['b','c','d']
```

5. **Ultra-Hard**

```javascript
let arr = Array.from({ length: 10 }, (_, i) => i * 2);
console.log(arr.filter((_, i) => i % 2 === 0)); // [0,4,8,12,16]
```

### **Common Mistakes**

- Using negative indices like `arr[-1]` doesn’t work — use `arr.at(-1)`.
- Forgetting that `.slice()` **does not modify the original array**.

### **Pro Tips**

- Use `.at()` for negative indexing.
- Use destructuring for multiple elements at once.

### **Tasks**

1. Access the middle element of an odd-length array.
2. Print the first and last element using destructuring.
3. Access nested arrays and sum all inner elements.
4. Reverse access: print last 3 elements of an array.
5. Extract every 2nd element from a 10-element array.

---

## **2. Adding Elements to an Array: push() & unshift()**

### **push()** – Adds **elements at the end**

```javascript
array.push(element1, element2, ...)
```

### **unshift()** – Adds **elements at the beginning**

```javascript
array.unshift(element1, element2, ...)
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3];
arr.push(4);
arr.unshift(0);
console.log(arr); // [0,1,2,3,4]
```

2. **Intermediate**

```javascript
let fruits = ["Apple", "Mango"];
fruits.push("Banana", "Orange");
console.log(fruits); // ['Apple','Mango','Banana','Orange']
```

3. **Tricky**

```javascript
let arr = [];
arr.push(...[1, 2, 3]);
arr.unshift(...[4, 5]);
console.log(arr); // [4,5,1,2,3]
```

4. **Hard**

```javascript
let arr = [10, 20];
arr.push(arr.pop() + 5); // Modify last element before pushing
console.log(arr); // [10,25]
```

5. **Ultra-Hard**

```javascript
let arr = Array.from({ length: 5 }, (_, i) => i);
arr.unshift(...arr.map((x) => x + 10));
console.log(arr); // [10,11,12,13,14,0,1,2,3,4]
```

### **Common Mistakes**

- Using `push` or `unshift` with multiple arrays without `...` will **nest arrays**.

```javascript
arr.push([1, 2]); // [[1,2]]
arr.push(...[1, 2]); // [1,2]
```

### **Pro Tips**

- Use `push` for stack operations.
- Use `unshift` for queue front operations, but note **performance cost** for large arrays.

### **Tasks**

1. Add multiple elements to the end of an array using `push`.
2. Prepend elements to an array without nesting arrays.
3. Use `push` and `unshift` in the same array to create a symmetric array.
4. Add squares of 1–5 to the beginning of an array.
5. Create an array dynamically and use `push` to store only even numbers.

---

## **3. Removing Elements from an Array: pop() & shift()**

### **pop()** – Removes the **last element** and returns it.

```javascript
let last = array.pop();
```

### **shift()** – Removes the **first element** and returns it.

```javascript
let first = array.shift();
```

### **Examples**

1. **Basic**

```javascript
let arr = [1, 2, 3, 4];
arr.pop(); // removes 4
arr.shift(); // removes 1
console.log(arr); // [2,3]
```

2. **Intermediate**

```javascript
let fruits = ["Apple", "Banana", "Mango"];
let removed = fruits.pop();
console.log(removed); // 'Mango'
```

3. **Tricky**

```javascript
let arr = [10, 20, 30];
arr.shift();
arr.push(40);
console.log(arr); // [20,30,40]
```

4. **Hard**

```javascript
let arr = [1, 2, 3, 4, 5];
arr.pop(); // 5
arr.pop(); // 4
arr.shift(); // 1
console.log(arr); // [2,3]
```

5. **Ultra-Hard**

```javascript
let arr = Array.from({ length: 10 }, (_, i) => i + 1);
while (arr.length > 0) {
  console.log(arr.pop() + arr.shift());
}
```

### **Common Mistakes**

- Forgetting that `pop`/`shift` **modify the original array**.
- Using `delete arr[0]` leaves `undefined` but does **not change length**.

### **Pro Tips**

- `pop` is ideal for stack operations.
- `shift` has O(n) complexity — avoid on huge arrays if performance matters.

### **Tasks**

1. Remove the first and last elements from an array and log them.
2. Create a stack using `push` and `pop`.
3. Remove all odd numbers from the beginning of an array using `shift`.
4. Combine `pop` and `shift` to sum pairs from start and end.
5. Dynamically remove elements from an array until only one remains.
