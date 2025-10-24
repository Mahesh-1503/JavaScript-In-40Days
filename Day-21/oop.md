# 🧠 **JavaScript OOP Self-Learning Notes**

---

## 🧩 1. Understanding Objects and Prototypes

### 💡 Concept:

- Everything in JavaScript is an **object** — arrays, functions, even classes.
- An **object** represents a _real-world entity_ with:

  - **State (properties)** → data values
  - **Behavior (methods)** → actions it can perform

- Every object in JS has a hidden property called `__proto__` which refers to another object — its **prototype**.
- If a property/method isn’t found in the object, JS looks for it in its prototype chain.

---

### 🔍 Example 1: Simple Object and Prototype

```js
const student = {
  name: "Mahesh",
  marks: 95,
  printDetails: function () {
    console.log(`${this.name} scored ${this.marks}`);
  },
};

const topper = Object.create(student); // prototype is student
topper.name = "Ravi";
topper.marks = 99;

topper.printDetails(); // Ravi scored 99
```

🧠 **Flow:**

- `topper` inherits from `student`.
- Even if `printDetails` isn’t directly defined in `topper`, JS finds it in its prototype (`student`).

---

### 🧠 Self-Practice Tasks:

1. Create an object `car` with properties like `brand` and `speed`, and a method `drive()`.
2. Use `Object.create()` to make another car that inherits from it.
3. Try overriding a method and observe which one runs.
4. Print the prototype chain using `Object.getPrototypeOf()`.

---

## 🏗️ 2. Classes in JavaScript

### 💡 Concept:

- A **class** is a **blueprint** for creating objects.
- Defines **state (variables)** and **behavior (methods)** in one structure.
- Created using the `class` keyword.

---

### 🔍 Example 2: Creating a Class and Object

```js
class Car {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  drive() {
    console.log(`${this.brand} is driving at ${this.speed} km/h`);
  }
}

const car1 = new Car("Tesla", 120);
car1.drive();
```

📘 **Key Points:**

- `constructor()` is automatically called when an object is created using `new`.
- `this` refers to the _current object instance_.

---

### 🧠 Self-Practice Tasks:

1. Create a `Student` class with properties `name`, `rollNo`, `grade` and a method `displayInfo()`.
2. Create multiple students and print their details.
3. Add a new method `updateGrade(newGrade)` to modify the grade.

---

## 🧬 3. Inheritance (Extending Classes)

### 💡 Concept:

- **Inheritance** lets one class use the properties and methods of another.
- Achieved using the `extends` keyword.
- **Child class** can override methods from **Parent class**.

---

### 🔍 Example 3: Parent and Child Classes

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name); // calls parent constructor
    this.grade = grade;
  }

  greet() {
    console.log(`Hi, I’m ${this.name}, studying in grade ${this.grade}`);
  }
}

const s1 = new Student("Mahesh", "10th");
s1.greet();
```

🧠 **Key Takeaway:**

- `super()` is mandatory in subclass constructors (before using `this`).
- If child class defines the same method, it **overrides** the parent’s method.

---

### 🧠 Self-Practice Tasks:

1. Create a base class `Animal` with `eat()` and `sleep()` methods.
2. Create `Dog` and `Cat` classes extending `Animal`, each with their own `sound()` method.
3. Create objects and demonstrate method overriding.
4. Add a `super.eat()` call in child class to call parent’s method.

---

## 🚀 4. `super` Keyword Deep Dive

### 💡 Concept:

- `super` allows:

  1. Calling the **parent constructor**
  2. Calling **parent class methods**

---

### 🔍 Example 4: Using `super`

```js
class Device {
  constructor(brand) {
    this.brand = brand;
  }
  info() {
    console.log(`Brand: ${this.brand}`);
  }
}

class Phone extends Device {
  constructor(brand, model) {
    super(brand); // call parent constructor
    this.model = model;
  }

  info() {
    super.info(); // call parent method
    console.log(`Model: ${this.model}`);
  }
}

const phone1 = new Phone("Apple", "iPhone 15");
phone1.info();
```

🧠 **Key Takeaway:**

- `super()` → parent constructor
- `super.method()` → parent method
- Always call `super()` before using `this` in child constructors.

---

### 🧠 Self-Practice Tasks:

1. Create `User` (name, email) → parent class.
2. Create `Admin` (inherits from `User`) → adds `editData()` method.
3. Call both parent and child methods using `super`.
4. Log the behavior to visualize inheritance clearly.

---

## ⚠️ 5. Error Handling in OOP Code

### 💡 Concept:

- Use `try...catch` blocks to prevent your program from crashing due to runtime errors.
- Useful when working with class methods that deal with user input or external data.

---

### 🔍 Example 5: Handling Errors in Classes

```js
class Calculator {
  divide(a, b) {
    try {
      if (b === 0) throw new Error("Division by zero not allowed!");
      console.log(a / b);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

const calc = new Calculator();
calc.divide(10, 2); // 5
calc.divide(5, 0); // Error: Division by zero not allowed!
```

🧠 **Key Takeaway:**

- Errors are objects with a `message` property.
- Use `try...catch` to gracefully handle issues and continue execution.

---

### 🧠 Self-Practice Tasks:

1. Create a `BankAccount` class with `deposit()` and `withdraw()` methods.
2. Use error handling to prevent withdrawing more than balance.
3. Log custom error messages.
4. Extend `BankAccount` into `SavingsAccount` and reuse `super.withdraw()` safely.

---

## 🎯 Final Project: **College Portal Simulation**

### 🧩 Objective:

Build a small OOP-based simulation for a college portal.

### 🧱 Requirements:

1. **Class `User`**

   - `name`, `email`
   - `viewData()` → show generic data

2. **Class `Admin` (extends User)**

   - Adds `editData()`
   - Use `super.viewData()` to reuse parent method

3. **Error Handling**

   - Prevent editing data if not admin

---

### 💡 Example:

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  viewData() {
    console.log(`User: ${this.name} | Email: ${this.email}`);
  }
}

class Admin extends User {
  editData(newName) {
    try {
      if (!newName) throw new Error("Invalid name!");
      this.name = newName;
      console.log("Name updated successfully!");
    } catch (err) {
      console.error(err.message);
    }
  }
}

const u1 = new User("Ravi", "ravi@example.com");
const a1 = new Admin("Mahesh", "mahesh@college.edu");

u1.viewData();
a1.viewData();
a1.editData("Mahesh Kumar");
```

---

## 🧾 Summary Table

| Concept        | Keyword/Feature              | Key Use                           |
| -------------- | ---------------------------- | --------------------------------- |
| Object         | `{}` or `new Object()`       | Holds state & behavior            |
| Prototype      | `__proto__`                  | Enables inheritance chain         |
| Class          | `class`                      | Template for creating objects     |
| Constructor    | `constructor()`              | Initializes object properties     |
| Inheritance    | `extends`                    | Passes properties/methods down    |
| Super          | `super()` / `super.method()` | Calls parent constructor/method   |
| Error Handling | `try...catch`                | Manages runtime errors gracefully |
