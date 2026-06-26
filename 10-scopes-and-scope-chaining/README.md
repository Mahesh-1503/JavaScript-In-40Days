# Day 10: Scopes & Scope Chaining (Trello Workspace Scopes)

Scopes define the accessibility boundaries of variables and functions in your code. To write clean, secure software, you must understand how JavaScript creates scopes and how it crawls the **Scope Chain** to resolve variable references.

---

## 1. Mental Model (Trello Workspace Scopes)

Think of a project management system like **Trello**:
1. **Global Workspace Level:** Settings shared across the entire company (e.g. `companyName`, `activeDomain`).
2. **Board Level:** Settings scoped to a specific board (e.g., `boardTitle = "Q3 Marketing Campaign"`).
3. **List Level:** Settings scoped to a list of tasks (e.g. `listName = "To-Do"`).
4. **Card Level:** Details restricted to a single task card (e.g., `cardName = "Fix Checkout Bug"`).

In JavaScript:
- Card-level code can easily access List-level, Board-level, and global settings. This lookup process is the **Scope Chain**.
- However, the Board-level context has no access to private card-level variables. Variables flow *inwards* (lexical nesting), not outwards.

---

## 2. Visual Thinking (Scope Chain Lookup)

JavaScript resolves variables by crawling upwards through nested lexical environments:

```
GLOBAL SCOPE [Lexical Parent: null]
 ├── companyName = "Stripe"
 │
 └── BOARD SCOPE [Lexical Parent: Global]
      ├── boardId = "b_101"
      │
      └── LIST SCOPE [Lexical Parent: Board]
           ├── listId = "l_55"
           │
           └── CARD SCOPE [Lexical Parent: List]
                └── cardId = "c_909"
                     
                     Looking up "companyName" inside Card Scope:
                     [Card Scope] ──► Not found 
                          │
                          ▼ (Chain Up)
                     [List Scope] ──► Not found
                          │
                          ▼ (Chain Up)
                     [Board Scope] ──► Not found
                          │
                          ▼ (Chain Up)
                     [Global Scope] ──► Found! ("Stripe")
```

---

## 3. Beginner Explanation

- **Scope:** The area of your code where a variable is visible and can be used.
- **Global Scope:** Variables written outside any function or block. They can be accessed from *anywhere* in your script.
- **Local/Function Scope:** Variables created inside a function. They can only be accessed *inside* that function.
- **Block Scope:** Variables declared with `let` or `const` inside `{ ... }` curly braces (like loops or `if` blocks). They are locked inside those braces.
- **Scope Chaining:** The process where JavaScript looks for a variable. If it can't find it in the current scope, it looks in the outer scope, and keeps looking until it reaches the Global Scope.

---

## 4. Deep Explanation (Lexical Scope Resolution)

Under the hood, JavaScript utilizes **Lexical Scoping** (also called Static Scoping). This means scoping is determined entirely by where variables and blocks are written in the source code file at compile time, NOT where they are invoked at runtime.

1. **Lexical Environment:** Each execution context has an associated Lexical Environment object. It consists of:
   - **Environment Record:** The actual storage of local variables and function declarations.
   - **Reference to outer environment:** A link pointer to its parent's Lexical Environment.
2. **Variable Resolution:** When the engine tries to read a variable:
   - It searches the current Environment Record.
   - If not found, it follows the outer environment pointer to the parent context.
   - This continues up the scope chain. If the variable is not found even in the Global Environment (where the outer pointer is `null`), the engine throws a `ReferenceError`.
3. **Lookup Cost:** Accessing global variables takes slightly longer than local variables because the engine must traverse multiple scopes. Minifiers optimize this by caching parent variables locally when queried repeatedly.

---

## 5. Real Production Examples (Trello scopes)

### 1. Global Workspace Configs (Global Scope)
```javascript
const companyDomain = "trello.com";
const userAuthenticationToken = "auth_tok_8992";
```

