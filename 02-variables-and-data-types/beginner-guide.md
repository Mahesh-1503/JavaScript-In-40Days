# Beginner's Guide: Variables & Data Types

Hey there, future coder! 👋 Welcome to your hands-on guide to JavaScript Variables and Data Types. Today, we are going to explore how data is stored, casting types, and how primitive copy-by-value differs from object copy-by-reference.

---

## 📂 How to Learn This Folder

To get the most out of your variables experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand storage box concepts and stack vs. heap layouts.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-vars.js`), and run them with `node test-vars.js` in your terminal to see the outcomes.
3.  **Step 3:** Open and read [02-variables-and-data-types/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/02-variables-and-data-types/README.md) to explore the deep inner workings of V8 shapes and hidden classes.
4.  **Step 4:** Inspect and run [02-variables-and-data-types/type-conversion-and-primitives.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/02-variables-and-data-types/type-conversion-and-primitives.js) to see precision rounding, symbols, and coercion traps.

---

## 1. What is a Variable?

Think of a variable as a **labeled storage box** inside your computer's memory. You place a value inside the box, put a label on it, and refer to that label whenever you need to check or modify the contents.

```javascript
let age = 25;
```
*Visual Memory Map:*
```text
age ───> [ 25 ]
```

Or:
```javascript
let name = "Arun";
```
*Visual Memory Map:*
```text
name ───> [ "Arun" ]
```

### Why do we need variables?
Without variables, you would have to write the same value over and over again. If that value changes, you'd have to edit it in multiple places:
```javascript
console.log("Arun");
console.log("Arun");
console.log("Arun");
```

With variables, you write it once, and referenced usage updates automatically:
```javascript
let name = "Arun";
console.log(name);
console.log(name);
console.log(name);
```

### Real Example: Social Media Profile
Think of an Instagram or Twitter profile. The profile page references these variables:
```javascript
let username = "Mahesh";
let followers = "1200";
let isVerified = true;
```

---

## 2. Declaring Variables

JavaScript has three keywords to declare variable boxes.

### 1. `let` (Mutable variables)
Use `let` when the value inside the box is expected to change (reassignment).
```javascript
let age = 25;
age = 26; // Success! Reassigned
console.log(age); // 26
```

### 2. `const` (Constant variables)
Use `const` when the value must remain locked once initialized.
```javascript
const country = "India";
try {
  country = "USA"; // ❌ TypeError: Assignment to constant variable!
} catch (error) {
  console.log("Expected Error Caught: const variables cannot be reassigned!");
  console.log("Error details:", error.message);
}
```

### 3. `var` (Legacy scope variables)
The pre-ES6 way to create variables. Works, but has dangerous function-scoping rules that lead to silent bugs.
```javascript
var city = "Hyderabad";
console.log(city);
```

### Rule for Modern JavaScript
> [!IMPORTANT]
> - **Use `const` by default.** (e.g., `const name = "Mahesh"`)
> - **If you know the value must change, use `let`.** (e.g., `let score = 0`)
> - **Avoid using `var` completely.**

#### Example: Shopping Cart Total (Uses `let`)
```javascript
let cartTotal = 0;
cartTotal = cartTotal + 500;
cartTotal = cartTotal + 1000;
console.log(cartTotal); // 1500 (Because total must change as items are added)
```

#### Example: Company Name (Uses `const`)
```javascript
const company = "Amazon";
console.log(company); // Amazon (Company name is static and won't change)
```

---

## 3. JavaScript Data Types

Data types tell the computer what *kind* of data is inside our variable box. They are divided into two main categories:

### Primitive Types (Stored in Stack memory)
1.  **String** (Textual data)
2.  **Number** (Integers and Decimals)
3.  **Boolean** (`true` or `false`)
4.  **Undefined** (Declared but unassigned)
5.  **Null** (Intentionally empty)
6.  **Symbol** (Unique identifiers)
7.  **BigInt** (Extra large integers)

### Reference Types (Stored in Heap memory)
1.  **Object** (Key-value maps)
2.  **Array** (Indexed lists)
3.  **Function** (Callable code blocks)

---

## Primitives In-Depth

### 1. String
Used to represent text. You can create strings using double quotes, single quotes, or backticks:
```javascript
let name = "Arun";
let city = 'Hyderabad';
let message = `Hello`;
```

#### Real Examples:
```javascript
let email = "dolly@gmail.com";
let password = "Mahesh-Dolly-2";
let productName = "iPhone";
```

#### Useful String Methods:
```javascript
let text = "JavaScript";

// 1. Length property
console.log(text.length); // 10

// 2. Case conversions
console.log(text.toUpperCase()); // "JAVASCRIPT"

// 3. Substring checks
console.log(text.includes("Script")); // true

