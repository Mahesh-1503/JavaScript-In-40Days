# Beginner's Guide: JavaScript Objects & JSON

Hey there, future object designer! 👋 Welcome to your hands-on guide to JavaScript Objects and JSON. Today, we are going to learn how to store structured data using key-value pairs, duplicate heap properties using structuredClone, serialize objects to strings, and safeguard against crashes using optional chaining.

---

## 📂 How to Learn This Folder

To get the most out of your objects experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand Jira ticket analogies and shallow vs. deep heap memory architectures.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-objects.js`), and run them with `node test-objects.js` in your terminal to see the logs.
3.  **Step 3:** Open and read [13-objects/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/13-objects/README.md) to explore V8 hidden classes, shape offsets, and serialization bounds.
4.  **Step 4:** Inspect and run [13-objects/json-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/13-objects/json-demo.js) to see custom replacers, Date revivers, and structural clones.

---

## Part 1: What is an Object?

Variables in JavaScript hold single data values. In contrast, an **Object** is a grouping structure that stores collections of related properties (variables) and methods (functions) using **key-value pairs**.

### The Jira Ticket Analogy
Think of a task tracker like **Jira**:
*   Every bug or task is represented in memory as an **Issue Object**.
*   This object contains details like:
    *   `id`: `"bug-101"` (String)
    *   `priority`: `"High"` (String)
    *   `isCompleted`: `false` (Boolean)
    *   `subtasks`: `["Write tests", "Fix OAuth validation"]` (Array)

```javascript
const jiraTicket = {
  id: "bug-101",
  priority: "High",
  isCompleted: false,
  subtasks: ["Write tests", "Fix OAuth validation"]
};
```

---

## Part 2: Accessing Properties

JavaScript offers multiple ways to read, add, or edit properties inside an object.

### 1. Dot Notation (Standard lookup)
```javascript
console.log(jiraTicket.id); // "bug-101"
```

### 2. Bracket Notation (For keys containing spaces or special characters)
If your key has space padding or characters, dot notation fails. Use brackets:
```javascript
const student = {
  name: "Mahesh",
  "phone number": "9876543210"
};
// console.log(student.phone number); // ❌ SyntaxError!
console.log(student["phone number"]); // 🟢 "9876543210"
```

### 3. Dynamic Computed Keys (Bracket lookup)
Bracket notation lets you evaluate variables to access keys dynamically:
```javascript
let targetKey = "name";
console.log(student[targetKey]); // "Mahesh" (Resolves variables to check properties)

// Declaring dynamic keys inside object literals:
const configName = "apiEndpoint";
const serverConfig = {
  [configName]: "https://api.amazon.com" // Computed Key!
};
console.log(serverConfig.apiEndpoint); // "https://api.amazon.com"
```

---

## Part 3: Object Templates: Factory vs. Constructor Functions

When creating hundreds of objects (like generating tickets), writing object literals manually is repetitive. We use templates instead.

### 1. Factory Function
A simple, plain function that returns a new object literal configuration when invoked:
```javascript
function createIssue(id, title) {
  return {
    id: id,
    title: title,
    status: "Backlog"
  };
}
const issueA = createIssue("101", "Navbar broken");
```

### 2. Constructor Function
A template function called alongside the **`new`** keyword.
*   By naming convention, it starts with a **Capital Letter**.
*   It binds properties directly to the new instance context using the **`this`** keyword:
```javascript
function JiraIssue(id, title) {
  // Implicitly binds this = {} under the hood
  this.id = id;
  this.title = title;
  this.status = "Backlog";
  this.subtasks = [];
  
  this.addSubtask = function(taskTitle) {
    this.subtasks.push(taskTitle);
  };
  // Implicitly returns this
}

const bugTicket = new JiraIssue("bug_101", "Fix login flow");
bugTicket.addSubtask("Verify token validation");
console.log(bugTicket.subtasks); // ["Verify token validation"]
```

---

## Part 4: Inspecting & Iterating Objects

### 1. Checking Key Existence
*   **The `in` Operator:** Checks if a property exists on the object (or its prototype chain):
    ```javascript
    console.log("status" in bugTicket); // true
    ```
*   **`Object.hasOwn(obj, "prop")`:** Checks if the property belongs *directly* to the object instance (ignoring inherited prototypes):
    ```javascript
    console.log(Object.hasOwn(bugTicket, "status")); // true
    ```

### 2. Looping Keys using `for...in`
Iterates over all enumerable string keys of an object:
```javascript
for (let key in student) {
  console.log(`Key: ${key}, Value: ${student[key]}`);
}
```

### 3. Object Extraction Utilities
Extract specific components of an object into Arrays:
```javascript
const user = { name: "Arun", age: 25 };

