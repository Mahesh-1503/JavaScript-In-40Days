## 🧩 **Understanding `__proto__` in JavaScript**

### 💡 Concept:

- Every object in JavaScript has a hidden property called **`__proto__`** (also accessible using `Object.getPrototypeOf(obj)`).
- This property points to another object — its **prototype**.
- If JavaScript doesn’t find a property/method on the current object, it automatically looks for it **in its prototype chain**.

---

## 🔍 **Example 1: Setting Prototype Using `__proto__`**

```js
// Base object
const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// New object
const student = {
  name: "Mahesh",
  course: "JavaScript",
};

// Setting prototype manually
student.__proto__ = person;

// Accessing method from prototype
student.greet(); // ✅ Output: Hello, my name is Mahesh
```

### 🧠 **Explanation:**

- `student` doesn’t have `greet()` method.
- When we call `student.greet()`, JS looks:

  1. In `student` → ❌ Not found
  2. In `student.__proto__` (→ `person`) → ✅ Found → executes that method.

- `this.name` refers to `student.name` because the context (`this`) always points to the object _calling_ the method, not the object _where it was defined_.

---

### 🧭 **Prototype Chain Visualization**

```
student ---> person ---> Object.prototype ---> null
```

When you call:

```js
student.greet();
```

JS searches this chain until it finds the method.

---

## 🔍 **Example 2: Method Overriding in Prototype Chain**

```js
const person = {
  greet() {
    console.log("Hello from Person!");
  },
};

const teacher = {
  greet() {
    console.log("Hello from Teacher!");
  },
};

const student = {
  name: "Ravi",
  __proto__: teacher,
};

teacher.__proto__ = person;

student.greet(); // ✅ Output: Hello from Teacher!
```

### 💬 Why?

- JS first checks `student` → no `greet`
- Goes to its prototype `teacher` → found `greet`
- So it never goes up to `person`.

🧠 _If both parent and child have same method → child’s version is used (method overriding)._

---

## 🔍 **Example 3: Using `Object.setPrototypeOf()` (Modern Way)**

Instead of directly using `__proto__`, modern JS prefers:

```js
const person = {
  showRole() {
    console.log(`Role: ${this.role}`);
  },
};

const admin = {
  name: "Mahesh",
  role: "Administrator",
};

Object.setPrototypeOf(admin, person);

admin.showRole(); // ✅ Output: Role: Administrator
```

✅ **Safer, cleaner** and avoids deprecated `__proto__` usage.

---

## 🧩 **Example 4: Inheriting Chain with Multiple Levels**

```js
const human = { species: "Homo Sapiens" };

const person = {
  __proto__: human,
  greet() {
    console.log(`Hi! I’m ${this.name}`);
  },
};

const student = {
  __proto__: person,
  name: "Ravi",
  course: "JS",
};

console.log(student.species); // ✅ Homo Sapiens (from human)
student.greet(); // ✅ Hi! I’m Ravi
```

### 🔁 Prototype Chain Here:

```
student → person → human → Object.prototype → null
```

---

## 🧠 **Key Takeaways**

| Concept                   | Example                                | Description              |
| ------------------------- | -------------------------------------- | ------------------------ |
| `__proto__`               | `obj.__proto__ = baseObj`              | Manually links objects   |
| `Object.setPrototypeOf()` | `Object.setPrototypeOf(obj, protoObj)` | Modern, safer way        |
| Lookup order              | object → prototype → Object.prototype  | Chain followed by JS     |
| Method overriding         | child overrides parent method          | child’s method wins      |
| Context (`this`)          | Always the caller object               | Not where method defined |

---

## 🧠 **Mini Tasks to Practice**

### 🧭 Task 1:

Create an object `animal` with a method `eat()`.
Create another object `dog` with property `breed`.
Set `animal` as the prototype of `dog`.
Call `dog.eat()` and verify it works.

### 🧭 Task 2:

Add another object `puppy` that inherits from `dog` using `Object.setPrototypeOf`.
Add method `play()` to `puppy`.
Call:

```js
puppy.eat();
puppy.play();
console.log(puppy.breed);
```

and observe how inheritance flows through 3 levels.

### 🧭 Task 3:

Override `eat()` in `dog` and notice how JS uses the closest method first.
