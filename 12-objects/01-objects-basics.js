// JavaScript Objects: A Guide for Beginners

// We wrap the code in an IIFE (Immediately Invoked Function Expression)
// to ensure the variables and logic are contained and don't interfere with other scripts.
(function () {
  console.log("=======================================");
  console.log(" JS Objects: The Foundation of Data ");
  console.log("=======================================");

  // An object is a collection of key-value pairs (properties).
  // Think of it like a personalized data container.

  // -------------------------------------------------------------
  // SECTION 1: Object Creation and Property Access
  // -------------------------------------------------------------

  let user = {
    name: "Mahesh",
    lastName: "Kumar",
    age: 20,
    // Key with a space MUST be wrapped in quotes
    "is admin": true,
  };

  console.log("\n--- 1. Accessing Data ---");
  console.log("Initial User Object:", user);

  // METHOD A: DOT NOTATION (The easiest way)
  // Use this when the property key is a simple, valid word (like name, age).
  console.log("Access (Dot Notation) - Name:", user.name);

  // METHOD B: BRACKET NOTATION (The most flexible way)
  // 1. MUST be used for keys with spaces or special characters.
  console.log("Access (Bracket Notation) - Is Admin:", user["is admin"]);

  // 2. Used for dynamic access (when the key is stored in a variable).
  let keyToFind = "age";
  console.log("Bracket Notation (Dynamic Key 'age'):", user[keyToFind]); // Output: 20

  // NOTE: If you try 'user.keyToFind', JavaScript looks for a literal key named "keyToFind", which doesn't exist.
  console.log("Dot Notation (Incorrectly using variable):", user.keyToFind); // Output: undefined

  // -------------------------------------------------------------
  // SECTION 2: Modification, Addition, and Deletion
  // -------------------------------------------------------------

  console.log("\n--- 2. Modification and Deletion ---");

  // UPDATE: Change an existing property value
  user.age = 21;
  console.log("Age updated to:", user.age);

  // ADD: Assign a value to a non-existent property to create it
  user.gender = "male";
  user.isSeniorCitizen = false;
  user["movie lover"] = true; // Adding a key with a space
  console.log("New Properties Added:", user);

  // DELETE: Remove a property entirely using the 'delete' keyword
  delete user.lastName;
  delete user["is admin"];
  console.log("Object after deletion:", user);

  // -------------------------------------------------------------
  // SECTION 3: Dynamic Property Names (Computed Keys)
  // -------------------------------------------------------------
  // You can define a property key using a variable directly when creating the object.

  console.log("\n--- 3. Dynamic Property Names ---");

  // In a browser, this prompt would ask for input. We'll hardcode a value to run the code.
  let carName = "Tesla Model 3"; // Imagine the user typed this in the prompt

  // Using square brackets [ ] inside the object definition makes the variable's VALUE the key.
  let carDetails = {
    [carName]: 5, // The key becomes "Tesla Model 3"
    color: "Red",
  };

  console.log(
    "The variable value ('" + carName + "') became the key:",
    carDetails
  );

  // -------------------------------------------------------------
  // SECTION 4: Objects are Reference Types (The CRITICAL Concept)
  // -------------------------------------------------------------
  // Objects are not copied by value (like numbers). They are copied by reference.

  console.log("\n--- 4. Objects are Reference Types ---");

  let obj1 = { value: 10 };
  // obj2 doesn't get a copy of the data; it gets a pointer (a reference) to the SAME object in memory.
  let obj2 = obj1;

  console.log("Initial | obj1:", obj1.value, "| obj2:", obj2.value);

  // If we change the object via obj2...
  obj2.value = 20;

  // ...obj1 sees the change because they are both looking at the same data!
  console.log("Change via obj2 | obj1:", obj1.value, "| obj2:", obj2.value); // Both are 20

  // If we delete the property via obj2...
  delete obj2.value;

  // ...it's gone for obj1 too!
  console.log("Delete via obj2 | obj1:", obj1.value, "| obj2:", obj2.value); // Both are undefined

  console.log(
    "Takeaway: When you assign an object, you are assigning a reference."
  );
})();


//Dynamic Object Creation from User Input (Uncomment to use in a browser environment)
/*
(function () {
  console.log("=======================================");
  console.log(" Dynamic Object Creation from User Input ");
  console.log("=======================================");


  let user = {};
  let key = prompt("Enter a key:");
  let value = prompt("Enter a value:");

  user[key] = value;
  console.log("User Object:", user);
})();*/