console.log(Object.keys(user));    // ["name", "age"] (Array of keys)
console.log(Object.values(user));  // ["Arun", 25] (Array of values)
console.log(Object.entries(user)); // [ ["name", "Arun"], ["age", 25] ] (Array of entry pairs)
```

---

## Part 5: Memory Pointers: Shallow vs. Deep Copying

Objects are reference types. When you assign an object to a new variable, you copy the address pointer in stack memory, not the actual values on the heap:
```javascript
let user1 = { name: "Arun" };
let user2 = user1; // Copies pointer address!
user2.name = "Vijay";

console.log(user1.name); // "Vijay" (Both variables modified same Heap object!)
```

### 1. Shallow Copy (Spread Operator / `Object.assign`)
Copies top-level primitive properties, but nested array/object addresses are copied as reference pointers.
```javascript
const original = { title: "Auth Bug", details: { severity: "High" } };
const shallowBackup = { ...original };

shallowBackup.title = "UI Bug"; // Isolated! (Top-level)
shallowBackup.details.severity = "Low"; // ❌ Bug! Modifies original.details too because the reference address was shared!
```

### 2. Deep Copy (Independent Clones)
Creates a complete copy of every nested object at a new memory address.
*   **Modern way:** `structuredClone(obj)`
*   **Legacy way:** `JSON.parse(JSON.stringify(obj))`
```javascript
const deepBackup = structuredClone(original);
deepBackup.details.severity = "Low"; // 🟢 Completely isolated! original.details stays "High"
```

---

## Part 6: Cloning Primitives & JSON Serialization Rules

JSON (JavaScript Object Notation) is a lightweight textual data format used to transmit data between client and server.

### JSON Syntax Constraints:
1.  Keys **must** be wrapped in double quotes (e.g. `"id"`).
2.  Value datatypes are restricted to: Strings, Numbers, Booleans, Null, Objects, and Arrays.
3.  Functions, Symbols, and Undefined values are **forbidden** in JSON.

### Serialization Functions:
```javascript
const payload = {
  id: 101,
  birthDate: new Date("2000-01-01"),
  secretKey: undefined // Ignored!
};

// 1. Convert Object to JSON String (Serialization)
const jsonString = JSON.stringify(payload);
console.log(jsonString); // '{"id":101,"birthDate":"2000-01-01T00:00:00.000Z"}' (secretKey removed!)

// 2. Convert JSON String to Object (Deserialization)
const parsedObj = JSON.parse(jsonString);
console.log(parsedObj.birthDate); // "2000-01-01..." (Restored as a String, not a Date object!)
```

---

## Part 7: Locking Objects

You can restrict how other developers mutate properties on your configuration objects:

```javascript
const appConfig = { theme: "Dark" };

// 1. preventExtensions (No new keys)
Object.preventExtensions(appConfig);
appConfig.endpoint = "https://api.com"; // Ignored silently (or throws in strict mode)

// 2. Object.seal (No additions or deletions)
Object.seal(appConfig);
delete appConfig.theme; // Ignored. Modifying existing theme is still allowed!

// 3. Object.freeze (Shallow read-only block)
Object.freeze(appConfig);
appConfig.theme = "Light"; // Ignored. Theme stays "Dark"
```

---

## Part 8: Modern Patterns: Destructuring & Optional Chaining

### 1. Object Destructuring with Aliasing and Defaults
A clean syntax to extract multiple keys into variables in one line:
```javascript
const userProfile = { id: "u_99", displayName: "Alice Smith" };

// Destructure: Rename 'displayName' to 'name', and assign a default 'email'
const { displayName: name, email = "no-email@jira.com" } = userProfile;

console.log(name);  // "Alice Smith"
console.log(email); // "no-email@jira.com" (Applied default fallback)
```

### 2. Optional Chaining (`?.`)
Accessing properties inside nested objects that might be missing can crash your app:
```javascript
const ticket = { id: "t_1" }; // Has no 'reporter'

