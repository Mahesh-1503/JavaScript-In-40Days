console.log("Day 13: The this keyword");

// The 'this' keyword refers to the object it belongs to.
// Its value is determined dynamically by *how* a function is called.

// -----------------------------------------------------------------
// ## 1. Value of 'this' outside a function/object (Global Context)

var a = 10;
// In the global execution context (outside any function or object), 'this' refers to the global object.
// In browsers, the global object is 'window'.
console.log(this); // Logs the 'window' object.
console.log(window); // Logs the 'window' object.

// Global variables declared with 'var' become properties of the 'window' object.
console.log(this.a); // Logs 10 (since this is window, and window.a is 10).
console.log(window.a); // Logs 10.
console.log("------------------------");

// -----------------------------------------------------------------
// ## 2. Value of 'this' inside a regular function (Non-strict mode)

function add() {
  // In a regular function call (simple invocation), 'this' also defaults to the global object ('window')
  // when not using strict mode. This is often referred to as "this leakage".
  console.log(this.a); // Logs 10 (this is window).
  console.log(window.a); // Logs 10.
}
add();
console.log("-------------------------");

// -----------------------------------------------------------------
// ## 3. Value of 'this' inside a method

var movie = {
  name: "KGF",
  // When a function is called as a method of an object (object.method()),
  // 'this' refers to the object *that owns* the method (the object before the dot).
  getName: function () {
    console.log(this); // Logs the entire 'movie' object: {name: "KGF", getName: [Function]}
    console.log(this.name); // Logs "KGF".
  },
};
movie.getName();

// -----------------------------------------------------------------
// ## 4. Value of 'this' inside an event handler

// NOTE: This code snippet requires an HTML element with id="btn" to run in a browser.
// When a function is used as an event handler, 'this' typically refers to the
// DOM element on which the listener was attached.
/*
document.getElementById("btn").addEventListener("click", function () {
    console.log(this); // Logs the DOM element object (the button with id="btn").
});
*/

// -----------------------------------------------------------------
// ## 5. Value of 'this' inside a function in strict mode

// In strict mode, 'this' inside a regular function call does NOT default to the global object.
// Instead, it remains **undefined**, preventing accidental modification of the global scope.
/*
function strictAdd() {
    "use strict"; 
    console.log(this); // Logs 'undefined'
}
strictAdd();
*/
// The strict mode explanation is typically shown in a separate file/environment, as noted:
// -->usingStrict_mode.html
