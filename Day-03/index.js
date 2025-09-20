console.log("Day 03");

// Operator - Symbols + - * /
// Operands - x + y, x and y are the operands.
// Expression x = 2 / 3 + 4

// Arithmetic Operators
console.log("**** Arithmetic Operators ****");
let a = 12;
let b = 5;

let f_name = "tapas";
let l_name = "adhikary";

console.log(f_name + l_name); // Don't do this!

console.log(a + b); // Addition
console.log(a - b); // Subtraction
console.log(b - a); // Subtraction
console.log(a * b); // Multiplication
console.log(a / b); // Division
console.log(a ** b); // Exponentiation
console.log(a % b); // Modulo

let count = 5;
console.log(count--); // count = count - 1
console.log(count);

console.log(--count); // count = count - 1

// Assignment Operators
console.log("**** Assignment Operators ****");

let x = 10;
x += 5; // x = x + 5 (15)
x -= 3; // x = x - 3 (12)
x *= 2; // x = x * 2 (24)
x /= 4; // x = x / 4 (6)

// Comparison Operators
console.log("**** Comparison Operators ****");
console.log(0 == false); // true
console.log(3 == "3"); // true
console.log(3 != "3"); // false

console.log(3 === "3"); // false

console.log(null === null); // true
console.log(undefined === undefined); // true

// NaN = Not a Number

let obj1 = { name: "javaScript" }; // XX0011
let obj2 = { name: "javaScript" }; // YY022

console.log(obj1 === obj2); // false
console.log(obj1 !== obj2); // true

console.log(4 > 3); // true
console.log(2 > 1); // true
console.log(1 > 7); // false
console.log(2 >= 2); // true

console.log(4 < 3); // false
console.log(2 < 7); // true
console.log(3 <= 9); // true

// Logical operators
console.log("**** Logical operators ****");
// && || ?? !

console.log(false && false); // false
console.log(true && false); // false
console.log(true && true); // true
console.log(false && true); // false

console.log("Cow" && "Horse"); // "Horse"

console.log(false || false); // false
console.log(true || false); // true
console.log(true || true); // true
console.log(false || true); // true

console.log("Cow" || "Horse"); // "Cow"

console.log(!false); // true

let a1 = null ?? 1; // 1
let a2 = undefined ?? 3; // 3
const a3 = false ?? "javaScript"; // false
const a4 = 0 ?? "html"; // 0

// Conditional (ternary) operator
console.log("**** Conditional (ternary) operator ****");

// condition ? val1 : val2
let age = 23;
console.log(age >= 60 ? "Senior Citizen" : "Non Senior Citizen");

// Bitwise operators
console.log("**** Bitwise operators ****");

// Bitwise AND ( & ), OR ( | ), XOR ( ^ ), NOT ( ~ ), Left Shift ( << ), Right Shift ( >> )

console.log(15 & 9); // 9
console.log(15 | 9); // 15
console.log(15 ^ 9); // 6
console.log(9 << 2); // 36
console.log(9 >> 2); // 2

// Explanation for bitwise operations:
console.log(`
Bitwise AND ( & ):
--------------------
15 & 9 = 9
Binary representation:
1111 & 1001 = 1001
Explanation: 
1 * (2 ** 0) + 0 * (2 ** 1) + 0 * (2 ** 2) + 1 * (2 ** 3) = 9

Bitwise OR ( | ):
--------------------
15 | 9 = 15
Binary representation:
1111 | 1001 = 1111
Explanation: 1111 is the result when OR operation is applied between the two.

Bitwise XOR ( ^ ):
--------------------
15 ^ 9 = 6
Binary representation:
1111 ^ 1001 = 0110
Explanation: The XOR operation results in 1 when the corresponding bits are different.

Bitwise Left Shift ( << ):
----------------------------
9 << 2 = 36
Binary representation:
1001 << 2 = 100100
Explanation: Shifting the bits to the left by 2 positions, adding zeros to the right.

Bitwise Right Shift ( >> ):
-----------------------------
9 >> 2 = 2
Binary representation:
1001 >> 2 = 0010
Explanation: Shifting the bits to the right by 2 positions, dropping bits.

`);

// Grouping
console.log("**** Grouping ****");

let p = 1;
let q = 2;
let r = 3;

console.log(p + q * r); // 1 + 2 * 3 = 1 + 6 = 7
console.log(p + q * r); // 7

console.log((p + q) * r); // (1 + 2) * 3 = 3 * 3 = 9

console.log(p * r + q * r); // 1 * 3 + 2 * 3 = 3 + 6 = 9

console.log(p * (r + q) * r);

// typeof
console.log("**** typeof ****");

console.log(typeof "Mahesh"); // "string"
console.log(typeof false); // "boolean"

let size = 100;
console.log(typeof size); // "number"

const numbers = [1, 2, 3, 4];
console.log(typeof numbers); // "object"

console.log(typeof null); // "object"

// instanceof
console.log("**** instanceof ****"); // Will discuss later at functions concept and objects classes
