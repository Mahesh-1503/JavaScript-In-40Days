## 1. Odd or Even?

```js
let num = 7; // Example number
if (num % 2 === 0) {
  console.log(`${num} is even.`);
} else {
  console.log(`${num} is odd.`);
}
```

---

## 2. Do you have a Driving License?

```js
let age = 17; // Example age
if (age >= 18) {
  console.log(`You are eligible for a driving license.`);
} else {
  console.log(`You are not eligible for a driving license.`);
}
```

---

## 3. Calculate CTC with a Bonus

```js
let monthlySalary = 12300;
let annualSalary = monthlySalary * 12;
let bonus = annualSalary * 0.2;
let ctc = annualSalary + bonus;
console.log(`Your annual CTC including bonus is ₹${ctc}`);
```

---

## 4. Write a program for the Traffic Light Simulation.

```js
let color = "Red"; // Change to "Green" to test GO case
if (color.toLowerCase() === "red") {
  console.log(`STOP`);
} else if (color.toLowerCase() === "green") {
  console.log(`GO`);
} else {
  console.log(`INVALID COLOR`);
}
```

---

## 5. Create an Electricity Bill Calculator

```js
let units = 10; // Units consumed per day
let unitCost = 150;
let daysInMonth = 30;

let monthlyBill = units * unitCost * daysInMonth;
console.log(`Monthly bill: ₹${monthlyBill}`);

let annualBill = monthlyBill * 12;
let discountedAnnualBill = annualBill * 0.8;
console.log(`Annual bill after 20% discount: ₹${discountedAnnualBill}`);
```

---

## 6. Leap Year Checker

```js
let year = 2025;
let isLeap =
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    ? "Leap Year"
    : "Not a Leap Year";
console.log(`${year} is ${isLeap}`);
```

---

## 7. Max of Three Numbers

```js
let p = 5,
  q = 12,
  r = 9;
let max = p;

if (q > max) {
  max = q;
}
if (r > max) {
  max = r;
}
console.log(`The maximum number is ${max}`);
```

---

## 8. Bitwise Doubling

```js
let count = 5;
let doubled = count << 1;
console.log(`Doubling ${count} using bitwise shift gives: ${doubled}`);
```

---

## Template Literals in JavaScript

Template literals are a feature in JavaScript (introduced in ES6) that allow you to work with strings in a more flexible and readable way. They are enclosed by backticks (`` ` ``) instead of single or double quotes.

**Key features:**

- **Variable interpolation:** You can directly embed variables and expressions inside the string using `${}`.
- **Multi-line strings:** Template literals preserve whitespace and allow strings to span multiple lines without special characters.
- **Expression evaluation:** You can include any valid JavaScript expression inside `${}`.

**Example:**

```js
const name = "Mahesh";
const age = 25;
console.log(`Hello, my name is ${name} and I am ${age} years old.`);
```

**Output:**

```
Hello, my name is Mahesh and I am 25 years old.
```

**Multi-line example:**

```js
const message = `This is line 1.
This is line 2.
This is line 3.`;
console.log(message);
```

**Output:**

```
This is line 1.
This is line 2.
This is line 3.
```

Template literals make string handling easier, especially when you need to include variables, expressions, or write multi-line strings.
