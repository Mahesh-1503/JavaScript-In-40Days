# Day 12: Objects in JavaScript (Jira Issue Tracker)

JavaScript Objects are collections of key-value pairs stored dynamically in memory. Writing professional object architectures requires understanding constructor/factory patterns, memory reference pointers, copying behaviors, and how compilers (like V8) optimize property lookups.

---

## 1. Mental Model (The Jira Issue Tracker)

Think of a task tracker like **Jira**:
1. **The Issue Object:** Every bug or feature is represented by a structured object (`id`, `title`, `assignee`, `subtasks`).
2. **Constructor/Factory Functions:** When you click "Create Issue," the app uses a template function to create hundreds of objects with the exact same fields and methods.
3. **Deep Copying:** When you view an edit history, the system must create a complete backup copy of the issue. If you use a shallow copy, changing the assignee on the backup will corrupt the assignee on the original issue.
4. **Optional Chaining (`?.`):** When rendering details, some issues may not have a reporter or subtasks. Accessing nested properties on missing objects crashes your app. We use optional chaining to safely query deep values.

---

## 2. Visual Thinking (Shallow Copy vs Deep Copy)

Understanding how reference copies behave in heap memory:

### Shallow Copy (Spread Operator / `Object.assign`)
```
Original Issue Obj: {@Address 00A} ──► { title: "Auth Bug", details: {@Address 00B} }
                                                                         │
                                       ┌─────────────────────────────────┘
                                       ▼
Backup Copy Obj:    {@Address 00C} ──► { title: "Auth Bug", details: {@Address 00B} }
```
*Note: Both objects point to the exact same nested `details` address. Changing backup details corrupts the original.*

### Deep Copy (Full Recursive Clone)
```
Original Issue Obj: {@Address 00A} ──► { title: "Auth Bug", details: {@Address 00B} }

Backup Copy Obj:    {@Address 00C} ──► { title: "Auth Bug", details: {@Address 00D} }
```
*Note: The nested `details` object is completely replicated in a new heap space (`@Address 00D`). Changes are isolated.*

---

## 3. Beginner Explanation

An **object** is a variable that holds multiple details (properties) and actions (methods) grouped under key-value pairs.
- **Factory Function:** A standard function that returns a new object when called.
- **Constructor Function:** A template function used alongside the `new` keyword to create object instances.
- **Object Reference:** When you assign an object to a new variable, JavaScript does not copy the values. Instead, it copies the "address" pointer. Both variables now edit the same object in memory.
- **Optional Chaining (`?.`):** A safe way to read properties inside objects. For example, `issue.assignee?.name` returns `undefined` if `assignee` is null, preventing a crash.

---

## 4. Deep Explanation (V8 Shapes/Hidden Classes & Memory)

### 1. V8 Hidden Classes (Shapes)
At the CPU level, properties in objects are stored dynamically. To speed up access, V8 compiles objects into **Shapes** or **Hidden Classes**.
- If two objects are created using the same constructor with properties added in the exact same order, they share the same Shape. The compiler calculates the exact offset of properties in memory, making property lookups almost as fast as indexing an array.
- **Performance Hit:** Adding properties dynamically (e.g. `obj.newProp = "val"`) or in a different order forces the engine to split the shapes, slowing down lookup speeds.

### 2. Shallow vs Deep Copy Mechanics
- **Shallow Copy (`{ ...obj }`, `Object.assign()`):** Replicates top-level primitives, but nested objects are copied as address references.
- **Deep Copy (`structuredClone()`, recursive function):** Traverses the object tree and allocates new heap memory blocks for every nested object.

### 3. Object Immutability
- **`Object.preventExtensions(obj)`:** Blocks adding new properties.
- **`Object.seal(obj)`:** Blocks adding/deleting properties. Existing properties can still be modified.
- **`Object.freeze(obj)`:** Blocks all modifications (shallow). All properties are read-only.

---

## 5. Real Production Examples (Jira Flows)

### 1. Constructor Function for Jira Issues
```javascript
function JiraIssue(id, title, priority) {
  this.id = id;
  this.title = title;
  this.priority = priority;
  this.status = "Backlog";
  this.subtasks = [];
  
  this.addSubtask = function(taskTitle) {
    this.subtasks.push(taskTitle);
  };
}

const bugTicket = new JiraIssue("bug_101", "Fix login flow", "High");
bugTicket.addSubtask("Verify OAuth token validation");
```

### 2. Object Destructuring with Aliasing and Defaults
```javascript
const userProfile = { id: "u_99", displayName: "Alice Smith" };

// Destructure with default fallback and variable rename (displayName ➔ name)
const { displayName: name, email = "no-email@jira.com" } = userProfile;
```

### 3. Nesting Query with Optional Chaining (`?.`) and Nullish Coalescing (`??`)
```javascript
const issuePayload = {
  id: "ticket_392",
  assignee: null // Not assigned yet
};

// Prevents crash: resolves to undefined, falls back to "Unassigned"
const assigneeName = issuePayload.assignee?.details?.name ?? "Unassigned";
```

### 4. Frozen Configuration Registry
```javascript
const PRIORITY_SETTINGS = Object.freeze({
  HIGH: { color: "red", slaHours: 4 },
  MEDIUM: { color: "yellow", slaHours: 24 },
  LOW: { color: "green", slaHours: 72 }
});
```

