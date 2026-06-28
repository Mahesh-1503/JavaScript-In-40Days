# Beginner's Guide: JavaScript Conditionals

Hey there, future decision maker! 👋 Welcome to your hands-on guide to JavaScript Conditionals. Today, we are going to learn how to write logic that helps programs choose different execution pathways, compare values, and structure clean branches using switch blocks, early returns, and object lookups.

---

## 📂 How to Learn This Folder

To get the most out of your conditionals experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand conditional blocks and object mapping techniques.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-cond.js`), and run them with `node test-cond.js` in your terminal to see the outcomes.
3.  **Step 3:** Open and read [05-conditionals/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/05-conditionals/README.md) to review strict equality, switch tables, and optimal returns.

---

## Part 1: What are Conditionals?

Conditionals allow a program to **make decisions** and execute different paths of code based on conditions.

### Everyday Analogy:
```text
IF it is raining:
    Take an umbrella.
ELSE:
    Wear sunglasses.
```
In JavaScript, this logic is written using keywords:
```javascript
if (isRaining) {
  takeUmbrella();
} else {
  wearSunglasses();
}
```

---

## Part 2: The `if` Statement

The `if` statement runs a block of code **only** if its condition evaluates to `true`.
*   **Syntax:**
    ```javascript
    if (condition) {
      // Code to execute if condition is true
    }
    ```

### Example 1 (Condition is True):
```javascript
let age = 20;

if (age >= 18) {
  console.log("You can vote!");
}
// Output: "You can vote!"
```

### Example 2 (Condition is False):
```javascript
let age = 15;

if (age >= 18) {
  console.log("You can vote!");
}
// Output: (Nothing is printed, the block is skipped entirely)
```

---

## Part 3: The `if...else` Statement

Provides an alternative fallback block of code if the initial condition is `false`.
*   **Syntax:**
    ```javascript
    if (condition) {
      // Runs if true
    } else {
      // Runs if false
    }
    ```

### Example 1 (Bus Catching):
```javascript
let catchingBus = false;

if (catchingBus) {
  console.log("I will reach home on time.");
} else {
  console.log("I will be late.");
}
// Output: "I will be late."
```

### Example 2 (Exam Passing):
```javascript
let marks = 35;

if (marks >= 35) {
  console.log("Status: Pass");
} else {
  console.log("Status: Fail");
}
```

#### Execution Flowchart:
```text
     [Start Condition Check]
                │
         Is it True?
        ┌───────┴───────┐
      (Yes)            (No)
        ▼               ▼
   [Run 'if' block]  [Run 'else' block]
        │               │
        └───────┬───────┘
                ▼
          [Exit Checks]
```

---

## Part 4: The `else if` Multi-Branch

Used when you need to evaluate multiple sequential conditions.
*   **Syntax:**
    ```javascript
    if (cond1) {
      // Runs if cond1 is true
    } else if (cond2) {
      // Runs if cond2 is true
    } else {
      // Runs if all conditions are false
    }
    ```

### Example: Grading System
```javascript
let score = 76;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
// Output: "Grade C"
```

### Critical Rule: Top-to-Bottom Evaluation Order
JavaScript evaluates conditions in order from top to bottom. The moment it hits a `true` condition, it executes that block and **ignores all remaining blocks**, even if they are also true.

#### The Code Order Trap:
```javascript
let marks = 95;

if (marks >= 50) {
  console.log("Pass");
} else if (marks >= 90) {
  console.log("Grade A");
}
// Output: "Pass" (Oops! They deserved a Grade A, but marks >= 50 checked out true first!)
```

#### The Correct Approach:
Arrange conditions from most restrictive/highest value to least restrictive:
```javascript
if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 50) {
  console.log("Pass");
}
```

---

## Part 5: Combining Conditions (`&&` and `||`)

Use logical operators to evaluate multiple conditions inside a single `if` statement.

### 1. The AND (`&&`) Operator
Both conditions must be true for the block to run:
```javascript
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("Permission: Eligible to drive.");
}
```

### 2. The OR (`||`) Operator
At least one of the conditions must be true:
```javascript
let isAdmin = false;
let isManager = true;

