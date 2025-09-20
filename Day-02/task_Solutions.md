````markdown
# JavaScript Task: Variables, Reassignments, and Objects

In this task, we will explore variables, reassignments, and data structures in JavaScript, such as objects and arrays.

## Task 1: Declare Variables for a Person’s Information

We will declare variables to store the following details about a person:

- Name
- Age
- `isStudent` status (whether the person is a student)
- Favorite programming language

### Code Example:

```javascript
let name = "John Doe";
let age = 25;
const isStudent = true;
let favoriteLanguage = "JavaScript";
```
````

### Explanation:

- `name` and `favoriteLanguage` are declared using `let`, which allows us to change their values later if needed.
- `age` is also declared using `let` for flexibility in reassignment.
- `isStudent` is declared using `const`, which means its value cannot be changed after assignment.

## Task 2: Print the Values to the Console

Next, we will print the values of the variables declared in Task 1 to the console.

### Code Example:

```javascript
console.log("Name: " + name);
console.log("Age: " + age);
console.log("Is a Student: " + isStudent);
console.log("Favorite Programming Language: " + favoriteLanguage);
```

### Explanation:

The `console.log()` function is used to print each of the variables to the console with a descriptive label, making it easy to see the output.

### Output:

```
Name: John Doe
Age: 25
Is a Student: true
Favorite Programming Language: JavaScript
```

## Task 3: Reassigning Values to `let` and `const` Variables

In this task, we will try to reassign values to both `let` and `const` variables. We will observe any errors that occur when attempting to reassign to a `const` variable.

### Code Example:

```javascript
// Reassigning a variable declared with let (allowed)
name = "Jane Doe"; // This works, as 'name' was declared with 'let'

// Attempting to reassign a variable declared with const (will throw an error)
isStudent = false; // This will cause an error because 'isStudent' was declared with 'const'
```

### Explanation:

- **`let`** allows reassignments. We can update the value of `name` because it was declared with `let`.
- **`const`** does **not** allow reassignment. If we try to change the value of `isStudent`, we will encounter an error because `isStudent` was declared using `const`.

### Error Example:

```
Uncaught TypeError: Assignment to constant variable.
```

## Task 4: Create an Object and an Array, Modify Them, and Observe Changes

In this task, we will:

1. Create an object and an array.
2. Assign them to new variables.
3. Modify the values inside the object and array, and observe how JavaScript handles it.

### Code Example:

```javascript
// Declare an object
const person = {
  name: "Alice",
  age: 30,
  isStudent: false,
};

// Declare an array
const languages = ["Python", "JavaScript", "C++"];

// Modify the object
person.name = "Bob"; // Reassign the 'name' property of the object

// Modify the array
languages.push("Ruby"); // Add a new item to the array

// Print the updated object and array
console.log(person); // { name: 'Bob', age: 30, isStudent: false }
console.log(languages); // ["Python", "JavaScript", "C++", "Ruby"]
```

### Explanation:

- **Object modification**: Although we declared the `person` object with `const`, we can still modify the properties (e.g., `person.name`).
- **Array modification**: Similarly, arrays declared with `const` are **mutable**. We can add, remove, or change elements inside the array, as shown by `languages.push()`.

### Output:

```
{ name: 'Bob', age: 30, isStudent: false }
["Python", "JavaScript", "C++", "Ruby"]
```

### Key Points:

- **`const`** prevents reassignment of the variable itself (e.g., the whole object or array), but it **does not** prevent changes to the content (properties or elements) within the object or array.
- **`let`** allows both reassignment of the variable and modification of the content.

---

## Conclusion

- **Task 1** helped us declare basic variables.
- **Task 2** demonstrated how to print variables to the console.
- **Task 3** illustrated the behavior of `let` and `const` variables when reassigned.
- **Task 4** showed how objects and arrays behave when modified, even when declared using `const`.

This task provides a foundational understanding of how JavaScript handles variables, objects, arrays, and reassignments.
