//Function Statement && Function Declaration
function a() {
  console.log("a is called");
}

//Function Expression
const b = function () {
  console.log("b is called");
};

//Anonymous Function
// function(){

// }

//Named Function Expression
const c = function xyz() {
  console.log("c is called");
};

//Difference between Parameters and Arguments
function sum(a, b) {
  console.log(a + b);
}

sum(2, 3); //2,3 are arguments

//First Class Functions:The Ability of a function to be used as.....
//1. A function can be stored in a variable
//2. A function can be stored in an array
//3. A function can be stored in an object
//4. A function can be passed as an argument to another function
//5. A function can return another function
//6. A function can be assigned as a value to a property

//Arrow Function
const d = () => {
  console.log("d is called");
};
