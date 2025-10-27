# 🧠 JavaScript `forEach()` — The Complete Guide

---

## 🔹 **1️⃣ Definition**

> The `forEach()` method executes a **callback function** once for **each element** in an array, **in order**.

It’s used when you want to **perform an action on every item** —
not to create a new array (unlike `.map()`).

---

### 🧩 **Syntax**

```js
array.forEach(function (value, index, array) {
  // your logic here
});
```

| Parameter | Description                        |
| --------- | ---------------------------------- |
| **value** | The current element in the array   |
| **index** | The index of the current element   |
| **array** | The original array being processed |

---

### ✅ Example 1 — Basic Usage

```js
let numbers = [10, 20, 30, 40];

numbers.forEach(function (value) {
  console.log(value);
});
```

🧾 **Output:**

```
10
20
30
40
```

✔ Each element (`value`) is passed to the callback function one by one.

---

## 🔹 **2️⃣ Accessing Index and Array**

You can also access the **index** and the **entire array** inside `forEach`.

```js
let colors = ["red", "green", "blue"];

colors.forEach(function (value, index, arr) {
  console.log(`${index}: ${value} → [${arr}]`);
});
```

🧾 **Output:**

```
0: red → [red,green,blue]
1: green → [red,green,blue]
2: blue → [red,green,blue]
```

---

## 🔹 **3️⃣ Using Arrow Function (Simpler Syntax)**

Arrow functions make it concise:

```js
let fruits = ["Apple", "Banana", "Mango"];
fruits.forEach((fruit, index) => console.log(`${index + 1}. ${fruit}`));
```

🧾 **Output:**

```
1. Apple
2. Banana
3. Mango
```

---

## 🔹 **4️⃣ forEach() Does NOT Return Anything**

Unlike `.map()` or `.filter()`,
`forEach()` always returns **undefined**.

Example:

```js
let arr = [1, 2, 3];
let result = arr.forEach((n) => n * 2);
console.log(result);
```

🧾 **Output:**

```
undefined
```

If you need to create a **new transformed array**, use `.map()` instead.

---

## 🔹 **5️⃣ You Cannot Use `break`, `continue`, or `return` to Exit Early**

`forEach()` always runs for all elements.
You **cannot stop** it midway like a normal loop.

Example:

```js
let nums = [1, 2, 3, 4, 5];

nums.forEach((n) => {
  if (n === 3) return; // only skips this iteration, does not stop the loop
  console.log(n);
});
```

🧾 **Output:**

```
1
2
4
5
```

✔ It only skips that single callback execution,
❌ but the loop **continues** — you can’t `break` out.

If you need early exit, use a normal `for` or `for...of` loop.

---

## 🔹 **6️⃣ `this` Inside forEach()**

`this` behaves differently inside `forEach()` depending on how you define the callback.

Example:

```js
let person = {
  name: "Mahesh",
  hobbies: ["Coding", "Music", "Travel"],
  showHobbies() {
    this.hobbies.forEach(function (hobby) {
      console.log(`${this.name} likes ${hobby}`); // ❌ undefined
    });
  },
};

person.showHobbies();
```

🧾 **Output:**

```
undefined likes Coding
undefined likes Music
undefined likes Travel
```

👉 Because inside the normal function, `this` refers to the **global object**, not `person`.

✅ Fix it with an arrow function (which keeps `this` lexical):

```js
let person = {
  name: "Mahesh",
  hobbies: ["Coding", "Music", "Travel"],
  showHobbies() {
    this.hobbies.forEach((hobby) => {
      console.log(`${this.name} likes ${hobby}`); // ✅ Works
    });
  },
};

person.showHobbies();
```

🧾 **Output:**

```
Mahesh likes Coding
Mahesh likes Music
Mahesh likes Travel
```

---

## 🔹 **7️⃣ Skipping Elements (with undefined or empty slots)**

`forEach()` **skips empty elements** in sparse arrays.

Example:

```js
let arr = [1, , 3]; // missing index 1
arr.forEach((v, i) => console.log(i, v));
```

🧾 **Output:**

```
0 1
2 3
```

Notice index `1` is skipped automatically.

---

## 🔹 **8️⃣ Combining forEach with Conditional Logic**

```js
let scores = [85, 92, 78, 99, 66];

scores.forEach((score) => {
  if (score >= 90) {
    console.log(`🏅 Excellent: ${score}`);
  } else if (score >= 75) {
    console.log(`✅ Good: ${score}`);
  } else {
    console.log(`⚠️ Needs improvement: ${score}`);
  }
});
```

🧾 **Output:**

```
✅ Good: 85
🏅 Excellent: 92
✅ Good: 78
🏅 Excellent: 99
⚠️ Needs improvement: 66
```

---

## 🔹 **9️⃣ Using forEach() on Arrays of Objects**

```js
let students = [
  { name: "Ravi", marks: 95 },
  { name: "Mahesh", marks: 88 },
  { name: "Sai", marks: 76 },
];

students.forEach((student, i) => {
  console.log(`${i + 1}. ${student.name} scored ${student.marks}`);
});
```

🧾 **Output:**

```
1. Ravi scored 95
2. Mahesh scored 88
3. Sai scored 76
```

---

## 🧩 **🔟 forEach() vs Other Loops (Quick Comparison)**

| Feature           | `for`           | `for...of`                  | `forEach()`                |
| ----------------- | --------------- | --------------------------- | -------------------------- |
| Syntax            | Classic loop    | Clean, modern               | Functional                 |
| Can break early   | ✅ Yes          | ✅ Yes                      | ❌ No                      |
| Callback function | ❌              | ❌                          | ✅ Required                |
| Works on          | Arrays          | Arrays, Strings, Sets, Maps | Arrays only                |
| Return value      | N/A             | N/A                         | Always `undefined`         |
| Purpose           | General looping | Iterating values            | Running logic on each item |

---

## 🧩 **11️⃣ Practical Real-Life Example**

Imagine applying a discount to all prices:

```js
let prices = [100, 200, 300];
let discount = 10;

console.log("Applying discount:");
prices.forEach((price, index, arr) => {
  arr[index] = price - discount;
});

console.log(prices);
```

🧾 **Output:**

```
Applying discount:
[90, 190, 290]
```

✔ Notice how we updated the original array directly via the `arr` reference.

---

## 🚀 **12️⃣ Summary — Key Takeaways**

| Concept            | Explanation                                       |
| ------------------ | ------------------------------------------------- |
| **Purpose**        | Execute a function on every array element         |
| **Return value**   | Always `undefined`                                |
| **Mutates array?** | Only if you change it inside callback             |
| **Stops early?**   | ❌ No                                             |
| **Best for**       | Performing side effects (logging, updating, etc.) |
| **Not good for**   | Building new arrays (use `.map()` instead)        |

---

### 🧩 **In Simple Words**

> 🔹 Use `forEach()` when you want to **do something** with each element (like printing, updating, etc.)
> 🔹 Use `.map()` when you want to **create a new array** from each element
> 🔹 Use `for...of` when you need **flexibility** like breaking early
