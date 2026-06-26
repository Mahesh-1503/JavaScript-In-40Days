# JavaScript Task: Variables, Reassignments, and Objects

In this task, you will explore variables, reassignments, and data structures in JavaScript, such as objects and arrays.

---

## Table of Contents

1. [Task 1: Declare Variables for a Person’s Information](#task-1-declare-variables-for-a-persons-information)
2. [Task 2: Print the Values to the Console](#task-2-print-the-values-to-the-console)
3. [Task 3: Reassigning Values to `let` and `const` Variables](#task-3-reassigning-values-to-let-and-const-variables)
4. [Task 4: Create and Modify Objects and Arrays](#task-4-create-and-modify-objects-and-arrays)
5. [Conclusion](#conclusion)

---

## Task 1: Declare Variables for a Person’s Information

Declare variables to store the following details about a person:

- **Name**
- **Age**
- **isStudent** status (whether the person is a student)
- **Favorite programming language**

### Example

```javascript
let name = "John Doe";
let age = 25;
const isStudent = true;
let favoriteLanguage = "JavaScript";
```

**Explanation:**

- `name` and `favoriteLanguage` are declared using `let`, which allows their values to be changed later if needed.
- `age` is also declared using `let` for flexibility in reassignment.
- `isStudent` is declared using `const`, so its value cannot be changed after assignment.

---

## Task 2: Print the Values to the Console

Print the values of the variables declared in Task 1 to the console.

### Example

```javascript
console.log("Name: " + name);
console.log("Age: " + age);
console.log("Is a Student: " + isStudent);
console.log("Favorite Programming Language: " + favoriteLanguage);
```

**Explanation:**

- The `console.log()` function prints each variable to the console with a descriptive label.

**Sample Output:**
```
Name: John Doe
Age: 25
Is a Student: true
Favorite Programming Language: JavaScript
```

---

## Task 3: Reassigning Values to `let` and `const` Variables

Try to reassign values to both `let` and `const` variables and observe the results.

### Example

```javascript
// Reassigning a variable declared with let (allowed)
name = "Jane Doe"; // This works

// Reassigning a variable declared with const (will throw an error)
isStudent = false; // This will cause an error
```

**Explanation:**

- **`let`** allows reassignments. You can update the value of `name`.
- **`const`** does **not** allow reassignment. Attempting to change `isStudent` will result in an error.

**Sample Error:**
```
Uncaught TypeError: Assignment to constant variable.
```

---

## Task 4: Create and Modify Objects and Arrays

1. Create an object and an array.
2. Assign them to variables.
3. Modify their contents and observe JavaScript's behavior.

### Example

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
person.name = "Bob";

// Modify the array
languages.push("Ruby");

// Print updated object and array
console.log(person);      // { name: 'Bob', age: 30, isStudent: false }
console.log(languages);   // ["Python", "JavaScript", "C++", "Ruby"]
```

**Explanation:**

- Although the `person` object and `languages` array are declared using `const`, their contents can still be changed (properties/elements can be updated, added, or removed).

**Sample Output:**
```
{ name: 'Bob', age: 30, isStudent: false }
["Python", "JavaScript", "C++", "Ruby"]
```

**Key Points:**

- **`const`** prevents reassignment of the variable itself (the reference), but **does not** prevent changes to the contents of objects or arrays.
- **`let`** allows both reassignment of the variable and modification of the content.

---

## Conclusion

- **Task 1**: Declared basic variables.
- **Task 2**: Demonstrated how to print variables to the console.
- **Task 3**: Illustrated the behavior of `let` and `const` variables when reassigned.
- **Task 4**: Explained how objects and arrays behave when modified, even when declared using `const`.

> This task provides a foundational understanding of how JavaScript handles variables, objects, arrays, and reassignments.

---
