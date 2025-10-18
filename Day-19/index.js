console.log("Promises");
//-What is a Promise in JavaScript?
//-Callback to Promise
//-Understanding Promise States
//-How promises are resolved and rejected
//-Handling Promises
//-Promise Chaining
//-Handling Multiple Promises

// A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

// //-Create a Promise
// const promise = new Promise((resolve, reject)=>{

// });

// //-Executor function
// function(resolve, reject){
//     //Logic goes here
//     resolve()
//     reject()
// }

//-Promise States
//1. Pending:Initial state, neither fulfilled nor rejected.
//2. Fulfilled:operation completed successfully(resolved).
//3. Rejected:operation failed(rejected).
//-result-
//Undefined:The promise is still pending.
//Value:The promise is fulfilled with a value.
//Error:The promise is rejected with an error.

//-Creating a Promise
// const promise = new Promise((resolve, reject)=>{
//     resolve("Promise Resolved Successfully");
// })
// const promise2 = new Promise((resolve, reject)=>{
//     reject("Promise Rejected");
// })
//-Handling Promises
//.then():used to handle fulfilled promises.
//.catch():used to handle rejected promises.
//.finally():used to execute code regardless of the promise outcome.
// promise.then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// }).finally(()=>{
//     console.log("Promise has been settled.");
// });

// promise2.then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// }).finally(()=>{
//     console.log("Promise has been settled.");
// });

// let loading = false;
// const promise = new Promise((resolve, reject) => {
//   if (loading) {
//     resolve("Promise Resolved Successfully");
//   } else {
//     reject("Promise Rejected");
//   }
// });
// promise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Promise has been settled.");
//   });

// - Promise Chaining
//Rule 1: Every promise gives you a .then() handler method. Every rejected promise provides you a .catch() handler method.
// Rule 2: You can do mainly three valuable things from the .then() method.You can return another promise(for async operation). You can return any other value from a synchronous operation. Lastly, you can throw an error.

let getUser = new Promise((resolve, reject) => {
  const user = {
    name: "Joe Black",
    email: "joeblack@gmail.com",
    password: "joeblack123",
    permission: ["db", "hr", "admin"],
  };
  resolve(user);
});
getUser
  .then((user) => {
    console.log(`User fetched: ${user.name}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Banglore`);
      }, 2000);
    });
  })
  .then((address) => {
    console.log(`User address is ${address}`);
  });

// Return a simple value form .then() handler
getUser
  .then((user) => {
    console.log(`User fetched: ${user.name}`);
    return user.email;
  })
  .then((email) => {
    console.log(`User email is ${email}`);
  });
// .then((value)=>{
//     console.log(`Value returned is ${value}`);
// }).then((value) => {
//     console.log(`Value returned is ${value}`);
// });

// Throw an error from .then() handler
getUser
  .then((user) => {
    console.log(`User fetched: ${user.name}`);
    if (!user.permission.includes("admin")) {
      throw new Error("User does not have admin permission");
    }
    return user.permission;
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });
// .then((address) => {
//     console.log(`User address is ${address}`);
// }).catch((error)=>{
//     console.log(`Error: ${error.message}`);
// });
