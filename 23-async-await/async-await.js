//Async-Await
//--------------
//Syntax
// async function functionName() {
//    // code to be executed
//    await promise;
//    // more code to be executed after promise is resolved
// }
//await pauses the execution of its surrounding async function until the promise is settled (either resolved or rejected).

// async function hello(){
//     return "Hello, Async-Await!";
// }
// hello().then((message) => console.log(message)); // Output: Hello, Async-Await!

//Example with await
// function resolveAfter2Seconds() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('Resolved after 2 seconds');
//         }, 2000);
//     });
// }

// async function asyncCall() {
//     console.log('Calling an async function...');
//     const result = await resolveAfter2Seconds();
//     console.log(result); // Output: Resolved after 2 seconds
// }
// asyncCall(); // Output: Calling an async function...

function getData(dataId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Data", dataId);
      resolve("success");
    }, 3000);
  });
}

function getData2(dataId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Data", dataId);
      resolve("success");
    }, 2000);
  });
}
// getData(1).then(() => {
//   getData(2).then(() => {
//     getData(3).then(() => {
//       console.log("All Data Received");
//     });
//   });
// })

// async function getAllData() {
//   await getData(1);
//   await getData(2);
//   await getData(3);
//   console.log("All Data Received from getData");
//   await getData2(1);
//   await getData2(2);
//   await getData2(3);
//   console.log("All Data Received from getData2");
// }
// getAllData(); // Output: Data 1, Data 2, Data 3, All Data Received

//call using IIFE
(async function () {
  console.log("Getting Data From getData....");
  await getData(1);
  await getData(2);
  await getData(3);
  console.log("All Data Received from getData");
  console.log("Getting Data From getData2....");
  await getData2(1);
  await getData2(2);
  await getData2(3);
  console.log("All Data Received from getData2");
})();
