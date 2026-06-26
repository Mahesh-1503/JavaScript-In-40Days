# Solutions for Day 5 Tasks

## 1. Generate a Pyramid Pattern using Nested Loop

**Explanation:**  
We use two nested loops. The outer loop tracks the number of rows, and the inner loop adds stars for each row.

```javascript
let rows = 5;
for (let i = 1; i <= rows; i++) {
  let pattern = "";
  for (let j = 1; j <= i; j++) {
    pattern += "* ";
  }
  console.log(pattern.trim());
}
```

---

## 2. Create Multiplication Table (Using for loop)

**Explanation:**  
We use a loop to multiply the given number (N) by 1 through 10, printing each result.

```javascript
let N = 3; // you can change this value
for (let i = 1; i <= 10; i++) {
  console.log(`${N} x ${i} = ${N * i}`);
}
```

---

## 3. Find the Summation of All Odd Numbers Between 1 to 500

**Explanation:**  
We loop from 1 to 500, check if a number is odd, add it to the sum, and print it.

```javascript
let sum = 0;
for (let i = 1; i <= 500; i += 2) {
  // increment by 2 ensures only odd numbers
  sum += i;
  console.log(i);
}
console.log("Sum of odd numbers from 1 to 500 is:", sum);
```

---

## 4. Skipping Multiples of 3

**Explanation:**  
We loop from 1 to 20 and use `continue` to skip numbers that are multiples of 3.

```javascript
for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0) continue;
  console.log(i);
}
```

---

## 5. Reverse Digits of a Number (Using while loop)

**Explanation:**  
We use a while loop to extract the last digit of the number and build the reversed number.

```javascript
let number = 6789;
let reversed = 0;
while (number > 0) {
  let digit = number % 10;
  reversed = reversed * 10 + digit;
  number = Math.floor(number / 10);
}
console.log(reversed);
```

---

## 6. Differences between for, while, and do-while loops

**Explanation:**

- **for loop:**

  - Used when the number of iterations is known.
  - Syntax: `for(initialization; condition; increment) { ... }`
  - The condition is checked before entering the loop body.

- **while loop:**

  - Used when the number of iterations is unknown.
  - Syntax: `while(condition) { ... }`
  - The condition is checked before entering the loop body.

- **do-while loop:**
  - Similar to `while`, but the loop body executes at least once even if the condition is false.
  - Syntax:
    ```javascript
    do {
      // statements
    } while (condition);
    ```

### Flow Charts

**For loop:**

```
[Start]
   |
[Initialize]
   |
[Check Condition]
   |         \
[True]      [False]
   |           |
[Execute]      |
   |           |
[Increment]    |
   |           |
[Go Back to Condition]
```

**While loop:**

```
[Start]
   |
[Check Condition]
   |         \
[True]      [False]
   |           |
[Execute]      |
   |           |
[Go Back to Condition]
```

**Do-while loop:**

```
[Start]
   |
[Execute]
   |
[Check Condition]
   |         \
[True]      [False]
   |           |
[Go Back to Execute] [End]
```

---
