console.log("Learn Object Destructuring....");

// Sample object
const student = {
  name: "John Williamson",
  age: 9,
  std: 3,
  subjects: ["Maths", "English", "EVS"],
  parents: {
    father: "Brown Williamson",
    mother: "Sophia",
    email: "john-parents@abcde.com",
  },
  address: {
    street: "65/2, brooklyn road",
    city: "Carterton",
    country: "New Zealand",
    zip: 5791,
  },
};

/*
  ✅ Basic Object Destructuring
  - Extracts top-level properties directly from the object
  - Variable names must match the property names
*/
const { name, age, std, meal = "bread" } = student;
console.log(name); // "John Williamson"
console.log(age); // 9
console.log(std); // 3
console.log(meal); // "bread" (default value since meal doesn't exist in student)

/*
  ✅ Nested Object Destructuring
  - Accessing properties inside a nested object (parents)
  - You can go directly into nested levels using `{ outer: { inner } }`
*/
const {
  parents: { father, mother, email },
} = student;
console.log(father); // "Brown Williamson"
console.log(mother); // "Sophia"
console.log(email); // "john-parents@abcde.com"

/*
  ✅ Destructuring an Array (Inside the Object)
  - student.subjects is an array
  - We can destructure it like a normal array
*/
const { subjects, numberOfSubjects = subjects.length } = student;
const [sub1, sub2, sub3] = subjects;
console.log(sub1); // "Maths"
console.log(sub2); // "English"
console.log(sub3); // "EVS"
console.log(numberOfSubjects); // 3

/*
  ✅ Destructuring Another Nested Object (address)
  - Access properties inside student.address
*/
const {
  address: { street, city, country, zip },
} = student;
console.log(street); // "65/2, brooklyn road"
console.log(city); // "Carterton"
console.log(country); // "New Zealand"
console.log(zip); // 5791

/*
  ✅ Destructuring with Variable Renaming
  - Rename variables while destructuring
  - Useful to avoid naming conflicts or improve clarity
*/
const { name: studentName, age: studentAge } = student;
console.log(studentName); // "John Williamson"
console.log(studentAge); // 9

// 🧠 Key Takeaways
// Destructuring reduces repetition and makes code cleaner.
// Works with nested objects, arrays, and even allows renaming variables.
// Variable names must match property names unless you rename them.

// Aliases (Variable Renaming)
console.log("---Aliases---");

// Destructure with aliasing
const {
  name: fullName, // 'name' becomes 'fullName'
  age: studentAgeAlias, // 'age' becomes 'studentAgeAlias'
  std: gradeLevel, // 'std' becomes 'gradeLevel'
} = student;

console.log(fullName); // "John Williamson"
console.log(studentAgeAlias); // 9
console.log(gradeLevel); // 3

// Nested Object Destructuring with Aliases
const {
  parents: { father: dadName, mother: momName, email: parentEmail },
} = student;

console.log(dadName); // "Brown Williamson"
console.log(momName); // "Sophia"
console.log(parentEmail); // "john-parents@abcde.com"
// Aliased variables can be used without conflict
console.log(`Student: ${fullName}, Age: ${studentAgeAlias}`);
console.log(`Father: ${dadName}, Mother: ${momName}`);

// Default Values
console.log("---Default Values---");

// Destructure with default values
const {
  name: studentNameAlias = "Unknown",
  age: studentAgeAlias2 = 0,
  std: gradeLevelAlias = 1,
} = student;

console.log(studentNameAlias); // "John Williamson"
console.log(studentAgeAlias2); // 9
console.log(gradeLevelAlias); // 3

// Destructure with default values for nested objects
const {
  parents: {
    father: dadNameAlias = "Unknown",
    mother: momNameAlias = "Unknown",
    email: parentEmailAlias = "unknown@abcde.com",
  },
} = student;

