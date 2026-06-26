# Day 21: OOP & Prototypes (Figma Design Elements)

Object-Oriented Programming (OOP) is a programming paradigm that structures software around **objects**—data structures containing fields (state) and procedures (methods/behaviors)—rather than pure functions and logic steps. 

In this guide, we use the architecture of a vector design tool like **Figma** to master OOP principles, the 4 core pillars of OOP, and how JavaScript's native **Prototypal Inheritance** engine compiles ES6 classes under the hood.

---

## 1. Mental Model (Figma Vector Elements)

Think of a vector design tool like **Figma**:
1. **The Class Blueprint:** You design a blueprint for a generic element on the canvas. Every element must have coordinates (`x`, `y`), dimensions (`width`, `height`), and a behavior to `select()` it.
2. **The Object Instances:** When you draw a Rectangle and a Circle on the screen:
   - You create **Objects** (instances of those blueprints) in your computer's memory.
   - The Rectangle object holds its own specific dimensions ($100 \times 50$) and location.
   - The Circle object holds its own radius ($20$).
3. **The 4 OOP Pillars:**
   - **Encapsulation:** You hide coordinates so they cannot be corrupted directly. Users must move shapes using the `move()` method, which validates boundary limits.
   - **Inheritance:** Instead of copy-pasting coordinates and `select()` code into both shapes, they inherit them from a parent `BaseElement` class.
   - **Polymorphism:** You call `shape.draw()`. If the shape is a Rectangle, it draws lines. If it is a Circle, it draws arcs. The same command results in different behaviors.
   - **Abstraction:** The canvas renders shapes by calling a simple `draw()` button. It doesn't need to know the complex coordinates math or pixel-rendering APIs happening inside the shape.

---

## 2. Visual Thinking (The OOP & Prototypal Hierarchy)

### The 4 Core Pillars of OOP
```
1. ENCAPSULATION                      2. INHERITANCE
┌──────────────────────────────┐      ┌──────────────────────────────┐
│  class Element {             │      │      [ Parent class ]        │
│    #x;  // Private field     │      │        BaseElement           │
│    #y;  // Private state     │      │             │                │
│    move(x, y) { ... } // API │      │             ▼                │
│  }                           │      │   [ Inheriting classes ]     │
└──────────────────────────────┘      │    Rectangle    Circle       │
                                      └──────────────────────────────┘
3. POLYMORPHISM                       4. ABSTRACTION
┌──────────────────────────────┐      ┌──────────────────────────────┐
│  shape.draw()                │      │  [ Simple Public Interface ] │
│   ├── Rectangle ➔ Draws [ ]  │      │       element.render()       │
│   └── Circle    ➔ Draws ( )  │      │              │               │
│                              │      │              ▼               │
│ (Same trigger, diff actions) │      │  [ Hidden Complex Logic ]    │
└──────────────────────────────┘      │  Calculations, WebGL pipelines│
                                      └──────────────────────────────┘
```

### Prototypal Chain Mapping in Memory
How ES6 Classes map to JavaScript's prototype links in V8 engine memory:
```
[Instance: rect] ──────────────► Local state: { width: 100, height: 50 }
       │
   (__proto__)
       ▼
[Rectangle.prototype] ─────────► Methods: { draw() }
       │
   (__proto__)
       ▼
[BaseElement.prototype] ───────► Methods: { select(), getArea() }
       │
   (__proto__)
       ▼
[Object.prototype] ────────────► Methods: { toString(), hasOwnProperty() }
       │
   (__proto__)
       ▼
     null (End of lookup chain)
```

---

## 3. Beginner Explanation

- **OOP (Object-Oriented Programming):** A way of writing code where you group related data (properties) and functions (methods) into packages called **Objects**.
- **Class:** A template or blueprint used to manufacture objects.
- **Object:** An actual, concrete instance built using a class blueprint.
- **Constructor:** A special setup function inside a class that runs automatically when you manufacture a new object instance using the `new` keyword.
- **Method:** A function that belongs to an object and operates on its local data.

---

## 3.5. Syntax & Basic Code Mechanics

Before structuring complex canvas elements, let's look at the absolute simplest, bare-minimum setup of a Class in JavaScript.

### The Code
```javascript
// 1. Defining the Class Blueprint
class User {
  // The Constructor setups initial properties
  constructor(name, role) {
    this.name = name; // Instance Property
    this.role = role; 
  }

  // Instance Method (Belongs to the prototype)
  login() {
    return `${this.name} has logged in as ${this.role}.`;
  }
}

// 2. Manufacturing Object Instances
const userAlice = new User("Alice", "Admin");
const userBob = new User("Bob", "Guest");

// 3. Invoking Methods
console.log(userAlice.login()); // "Alice has logged in as Admin."
console.log(userBob.login());   // "Bob has logged in as Guest."
```

