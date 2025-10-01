Here is a clear, concise, and on-point explanation of the concepts demonstrated by your code:

---

### 1. `Object.entries()`

**Concept:** Converts an object into an array of `[key, value]` pairs.

```js
const myObj = { a: "tapas", b: 32 };
const myArr = Object.entries(myObj);
console.log(myArr);
// Output: [ [ 'a', 'tapas' ], [ 'b', 32 ] ]
```

- **Result:** Each property becomes a `[key, value]` array inside a parent array.

---

### 2. `Object.fromEntries()`

**Concept:** Converts an array (or any iterable) of `[key, value]` pairs into an object.

```js
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const objEntries = Object.fromEntries(entries);
console.log(objEntries);
// Output: { foo: 'bar', baz: 42 }
```

- **Result:** The pairs become properties of a new object.

---

### 3. `Object.freeze()`

**Concept:** Makes an object **immutable**—can't add, remove, or change properties.

```js
const emp = { sal: 100 };
Object.freeze(emp);

emp.sal = 200; // Fails silently (no change)
emp.name = "Alex"; // Can't add
delete emp.sal; // Can't delete

console.log(emp); // { sal: 100 }
console.log(Object.isFrozen(emp)); // true
```

- **Result:** The object remains unchanged after freeze.
- **`Object.isFrozen(emp)`** returns `true`.

---

### 4. `Object.seal()`

**Concept:** Prevents adding or deleting properties, but allows modifying existing ones.

```js
const dept = { name: "finance" };
Object.seal(dept);

dept.address = "Bangalore"; // Can't add
delete dept.name; // Can't delete
dept.name = "HR"; // Can modify

console.log(dept); // { name: "HR" }
```

- **Result:**
  - `address` is not added,
  - `name` property stays (not deleted),
  - its value can be changed to `"HR"`.

---

### 5. `Object.hasOwn()`

**Concept:** Checks if an object has a direct property (not inherited).

```js
console.log(Object.hasOwn(dept, "address")); // false
```

- **Result:** Returns `false` since `address` was never added.

---

## **Summary Table**

| Concept           | Add Prop | Delete Prop | Modify Prop | Example |
| ----------------- | :------: | :---------: | :---------: | ------- |
| Normal Object     |   Yes    |     Yes     |     Yes     | `myObj` |
| `Object.freeze()` |    No    |     No      |     No      | `emp`   |
| `Object.seal()`   |    No    |     No      |     Yes     | `dept`  |

---
