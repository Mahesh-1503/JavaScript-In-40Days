/**
 * Day 30: Modern ES6+ Features Demo Code
 * Context: SaaS Admin Dashboard & Configuration System
 * 
 * Run this file using Node.js:
 * node 30-modern-es6-plus-features/demo.js
 */

console.log("==============================================================");
console.log("🚀 DAY 30: MODERN ES6+ FEATURES DEMO (SAAS ADMIN SYSTEM)");
console.log("==============================================================\n");

// ==========================================
// 1. VARIABLES & SCOPE (Block Scoping)
// ==========================================
console.log("--- 1. Variables & Scope ---");
{
  // 🔴 NOOB: Leaking scope using var
  var noobRole = "Guest";
  if (true) {
    var noobRole = "Admin"; // Overwrites outer var!
  }
  console.log(`[Noob] Active Role (Should be Guest, got): ${noobRole}`); // Prints "Admin"

  // 🟢 PRO: Isolated block scopes using let and const
  const proRole = "Guest";
  if (true) {
    const proRole = "Admin"; // Safely shadowed in block scope
  }
  console.log(`[Pro] Active Role (Correctly preserved): ${proRole}\n`); // Prints "Guest"
}

// ==========================================
// 2. TEMPLATE STRINGS (Interpolation & Multi-line)
// ==========================================
console.log("--- 2. Template Strings ---");
{
  const service = "Stripe Webhook Gateway";
  const status = "Healthy";
  const port = 8080;

  // 🔴 NOOB: String concatenation with '+'
  var noobLog = "System Alert:\n" +
                "Service: " + service + "\n" +
                "Status: " + status + "\n" +
                "Address: http://localhost:" + port;
  console.log("[Noob Log]:\n" + noobLog);

  // 🟢 PRO: Backticks, string interpolation, and native multi-line
  const proLog = `System Alert:
Service: ${service}
Status: ${status}
Address: http://localhost:${port}`;
  console.log("[Pro Log]:\n" + proLog + "\n");
}

// ==========================================
// 3. LITERALS & EXPONENTIATION
// ==========================================
console.log("--- 3. Literals & Exponents ---");
{
  // 🔴 NOOB: Base 10 integer comparisons & Math.pow()
  var basePortMultiplier = 8;
  var noobMaxPorts = Math.pow(2, basePortMultiplier);
  var noobAdminBitmask = 10; // decimal representation of 0b1010
  console.log(`[Noob] Exponent: ${noobMaxPorts}, Bitmask: ${noobAdminBitmask}`);

  // 🟢 PRO: Binary/Octal literals and '**' operator
  const proMaxPorts = 2 ** 8; // Clean syntax
  const proAdminBitmask = 0b1010; // Binary literal
  const proOctalConfig = 0o755; // Octal permission flags
  console.log(`[Pro] Exponent: ${proMaxPorts}, Bitmask: ${proAdminBitmask}, Octal Config: ${proOctalConfig}\n`);
}

// ==========================================
// 4. NEW LIBRARY METHODS (String, Number, Math, Array)
// ==========================================
console.log("--- 4. New Library Additions ---");
{
  // -- Strings --
  const apiRoute = "/api/v1/billing/checkout";
  // Noob: indexOf check
  const noobHasBilling = apiRoute.indexOf("billing") !== -1;
  // Pro: includes / startsWith
  const proHasBilling = apiRoute.includes("billing");
  const proIsApi = apiRoute.startsWith("/api");
  const paddedId = "5432".padStart(8, "0"); // "00005432"
  console.log(`[Pro String] Has Billing: ${proHasBilling}, Is API: ${proIsApi}, Padded ID: ${paddedId}`);

  // -- Numbers --
  const floatVal = 0.1 + 0.2;
  const noobIsEqual = floatVal === 0.3; // false (floating point accuracy issue!)
  // Pro: Number.EPSILON comparison, Number.isInteger, Number.isNaN
  const proIsEqual = Math.abs(floatVal - 0.3) < Number.EPSILON; // true
  const isInt = Number.isInteger(100); // true
  const isNotNumber = Number.isNaN("NotANumber"); // false (safe type check, doesn't coerce string)
  console.log(`[Pro Number] Safe float match: ${proIsEqual}, Is Integer: ${isInt}, Type-safe NaN check: ${isNotNumber}`);

  // -- Arrays --
  // Creating arrays from array-like objects (e.g. arguments, HTMLCollections)
  function sumArguments() {
    // Noob: Array.prototype.slice.call
    var argsNoob = Array.prototype.slice.call(arguments);
    // Pro: Array.from
    const argsPro = Array.from(arguments);
    return argsPro.reduce((acc, v) => acc + v, 0);
  }
  const sum = sumArguments(10, 20, 30);
  const instantiatedArray = Array.of(5); // [5] (avoids standard constructor new Array(5) which creates empty slot array)
  console.log(`[Pro Array] Sum: ${sum}, Instantiated Array: [${instantiatedArray}]\n`);
}