### Line-by-Line Breakdown for Beginners

1. **`class User {`**
   - We declare a class named `User`. Component and class templates always start with a capital letter (PascalCase).
2. **`constructor(name, role) {`**
   - The `constructor` function is the initialization hook.
   - When we call `new User("Alice", "Admin")`, JavaScript runs this constructor, creating a new empty object, binding the `this` keyword to it, and executing this block.
3. **`this.name = name;`**
   - We assign the input argument `name` to a new property on the object instance. `this` refers to the specific instance being manufactured.
4. **`login() { ... }`**
   - This defines an instance method. 
   - V8 does **not** copy this function onto the `userAlice` and `userBob` instances. Instead, V8 attaches it to the shared `User.prototype` object in memory once, saving resources.
5. **`const userAlice = new User("Alice", "Admin");`**
   - The `new` keyword is crucial. It allocates memory, links the prototype pointers, binds `this`, and returns the manufactured instance.

---

## 4. Deep Explanation (The 4 Pillars of OOP in JavaScript)

To write professional OOP code, you must master the **4 Core Pillars**. Here is how each is implemented using modern JavaScript:

### Pillar 1: Encapsulation
Encapsulation means grouping data and behaviors together, while **restricting direct access** to the internal state. This prevents external scripts from corrupting variables.
- Modern JavaScript supports **Private Fields** using the `#` symbol prefix. Private fields cannot be accessed outside the class body.
- We expose public **getters and setters** to read or safely modify these values with validation.

```javascript
class BankAccount {
  #balance = 0; // Private field (strictly encapsulated)

  constructor(owner) {
    this.owner = owner;
  }

  // Getter: Read-only access to private field
  get balance() {
    return this.#balance;
  }

  // Public Method: The ONLY way to modify balance (validates deposits)
  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive!");
    this.#balance += amount;
  }
}
const myAccount = new BankAccount("Arun");
myAccount.deposit(100);
// myAccount.#balance = 1000000; // SyntaxError: Private field '#balance' must be declared in an enclosing class
console.log(myAccount.balance); // 100
```

### Pillar 2: Inheritance
Inheritance allows a child class to inherit properties and methods from a parent class, promoting code reuse.
- In JavaScript, we use the `extends` keyword to establish inheritance.
- In the child's constructor, we **must** call `super()` before accessing `this`. `super()` runs the parent class constructor, setting up inherited properties.

```javascript
class Element {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  select() {
    return `Selected node at [${this.x}, ${this.y}]`;
  }
}

// Inherits from Element
class TextNode extends Element {
  constructor(x, y, content) {
    super(x, y); // Calls parent constructor (Element)
    this.content = content;
  }
}
const text = new TextNode(10, 20, "Hello");
console.log(text.select()); // "Selected node at [10, 20]" (Inherited method)
```

### Pillar 3: Polymorphism
Polymorphism (meaning "many forms") is the ability of different classes to respond to the same method call with different behaviors.
- We achieve this by **Method Overriding**: a child class defines a method with the exact same name as a method in its parent class, overriding it with customized logic.

```javascript
class Shape {
  draw() {
    return "Drawing generic shape";
  }
}

class Rectangle extends Shape {
  draw() {
    return "Drawing a 4-sided Rectangle █"; // Overrides parent draw()
  }
}

class Circle extends Shape {
  draw() {
    return "Drawing a curved Circle ●"; // Overrides parent draw()
  }
}

// A collection of different shapes
const shapes = [new Shape(), new Rectangle(), new Circle()];
shapes.forEach(s => console.log(s.draw()));
// Output:
// "Drawing generic shape"
// "Drawing a 4-sided Rectangle █"
// "Drawing a curved Circle ●"
```

