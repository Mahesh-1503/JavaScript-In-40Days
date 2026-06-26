# Day 26: JavaScript Modules (ES Modules vs. CommonJS - Shopify Plugins)

As codebases scale, writing all logic in a single file or relying on global scripts becomes unmanageable. JavaScript **Modules** solve this by allowing you to split code into isolated files that export specific elements (functions, variables, classes) and import them where needed, preventing naming collisions.

---

## 1. Mental Model (Shopify App Plugins)

Think of a **Shopify App Platform**:
- Shopify has a core system. Developers write third-party plugins (e.g. `TaxCalculator`, `DiscountBadge`, `InventoryAlert`) to add features.
- If these plugins were loaded as global scripts:
  - If two different plugins declared a variable `let count = 0;`, the scripts would overwrite each other, causing the store to crash.
- **The Module Solution:** Each plugin is written as an isolated **Module**. A module has its own private scope. It only exposes what it explicitly **exports** (e.g., `export function calculateTax`). Other modules can explicitly **import** it. The rest of the plugin's variables stay completely hidden and safe.

---

## 2. Visual Thinking (ESM vs. CommonJS Execution)

How the two primary module systems resolve and load files:

```
[ COMMONJS (CJS) - Dynamic & Synchronous ]
Runtime Executed: require('./plugin')
  1. JS engine runs code line-by-line.
  2. Hits require(), stops execution, reads file from disk.
  3. Returns a cached copy of the exported object.
  - Common in Node.js (legacy/backend).

[ ES MODULES (ESM) - Static & Asynchronous ]
Compile-time Analyzed: import { calculateTax } from './tax.js'
  1. Engine scans imports BEFORE running any code (Static Analysis).
  2. Builds a dependency graph.
  3. Establishes live bindings (read-only references).
  4. Runs code asynchronously, enabling optimizations like Tree Shaking.
  - Standard in modern browsers and React.
```

---

## 3. Beginner Explanation

- **Module:** An isolated file containing JavaScript code. Code inside is private by default.
- **Export:** Making specific functions or variables in a file available to other files.
- **Import:** Loading exported functions or variables from another file.
- **CommonJS (CJS):** The older module system used by Node.js, utilizing `require()` and `module.exports`.
- **ES Modules (ESM):** The modern, official standard module system, utilizing `import` and `export`.

---

## 4. Deep Explanation (Static Analysis, Bindings, & Tree Shaking)

### 1. Static Analysis vs. Runtime Evaluation
- **CommonJS is dynamic:** You can call `require()` inside `if` statements or loop blocks. The engine evaluates the import paths at runtime.
- **ES Modules are static:** `import` and `export` statements must reside at the very top level of the file. They cannot go inside conditions or blocks. This allows bundlers (like Vite) to analyze imports *without running the code*, building a clean dependency map.

### 2. Tree Shaking Optimization
Because ES Modules are statically analyzed, the bundler can identify if a function is imported but never actually called in your codebase. During production compilation, the unused code is excluded ("shaken off") from the final bundle, reducing file sizes.

### 3. Read-Only Live Bindings
CommonJS exports values by copying them. ES Modules export **live bindings** (read-only references to the original variables in the exported module):
```javascript
// tax.js (ESM)
export let taxRate = 0.1;
export function setTax(val) { taxRate = val; }

// app.js
import { taxRate, setTax } from './tax.js';
console.log(taxRate); // 0.1
setTax(0.2);
console.log(taxRate); // 0.2 (Live binding updated automatically!)
// taxRate = 0.3; // TypeError: Assignment to constant variable (Imports are read-only!)
```

---

## 5. Real Production Examples (Shopify App Plugins)

### 1. CommonJS Plugin Export & Import (Legacy Node style)
```javascript
// taxCalculator.js
const baseRate = 0.08;

function calculateVAT(price) {
  return price * baseRate;
}

// Export as an object
module.exports = {
  calculateVAT,
  systemName: "Shopify Tax v1"
};

// === HOW TO CALL & IMPORT THIS ===
// mainApp.js
const taxModule = require('./taxCalculator');
console.log(taxModule.systemName); // Output: "Shopify Tax v1"
console.log(taxModule.calculateVAT(100)); // Output: 8
```

### 2. ES Modules Named Exports (Modern JS / React style)
Using named exports to share multiple items from a single file.
```javascript
// discountBadge.js
export const seasonalDiscount = 0.15;

export function applyDiscount(price) {
  return price * (1 - seasonalDiscount);
}

// === HOW TO CALL & IMPORT THIS ===
// productCard.js
import { applyDiscount, seasonalDiscount } from './discountBadge.js';

console.log(seasonalDiscount); // Output: 0.15
console.log(applyDiscount(200)); // Output: 170
```

### 3. ES Modules Default Export
Using default exports for files that share exactly one primary class or component.
```javascript
// InventoryManager.js
export default class InventoryManager {
  constructor() {
    this.stock = {};
  }
  updateStock(item, qty) {
    this.stock[item] = qty;
  }
}

// === HOW TO CALL & IMPORT THIS ===
// app.js
import InventoryManager from './InventoryManager.js'; // Note: No curly braces!

const manager = new InventoryManager();
manager.updateStock("Socks", 50);
console.log(manager.stock); // Output: { Socks: 50 }
```

### 4. Dynamic `import()` (Lazy Loading Modules)
Loading modules asynchronously on-demand inside functions.
```javascript
// pluginLoader.js
function loadFeaturePlugin(pluginName) {
  // Returns a promise
  import(`./plugins/${pluginName}.js`)
    .then((plugin) => {
      plugin.initialize();
    })
    .catch((err) => {
      console.error(`Failed to load plugin: ${pluginName}`, err);
    });
}

// === HOW TO CALL & EXECUTING THIS ===
// Trigger load only when user clicks a button
loadFeaturePlugin("reviewSystem"); 
```

