// Example: Using for...in to loop through object properties

// Define a sample profile object
const profile = {
  name: "tapas",
  company: "CreoWis",
  age: 28,
  skills: ["JavaScript", "Node.js", "React"],
  address: {
    city: "Bangalore",
    country: "India",
    greeting: function () {
      console.log("Welcome to " + this.country + "!");
    },
  },
  message: function () {
    console.log(`Hello, I am ${this.name} and I work at ${this.company}.`);
  },
};

// for...in: Iterate over all enumerable properties of the object
for (let key in profile) {
  console.log("Key:", key);
  console.log("Value:", profile[key]);
}

console.log("All keys:", Object.keys(profile)); // Get all keys as an array

console.log("profile.salary:", profile.salary); // undefined (salary does not exist)

// Check if a property exists using 'in'
console.log("'salary' in profile:", "salary" in profile); // false
console.log("'name' in profile:", "name" in profile); // true

if (!profile.salary) {
  console.log("The salary property doesn't exist");
}

// Accessing nested properties and methods
console.log("Country:", profile.address.country); // India
profile.address.greeting(); // Calls greeting() method in address

console.log("Name:", profile.name); // "tapas"
console.log("Company:", profile.company); // "CreoWis"

profile.message(); // Calls message() method

/*
  Explanation:
  - The for...in loop iterates over all enumerable properties (including methods) of the object.
  - Object.keys(obj) returns an array of the object's own property names.
  - Accessing a non-existent property (profile.salary) returns undefined.
  - The 'in' operator checks if a property exists in the object (including inherited properties).
  - Example: "salary" in profile returns false, "name" in profile returns true.
  - Always check property existence using 'in' to prevent errors when accessing nested properties.
  - Methods can be called just like any property if they are functions.
  - Properties can be nested (like address.country).
*/