// 4. Splitting into arrays
console.log("apple,mango,orange".split(",")); // ["apple", "mango", "orange"]
```

#### Search Application Example:
```javascript
let product = "Apple iPhone";
console.log(product.includes("iPhone")); // true
```

---

### 2. Number
JavaScript has only one numeric type representing both integers and floating-point decimals.
```javascript
let age = 25;
let price = 99.99;
console.log(typeof age, typeof price); // "number", "number"
```

#### Real Examples:
```javascript
let balance = 5000;
let rating = 4.5;
let temperature = 30;
```

#### Operations:
```javascript
console.log(10 + 20); // 30
console.log(10 - 5);  // 5
console.log(10 * 5);  // 50
console.log(20 / 2);  // 10
console.log(20 % 3);  // 2 (Modulus: remainder of 20 divided by 3)
```

#### E-commerce Calculation Example:
```javascript
let total = 1000;
let discount = 200;
let finalPrice = total - discount;
console.log(finalPrice); // 800
```

#### The Floating Point Problem:
Computers store numbers in binary format, which causes small rounding errors when dealing with decimals:
```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```
**The Fix:** Use `.toFixed(2)` to format the decimal representation, then cast it back to a Number:
```javascript
let add = 0.1 + 0.2;
console.log(typeof add, add.toFixed(2)); // "number", "0.30"
console.log(Number(add.toFixed(2))); // 0.3
```

---

### 3. Boolean
Booleans represent simple logical flags: `true` or `false`.
```javascript
let isLoggedIn = true;
let isAdmin = false;
let isCartOpen = true;
```

#### Authentication Guard Example:
```javascript
if (isLoggedIn) {
  console.log("Welcome back user!");
}
```

---

### 4. Undefined
A variable that has been declared, but has not yet been assigned a value, is automatically initialized as `undefined`.
```javascript
let salary;
console.log(salary); // undefined
```
*Meaning:* Variable exists, but is empty/unassigned.

---

### 5. Null
Represents the **intentional absence** of any object value. It must be assigned explicitly.
```javascript
let manager = null;
console.log(manager); // null
```

#### Application Example:
```javascript
let selectedUser = null; // No user selected in the list yet.
```

---

### 6. BigInt
Standard JavaScript numbers lose precision for values larger than $2^{53} - 1$. For larger values, use `BigInt` by appending an `n` suffix to the number.
```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// Appending 'n' turns it into BigInt
let id = 9007199254740991n; 
let bankTransactionId = 123456789012345678901234567890n;
console.log(bankTransactionId);
```

---

### 7. Symbol
Symbols are used to generate completely unique, immutable identifiers.
```javascript
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false (Uniqueness guaranteed)
```
Standard numbers or strings with identical characters evaluate as equal, unlike symbols:
```javascript
const a = 10;
const b = 10;
console.log(a === b); // true
```

#### Application Example:
React uses Symbols internally to identify DOM nodes. Developers use them to create hidden metadata properties on objects:
```javascript
const ID = Symbol("id");
const user = {
  name: "Arun",
  [ID]: 123
};
```

---

## Reference Types

Reference types can store collections of values and complex structures.

### 1. Object
Objects store data as key-value pairs.
```javascript
let student = {
  name: "Mahesh",
  age: 22,
  isEnrolled: true,
  "phone number": "9876543210"
};

// Accessing properties via dot notation
console.log(student.name);       // "Mahesh"
console.log(student.age);        // 22
console.log(student.isEnrolled); // true

// Accessing properties with space keys via brackets
console.log(student["phone number"]); // "9876543210"
```

---

### 2. Array
Arrays store ordered, index-based lists of items. The index starts at `0`.
```javascript
let fruits = ["Apple", "Orange", "Mango"];
```

#### Shopping Cart Example:
```javascript
let cart = ["iPhone", "Laptop", "Watch"];

console.log(cart[0]); // "iPhone" (First item)
console.log(cart[cart.length - 1]); // "Watch" (Last item dynamically calculated)
```

---

### 3. Function
Functions are callable blocks of code. In JavaScript, functions are treated as objects.
```javascript
// Create function
function greet() {
  console.log("Hello");
}

// Call or invoke function
greet(); // "Hello"
```

---

## 5. Stack vs. Heap Memory (VERY IMPORTANT)

This is the most critical concept for beginners. Primitives and Reference types are stored and copied differently.

### Primitives (Stack Memory)
Primitives are stored directly on the quick-access **Stack**. When you assign one variable to another, a completely **new copy** of the value is created:
```javascript
let a = 10;
let b = a; // Copy by value
console.log(a, b); // 10, 10