### 2. Scoped Board Actions (Block Scoping with Let/Const)
Variables declared inside a function or loop cannot leak out.
```javascript
function loadBoard(boardId) {
  const boardTitle = "Sprint Planning"; // Scoped to loadBoard FEC
  
  if (boardId === "b_101") {
    const boardBgColor = "#0079BF"; // Block-scoped to this if-statement
    console.log(`Loading ${boardTitle} with color ${boardBgColor}`);
  }
  // console.log(boardBgColor); // BUG: ReferenceError: boardBgColor is not defined
}
loadBoard("b_101");
```

### 3. Dynamic Card Scopes (Nested Function Resolution)
```javascript
const globalTheme = "blue"; // Global

function renderBoard() {
  const boardLayout = "Kanban"; // Parent Local Scope
  
  function renderCard() {
    const cardTitle = "Update Stripe Webhooks"; // Local Scope
    // Accesses local cardTitle, parent boardLayout, and globalTheme via Scope Chain
    console.log(`Rendered: ${cardTitle} on ${boardLayout} board (Theme: ${globalTheme})`);
  }
  renderCard();
}
renderBoard();
```

### 4. Custom Card Status Gate (Lexical Scoping Rules)
Lexical scope is static. It does not matter *where* a function runs; it always remembers where it was written.
```javascript
const boardOwner = "Alice";

function checkCardPermissions() {
  // Always resolves to "Alice", regardless of who calls checkCardPermissions
  console.log(`Authorized board owner: ${boardOwner}`); 
}

function simulateUserAction() {
  const boardOwner = "Bob"; // Variable shadowing inside local execution context
  checkCardPermissions(); // Invokes function. Output: "Authorized board owner: Alice"
}
simulateUserAction();
```

### 5. Private Counters using Scoped Functions
```javascript
function createCardIdGenerator() {
  let cardCount = 0; // Private variable encapsulated inside parent lexical environment
  return function() {
    cardCount++;
    return `Card_ID_${cardCount}`;
  };
}
const generateId = createCardIdGenerator();
console.log(generateId()); // "Card_ID_1"
```

---

## 6. Progressive Coding (Permission Resolvers)

### Level 1: Beginner (Global variable collision)
```javascript
// BAD: Shared mutable global variables create collisions when multiple boards run
var currentBoardId = "b_1";

function loadBoardOne() {
  currentBoardId = "board_alpha";
}

function loadBoardTwo() {
  currentBoardId = "board_beta"; // Overwrites shared board ID
}
```

### Level 2: Better (Function Scoping variables)
```javascript
// BETTER: Variable names isolated inside their execution context scopes
function loadBoardOne() {
  const currentBoardId = "board_alpha";
}

function loadBoardTwo() {
  const currentBoardId = "board_beta";
}
```

### Level 3: Production (Scoped Namespace Modules)
```javascript
// PRODUCTION: Encapsulating board settings in clean namespace closures
const boardService = {
  createBoard: (id, title) => {
    const boardState = { id, title }; // Isolated
    return {
      getDetails: () => `Board: ${boardState.title} (${boardState.id})`
    };
  }
};
const sprintBoard = boardService.createBoard("b_99", "Sprint 24");
```

