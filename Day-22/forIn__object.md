## 🧠 **1️⃣ What is `for...in` (Definition)**

> `for...in` loop iterates over the **enumerable property keys** (names) of an object.
>
> It’s **designed for objects**, not arrays.

Syntax:

```js
for (let key in object) {
  // access key and value
  console.log(key, object[key]);
}
```

---

## 🧩 **2️⃣ Example 1 — Basic Object Iteration**

```js
const person = {
  name: "Mahesh",
  age: 21,
  city: "Hyderabad",
};

console.log("Iterating over object using for...in:");
for (let key in person) {
  console.log(`${key} : ${person[key]}`);
}
```

🧾 **Output:**

```
name : Mahesh
age : 21
city : Hyderabad
```

### 🔍 What happens internally:

| Iteration | key (property name) | person[key] (value) |
| --------- | ------------------- | ------------------- |
| 1         | "name"              | "Mahesh"            |
| 2         | "age"               | 21                  |
| 3         | "city"              | "Hyderabad"         |

---

## 🧩 **3️⃣ Example 2 — Nested Object**

If the object has nested properties, you can combine `for...in` with **type checking**:

```js
const student = {
  name: "Ravi",
  marks: { math: 95, science: 89, english: 92 },
};

console.log("Iterating nested object:");
for (let key in student) {
  if (typeof student[key] === "object") {
    console.log(`${key} (nested):`);
    for (let subKey in student[key]) {
      console.log(`   ${subKey} : ${student[key][subKey]}`);
    }
  } else {
    console.log(`${key} : ${student[key]}`);
  }
}
```

🧾 **Output:**

```
name : Ravi
marks (nested):
   math : 95
   science : 89
   english : 92
```

---

## 🧩 **4️⃣ Example 3 — Inherited Properties**

By default, `for...in` also iterates **inherited** (prototype) properties.
So you can use `hasOwnProperty()` to filter them out.

```js
const animal = { species: "dog" };
const pet = Object.create(animal); // pet inherits from animal
pet.name = "Bruno";

for (let key in pet) {
  if (pet.hasOwnProperty(key)) {
    console.log(`Own property: ${key} → ${pet[key]}`);
  } else {
    console.log(`Inherited property: ${key} → ${pet[key]}`);
  }
}
```

🧾 **Output:**

```
Own property: name → Bruno
Inherited property: species → dog
```

---

## 🧩 **5️⃣ Example 4 — Modifying Object Dynamically**

You can also loop through object properties and perform actions like transformations:

```js
const prices = { apple: 100, banana: 60, mango: 80 };
let discountedPrices = {};

for (let fruit in prices) {
  discountedPrices[fruit] = prices[fruit] - 10;
}

console.log(discountedPrices);
```

🧾 **Output:**

```
{ apple: 90, banana: 50, mango: 70 }
```

---

## 🧭 **6️⃣ Quick Summary Table**

| Feature                       | Description                                 |
| ----------------------------- | ------------------------------------------- |
| **Iterates over**             | Object property names (keys)                |
| **Returns**                   | String keys                                 |
| **Access values**             | Using `object[key]`                         |
| **Includes inherited props?** | Yes (use `hasOwnProperty()` to filter)      |
| **Order guaranteed?**         | No (depends on property type and insertion) |
| **Best for**                  | Objects, not arrays                         |

---

### ✅ **Key Rule**

> 🔹 Use `for...in` → for **objects**
> 🔹 Use `for...of` → for **arrays / iterables**
