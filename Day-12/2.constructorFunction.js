// Cosntructor Function
function Car(name, model) {
    this.name = name;
    this.model = model
}

const bmwCar = new Car("BMW", "X1");
const audiCar = new Car("Audi", "A8");
console.log(bmwCar)
console.log(audiCar)

console.log(bmwCar instanceof Car);

const person = new Object()
person.name = "Alpha";
person.age = 76;
console.log(person);