### Pillar 4: Abstraction
Abstraction involves hiding complex internal details and exposing a simple public API interface.
- Users don't need to know the raw mathematics of vector geometry to calculate areas; they just read the `.area` property.

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  // Abstraction: Exposes area without exposing PI calculations
  get area() {
    return Number((Math.PI * this.radius ** 2).toFixed(2));
  }
}
const c = new Circle(10);
console.log(c.area); // 314.16 (The complex math is abstracted away)
```

---

## 4.5. Under the Hood: Classes vs. Prototypes

JavaScript does **not** have real classes like Java or C++. 
- The `class` keyword is **syntactic sugar** over prototypes.
- When you define a class, JavaScript creates a standard constructor function and places class methods on its `.prototype` object in background memory.

### The Conversion Table
Here is how ES6 Class code compiles down to raw prototypal syntax:

| ES6 Class Syntax | Equivalent Prototypal Translation |
| :--- | :--- |
| `class Shape {}` | `function Shape() {}` |
| `class Box extends Shape {}` | `Object.setPrototypeOf(Box.prototype, Shape.prototype)` |
| `constructor(x) { this.x = x; }` | `function Shape(x) { this.x = x; }` |
| `draw() { return 'hi'; }` | `Shape.prototype.draw = function() { return 'hi'; }` |
| `super(x)` | `Shape.call(this, x)` |

---

## 5. Real Production Examples (Figma Canvas Element System)

### 1. The Core Canvas Element (Abstract Base Class)
This class defines coordinates, sizing, and selection behaviors. It enforces encapsulation using private coordinates fields.
```javascript
// BaseElement.js
export class BaseElement {
  #x;
  #y;

  constructor(x, y, width, height) {
    if (this.constructor === BaseElement) {
      throw new Error("BaseElement is abstract and cannot be instantiated directly.");
    }
    this.#x = x;
    this.#y = y;
    this.width = width;
    this.height = height;
  }

  // Getters to read encapsulated private coordinates safely
  get x() { return this.#x; }
  get y() { return this.#y; }

  // Setters to modify coordinates with validation
  set x(value) {
    if (typeof value !== 'number' || isNaN(value)) throw new TypeError("Coordinate must be a number!");
    this.#x = value;
  }

  set y(value) {
    if (typeof value !== 'number' || isNaN(value)) throw new TypeError("Coordinate must be a number!");
    this.#y = value;
  }

  // Public abstract-like method interface
  draw() {
    throw new Error("Abstract method 'draw()' must be implemented by subclasses.");
  }

  select() {
    return `Element highlighted at coordinates [${this.#x}, ${this.#y}]`;
  }
}
```

### 2. Figma Rectangle Shape Component (Inheritance & Polymorphism)
Extends `BaseElement`, inherits properties, implements its own `draw()`, and calculates areas.
```javascript
// Rectangle.js
import { BaseElement } from './BaseElement.js';

export class Rectangle extends BaseElement {
  constructor(x, y, width, height, cornerRadius = 0) {
    super(x, y, width, height); // Call parent BaseElement constructor
    this.cornerRadius = cornerRadius;
  }

  // Method Overriding: implements draw() specifically for rectangles
  draw() {
    return `Drawing Rectangle at [${this.x}, ${this.y}] with size ${this.width}x${this.height} (Radius: ${this.cornerRadius}px)`;
  }

  // Abstraction: Expose area calculation
  get area() {
    return this.width * this.height;
  }
}
```

### 3. Figma Circle Shape Component (Inheritance & Polymorphism)
```javascript
// Circle.js
import { BaseElement } from './BaseElement.js';

export class Circle extends BaseElement {
  constructor(x, y, radius) {
    // Width and height of a circle bounding box is diameter (radius * 2)
    super(x, y, radius * 2, radius * 2);
    this.radius = radius;
  }

  // Method Overriding: implements draw() specifically for circles
  draw() {
    return `Drawing Circle at [${this.x}, ${this.y}] with radius: ${this.radius}`;
  }

  // Abstraction: Expose area calculation
  get area() {
    return Number((Math.PI * this.radius ** 2).toFixed(2));
  }
}
```

---

## 6. Progressive Coding (Element System Evolution)

### Level 1: Beginner (Raw Object Literals - High Duplication)
```javascript
// BAD: State is fully exposed, logic duplicated for every shape.
const rect1 = {
  type: "rectangle",
  x: 10,
  y: 20,
  width: 100,
  height: 50,
  draw: function() {
    return `Drawing rect at ${this.x}, ${this.y}`;
  }
};
// Direct modification is unchecked (can break constraints):
rect1.x = "broken_coordinate";
```

### Level 2: Better (Prototype Object Linking)
```javascript
// BETTER: Method is stored in prototype memory, resolving duplication.
const elementPrototype = {
  select() {
    return `Selected element at ${this.x}, ${this.y}`;
  }
};

function createRectangle(x, y, w, h) {
  const rect = Object.create(elementPrototype); // Links __proto__
  rect.x = x;
  rect.y = y;
  rect.width = w;
  rect.height = h;
  return rect;
}
const r = createRectangle(10, 20, 100, 50);
```

### Level 3: Production (ES6 Classes with Basic Inheritance)
```javascript
// PRODUCTION: Standard class definitions, clean inheritance via super()
class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() { return "Generic Shape"; }
}

class Line extends Shape {
  constructor(x, y, length) {
    super(x, y);
    this.length = length;
  }
  draw() { return `Line starting at ${this.x}, ${this.y} with length: ${this.length}`; }
}
```

### Level 4: Enterprise (Encapsulated Component Figma Element Factory)
```javascript
// ENTERPRISE: Private state wrappers, validation checks, factory methods, 
// prototype pollution protection, and complete abstraction.
import { BaseElement } from './BaseElement.js';
import { Rectangle } from './Rectangle.js';
import { Circle } from './Circle.js';

export class FigmaElementFactory {
  // Prevent instantiation of helper utility
  constructor() {
    throw new Error("FigmaElementFactory cannot be instantiated.");
  }