if (isAdmin || isManager) {
  console.log("Access status: Granted.");
}
```

---

## Part 6: Nested Conditionals

An `if` statement placed inside another `if` statement.
```javascript
const mainCondition = true;
const subCondition = false;

if (mainCondition) {
  console.log("Outer block runs.");
  
  if (subCondition) {
    console.log("Inner block runs.");
  } else {
    console.log("Inner fallback runs.");
  }
} else {
  console.log("Outer fallback runs.");
}
/* Output:
  "Outer block runs."
  "Inner fallback runs."
*/
```

### Application Example: Premium Content Gate
```javascript
let isLoggedIn = true;
let isPremiumUser = false;

if (isLoggedIn) {
  if (isPremiumUser) {
    console.log("Loading premium dashboard content...");
  } else {
    console.log("Redirecting to standard home dashboard...");
  }
}
```

---

## Part 7: The Ternary Operator (`? :`)

A clean, single-line shorthand for an `if...else` block.
*   **Syntax:** `condition ? expressionIfTrue : expressionIfFalse`

### Basic Shorthand:
```javascript
catchingBus 
  ? console.log("I will reach home on time.") 
  : console.log("I will be late.");
```

### Value Assignment Shorthand (Best Use-Case):
```javascript
let age = 20;
let status = (age >= 18) ? "Adult" : "Minor";
console.log(status); // "Adult"
```

> [!WARNING]
> **Avoid Nested Ternaries.** Chaining multiple ternary operators (e.g., `cond1 ? val1 : cond2 ? val2 : val3`) makes code difficult to read. Use standard `if...else if` blocks or Object mapping instead.

---

## Part 8: The `switch` Statement

Used to compare a single variable against multiple static values.
*   **Syntax:**
    ```javascript
    switch (expression) {
      case value1:
        // Runs if expression === value1
        break;
      case value2:
        // Runs if expression === value2
        break;
      default:
        // Runs if no match is found
    }
    ```

### Example: Day Picker
```javascript
let dayNumber = 5;

switch (dayNumber) {
  case 1:
    console.log("Monday");
    break;
  case 5:
    console.log("Friday");
    break;
  default:
    console.log("Invalid day selection");
}
// Output: "Friday"
```

### Why is the `break` keyword necessary?
Without a `break` statement, the JavaScript engine falls through to the next case and executes its code **regardless of whether that case matches or not**:
```javascript
let number = 1;
switch (number) {
  case 1:
    console.log("One");
  case 2:
    console.log("Two");
  case 3:
    console.log("Three");
}
/* Output: (Fall-through bug!)
  "One"
  "Two"
  "Three"
*/
```

---

## Part 9: Switch Strict Equality & Multiple Cases

### 1. Switch uses Strict Equality (`===`)
Case matches perform strict comparison with no type coercion:
```javascript
let dayName = "Monday";

switch (dayName) {
  case "monday": // Lowercase match fails!
    console.log("Start of week.");
    break;
  default:
    console.log("Default day.");
}
// Output: "Default day."
```

### 2. Matching Multiple Cases (Or Logic)
You can stack cases together to execute the same block of code for different values:
```javascript
let city = "Agra";

switch (city) {
  case "Bangalore":
  case "Kolkata":
  case "Agra":
  case "Jaipur":
    console.log("Location belongs to: India");
    break;
  default:
    console.log("Location belongs to: USA");
}
// Output: "Location belongs to: India"
```

---

## Part 10: Application-Level Projects

### Project 1: ATM Withdrawal Validator
```javascript
let withdrawAmount = 500;
let accountBalance = 1200;

if (withdrawAmount <= 0) {
  console.log("Transaction Failed: Invalid amount.");
} else if (withdrawAmount > accountBalance) {
  console.log("Transaction Failed: Insufficient funds.");
} else if (withdrawAmount % 100 !== 0) {
  console.log("Transaction Failed: Dispenser supports $100 notes only.");
} else {
  accountBalance -= withdrawAmount;
  console.log(`Withdrawal complete! New balance: $${accountBalance}`);
}
```

### Project 2: Movie Ticket Pricing Calculator
```javascript
let age = 25;
let ticketPrice;

