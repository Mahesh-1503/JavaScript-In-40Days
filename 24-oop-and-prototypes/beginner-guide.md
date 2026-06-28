# Beginner's Guide: OOP & Prototypal Inheritance

Welcome to the beginner's guide to Object-Oriented Programming (OOP) and JavaScript Prototypes! This guide explains how to structure clean application models, use the 4 pillars of OOP, write modern ES6 classes, and trace prototypal inheritance chains.

---

## 📅 Learning Roadmap

*   **Part 1:** What is OOP? (The Figma Canvas Analogy)
*   **Part 2:** The 4 Core Pillars of OOP
*   **Part 3:** Writing ES6 Classes (Blueprints vs. Instances)
*   **Part 4:** Prototypal Inheritance (The Prototype Chain)
*   **Part 5:** Memory Optimization: Prototype vs. Instance Properties
*   **Part 6:** Real-World Application Code
*   **Part 7:** Essential Interview Questions & Practice Exercises

---

## Part 1: What is OOP?

**Object-Oriented Programming (OOP)** is a paradigm that organizes code into structured packages called **Objects**. Objects contain data (properties) and actions (methods) rather than single variables and isolated logic statements.

### The Figma Canvas Analogy:
Think of a vector design tool like **Figma**:
*   The Figma app handles hundreds of canvas shapes (Rectangles, Circles, Texts).
*   Instead of writing custom code for every shape, you design a **Blueprint (Class)**.
*   When you drag and drop a shape onto the canvas, you manufacture a concrete **Instance (Object)** in memory containing its own specific coordinates and dimensions.

---

## Part 2: The 4 Core Pillars of OOP

To write clean OOP code, you must leverage these four structural rules:

```text
1. ENCAPSULATION                      2. INHERITANCE
┌──────────────────────────────┐      ┌──────────────────────────────┐
│  class Element {             │      │       [ Parent Class ]       │
│    #x;  // Private field     │      │         BaseElement          │
│    move(x, y) { ... } // API │      │              │               │
└──────────────────────────────┘      │              ▼               │
                                      │    Rectangle    Circle       │
                                      └──────────────────────────────┘
3. POLYMORPHISM                       4. ABSTRACTION
┌──────────────────────────────┐      ┌──────────────────────────────┐
│  shape.draw()                │      │  [ Simple Public Interface ] │
│   ├── Rectangle ➔ Draws [ ]  │      │       element.render()       │
│   └── Circle    ➔ Draws ( )  │      │              │               │
└──────────────────────────────┘      │              ▼               │
                                      │   WebGL rendering formulas   │
                                      └──────────────────────────────┘
```

### 1. Encapsulation (Hidden State)
Grouping variables and code actions inside a class, and **hiding** internal details using private scopes (like `#x`, `#y`). Outside code cannot modify coordinates directly; they must call a `move()` method, which validates layout boundaries.

### 2. Inheritance (Reusable Templates)
Subclasses inheriting properties and methods from a parent class. For example, both `Rectangle` and `Circle` inherit base coordinates `x` and `y` from a parent `BaseElement` class, preventing copy-paste duplicate code.

### 3. Polymorphism (Many Shapes)
The ability of different classes to respond to the same method call in different ways. Triggering `.draw()` on a `Rectangle` draws straight lines, while triggering `.draw()` on a `Circle` draws arcs. Same command, different actions.

### 4. Abstraction (Simple Controls)
Hiding complex WebGL pixel-rendering math behind a simple interface method: `element.render()`. The user pressing the button doesn't need to know the complex coordinates math happening under the hood.

---

## Part 3: Writing ES6 Classes

ES6 introduced class syntax. Classes are templates used to manufacture object instances:

```javascript
class User {
  // 1. Private fields (start with #)
  #role; 

  // 2. The Constructor: Initializes properties when 'new' is called
  constructor(name, role) {
    this.name = name; // Public property
    this.#role = role; // Private property
  }

  // 3. Getter Method
  get role() {
    return this.#role;
  }

  // 4. Instance Method
  login() {
    return `${this.name} has logged in as an ${this.#role}.`;
  }
}