### 5. Object Key/Value Iteration (Auditing Fields)
```javascript
const ticket = { id: "t_1", status: "In Progress", reporter: "Bob" };

// Extract keys and values for logging/auditing changes
const auditLogs = Object.entries(ticket).map(([key, val]) => {
  return `Field [${key}] is currently set to [${val}]`;
});
```

---

## 6. Progressive Coding (Object Copying)

### Level 1: Beginner (Shallow Reference Mutation Bug)
```javascript
const originalTicket = { title: "UI Bug", details: { platform: "iOS" } };

// BUG: Simple assignment copies the memory pointer, not the values.
const backupTicket = originalTicket;
backupTicket.title = "Core Crash"; // Mutates originalTicket title!
```

### Level 2: Better (Shallow Copy using Spread)
```javascript
// BETTER: Top-level is isolated, but nested details remain shared references
const backupTicket = { ...originalTicket };
backupTicket.title = "Core Crash"; // Safe!
backupTicket.details.platform = "Android"; // BUG: Mutates originalTicket details!
```

### Level 3: Production (structuredClone for Deep copy)
```javascript
// PRODUCTION: Native deep clone copies all nested fields safely
const backupTicket = structuredClone(originalTicket);
backupTicket.details.platform = "Android"; // Safe! Original ticket remains iOS.
```

### Level 4: Enterprise (Recursive Deep Clone Utility with Cycle Handling)
```javascript
// ENTERPRISE: Custom deep cloning engine that handles circular references,
// dates, arrays, and functions during deep state snapshots.
function deepClone(value, hash = new WeakMap()) {
  // 1. Handle primitives and null
  if (value === null || typeof value !== "object") return value;
  
  // 2. Handle circular references using hash map
  if (hash.has(value)) return hash.get(value);
  
  // 3. Handle Dates
  if (value instanceof Date) return new Date(value);
  
  // 4. Handle Arrays
  if (Array.isArray(value)) {
    const arrCopy = [];
    hash.set(value, arrCopy);
    for (let i = 0; i < value.length; i++) {
      arrCopy[i] = deepClone(value[i], hash);
    }
    return arrCopy;
  }
  
  // 5. Handle Objects
  const objCopy = Object.create(Object.getPrototypeOf(value));
  hash.set(value, objCopy);
  
  for (const key of Reflect.ownKeys(value)) {
    objCopy[key] = deepClone(value[key], hash);
  }
  
  return objCopy;
}

const complexTicket = {
  id: "tk_77",
  tags: ["security", "p0"],
  metadata: { created: new Date() }
};
const copiedTicket = deepClone(complexTicket);
```

---

## 7. Common Mistakes

1. **Relying on JSON.parse/stringify for Deep Clones:**
   Using `JSON.parse(JSON.stringify(obj))` destroys Date formats (converts to string), loses `undefined` fields, and crashes on circular references.
2. **Adding properties dynamically to objects (Hidden Class Thrashing):**
   ```javascript
   function User(name) { this.name = name; }
   const u1 = new User("Alice");
   const u2 = new User("Bob");
   u1.age = 25; // BUG: u1 and u2 now have different V8 Hidden Classes. Lookups slow down!
   ```
3. **Assuming `const` makes objects immutable:**
   ```javascript
   const config = { api: "localhost" };
   config.api = "production"; // Works! The object keys are still mutable.
   ```

---

## 8. Best Practices

1. **Use classes or constructor functions:** This ensures V8 applies optimal Hidden Class shapes to all object instances.
2. **Never add properties dynamically:** Declare all possible keys during initialization, using `null` as default placeholders.
3. **Deep Freeze Configs:** Write recursive freeze utilities for system configurations to prevent developer errors at runtime.

---

## 9. Interview Preparation

### Q1: What is the difference between shallow copy and deep copy?
**Answer:** 
- A **Shallow Copy** copies only the top-level primitives. Nested objects or arrays are copied as memory reference pointers, meaning changes to nested fields will affect both the original and copied object.
- A **Deep Copy** duplicates the entire object structure recursively, allocating new memory spaces in the Heap for all nested sub-objects. Changes are completely isolated.

### Q2: How does the `structuredClone()` method work? What are its limits?
**Answer:** `structuredClone()` is a native browser/Node.js API that creates a deep copy of a value using the Structured Clone algorithm. It handles circular references, Dates, RegExps, Map, and Set. Its limits include: it cannot copy functions, DOM elements, or descriptors/getters/setters (throwing a DOMException on encounter).

### Q3: How do V8 Hidden Classes speed up object property access?
**Answer:** When objects share the same layout (properties added in the exact same order), V8 assigns them a shared Hidden Class (Shape). Instead of checking a dictionary map for keys on every query, the engine remembers the exact offset memory index of properties in the shape. This turns property lookups into rapid index queries.

---

## 10. Homework

1. **Deep Clone Engine:** Implement a custom deep cloning function and write tests verifying that circular references and Dates are duplicated correctly.
2. **Shapes Benchmark:** Write a test script comparing property read/write performance of objects created via a constructor vs objects with dynamic parameters appended later.
3. **Nested Optional Chain Queries:** Build a simulated user database query program using nested objects. Extract variables safely using optional chaining and nullish coalescing.
4. **Immutability Sandbox:** Freeze, seal, and prevent extensions on different objects. Attempt to update, delete, and add keys, logging the strict mode errors.
5. **Dynamic Factory Builder:** Write a factory function that takes user inputs and builds a customized Jira-like ticket template containing subtask utilities.
