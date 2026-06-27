// ==========================================
// DAY 13 COMPLEMENTARY SCRIPT: JSON & OBJECTS
// ==========================================

console.log("--- 1. Basic JSON Serialization & Deserialization ---");
const ticket = {
  id: 101,
  title: "Server Latency Spike",
  priority: "P0",
  tags: ["infra", "api"]
};

// Serialize to JSON string
const jsonString = JSON.stringify(ticket);
console.log("JSON String:", jsonString);
console.log("Type of serialized ticket:", typeof jsonString);

// Deserialize back to JS Object
const parsedTicket = JSON.parse(jsonString);
console.log("Parsed Object ID:", parsedTicket.id);
console.log("Parsed Object Tags Array:", parsedTicket.tags);


console.log("\n--- 2. Custom Stringify Replacer & Formatting Space ---");
const employee = {
  name: "Vijay",
  role: "Lead Engineer",
  salary: 120000,
  ssn: "123-45-678",
  active: true
};

// Scenario A: Filtering specific keys using an array replacer
const filteredJSON = JSON.stringify(employee, ["name", "role", "active"], 2);
console.log("Indented & Filtered JSON string:\n", filteredJSON);

// Scenario B: Transforming values dynamically using a function replacer
const maskedJSON = JSON.stringify(employee, (key, value) => {
  if (key === "ssn") return "XXX-XX-XXXX"; // Mask sensitive data
  if (key === "salary") return undefined;   // Remove private data
  return value;
}, 2);
console.log("Masked JSON string:\n", maskedJSON);


console.log("\n--- 3. Custom Parse Reviver for Date Restorations ---");
const sessionJSON = '{"user":"Alice","loginTime":"2026-06-27T08:00:00.000Z"}';

// Naive parse (loginTime remains a string)
const naiveParsed = JSON.parse(sessionJSON);
console.log("Naive parse loginTime type:", typeof naiveParsed.loginTime); // string

// Parse with a custom reviver to restore Date object
const reviverParsed = JSON.parse(sessionJSON, (key, value) => {
  if (key === "loginTime") return new Date(value);
  return value;
});
console.log("Reviver parse loginTime type:", typeof reviverParsed.loginTime); // object
console.log("Is loginTime instance of Date:", reviverParsed.loginTime instanceof Date); // true
console.log("Formatted Login Hour:", reviverParsed.loginTime.getUTCHours()); // 8


console.log("\n--- 4. JSON Deep Copy Limitations vs. Native structuredClone ---");
const origObject = {
  name: "System Settings",
  timestamp: new Date(),
  pattern: /debug/i,
  meta: undefined,
  log() { console.log("logging..."); },
  symbolKey: Symbol("key")
};

// Deep copy using JSON
const jsonCopy = JSON.parse(JSON.stringify(origObject));
console.log("JSON Copy contents:", jsonCopy);
/*
  Expected:
  - timestamp is coerced to a ISO string, not a Date object.
  - pattern regex turns into an empty object '{}'
  - meta (undefined), log (function), and symbolKey (symbol) are completely omitted.
*/
console.log("Is JSON copied timestamp a Date?:", jsonCopy.timestamp instanceof Date); // false
console.log("Was 'meta' (undefined) copied?:", "meta" in jsonCopy); // false
console.log("Was 'log' (function) copied?:", "log" in jsonCopy); // false

// Deep copy using native structuredClone()
console.log("Attempting structuredClone(origObject)...");
try {
  const nativeCopy = structuredClone(origObject);
} catch (error) {
  console.log("Caught expected structuredClone error:", error.message);
}

// Clone again without the unclonable function
const clonableObject = {
  name: "System Settings",
  timestamp: new Date(),
  pattern: /debug/i,
  meta: undefined
};
const nativeCopy = structuredClone(clonableObject);
console.log("Native copy timestamp is Date:", nativeCopy.timestamp instanceof Date); // true
console.log("Native copy RegExp works:", nativeCopy.pattern.test("DEBUG_MODE")); // true
console.log("Was 'meta' (undefined) copied in native copy?:", "meta" in nativeCopy); // true

