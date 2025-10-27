// =========================================
// 🔹 1. Array Looping Methods
// =========================================

let num = [10, 20, 30, 40, 50];

// 🔸 1️⃣ Traditional for loop
// ✅ Definition: Runs from index 0 to array.length - 1
// ✅ Best for: When you need index control or modify elements
console.log("👉 Using for loop:");
for (let i = 0; i < num.length; i++) {
  console.log(num[i]);
}

console.log("-".repeat(40));

// 🔸 2️⃣ for...of loop
// ✅ Definition: Iterates directly over array *values*
// ✅ Best for: Reading or using array elements directly
console.log("👉 Using for...of loop:");
for (let value of num) {
  console.log(value);
}

console.log("-".repeat(40));

// 🔸 3️⃣ forEach() method
// ✅ Definition: Executes a callback for each element
// ✅ Best for: Running functions on each element (cannot break/return early)
console.log("👉 Using forEach() loop:");
num.forEach((value) => console.log(value));
console.log("-".repeat(40));

// 🔸 4️⃣ for...in loop (⚠️ Not ideal for arrays)
// ✅ Definition: Iterates over *keys/indexes* of an object (or array indices)
// ✅ Best for: Objects, NOT arrays (because order isn’t guaranteed example==> [0, 4, 2, 3, 1] original array [10, 20, 30, 40, 50])
console.log("👉 Using for...in loop on array:");
for (let index in num) {
  console.log(`${index}: ${num[index]}`);
}

console.log("-".repeat(40));

// =========================================
// 🔹 2. Checking if an element exists in array
// =========================================

let fruits = ["Apple", "Banana", "Mango", "Orange"];
let searchFruit = "Mango";

// ✅ includes() → Checks if a value exists inside array (case-sensitive)
if (fruits.includes(searchFruit)) {
  console.log(`✅ ${searchFruit} is found in the array.`);
} else {
  console.log(`❌ ${searchFruit} is not found in the array.`);
}

console.log("-".repeat(40));

// =========================================
// 🔹 3. Object Looping
// =========================================

// ✅ for...in loop is used to iterate over *keys* of an object
let person = {
  name: "Mahesh",
  age: 21,
  city: "Hyderabad",
};

console.log("👉 Using for...in loop on object:");
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

console.log("-".repeat(40));

// =========================================
// 🔹 4. Array from other data types
// =========================================

// ✅ Array.from() → Converts iterable (like string, Set, or Map) into an array
let name = "Mahesh";
let nameArray = Array.from(name);
console.log("👉 Using Array.from() on string:");
console.log(nameArray); // ['M', 'a', 'h', 'e', 's', 'h']

console.log("-".repeat(40));

//Using Array.from() on Set
// ✅ Converts Set to Array
let numSet = new Set([1, 2, 3, 4, 5]);
let numArrayFromSet = Array.from(numSet);
console.log("👉 Using Array.from() on Set:");
console.log(numArrayFromSet); // [1, 2, 3, 4, 5]

console.log("-".repeat(40));
