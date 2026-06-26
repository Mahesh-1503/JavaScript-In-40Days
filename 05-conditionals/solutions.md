# Solutions for Day 4 Tasks

---

## 1. What will be the output of this code snippet and why?

```js
let day = "Monday";

switch (day) {
  case "monday":
    console.log("It's the start of the week.");
    break;
  default:
    console.log("It's a normal day.");
}
```

**Output:**

```
It's a normal day.
```

**Explanation:**  
The value of `day` is `"Monday"` (with capital "M") but the case in the switch statement is `"monday"` (all lowercase). JavaScript's switch statement uses strict comparison (`===`), so the case does not match. Therefore, the `default` block runs.

---

## 2. Build an ATM Cash Withdrawal System

```js
let amount = 550; // Example input

if (amount > 0 && amount % 100 === 0) {
  console.log("Withdrawal successful");
} else {
  console.log("Invalid amount");
}
```

_You can change the value of `amount` for different tests._

---

## 3. Build a Calculator with switch-case

```js
let num1 = 10;
let num2 = 5;
let operator = "+"; // Can be "+", "-", "*", "/", "%"

let result;
switch (operator) {
  case "+":
    result = num1 + num2;
    break;
  case "-":
    result = num1 - num2;
    break;
  case "*":
    result = num1 * num2;
    break;
  case "/":
    result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
    break;
  case "%":
    result = num1 % num2;
    break;
  default:
    result = "Invalid operator";
}

console.log(result);
```

_Change `num1`, `num2`, and `operator` to test different cases._

---

## 4. Pay for your movie ticket

```js
let age = 25; // Example input

let price;
if (age < 18) {
  price = 3;
} else if (age <= 60) {
  price = 10;
} else {
  price = 8;
}

console.log(`Ticket price: $${price}`);
```

_Change `age` to test for different age groups._

---

## 5. Horoscope Sign Checker

```js
let month = "April"; // Example input

let sign;
switch (month.toLowerCase()) {
  case "march":
  case "april":
    sign = "Aries";
    break;
  case "may":
  case "june":
    sign = "Taurus";
    break;
  case "july":
  case "august":
    sign = "Gemini";
    break;
  case "september":
  case "october":
    sign = "Cancer";
    break;
  case "november":
  case "december":
    sign = "Leo";
    break;
  case "january":
  case "february":
    sign = "Virgo";
    break;
  default:
    sign = "Invalid month";
}
console.log(`Zodiac sign: ${sign}`);
```

_Edit `month` to see different zodiac signs._

---

## 6. Which Triangle?

```js
let a = 5,
  b = 5,
  c = 5; // Example sides

if (a === b && b === c) {
  console.log("Equilateral Triangle");
} else if (a === b || b === c || a === c) {
  console.log("Isosceles Triangle");
} else {
  console.log("Scalene Triangle");
}
```

_Change the values of `a`, `b`, and `c` to test for different triangle types._

---