b = 20; // Reassigning b
console.log(a, b); // 10, 20 (Changing 'b' has absolutely no effect on 'a'!)
```

### Reference Values (Heap Memory)
Objects and arrays are stored on the **Heap**. The variable on the Stack only holds a **reference pointer** (address) pointing to the actual data location in the Heap.

If you copy an object variable, you copy the *address pointer*, not the physical data:
```javascript
let user1 = { name: "Arun" };
let user2 = user1; // Copies the address pointer!
console.log(user1.name, user2.name); // "Arun", "Arun"

user2.name = "Mahesh"; // Modifying the object via user2 pointer
console.log(user1.name, user2.name); // "Mahesh", "Mahesh" (Both changed!)
```

#### Visualization:
```text
Stack Memory               Heap Memory
┌──────────────┐           ┌──────────────┐
│ user1: @009F ├──────────►│ {name:       │
├──────────────┤           │  "Mahesh"}   │
│ user2: @009F ├──────────►│              │
└──────────────┘           └──────────────┘
```

### Why const Objects Can Change
This memory pointer architecture explains why we can modify keys inside constant objects:
```javascript
const user = { name: "Arun" };

user.name = "Vijay"; // Works! We changed properties inside the Heap.

try {
  user = {}; // ❌ ILLEGAL! Throws TypeError. We cannot change the stack pointer to another address.
} catch (error) {
  console.log("Expected Error Caught: Object constant pointers cannot be reassigned to a new address!");
  console.log("Error details:", error.message);
}
```

---

## 6. Type Conversion & Coercion

### 1. Explicit Type Conversion
Intentional type casting using standard constructors:
```javascript
// String to Number
console.log(Number("123")); // 123
console.log(Number("Mahesh")); // NaN (Not-a-Number)

// Number to String
console.log(String(123)); // "123"

// Boolean Conversion (Checks Truthiness)
console.log(Boolean(1)); // true
console.log(Boolean("Dolly")); // true
console.log(Boolean(0)); // false
```

#### Falsy Values List (MUST MEMORIZE):
Values that evaluate to `false` when cast to Booleans:
*   `false`
*   `0`
*   `-0`
*   `""` (Empty string)
*   `null`
*   `undefined`
*   `NaN`
*   `0n` (BigInt zero)

*Everything else in JavaScript evaluates to `true` (including empty arrays `[]` and empty objects `{}`).*

### 2. Implicit Type Coercion
Automatic type conversion performed by the JavaScript engine under the hood:
```javascript
console.log("5" + 2); // "52" (Number 2 is coerced to string "2" for concatenation)
console.log("5" - 2); // 3 (String "5" is coerced to number 5 for subtraction)
console.log(true + 2); // 3 (Boolean true is coerced to number 1)
```

#### Loose vs. Strict Equality:
*   **Loose equality (`==`):** Coerces types before comparison.
*   **Strict equality (`===`):** Compares both value and type without coercion.
```javascript
console.log("5" == 5);  // true (Coerces string to number)
console.log("5" === 5); // false (Checks types, string !== number)
```
> [!TIP]
> **Always use strict equality (`===`)** in your code to prevent unexpected type bugs.

---

## 7. Real Application Examples

### 1. Shopping Cart Counter
```javascript
let currentCartTotal = 0;

function addProduct(price) {
  currentCartTotal += price;
}
```

### 2. Read-Only API Configuration
```javascript
const API_CONFIG = {
  baseURL: "https://api.amazon.com",
  timeout: 5000
};
```

### 3. Application State Object
```javascript
const appState = {
  user: null,
  cart: [],
  isLoggedIn: false
};
```

### 4. Product Catalog Record
```javascript
const product = {
  id: 1,
  title: "iPhone",
  price: 70000,
  inStock: true
};
```

### 5. Social Media User Record
```javascript
const user = {
  name: "Arun",
  followers: 5000,
  isVerified: true,
  posts: []
};
```

---

## 8. Cheat Sheet & Golden Rules

### Quick Reference Table
| Type | Category | Example Code |
| :--- | :--- | :--- |
| **String** | Primitive | `"Hello"`, `'World'`, `` `Template` `` |
| **Number** | Primitive | `100`, `99.99` |
| **Boolean** | Primitive | `true`, `false` |
| **Undefined** | Primitive | `let x;` (Automatically undefined) |
| **Null** | Primitive | `let manager = null;` |
| **BigInt** | Primitive | `123456789n` |
| **Symbol** | Primitive | `Symbol("key")` |
| **Object** | Reference | `{ name: "Mahesh" }` |
| **Array** | Reference | `["apple", "orange"]` |
| **Function** | Reference | `function greet() {}` |

### Golden Rules:
1.  **Use `const` by default.**
2.  **Use `let` only when reassignment is needed.**
3.  **Avoid `var` at all costs.**
4.  **Always use strict equality (`===`).**
5.  **Understand Stack vs. Heap: Objects are copied by reference.**
6.  **Memorize all falsy values.**