try {
  console.log(ticket.reporter.name); // ❌ Throws TypeError: Cannot read properties of undefined!
} catch (error) {
  console.log("Expected Error Caught: Cannot access property of undefined!");
  console.log("Error details:", error.message);
}

console.log(ticket.reporter?.name); // 🟢 safely returns undefined without crashing!
```

---

## Part 9: V8 Engine Internals: Hidden Classes (Shapes)

At the CPU level, lookup offsets of properties are expensive. To optimize performance, the V8 engine builds internal blueprints called **Hidden Classes (Shapes)**.
*   If you create objects using the same constructor and assign keys in the **exact same order**, they share a single Hidden Class shape. Properties are mapped to exact memory offsets for instant retrieval.
*   **Performance Trap:** Adding properties dynamically at runtime (e.g. `obj.newProperty = 1`) or changing assignment orders breaks the shape blueprint, forcing V8 to create new shapes, slowing down your script.

---

## Part 10: Real-World Application Code

Here is a ticket manager script validating nested fields safely:
```javascript
const databaseResponse = {
  ticketId: "jira-99",
  author: {
    name: "Vijay",
    role: "Admin"
  }
};

// Clean extraction with optional chaining and default fallback values
const authorName = databaseResponse.author?.name || "Anonymous User";
const managerName = databaseResponse.manager?.name || "No Manager Assigned";

console.log(authorName);  // "Vijay"
console.log(managerName); // "No Manager Assigned" (Safe fallback!)
```

---

## 🚀 Modern ES2024 Upgrades: Object.groupBy()

A common real-world problem is taking an array of objects (like a database query result or shopping cart items list) and grouping them by a specific property (like product category or task status). Previously, this required using a complex `Array.prototype.reduce()` aggregator loop.

ES2024 introduces **`Object.groupBy()`** to perform this operation natively and efficiently.

### The Problem:
We have a list of tickets, each with a status ("Open", "Progress", "Closed"), and we want to group them by status to render dashboard columns.

### The ES2024 Solution:
```javascript
const tickets = [
  { id: "t-101", title: "Fix crash", status: "Open" },
  { id: "t-102", title: "Update css", status: "Closed" },
  { id: "t-103", title: "Add loading state", status: "Open" },
  { id: "t-104", title: "Build module", status: "Progress" }
];

// Group tickets by status key
const groupedTickets = Object.groupBy(tickets, (ticket) => ticket.status);

console.log("Grouped Tickets:", groupedTickets);
/*
Output:
{
  Open: [
    { id: "t-101", title: "Fix crash", status: "Open" },
    { id: "t-103", title: "Add loading state", status: "Open" }
  ],
  Progress: [
    { id: "t-104", title: "Build module", status: "Progress" }
  ],
  Closed: [
    { id: "t-102", title: "Update css", status: "Closed" }
  ]
}
*/
```

*When to use:* Use `Object.groupBy()` when you need to quickly categorize collections of objects (e.g., grouping logs by severity level, grouping users by department, or cataloging products by category) before rendering them on the screen.

---

## Part 11: Essential Interview Questions & Practice Exercises

### Q1: What is the difference between shallow copy and deep copy?
**Answer:** A shallow copy replicates only the top-level primitives of an object. Any nested arrays or objects are copied as address references, meaning changes to the copy's children will mutate the original object. A deep copy recursively duplicates all child structures to completely new memory addresses.

### Q2: What is the benefit of `structuredClone()`?
**Answer:** It is a native browser API designed to create deep clones of objects. Unlike the legacy `JSON.parse(JSON.stringify(obj))` method, it correctly handles complex types like Dates, RegExps, Map/Set, and binary buffers without losing data.

### Practice Exercises:
1.  **Clone Validation:** Create a nested object. Clone it once using `{ ...obj }` (shallow) and once using `structuredClone()` (deep). Modify nested elements in both copies and log the original object to verify changes.
2.  **Date Reviver JSON:** Write a custom reviver parser for `JSON.parse()` that automatically converts string keys matching dates back into JavaScript `Date` objects.
3.  **Destructuring setup:** Given an employee object containing multi-nested address objects, extract the city key using deep destructuring with default fallbacks.
