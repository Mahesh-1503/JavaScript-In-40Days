// A factory function is a function that returns a new object each time it is called.
// It's a simple way to create multiple objects with similar structure and behavior.

// Here is a factory function called createUser.
// It takes two arguments, name and age, and returns a new user object with those properties.
// The returned object also has a greet method that logs the user's name.

function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(this.name);
    },
  };
}

// Let's create two users using the factory function.
const user1 = createUser("tapas", 39);
console.log(user1); // Output: { name: 'tapas', age: 39, greet: [Function: greet] }
user1.name; // 'tapas'
user1.age; // 39
user1.greet(); // Output: tapas

const user2 = createUser("bob", 32);
console.log(user2); // Output: { name: 'bob', age: 32, greet: [Function: greet] }

// The factory function makes it easy to create as many user objects as needed,
// each with its own properties and methods.

// Next, there's an example of a regular object with nested structure.

let profile = {
  name: "tapas",
  company: "CreoWis",
  // message is a method that shows a message about the user and their company
  message: function () {
    console.log(`${this.name} works at ${this.company}`);
  },
  // The address property is itself an object, containing location details
  address: {
    city: "Bangalore",
    pin: 56032,
    state: "Karnataka",
    country: "India",
    // greeting is a method inside the address object
    greeting: function () {
      console.log("Welcome to India");
    },
  },
};

// You can access and use nested properties and methods like this:
// profile.message();               // Output: tapas works at CreoWis
// profile.address.greeting();      // Output: Welcome to India

// Summary:
// - Factory functions help create multiple objects with similar structure easily.
// - Methods can be added to these objects directly inside the factory function.
// - Objects can have nested structures, and methods can be placed inside nested objects too.
