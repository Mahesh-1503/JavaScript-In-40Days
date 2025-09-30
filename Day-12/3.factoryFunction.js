// factory
function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(this.name);
    },
  };
}

const user1 = createUser("tapas", 39);
console.log(user1);
user1.name;
user1.age;
user1.greet();
const user2 = createUser("bob", 32);
console.log(user2);

let profile = {
  name: "tapas",
  company: "CreoWis",
  message: function () {
    console.log(`${this.name} works at ${this.company}`);
  },
  address: {
    city: "Bangalore",
    pin: 56032,
    state: "Karnataka",
    country: "India",
    greeting: function () {
      console.log("Welcome to India");
    },
  },
};
