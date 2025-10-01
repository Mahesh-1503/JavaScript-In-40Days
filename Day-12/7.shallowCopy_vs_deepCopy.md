# Shallow Copy vs Deep Copy (JavaScript)

## Shallow Copy

A **shallow copy** creates a new object, but copies only the references to nested objects. This means changes to nested objects affect both the original and the copy.

**Example:**

```js
const obj3 = { a: 1, b: { c: 2 } };
const obj4 = Object.assign({}, obj3); // shallow copy

obj4.a = 100; // Changes only obj4.a
obj4.b.c = 3; // Changes both obj4.b.c and obj3.b.c!

console.log(obj3.a); // 1
console.log(obj4.a); // 100

console.log(obj3.b.c); // 3  <-- affected!
console.log(obj4.b.c); // 3
```

- **Primitive values** are copied.
- **Nested objects/arrays** are shared (reference).

## Deep Copy

A **deep copy** creates a new object and recursively copies all nested objects and arrays. Changes in the copy do **not** affect the original.

**Example:**

```js
const obj3 = { a: 1, b: { c: 2 } };
const obj5 = structuredClone(obj3); // deep copy

obj5.a = 300; // Only obj5.a changes
obj5.b.c = 30; // Only obj5.b.c changes

console.log(obj3.a); // 1
console.log(obj5.a); // 300

console.log(obj3.b.c); // 2  <-- unaffected!
console.log(obj5.b.c); // 30
```

- **Primitive values** and **nested objects/arrays** are fully cloned.
- Changes in deep-copied structures are isolated.

---

**Summary Table:**

|             | Shallow Copy         | Deep Copy           |
| ----------- | -------------------- | ------------------- |
| Top-level   | Cloned               | Cloned              |
| Nested refs | Shared (same object) | Fully cloned        |
| Example API | `Object.assign()`    | `structuredClone()` |
