console.log("........ Optional Chaining Operator (?.) in JavaScript .....");
console.log(
  "The optional chaining operator (?.) allows you to safely access deeply nested properties of an object without having to check if each reference in the chain is valid. If any reference is null or undefined, the expression short-circuits and returns undefined."
);

const person = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
};

// Accessing existing nested property
console.log(person?.address?.city); // "New York

// Accessing non-existing nested property safely
console.log(person?.address?.zip); // undefined
//zip property does not exist, but no error is thrown

// Accessing property of a null or undefined object
const anotherPerson = null;
console.log(anotherPerson?.name); // undefined
