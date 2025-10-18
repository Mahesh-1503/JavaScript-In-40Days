function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;
      if (success) {
        resolve("Data fetched successfully");
      } else {
        reject("Error while fetching data");
      }
    }, 3000);
  });
}
fetchData()
  .then((data) => {
    console.log(data);
  })
  .then(() => {
    console.log("Processing data successful...");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Fetch attempt finished.");
  });

// Rule 1: You can only do one of the three things from the .then() method. You can return another promise(for async operation). You can return any other value from a synchronous operation. Lastly, you can throw an error.
// Rule 2: If you return a value from the .then() method, it will be wrapped in a resolved promise automatically.
// Rule 3: If you throw an error from the .then() method, it will be caught by the .catch() method.