// Manufacturing instances
const adminUser = new User("Vijay", "Admin");
console.log(adminUser.name); // "Vijay"
console.log(adminUser.role); // "Admin" (via getter)
// console.log(adminUser.#role); // ❌ Throws SyntaxError: Private field!
console.log(adminUser.login()); // "Vijay has logged in..."
```

---

## Part 4: Prototypal Inheritance

JavaScript does not have "true" classes like Java. Under the hood, class blueprints compile into **Prototypal Inheritance**. 

Every object has a hidden pointer property called **`__proto__`** (prototype) pointing to its parent prototype object. When accessing a property, JavaScript searches a lookup link chain:

```text
[Instance: rect] ──────────────► Local coordinates: { x: 10, y: 20 }
       │
   (__proto__)
       ▼
[Rectangle.prototype] ─────────► Methods: { draw() }
       │
   (__proto__)
       ▼
[BaseElement.prototype] ───────► Methods: { select() }
       │
   (__proto__)
       ▼
[Object.prototype] ────────────► Core Object utilities
       │
   (__proto__)
       ▼
      null (End of Chain)
```

### Manual Prototype Settings:
```javascript
const person = {
  greet() { console.log(`Hello, my name is ${this.name}`); }
};

const student = { name: "Mahesh", course: "JS" };

// Manually link prototypes (equivalent to student.__proto__ = person)
Object.setPrototypeOf(student, person);

student.greet(); // "Hello, my name is Mahesh" (Greet method found on parent!)
```

---

## Part 5: Memory Optimization: Prototype vs. Instance

Why does JavaScript store methods on prototypes rather than instances?

*   If you store a method inside the constructor:
    ```javascript
    function User(name) {
      this.name = name;
      this.login = function() { ... }; // ❌ Bad: RAM Wastage!
    }
    ```
    Every time you run `new User()`, a brand new copy of the `login` function is created in heap memory. Creating 10,000 users results in 10,000 functions, wasting megabytes of RAM!
*   If you store the method on the Prototype:
    ```javascript
    class User {
      constructor(name) { this.name = name; }
      login() { ... } // 🟢 Great: Shared in memory!
    }
    ```
    There is only **one single copy** of `login` stored inside `User.prototype`. All 10,000 user instances simply point to that single method in the lookup chain, saving RAM.

---

## Part 6: Real-World Application Code

Here is a vector design system model:
```javascript
class CanvasElement {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  select() {
    console.log(`Element selected at coordinates [${this.x}, ${this.y}]`);
  }
}

class Rectangle extends CanvasElement {
  constructor(x, y, width, height) {
    super(x, y); // Calls parent constructor!
    this.width = width;
    this.height = height;
  }
  
  draw() {
    console.log(`Drawing Rectangle: size ${this.width}x${this.height}`);
  }
}

const rect = new Rectangle(10, 20, 100, 50);
rect.select(); // "Element selected at..." (Inherited method!)
rect.draw();   // "Drawing Rectangle..." (Local method!)
```

---

## Part 7: Essential Interview Questions & Practice Exercises

### Q1: What is the difference between `__proto__` and `prototype`?
**Answer:** `__proto__` is a hidden pointer property present on **every object instance** pointing to its parent prototype. `prototype` is a property present **only on constructor functions/classes** that defines the shared properties and methods that will be inherited by instances created using that constructor.

### Q2: What happens during Method Overriding in JavaScript?
**Answer:** If both a child instance (or child prototype) and a parent prototype declare methods with the exact same name, the JavaScript engine stops searching the chain the moment it finds the first match in the child. The child's version overrides the parent's version.

### Practice Exercises:
1.  **Figma Shape polymorphic array:** Create a `BaseShape` class. Inherit it into two subclasses: `Rectangle` and `Circle`. Implement different custom `draw()` methods. Create an array containing both instances and loop over them, calling `.draw()`.
2.  **RAM footprint checker:** Create 1,000 objects using constructor methods (creating functions inside the constructor) and measure execution performance vs prototype methods.
3.  **Prototype manual chain:** Set up three objects. Chain them manually using `Object.setPrototypeOf()` and trace a variable value lookup climb.
