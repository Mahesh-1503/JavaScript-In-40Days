```js
let num = [10, 20, 30, 40, 50];
for (let i in num) {
  console.log(num[i]);
}
```

✅ **does print the correct values** —

```
10
20
30
40
50
```

But let’s understand **why it works**, and **why using `for...in` for arrays is _not recommended_** (even though it _seems_ correct now).

---

## 🧩 Step-by-Step Explanation

### 🔹 What `for...in` really does

`for...in` loops over **enumerable property keys** of an object.

In arrays, the keys are **stringified indexes** like `"0"`, `"1"`, `"2"`, etc.

So internally, your loop is doing:

```js
for (let i in num) {
  console.log(num["0"]); // 10
  console.log(num["1"]); // 20
  ...
}
```

That’s why it _looks_ correct — because array indexes **are** object keys under the hood.

---

## ⚠️ So why is `for...in` discouraged for arrays?

Because it has **hidden side effects** and **non-guaranteed order** when arrays are not simple.

Let’s prove it 👇

---

### 🧠 Example 1 — Unexpected keys

```js
let num = [10, 20, 30];
num.extra = "hello"; // add custom property

for (let i in num) {
  console.log(i); // 0, 1, 2, extra  ❌
}
```

💥 Problem:

- `for...in` also loops over **non-index properties** like `"extra"`.
- That’s not what you usually want when looping arrays.

---

### 🧠 Example 2 — Non-numeric key order (can differ)

```js
let num = [];
num[100] = 10;
num[2] = 5;

for (let i in num) console.log(i);
```

Output may not be in numeric order (JS engines treat keys as strings).
So order consistency is **not guaranteed**.

---

### ✅ The Correct Loop for Arrays

You should use **`for...of`** (or `forEach`) instead:

```js
let num = [10, 20, 30, 40, 50];

for (let value of num) {
  console.log(value);
}
```

- `for...of` gives **values directly**
- Ignores custom properties
- Maintains order

✅ Output:

```
10
20
30
40
50
```

---

### ✅ Summary Table

| Loop Type  | Works On                    | Iterates Over         | Recommended For          |
| ---------- | --------------------------- | --------------------- | ------------------------ |
| `for...in` | Objects                     | Keys / Property names | Objects only             |
| `for...of` | Arrays, Strings, Sets, Maps | Values                | Arrays and iterable data |

---

### 💡 In short:

> **`for...in` = for objects** > **`for...of` = for arrays**

Even though `for...in` _seems_ to work on arrays, it’s only safe **for plain objects** — using it on arrays may bite you later when arrays get extended or sparse.
