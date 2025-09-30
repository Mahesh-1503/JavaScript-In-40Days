(function () {
  console.log("=======================================");
  console.log(" Dynamic Object Creation from User Input ");
  console.log("=======================================");

  let user = {};

  // Use a while (true) loop to allow continuous input
  while (true) {
    // 1. Prompt for the key
    let key = prompt(
      "Enter a property key (e.g., name, age, is admin). Press Cancel or leave blank to finish:"
    );

    // Exit condition: if the user clicks 'Cancel' (key is null) or enters an empty string
    if (key === null || key.trim() === "") {
      console.log("\n--- Input finished. ---\n");
      break;
    }

    // Clean up the key string
    key = key.trim();

    // 2. Prompt for the value
    let value = prompt(`Enter the value for the key=> ${key}: `);

    // Handle 'Cancel' on the value prompt by skipping this property but staying in the loop
    if (value === null) {
      console.log(`Skipping key: ${key}`);
      continue;
    }

    // 3. Dynamic Assignment using Bracket Notation
    // This is the key step: it uses the string stored in the 'key' variable as the property name.
    user[key] = value.trim();

    console.log(`Property added: "${key}"`);
  }

  // Display the final object
  console.log("=======================================");
  console.log("Final User Object:");
  console.log(user);
  console.log("=======================================");
})();
