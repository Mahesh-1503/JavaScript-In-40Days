//Synchronous Code in JavaScript
console.log("Synchronous Code in JavaScript!!");
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
console.log("Line 4");
console.log("Line 5");

//Asynchronous Code in JavaScript
console.log("Asynchronous Code in JavaScript!!");
setTimeout(() => {
  console.log("Line 1");
}, 2000);
setTimeout(() => {
  console.log("Line 2");
});
console.log("Line 3");
console.log("Line 4");
console.log("Line 5");

//Another Way to Demonstrate Asynchronous Code
console.log("Another Way to Demonstrate Asynchronous Code!!");
setTimeout(delayedLog, 3000);

function delayedLog() {
  console.log("This is executed after 3 seconds");
}
console.log("This is executed immediately");

//Explanation:
// In the synchronous code section, each console.log statement is executed one after the other in the order they appear.

// In the asynchronous code section, the setTimeout function is used to delay the execution of the first two console.log statements. The first one will execute after 2 seconds, while the second one will execute as soon as possible after the current call stack is cleared. The other console.log statements execute immediately, demonstrating how asynchronous operations can lead to out-of-order execution compared to synchronous code.
// Note that the order of execution in the asynchronous code section may vary depending on the browser or JavaScript engine's implementation of the event loop and call stack.
// In both sections, the output will be displayed in the console in the order the console.log statements are executed.
// To see the output, open the browser's developer console.
// In the console, you will see the output of the console.log statements in the order they are executed.
