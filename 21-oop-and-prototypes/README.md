# Day 21: OOP & Prototypes (Figma Design Elements)

JavaScript uses **Prototypal Inheritance** to share methods and properties between objects. Understanding how prototype linkages operate in memory, the difference between `.prototype` and `__proto__`, and how ES6 classes compile to prototype trees is essential for building scalable, memory-efficient architectures.

---

## 1. Mental Model (Figma Vector Elements)

Think of a vector design tool like **Figma**:
1. **Base Canvas Element:** Every element on the canvas has generic properties: `x` and `y` coordinates, `width`, `height`, and a `select()` method.
2. **Specific Vector Shapes:** You draw a `Rectangle` and a `Circle`.
   - The `Rectangle` needs a `cornerRadius` and a `draw()` method.
   - The `Circle` needs a `radius` and a `draw()` method.
3. **The Inheritance Chain:** Instead of duplicating coordinates and the `select()` method inside every single shape (which wastes memory), we link both shapes to a shared **Base Element** prototype. 
4. When you call `rectangle.select()`, JavaScript searches the rectangle. Since `select()` is not found locally, it follows the prototype chain link to the Base Element and runs it from there.

---

## 2. Visual Thinking (The Prototype Lookup Chain)

How properties are resolved by traversing prototype pointers:

```
[Rectangle Instance: rect1] ──► Local keys: { cornerRadius: 4 }
          │
      (__proto__)
          ▼
[Rect.prototype] ──────────────► Methods: { draw() }
          │
      (__proto__)
          ▼
[Element.prototype] ───────────► Properties: { x, y, width, height }
          │                      Methods: { select() }
          │
      (__proto__)
          ▼
[Object.prototype] ────────────► Methods: { toString(), hasOwnProperty() }
          │
      (__proto__)
          ▼
        null (End of Chain)
```

---

## 3. Beginner Explanation

- **Prototype:** A hidden "parent" object attached to every JavaScript object. It acts as a fallback storage for methods and properties.
- **Prototypal Inheritance:** If you ask an object for a property it doesn't have, it silently asks its prototype, then the prototype's prototype, all the way up the chain.
- **`__proto__`:** The pointer that links an object instance directly to its parent prototype. (Pronounced "dunder proto").
- **`.prototype` property:** A special folder attached *only* to constructor functions. It contains the methods that will become the `__proto__` of all instances created with that constructor.

---

## 4. Deep Explanation (The Prototype Engine & Classes)

### 1. Prototype Linkage Mechanics
When you create a new object instance using the `new` keyword:
1. A new object is created in the Heap.
2. The engine links the object's internal `[[Prototype]]` slot (accessible via `__proto__` or `Object.getPrototypeOf()`) to the constructor's `.prototype` object.
3. The constructor runs, binding `this` to the new object.
4. When accessing a property, the engine checks local slots. If missing, it traverses the `[[Prototype]]` reference chain.

### 2. Constructor Methods vs Prototype Methods
- Defining methods inside a constructor (`this.draw = function() {}`) copies that function into heap memory for **every single instance** created.
- Defining methods on the prototype (`Constructor.prototype.draw = function() {}`) stores the function exactly **once** in memory, saving massive amounts of RAM when managing thousands of elements.

### 3. ES6 Classes Translation
ES6 `class` syntax is **syntactic sugar** over prototypes. It does not introduce a new object-oriented inheritance model.
```javascript
// ES6 Class
class Shape {
  draw() {}
}
// Compiles to:
function Shape() {}
Shape.prototype.draw = function() {};
```

---

## 5. Real Production Examples (Figma Canvas Elements)

### 1. The Base Canvas Element (Constructor Prototype)
```javascript
// Base constructor defining coordinates
function CanvasElement(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

// Share select() method across all elements via prototype
CanvasElement.prototype.select = function() {
  return `Selected element at coordinates [${this.x}, ${this.y}]`;
};
```

### 2. Rectangle Shape Prototype Inheritance
```javascript
function Rectangle(x, y, width, height, cornerRadius) {
  // Call parent constructor to bind coordinates (Constructor borrowing)
  CanvasElement.call(this, x, y, width, height);
  this.cornerRadius = cornerRadius;
}

// Link Rectangle prototype chain to CanvasElement prototype
Rectangle.prototype = Object.create(CanvasElement.prototype);
Rectangle.prototype.constructor = Rectangle; // Restore constructor pointer

Rectangle.prototype.draw = function() {
  return `Drawing rectangle with corner radius: ${this.cornerRadius}`;
};

const rect = new Rectangle(10, 20, 100, 50, 4);
```

### 3. Vector Canvas Elements Hierarchy (ES6 Class Syntax)
```javascript
class BaseElement {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  select() {
    return `Selected canvas node at x: ${this.x}`;
  }
}

class CircleElement extends BaseElement {
  constructor(x, y, radius) {
    super(x, y); // Calls parent constructor
    this.radius = radius;
  }

  draw() {
    return `Drawing circle with radius: ${this.radius}`;
  }
}
const circle = new CircleElement(50, 50, 20);
```

### 4. Dynamic Type Checking using Prototypes
```javascript
function isCanvasNode(obj) {
  // Check if CanvasElement prototype exists anywhere in obj's prototype chain
  return CanvasElement.prototype.isPrototypeOf(obj);
}
```