console.log(dadNameAlias); // "Brown Williamson"
console.log(momNameAlias); // "Sophia"
console.log(parentEmailAlias); // "john-parents@abcde.com"
// Default values are used only if the property is undefined
console.log(`Student: ${studentNameAlias}, Age: ${studentAgeAlias2}`);
console.log(`Father: ${dadNameAlias}, Mother: ${momNameAlias}`); // Default values are used only if the property is undefined
console.log(`Email: ${parentEmailAlias}`);

// Destructuring Non-Existent Properties with Default Values
console.log("---Non-Existent Properties with Default Values---");

const {
  parents: {
    father: dadNameAlias2 = "Unknown",
    mother: momNameAlias2 = "Unknown",
    email: parentEmailAlias2 = "unknown@abcde.com",
    address: parentAddressAlias = "Unknown",
  },
} = student;

console.log(dadNameAlias2); // "Brown Williamson"
console.log(momNameAlias2); // "Sophia"
console.log(parentEmailAlias2); // "john-parents@abcde.com"
console.log(parentAddressAlias); // "Unknown" (default value since address doesn't exist in parents)
// Default values are used only if the property is undefined
console.log(`Father: ${dadNameAlias2}, Mother: ${momNameAlias2}`);
console.log(`Email: ${parentEmailAlias2}, Address: ${parentAddressAlias}`); // Default values are used only if the property is undefined

// Destructuring Arrays Inside Objects with Default Values
console.log("---Arrays Inside Objects with Default Values---");

/*
  ✅ Destructuring an Array (Inside the Object) with Default Values for numberOfSubjects
  - student.subjects is an array
  - We can destructure it like a normal array
  - Adding default value for numberOfSubjects
*/
const {
  subjects: [sub1Alias, sub2Alias, sub3Alias],
  numberOfSubjects: numberOfSubjectsAlias = 0, // Default value for numberOfSubjects
} = student;

console.log(sub1Alias); // "Maths"
console.log(sub2Alias); // "English"
console.log(sub3Alias); // "EVS"
console.log(numberOfSubjectsAlias); // 0 (default value since numberOfSubjects doesn't exist in student)
// Default values are used only if the property is undefined
console.log(`Subjects: ${sub1Alias}, ${sub2Alias}, ${sub3Alias}`);
console.log(`Number of Subjects: ${numberOfSubjectsAlias}`); // Default values are used only if the property is undefined

console.log("-----Destructuring to Function Parameter-----");

// Function that takes a student object and destructures it in the parameter
function displayStudentInfo({ name, age, std, subjects, numberOfSubjects }) {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`Grade: ${std}`);
  console.log(`Subjects: ${subjects.join(", ")}`);
  console.log(`Number of Subjects: ${numberOfSubjects}`);
}

displayStudentInfo(student); // Display student information
// Output:
// Name: John Williamson
// Age: 9
// Grade: 3
// Subjects: Maths, English, EVS
// Number of Subjects: undefined (since numberOfSubjects doesn't exist in student)
// You can also provide default values in the function parameter
function displayStudentInfoWithDefaults({
  name = "Unknown",
  age = 0,
  std = 1,
  subjects = [],
  numberOfSubjects = subjects.length,
}) {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`Grade: ${std}`);
  console.log(`Subjects: ${subjects.join(", ")}`);
  console.log(`Number of Subjects: ${numberOfSubjects}`);
}
displayStudentInfoWithDefaults(student); // Display student information with defaults

const students = [
  {
    name: "William",
    grade: "A",
  },
  {
    name: "Tom",
    grade: "A+",
  },
  {
    name: "Bob",
    grade: "B",
  },
];

for (let { name, grade } of students) {
  console.log(name, grade);
}

// for of loop with destructuring
for (let { name, grade } of students) {
  console.log(`Student: ${name}, Grade: ${grade}`);
} // Student: William, Grade: A
// Student: Tom, Grade: A+
// Student: Bob, Grade: B
// You can also provide default values in the loop
for (let { name = "Unknown", grade = "N/A" } of students) {
  console.log(`Student: ${name}, Grade: ${grade}`);
} // Student: William, Grade: A
// Student: Tom, Grade: A+
// Student: Bob, Grade: B
// If a property is missing, the default value will be used
