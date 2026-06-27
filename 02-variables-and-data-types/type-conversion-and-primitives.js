// ==========================================
// DAY 02 COMPLEMENTARY SCRIPT: PRIMITIVES & CONVERSIONS
// ==========================================

// 1. JAVASCRIPT COMMENTS
// This is a single-line comment. V8 ignores this line.

/*
  This is a multi-line or block comment.
  It can span multiple lines.
  Useful for complex architecture documentation.
*/

console.log("--- 1. Comments Check ---");
console.log("Comments successfully ignored by compiler!");

// 2. EXPLICIT TYPE CASTING
console.log("\n--- 2. Explicit Type Casting ---");

// String casting
const numVal = 123;
console.log("String(123) =>", String(numVal), "typeof:", typeof String(numVal));

// Number casting
const strVal = "456";
const invalidStr = "abc";
console.log("Number('456') =>", Number(strVal), "typeof:", typeof Number(strVal));
console.log("Number('abc') =>", Number(invalidStr), "(produces NaN)");
console.log("Number.isNaN(NaN) =>", Number.isNaN(Number(invalidStr)));

// Parsing integers and floats with suffixes
console.log("parseInt('42px') =>", Number.parseInt("42px", 10));
console.log("parseFloat('3.14159f') =>", Number.parseFloat("3.14159f"));

// Boolean casting: Truthy vs Falsy
console.log("Boolean('') =>", Boolean("")); // falsy empty string
console.log("Boolean('Hello') =>", Boolean("Hello")); // truthy
console.log("Boolean(0) =>", Boolean(0)); // falsy
console.log("Boolean({}) =>", Boolean({})); // truthy empty object
console.log("Boolean([]) =>", Boolean([])); // truthy empty array

// 3. IMPLICIT TYPE COERCION
console.log("\n--- 3. Implicit Type Coercion ---");

// String Coercion
console.log("'5' + 10 =>", "5" + 10); // "510" (coerces 10 to string)
console.log("'5' + true =>", "5" + true); // "5true"
console.log("10 + 20 + '5' =>", 10 + 20 + "5"); // "305" (left-to-right math then concat)

// Numeric Coercion
console.log("'10' - 2 =>", "10" - 2); // 8
console.log("'10' * '3' =>", "10" * "3"); // 30
console.log("true + 5 =>", true + 5); // 6
console.log("false * 9 =>", false * 9); // 0

// Loose vs Strict comparison
console.log("'5' == 5 =>", "5" == 5); // true (coerced to number)
console.log("'5' === 5 =>", "5" === 5); // false (strict type check)

// 4. STRINGS IN-DEPTH
console.log("\n--- 4. String Properties & Methods ---");
const text = "   JavaScript is Amazing!   ";
console.log("Original String: '%s'", text);
console.log("Length of String:", text.length);

const trimmed = text.trim();
console.log("Trimmed: '%s'", trimmed);
console.log("Char at index 0:", trimmed.charAt(0));
console.log("Index of 'is':", trimmed.indexOf("is"));
console.log("Includes 'Amazing':", trimmed.includes("Amazing"));
console.log("Slice(0, 10):", trimmed.slice(0, 10)); // "JavaScript"
console.log("Split by space:", trimmed.split(" ")); // Array
console.log("Replace 'Amazing' with 'Cool':", trimmed.replace("Amazing", "Cool"));

// 5. NUMBERS & FLOATING POINT PRECISION
console.log("\n--- 5. Numbers & Precision ---");
console.log("0.1 + 0.2 =>", 0.1 + 0.2); // 0.30000000000000004
console.log("0.1 + 0.2 === 0.3 =>", 0.1 + 0.2 === 0.3); // false

// Fix precision roundoff
const sumFixed = (0.1 + 0.2).toFixed(2);
console.log("(0.1 + 0.2).toFixed(2) =>", sumFixed, "typeof:", typeof sumFixed);
console.log("Number.parseFloat(sumFixed) === 0.3 =>", Number.parseFloat(sumFixed) === 0.3); // true

// Number constants
console.log("Max Representable Value:", Number.MAX_VALUE);
console.log("Safe Integer Boundary:", Number.MAX_SAFE_INTEGER);

// 6. SYMBOLS FOR UNIQUE METADATA KEY
console.log("\n--- 6. Symbols ---");
const key1 = Symbol("transaction_id");
const key2 = Symbol("transaction_id");
console.log("Symbol('transaction_id') === Symbol('transaction_id') =>", key1 === key2); // false (uniqueness)

// Use Symbol as hidden property
const client = {
  [key1]: "TX_9901A",
  name: "Arun Kumar",
  balance: 5000
};

console.log("Client properties keys:", Object.keys(client)); // ['name', 'balance'] (Symbol is skipped!)
console.log("Direct access Symbol property value:", client[key1]); // "TX_9901A"