### 5. Namespace Re-exporting (Aggregators)
Grouping multiple modules through a single entry point file (commonly `index.js`).
```javascript
// components/index.js
export { default as Button } from './Button.js';
export { default as Header } from './Header.js';
export { applyDiscount } from './discountBadge.js';

// === HOW TO CALL & IMPORT THIS ===
// app.js
import { Button, Header, applyDiscount } from './components/index.js';
```

---

## 6. Progressive Coding (Shopify Module Architecture)

### Level 1: Beginner (Global Script Pollution - Collision Risk)
```html
<!-- index.html -->
<!-- BAD: Variables leak globally. If script2 has 'let discount = 10', it crashes! -->
<script>
  let discount = 5;
</script>
<script>
  // Throws syntax crash error if redeclared
  let discount = 10; 
</script>
```

### Level 2: Better (IIFE Scoped Sandbox Modules)
```javascript
// BETTER: Wraps code in immediate functions to protect variables.
const discountPlugin = (function() {
  const discountRate = 0.1;
  return {
    apply: (price) => price * (1 - discountRate)
  };
})();

console.log(discountPlugin.apply(100)); // Output: 90
```

### Level 3: Production (Static ES Modules Setup)
```javascript
// PRODUCTION: Files are fully decoupled. Imports are resolved statically.
// File: discount.js
export const rate = 0.1;
export const calc = (val) => val * (1 - rate);

// File: app.js
import { calc } from './discount.js';
console.log(calc(100)); // Output: 90
```

### Level 4: Enterprise (Asynchronous Plugin Management Sandbox)
```javascript
// ENTERPRISE: Sandbox-ready, dynamically imports plugins, catches missing exports, 
// handles loading indicator states, and validates runtime interface schemas.
class PluginManager {
  constructor() {
    this.activePlugins = new Map();
  }

  async loadAndRegister(pluginId, path) {
    console.log(`[PLUGIN-LOAD] Initiating import: ${pluginId}`);
    try {
      // Dynamic ESM import
      const module = await import(path);
      
      // Validate interface contract requirements
      if (!module.initialize || typeof module.initialize !== 'function') {
        throw new Error('Plugin missing mandatory initialize() function');
      }

      module.initialize();
      this.activePlugins.set(pluginId, module);
      console.log(`[PLUGIN-SUCCESS] ${pluginId} registered.`);
    } catch (error) {
      console.error(`[PLUGIN-FAIL] Registration rejected for ${pluginId}:`, error.message);
      throw error;
    }
  }
}

// === CALLING & EXECUTING THIS ===
// Mocking plugin file at ./mockPlugin.js containing:
// export function initialize() { console.log("Mock Initialized"); }
const manager = new PluginManager();
manager.loadAndRegister("analytics", "./mockPlugin.js");
```

---

## 7. Common Mistakes

1. **Mixing ESM and CJS syntax in the same file:**
   You cannot call `require()` and `import` inside the same scope. The compiler will throw syntax parsing errors.
2. **Missing file extensions in native ESM imports:**
   ```javascript
   // BUG: Browsers and Node.js (with ESM enabled) require explicit extensions.
   import { helper } from './utils'; // WRONG!
   import { helper } from './utils.js'; // CORRECT
   ```
3. **Attempting to mutate imports:**
   ```javascript
   import { discountRate } from './discount.js';
   discountRate = 0.25; // BUG: Imports are read-only bindings!
   ```

---

## 8. Best Practices

1. **Default to ES Modules:** Use ES Modules (`"type": "module"` in `package.json`) in all new frontend and backend projects.
2. **Use Named Exports for Collections:** Named exports (`export const x = 1`) make tree-shaking and auto-complete in IDEs work significantly better than default exports.
3. **Group Files via Index Aggregators:** Use an `index.js` file to export components from directories. This keeps import paths clean and short.

---

## 9. Interview Preparation

### Q1: What is the difference between ES Modules (ESM) and CommonJS (CJS)?
**Answer:**
- **ES Modules (ESM):** The official standard. Uses `import`/`export`. It is statically analyzed at compile time, enabling tree-shaking and dynamic code optimization. Imports are read-only live bindings.
- **CommonJS (CJS):** Node.js standard. Uses `require()`/`module.exports`. It evaluates dynamically at runtime. It imports values by copy, meaning exported variables do not auto-update when modified.

### Q2: What is "Tree Shaking" and how do ES Modules enable it?
**Answer:** Tree Shaking is dead-code elimination. It relies on the static structure of ES Modules. Because imports and exports are declared at the file roots, bundlers can build a dependency map before executing code. Any exported functions that are never imported or called in the final build are excluded from the output bundle, reducing code sizes.

### Q3: What is a live binding in ES Modules?
**Answer:** A live binding means that when an imported module modifies a variable it exported, that modification is immediately reflected in the importing module. The imported variable behaves like a read-only reference pointer to the original variable, rather than a copied value snapshot.

---

## 10. Homework

1. **Named vs Default Export Audit:** Build a module containing math helpers. Export some as named exports and one as default. Import them using correct syntax.
2. **Dynamic Lazy-Loader Button:** Construct an HTML page. Add a button that dynamically imports a heavy calculation module (`import()`) only when the user clicks.
3. **Build Components Aggregator index:** Create a folder with 3 component files. Write an `index.js` aggregator re-exporting them, and import them all in a single line.
4. **CommonJS to ESM Migration:** Take a CommonJS folder using `module.exports` and `require()`, convert it to ES Modules using `.js` imports, and run it in Node.js.
5. **Analyze the Static Graph Compiler:** Write a paragraph explaining how static analysis enables bundlers to map dependencies and shake dead-code.