// ==========================================
// 5. CLASSES & OOP MECHANICS
// ==========================================
console.log("--- 5. Classes & OOP Mechanics ---");
{
  // 🔴 NOOB: ES5 Prototypes
  function NoobUser(name, email) {
    this.name = name;
    this.email = email;
  }
  NoobUser.prototype.getProfile = function() {
    return this.name + " (" + this.email + ")";
  };

  function NoobAdmin(name, email, role) {
    NoobUser.call(this, name, email); // Super call
    this.role = role;
  }
  NoobAdmin.prototype = Object.create(NoobUser.prototype); // Inheritance setup
  NoobAdmin.prototype.constructor = NoobAdmin;
  NoobAdmin.prototype.getProfile = function() {
    return NoobUser.prototype.getProfile.call(this) + " - Role: " + this.role; // Super method override
  };

  var oldAdmin = new NoobAdmin("Alice", "alice@noob.com", "billing_admin");
  console.log(`[Noob OOP] Profile: ${oldAdmin.getProfile()}`);

  // 🟢 PRO: Modern ES6 Classes with private properties & static helpers
  class ProUser {
    #email; // Encapsulated private property

    constructor(name, email) {
      this.name = name;
      this.#email = email;
    }

    // Getter method
    get email() {
      return this.#email;
    }

    getProfile() {
      return `${this.name} (${this.#email})`;
    }
  }

  class ProAdmin extends ProUser {
    constructor(name, email, role) {
      super(name, email); // Inits super class properties
      this.role = role;
    }

    // Method overriding (Polymorphism)
    getProfile() {
      return `${super.getProfile()} - Role: ${this.role}`;
    }

    // Static helper method
    static createDefault(name) {
      return new ProAdmin(name, "admin@saas.com", "viewer");
    }
  }

  const modernAdmin = new ProAdmin("Alice", "alice@saas.com", "billing_admin");
  console.log(`[Pro OOP] Profile: ${modernAdmin.getProfile()}`);
  console.log(`[Pro OOP] Private email accessed via getter: ${modernAdmin.email}`);
  
  const defaultAdmin = ProAdmin.createDefault("Bob");
  console.log(`[Pro OOP] Static Factory Profile: ${defaultAdmin.getProfile()}\n`);
}

// ==========================================
// 6. PROMISES & ASYNC/AWAIT
// ==========================================
console.log("--- 6. Promises & Async/Await ---");
{
  const mockApiSuccess = () => new Promise(resolve => setTimeout(() => resolve({ balanceUSD: 500 }), 50));
  const mockApiFailure = () => new Promise((_, reject) => setTimeout(() => reject(new Error("API Timeout")), 50));

  let isLoading = false;

  // 🟢 PRO: Consuming using async/await with try-catch-finally
  async function runDemo() {
    isLoading = true;
    console.log("[Billing] isLoading: " + isLoading); // true

    try {
      const data = await mockApiSuccess();
      console.log(`[Billing] Stripe response: $${data.balanceUSD}`);
      
      // Attempting failing API call to showcase error boundaries
      await mockApiFailure();
    } catch (err) {
      console.log(`[Billing] Expected error caught: ${err.message}`);
    } finally {
      isLoading = false;
      console.log("[Billing] Cleanup complete. isLoading: " + isLoading + "\n");
    }
  }

  runDemo();
}