### 5. Static Factories on Prototype Classes
```javascript
class TextNode extends BaseElement {
  constructor(x, y, content) {
    super(x, y);
    this.content = content;
  }

  // Static method attached to the class constructor itself, not instances
  static createDefault(x, y) {
    return new TextNode(x, y, "Placeholder Text");
  }
}
const defaultText = TextNode.createDefault(0, 0);
```

---

## 6. Progressive Coding (Shape Renderer)

### Level 1: Beginner (Duplicating Methods in Constructor)
```javascript
// BAD: Every new instance re-allocates draw() in memory, wasting RAM
function VectorPoint(x, y) {
  this.x = x;
  this.y = y;
  this.draw = function() {
    return `Point at ${this.x}, ${this.y}`;
  };
}
```

### Level 2: Better (Prototype Method Delegation)
```javascript
// BETTER: Method is stored once in prototype memory
function VectorPoint(x, y) {
  this.x = x;
  this.y = y;
}
VectorPoint.prototype.draw = function() {
  return `Point at ${this.x}, ${this.y}`;
};
```

### Level 3: Production (ES6 Class Syntax encapsulation)
```javascript
// PRODUCTION: Clean class syntax representing clean engine prototyping
class VectorPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    return `Point at ${this.x}, ${this.y}`;
  }
}
```

### Level 4: Enterprise (Vector Component Canvas Manager)
```javascript
// ENTERPRISE: A robust rendering engine that coordinates complex nested component 
// trees, leverages prototypal lookups, and blocks prototype pollution vulnerabilities.
class FigmaCanvasManager {
  constructor() {
    this.elements = [];
  }

  addElement(element) {
    // Prototype Pollution Guard: prevent objects without valid canvas prototypes
    if (!(element instanceof BaseElement)) {
      throw new TypeError("Invalid element prototype: Must inherit from BaseElement");
    }
    this.elements.push(element);
    return this;
  }

  renderAll() {
    console.log("Starting canvas rendering...");
    return this.elements.map(el => {
      // Calls the draw() method dynamically resolved via prototype chain
      return el.draw();
    });
  }
}

// Usage
const canvas = new FigmaCanvasManager();
canvas.addElement(new CircleElement(10, 10, 5))
      .addElement(new CircleElement(20, 20, 15));
```

---

## 7. Common Mistakes

1. **Defining methods in constructors inside big datasets:**
   If you spawn 10,000 nodes in Figma with internal methods, you allocate 10,000 functions, causing browser memory lag. Always bind methods to `.prototype`.
2. **Directly mutating `__proto__`:**
   Mutating `__proto__` (e.g. `obj.__proto__ = parent`) breaks V8 optimizer assumptions and slows down lookup performance for the entire application. Use `Object.create()` instead.
3. **Prototype Pollution Vulnerability:**
   Accepting user inputs that overwrite standard prototype keys (like `Object.prototype.toString`) can compromise the security of the application.

---

## 8. Best Practices

1. **Use ES6 Class Syntax:** It is cleaner and prevents errors when setting up inheritance chains manually.
2. **Always call `super()` first in subclasses:** Otherwise, `this` remains uninitialized, throwing a ReferenceError.
3. **Treat Prototypes as read-only at runtime:** Do not modify prototypes dynamically after the application boots up.

---

## 9. Interview Preparation

### Q1: What is the difference between `__proto__` and `prototype`?
**Answer:**
- **`.prototype`** is a property attached only to Constructor Functions. It is the template object where you define methods that you want all future instances to inherit.
- **`__proto__`** is a property attached to all object instances. It points to the parent prototype object that the instance inherits from.
- **Connection:** `instance.__proto__ === Constructor.prototype`

### Q2: What is Prototype Pollution?
**Answer:** Prototype Pollution is a vulnerability where an attacker injects properties into JavaScript's base prototypes (like `Object.prototype`). Since all objects inherit from `Object.prototype`, these injected properties leak into every object in the application, which can lead to logic bypasses or remote code execution.

### Q3: How does prototype lookup resolve properties?
**Answer:** When you query a property on an object, the engine first searches the local object properties. If it doesn't find it, it follows the `__proto__` link to the parent prototype and searches there. It crawls this chain until it finds the property or reaches `Object.prototype.__proto__` (which is `null`), where it returns `undefined`.

---

## 10. Homework

1. **Canvas Elements Chain:** Write a prototypal hierarchy (BaseElement ➔ Circle ➔ Ring) using constructor functions and `Object.create()`. Verify that methods inherit correctly.
2. **ES6 Class Refactor:** Refactor the constructor functions prototype chain you wrote into standard ES6 classes using `extends` and `super()`.
3. **Memory Allocation Benchmark:** Create 50,000 object instances containing an inline method inside the constructor vs the prototype chain. Measure and log the heap memory differences.
4. **Prototype Pollution Guard:** Write a secure object merger function that blocks key properties containing `__proto__` or `constructor` from modifying base prototypes.
5. **Lookup Chain Tracer:** Write a utility function `getPrototypeChain(obj)` that prints an array showing the names of all parent prototypes up to `null`.
