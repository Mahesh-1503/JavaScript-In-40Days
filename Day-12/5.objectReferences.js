// An object reference is a way for a variable to "point to" (reference) an object stored in memory, rather than storing the actual object value itself.

// Example

const obj1 = { name: "Alice" };
const obj2 = obj1; // obj2 now references the same object as obj1

obj2.name = "Bob";

console.log(obj1.name); // Output: "Bob"

// Explanation:
// obj1 is assigned an object.
// obj2 = obj1 means obj2 now refers to the same object as obj1 (not a copy).
// Changing a property through obj2 also changes it for obj1, since both reference the same object in memory.

// Key Points:
// Primitive values (like numbers, strings, booleans) are copied by value.
// Objects and arrays are copied by reference.
// If you assign an object to another variable, both variables reference (point to) the same object.
// Changes through any reference affect the same underlying object.

// An object reference means multiple variables can point to the same object in memory. Changing the object through any reference will affect all variables pointing to it.
