// Object.keys() is a JavaScript method that returns an array of a given object's own enumerable property names (keys), in the same order as you would get with a for...in loop (but it ignores properties up the prototype chain).

const student = {
  name: "Alice",
  age: 20,
  grade: "A",
};

const keys = Object.keys(student);

console.log(keys); // Output: ["name", "age", "grade"]

// Explanation:
// student is an object with three properties: name, age, and grade.
// Object.keys(student) extracts all the property names (keys) from the student object and returns them as an array.
// The result is ["name", "age", "grade"].

// Summary:
// Object.keys(obj) is useful when you want a list of all the property names (keys) in an object, for tasks like looping or property validation.
// It only includes the object's own properties, not those inherited through the prototype chain.