if (age < 12) {
  ticketPrice = 3.00; // Kid price
} else if (age <= 60) {
  ticketPrice = 10.00; // Standard price
} else {
  ticketPrice = 8.00; // Senior discount
}
console.log(`Your ticket costs: $${ticketPrice.toFixed(2)}`);
```

### Project 3: Basic Calculator
```javascript
let a = 10;
let b = 5;
let operator = "+";

switch (operator) {
  case "+":
    console.log("Result:", a + b);
    break;
  case "-":
    console.log("Result:", a - b);
    break;
  case "*":
    console.log("Result:", a * b);
    break;
  case "/":
    console.log("Result:", a / b);
    break;
  default:
    console.log("Operator not recognized.");
}
```

---

## Part 11: Production-Grade Design Patterns

### Pattern 1: The Early Return Pattern (Avoid Nesting)
When processing configurations or requests, nested conditionals lead to a "Pyramid of Doom" that is hard to read and debug.

*   ❌ **Bad (High Nesting):**
    ```javascript
    function processUserLogin(user) {
      if (user) {
        if (user.isVerified) {
          if (user.hasSubscription) {
            console.log("Welcome to premium dashboard!");
          }
        }
      }
    }
    ```

*   🟢 **Pro (Early Return):** Clean, linear structure that handles validation errors immediately at the top of the function:
    ```javascript
    function processUserLogin(user) {
      if (!user) return; // Exit early
      if (!user.isVerified) return; // Exit early
      if (!user.hasSubscription) return; // Exit early

      console.log("Welcome to premium dashboard!"); // Primary path
    }
    ```

### Pattern 2: Replacing Conditionals with Object Mapping
When comparing a variable against many strings to return values, avoid building massive `if...else if` lists. Use an object dictionary map instead.

*   ❌ **Bad (Repetitive checks):**
    ```javascript
    let userRole = "editor";
    let permissions;
    
    if (userRole === "admin") {
      permissions = "Full admin control panel access";
    } else if (userRole === "editor") {
      permissions = "Article modify and publishing access";
    } else {
      permissions = "Read-only view access";
    }
    ```

*   🟢 **Pro (Object Lookup):** Cleaner, faster, and highly extendable:
    ```javascript
    const PERMISSION_ROLES = {
      admin: "Full admin control panel access",
      editor: "Article modify and publishing access",
      guest: "Read-only view access"
    };

    const userRole = "editor";
    const userAccess = PERMISSION_ROLES[userRole] || PERMISSION_ROLES.guest;
    console.log(userAccess); // "Article modify and publishing access"
    ```

---

## Part 12: Truthy and Falsy Gotchas

In conditional checks, JavaScript coerces non-Boolean values to Boolean representation:

### Falsy values:
`false`, `0`, `-0`, `0n`, `""` (Empty string), `null`, `undefined`, `NaN`.

### Tricky Truthy cases:
Empty objects and empty arrays are **truthy** in JavaScript:
```javascript
if ([]) {
  console.log("Empty arrays are truthy!"); // Prints
}

if ({}) {
  console.log("Empty objects are truthy!"); // Prints
}
```

---

## Part 13: Interview Questions & Exercises

### Q1: What is the main difference between `if` and `switch`?
**Answer:** `if` is more flexible and can evaluate complex conditional ranges and logical comparisons. `switch` compares a single expression against static values using strict equality (`===`), making it cleaner for mapping exact keys.

### Q2: What is the benefit of the Early Return pattern?
**Answer:** It keeps function scopes flat, decreases the number of nested branches, and improves code readability by validation checking at the top of the function structure.

### Practice Exercises:
1.  **Triangle Evaluator:** Check three side variables (`a`, `b`, `c`) and determine if the triangle is *Equilateral*, *Isosceles*, or *Scalene*.
2.  **Device Viewport Tracker:** Given a browser width, classify it as `Mobile` (`< 768px`), `Tablet` (`< 1024px`), or `Desktop` (otherwise).
3.  **Authentication Routing:** Write an early-return check evaluating login status.
4.  **ATM withdrawer limit:** Enforce withdrawals to be multiples of $100 and within balance.
5.  **Calculator:** Build a switch structure evaluating mathematical operands.