  // Abstracted Factory Method interface
  static createElement(type, config) {
    // Validate config keys to prevent Prototype Pollution
    if (config.hasOwnProperty('__proto__') || config.hasOwnProperty('constructor')) {
      throw new Error("Malicious configuration keys detected!");
    }

    const { x, y, width, height, radius, cornerRadius } = config;

    switch (type.toLowerCase()) {
      case 'rectangle':
        return new Rectangle(x, y, width, height, cornerRadius);
      case 'circle':
        return new Circle(x, y, radius);
      default:
        throw new Error(`Unsupported element type: ${type}`);
    }
  }
}
```

---

## 7. Common Mistakes

1. **Forgetting to Call `super()` in Subclasses:**
   ```javascript
   class SubShape extends BaseElement {
     constructor(x, y) {
       // BUG: ReferenceError: Must call super constructor before accessing 'this'
       this.x = x; 
     }
   }
   ```
2. **Accessing Private Fields `#` Dynamically:**
   Private fields cannot be resolved using bracket notation. Doing so throws syntax errors or returns `undefined`.
   ```javascript
   // BUG: Throws SyntaxError!
   console.log(myAccount.#balance); 
   ```
3. **Re-binding Constructor Properties inside Methods:**
   Modifying prototype methods directly on instances (e.g. `rect.draw = ...`) defeats prototype delegation and leaks memory.

---

## 8. Best Practices

1. **Keep Constructors Lean:** Constructors should only initialize local variables; heavy operations or API fetches should go inside specific start/connect methods.
2. **Default to Private State (`#`):** Encapsulate variables by default. Only expose variables via public methods or getters if they explicitly need to be modified.
3. **Keep Inheritance Trees Flat:** Limit nesting trees to 2 or 3 layers. Deep inheritance makes tracing bugs difficult (favor Composition over Inheritance).

---

## 9. Interview Preparation

### Q1: What are the 4 pillars of Object-Oriented Programming (OOP)?
**Answer:** The four core pillars are:
1. **Encapsulation:** Packaging properties and methods together while restricting direct external access using private variables.
2. **Inheritance:** Enabling a child class to receive code, properties, and methods from a parent class to prevent code duplication.
3. **Polymorphism:** Defining a common interface (method signature) that behaves differently across different object types (method overriding).
4. **Abstraction:** Exposing a clean, simple API interface to the caller while hiding complex implementation details.

### Q2: What is the difference between an Abstract Class and a standard Class?
**Answer:** An abstract class is a blueprint that cannot be instantiated directly (e.g., calling `new BaseElement()` throws an error). It exists solely to define common properties and enforce method signatures that its children *must* implement.

### Q3: How does JavaScript's `class` syntax differ from Java or C++ classes?
**Answer:** Java and C++ use true static class blueprints where memory layouts are determined at compile time. JavaScript classes are **syntactic sugar** over prototypal inheritance. Objects copy references, and methods are dynamically resolved at runtime by crawling a prototype linked-list chain.

---

## 10. Homework

1. **Figma Canvas Builder:** Create a `Canvas` class that holds an array of elements. Add a method `renderAll()` that loops and calls the overridden `draw()` method on each shape.
2. **Encapsulated User Settings:** Write a `UserPreferences` class that stores a private `#theme` string. Implement validation setters that throw errors if a user sets a theme other than `"light"` or `"dark"`.
3. **Multi-Level Polymorphic Elements:** Build a prototypal hierarchy (`BaseElement` ➔ `Polygon` ➔ `Triangle`). Override the `.area` getter on each level and print calculations.
4. **Prototype Pollution Filter:** Create a utility function that safely clones configurations without copying prototype link overrides.
5. **Class Compiler Audit:** Take a standard ES6 Class containing private properties and compile it using Babel or TypeScript compiler, then output and analyze the transpiled vanilla JavaScript prototype linkages.