### Level 4: Enterprise (Contextual Workspace Scope Registry)
```javascript
// ENTERPRISE: A hierarchical registry tracking settings from Workspace down to Cards,
// enforcing strict scope-based lookups and protecting parent configurations.
class ContextScopeRegistry {
  constructor(name, parentScope = null) {
    this.name = name;
    this.parentScope = parentScope;
    this.bindings = new Map();
  }

  set(key, value) {
    this.bindings.set(key, value);
  }

  // Crawl the scope chain manually to simulate V8 resolution
  resolve(key) {
    if (this.bindings.has(key)) {
      return this.bindings.get(key);
    }
    
    // Chain up to parent scope if exists
    if (this.parentScope) {
      console.log(`[SCOPE-CHAIN] Key "${key}" not found in [${this.name}]. Chaining up to [${this.parentScope.name}].`);
      return this.parentScope.resolve(key);
    }
    
    throw new ReferenceError(`Variable "${key}" is not defined in any lexical scope context.`);
  }
}

// Setup Hierarchical Scopes
const globalWorkspace = new ContextScopeRegistry("Global Workspace");
globalWorkspace.set("companyName", "Trello Enterprise");

const boardScope = new ContextScopeRegistry("Marketing Board", globalWorkspace);
boardScope.set("boardColor", "blue");

const cardScope = new ContextScopeRegistry("Task Card #99", boardScope);
cardScope.set("taskTitle", "Design Instagram Assets");

// Lookups
console.log(cardScope.resolve("taskTitle"));  // Found locally in Card
console.log(cardScope.resolve("boardColor")); // Chained to Board
console.log(cardScope.resolve("companyName"));// Chained to Global
```

---

## 7. Common Mistakes

1. **Global Scope Pollution:**
   Declaring variables without `const` or `let` leaks them into the global scope:
   ```javascript
   function setWorkspaceName() {
     workspaceName = "My Workspace"; // BUG: leaks to global window.workspaceName
   }
   ```
2. **Variable Shadowing Confusion:**
   Declaring a local variable with the exact same name as a parent variable blocks access to the parent variable in that scope.
   ```javascript
   const currentTheme = "dark";
   function loadComponent() {
     const currentTheme = "light"; // Shadows parent theme
     console.log(currentTheme); // "light"
   }
   ```
3. **Reference errors due to block scoping:**
   ```javascript
   if (true) {
     let userToken = "tok_882";
   }
   console.log(userToken); // BUG: ReferenceError! userToken is locked inside the if block.
   ```

---

## 8. Best Practices

1. **Use Scoped Constants (`const`) first:** Minimizes state leakage and side effects.
2. **Keep the scope chain short:** Avoid nesting functions more than 3 levels deep to limit lookup speeds.
3. **Minimize Global Bindings:** Use namespaces, classes, or modules to bundle global attributes together instead of adding them directly to the global `window` scope.

---

## 9. Interview Preparation

### Q1: What is the difference between Lexical Scope and Dynamic Scope?
**Answer:** 
- **Lexical Scope (Static Scoping):** Scope boundaries are determined by where variables and functions are written in the source code at compile time. JavaScript uses Lexical Scoping.
- **Dynamic Scope:** Scope boundaries are determined by the calling stack at runtime. It does not matter where the function was written; it matters *who* called it.

### Q2: What is variable shadowing?
**Answer:** Variable shadowing occurs when a variable declared inside a nested scope has the exact same name as a variable declared in an outer parent scope. The local variable "shadows" the outer variable, blocking access to it within that local scope.

### Q3: How does the JS Engine resolve a variable that is not present in local scope?
**Answer:** The engine references the current Lexical Environment. If the variable is not in the Environment Record, it follows the reference pointer to the outer parent environment. It repeats this traversal up the scope chain. If it reaches the global environment (outer reference is `null`) and still cannot find the variable, it throws a `ReferenceError` (or creates a global variable in non-strict legacy mode).

---

## 10. Homework

1. **Scope Chain Auditor:** Write 3 levels of nested functions. In the deepest function, access variables from all outer levels. Log the outputs and trace the scope chain paths.
2. **Accidental Global Logger:** Write a script in non-strict mode that leaks variables into the global scope. Then, add `"use strict"` at the top and confirm that the engine catches and blocks the leak.
3. **Variable Shadowing Test:** Create a global variable, a function variable, and a block variable with the same name. Log their values at different execution lines and explain which scope resolves first.
4. **Scope Registry Simulator:** Write a mock compiler resolver function that maps variable tokens against parent scopes, throwing custom ReferenceErrors when keys do not exist in the environment grid.
5. **Closure Counter:** Write a function that registers board logs. Protect the log history array by nesting it inside the function scope, returning a closure to append messages.
