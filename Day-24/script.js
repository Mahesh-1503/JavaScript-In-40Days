async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); // this is the url of the api
    const data = await response.json();
    console.log("Users fetched successfully:");
    console.log(data);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

getUsers();

//POST Request Example
async function createUser(user) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      // this is the url of the api
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log("User created successfully:");
    console.log(data);
  } catch (err) {
    console.error("Error creating user:", err);
  }
}
createUser({ name: "mahesh", email: "mahesh@example.com" });

//AJAX Explanation:
// AJAX (Asynchronous JavaScript and XML) is a technique used in web development to create asynchronous web applications. It allows web pages to be updated asynchronously by exchanging small amounts of data with the server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page. AJAX is commonly used with the Fetch API or XMLHttpRequest to make HTTP requests to servers and handle responses. It is a powerful tool for creating dynamic and responsive web applications.

// //PUT Request Example
// async function updateUser(userId, updatedInfo) {
//   try {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/users/${userId}`,
//       {
//         // this is the url of the api
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedInfo),
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//   } catch (err) {
//     console.error("Error updating user:", err);
//   }
// }
// updateUser(1, { name: "Updated Name", email: " updated@example.com" });

// //DELETE Request Example
// async function deleteUser(userId) {
//   try {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/users/${userId}`,
//       {
//         // this is the url of the api
//         method: "DELETE",
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//   } catch (err) {
//     console.error("Error deleting user:", err);
//   }
// }
// deleteUser(1);
