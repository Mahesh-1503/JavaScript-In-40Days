// Constructor Function Example

// A constructor function is used to create multiple objects with the same structure and methods.
// The 'this' keyword refers to the new object being created.
function Car(name, model) {
    this.name = name;
    this.model = model;
}

// Creating new Car objects using the constructor function
const bmwCar = new Car("BMW", "X1");
const audiCar = new Car("Audi", "A8");

console.log(bmwCar);  // Output: Car { name: 'BMW', model: 'X1' }
console.log(audiCar); // Output: Car { name: 'Audi', model: 'A8' }

// instanceof checks if an object is created from a specific constructor
console.log(bmwCar instanceof Car); // true

// Another way to create an object: using the built-in Object constructor
const person = new Object();
person.name = "Alpha";
person.age = 76;
console.log(person); // Output: { name: 'Alpha', age: 76 }
