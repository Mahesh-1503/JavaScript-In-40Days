// -----------------------------
// Explicit Binding in JavaScript
// -----------------------------

// The call() method
// -----------------------------
// call() allows you to explicitly set 'this' to refer to a specific object
// and immediately invoke the function with given arguments.

function greeting() {
  console.log(`Hello, ${this.name} belongs to ${this.address}`);
}

const user = {
  name: "tapaScript",
  address: "All of YOU!",
};

// Here, 'this' inside greeting() refers to 'user'
greeting.call(user); // Output: Hello, tapaScript belongs to All of YOU!

// Example 2: call() with parameters
const likes = function (hobby1, hobby2) {
  console.log(this.name + " likes " + hobby1 + " , " + hobby2);
};

const person = {
  name: "Tapas",
};

// Pass arguments individually with call()
likes.call(person, "Teaching", "Blogging");
// Output: Tapas likes Teaching , Blogging

// The apply() method
// -----------------------------
// apply() is similar to call(), but it takes arguments as an array.

const hobbiesToApply = ["Sleeping", "Eating"];

// Pass arguments as an array with apply()
likes.apply(person, hobbiesToApply);
// Output: Tapas likes Sleeping , Eating

// The bind() method
// -----------------------------
// bind() also lets you set 'this', but it does NOT immediately invoke the function.
// Instead, it returns a new function with the bound context and arguments.

const newHobbies = function (hobby1, hobby2) {
  console.log(this.name + " likes " + hobby1 + " , " + hobby2);
};

const officer = {
  name: "Bob",
};

// Bind creates a new function where 'this' refers to 'officer'
const newFn = newHobbies.bind(officer, "Dancing", "Singing");

// The function must be explicitly invoked
newFn();
// Output: Bob likes Dancing , Singing

// The new Binding
// -----------------------------
// When you use 'new', a new object is created and 'this' inside the constructor
// refers to that newly created object.

const Cartoon = function (name, animal) {
  this.name = name;
  this.animal = animal;
  this.log = function () {
    console.log(this.name + " is a " + this.animal);
  };
};

// Each new object gets its own copy of properties and methods
const tomCartoon = new Cartoon("Tom", "Cat");
tomCartoon.log(); // Output: Tom is a Cat

const jerryCartoon = new Cartoon("Jerry", "Mouse");
jerryCartoon.log(); // Output: Jerry is a Mouse