// ==========================================
// 7. DESTRUCTURING ASSIGNMENTS
// ==========================================
// We wrap in timeout to prevent log overlapping with asynchronous Promise results above
setTimeout(() => {
  console.log("--- 7. Destructuring Assignments ---");
  
  const transactionPayload = {
    txId: "tx_998811",
    amount: 120,
    metadata: {
      gateway: "Stripe",
      currency: "USD"
    },
    flags: ["retry_allowed", "alert_on_fail"]
  };

  // 🔴 NOOB: Accessing objects/arrays manually
  var txIdNoob = transactionPayload.txId;
  var amountNoob = transactionPayload.amount;
  var gatewayNoob = transactionPayload.metadata.gateway;
  var firstFlagNoob = transactionPayload.flags[0];
  console.log(`[Noob Destructure] Tx: ${txIdNoob}, Amount: ${amountNoob}, Gateway: ${gatewayNoob}, Flag: ${firstFlagNoob}`);

  // 🟢 PRO: Nested destructuring with aliases, defaults, and array unpacks
  const {
    txId: transactionIdentifier, // Rename / Alias
    amount,
    metadata: { gateway, currency = "USD" }, // Nested destructuring with fallback default
    flags: [primaryFlag, secondaryFlag = "none"], // Array destructuring with default
    customerName = "Default SaaS Account" // Top-level missing key with default
  } = transactionPayload;

  console.log(`[Pro Destructure] Tx: ${transactionIdentifier}, Amount: ${amount}, Gateway: ${gateway}, Currency: ${currency}`);
  console.log(`[Pro Destructure] Flags: primary=${primaryFlag}, secondary=${secondaryFlag}`);
  console.log(`[Pro Destructure] Customer Name: ${customerName}\n`);
}, 100);

// ==========================================
// 8. SPREAD & REST OPERATORS
// ==========================================
setTimeout(() => {
  console.log("--- 8. Spread & Rest Operators ---");

  const defaultSettings = { theme: "dark", notifications: true, logging: false };
  const userOverrides = { theme: "light", logging: true };

  // 🔴 NOOB: Object.assign() or concat()
  var mergedSettingsNoob = Object.assign({}, defaultSettings, userOverrides);
  var listANoob = [1, 2];
  var listBNoob = [3, 4];
  var mergedListNoob = listANoob.concat(listBNoob);
  console.log(`[Noob Spread] Merged Settings logging: ${mergedSettingsNoob.logging}, List: [${mergedListNoob}]`);

  // 🟢 PRO: Spread operator for immutability and merging
  const mergedSettingsPro = { ...defaultSettings, ...userOverrides };
  const mergedListPro = [...listANoob, ...listBNoob, 5];
  console.log(`[Pro Spread] Merged Settings logging: ${mergedSettingsPro.logging}, List: [${mergedListPro}]`);

  // Rest Parameter in function signatures (variadic arguments)
  function sumMetrics(metricName, ...values) {
    // values is a native array grouping all parameters after metricName
    const total = values.reduce((sum, val) => sum + val, 0);
    return `[Metrics - ${metricName}] Total of ${values.length} records: ${total}`;
  }
  console.log(sumMetrics("API Requests", 400, 250, 600, 100) + "\n");
}, 150);

// ==========================================
// 9. ENHANCED OBJECT LITERALS
// ==========================================
setTimeout(() => {
  console.log("--- 9. Enhanced Object Literals ---");

  const serverName = "AWS_USEAST_1";
  const activeUsers = 1420;
  const targetEvent = "refresh";

  // 🟢 PRO: Property shorthand, method definition, and computed key names
  const monitorStats = {
    serverName,  // Shorthand property name (serverName: serverName)
    activeUsers, // Shorthand property name
    
    // Computed property name evaluated dynamically at runtime
    [`event_type_${targetEvent}`]: true,

    // Shorthand method declaration (No 'function' keyword needed)
    printSummary() {
      return `Server: ${this.serverName}, Users: ${this.activeUsers}, Has Refresh: ${this.event_type_refresh}`;
    }
  };

  console.log(`[Pro Enhanced Object]: ${monitorStats.printSummary()}`);
  console.log(`[Pro Object Entries]: ${JSON.stringify(Object.entries(monitorStats))}\n`);
}, 200);

// ==========================================
// 10. GENERATORS & CUSTOM ITERATOR INTERFACES
// ==========================================
setTimeout(() => {
  console.log("--- 10. Generators & Custom Iterators ---");

  // Custom Iterable using Symbol.iterator and Generator
  const clientAlertDatabase = {
    alerts: ["Database CPU spike", "Stripe auth token expired", "Disk threshold reached"],
    
    // Generator function attached to the Symbol.iterator hook
    *[Symbol.iterator]() {
      for (const alert of this.alerts) {
        yield `[ALERT SYSTEM] ${alert}`;
      }
    }
  };

  // Traverse the custom iterable directly using for...of
  console.log("[Pro Iterator] Starting logs broadcast:");
  for (const log of clientAlertDatabase) {
    console.log(`  -> ${log}`);
  }
  
  // Convert custom iterable into array using spread operator
  const allAlertsArray = [...clientAlertDatabase];
  console.log(`[Pro Iterator] Array conversion count: ${allAlertsArray.length}\n`);

  console.log("==============================================================");
  console.log("🟢 DEMO EXECUTION COMPLETE (All ES6+ features verified!)");
  console.log("==============================================================");
}, 250);
