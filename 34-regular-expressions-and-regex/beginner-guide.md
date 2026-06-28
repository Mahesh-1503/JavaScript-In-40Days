# Beginner's Guide: Regular Expressions (Regex)

Hey there, future pattern searcher! 👋 Welcome to your hands-on guide to JavaScript Regular Expressions. Today, we are going to learn how to search, validate, and extract data from strings using custom rules.

---

## 📂 How to Learn This Folder

To get the most out of your regular expression experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand character matchers.
2.  **Step 2:** Copy the code blocks below, paste them into a file (like `test-regex.js`), and run them with `node test-regex.js` in your terminal to inspect the execution outcomes.
3.  **Step 3:** Open and read [34-regular-expressions-and-regex/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/34-regular-expressions-and-regex/README.md) to explore flags, quantifiers, and boundary groups.
4.  **Step 4:** Inspect and run [34-regular-expressions-and-regex/regex-demo.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/34-regular-expressions-and-regex/regex-demo.js) to see log parsing and lookahead validators in action.

---

## Part 1: What is Regex?

A **Regular Expression (Regex)** is a sequence of characters that forms a search pattern. You use it to search, validate, or extract text from strings.

### The Text Scanner Analogy:
Think of Regex as an **advanced text scanner**:
*   Standard searches look for exact words like "error".
*   Regex acts like a **smart scanner** searching for custom rules: *"Find any text that starts with 'ERROR', is followed by a number inside square brackets, and ends with a message."* (e.g. `ERROR[404]`).

---

## Part 2: Character Classes & Anchors

To write search rules, you combine character classes and position anchors:

### 1. Character Classes (Wildcards)
*   `\d` : Matches any digit (0-9).
*   `\w` : Matches any alphanumeric character (A-Z, a-z, 0-9, and underscore `_`).
*   `\s` : Matches any whitespace character (spaces, tabs, line breaks).
*   `.`  : Matches **any character** except newlines.
*   `[A-Z]` : Custom set. Matches any uppercase letter from A to Z.

### 2. Position Anchors (Boundaries)
*   `^` : Matches the **start** of a string.
*   `$` : Matches the **end** of a string.
*   `\b` : Matches a **word boundary** (the transition between a word character and a space/punctuation).

---

## Part 3: Quantifiers: Greedy vs. Lazy Matching

Quantifiers define **how many times** a character should match.

### 🧪 Executing the Quantifier Experiment:
Copy, paste, and run this code to see how adding `?` converts a greedy match to a lazy match:

```javascript
const html = "<div>First</div><div>Second</div>";

// 1. Greedy: Matches as much as possible from first <div> to last </div>
const greedyMatch = html.match(/<div>.*<\/div>/);
console.log("Greedy Result:", greedyMatch[0]);
// Output: "<div>First</div><div>Second</div>"

// 2. Lazy: Adding ? makes it match the minimum possible text segments
const lazyMatches = html.match(/<div>.*?<\/div>/g);
console.log("Lazy Results:", lazyMatches);
// Output: [ "<div>First</div>", "<div>Second</div>" ]
```

---

## Part 4: Regex APIs (test, exec, match, replace)

JavaScript integrates regex through both `RegExp` methods and `String` methods:

```javascript
// A. RegExp.prototype.test() -> returns true or false
const hasDigits = /\d+/.test("Order #5422");
console.log("Has Digits:", hasDigits); // true

// B. RegExp.prototype.exec() -> returns detailed match array with capture groups
const ipPattern = /IP:\s([0-9.]+)/;
const log = "Alert: IP: 192.168.1.100";
const result = ipPattern.exec(log);
console.log("Full Match:", result[0]); // "IP: 192.168.1.100"
console.log("Captured IP ($1):", result[1]); // "192.168.1.100"

// C. String.prototype.replace() -> modifies string using capture variables ($1, $2)
const name = "Mahesh Kumar";
const swapped = name.replace(/(\w+)\s(\w+)/, "$2, $1");
console.log("Swapped Name:", swapped); // "Kumar, Mahesh"
```

---

## Part 5: The Stateful Global `lastIndex` Gotcha

> [!IMPORTANT]
> **If you use the global flag `/g` in a regex, the pattern object becomes stateful.**
> It remembers the index of the last match in a hidden property called **`lastIndex`**. Subsequent calls start matching from `lastIndex` instead of `0`, creating a famous alternating true/false bug!

### 🧪 Global lastIndex Simulation:
Copy, paste, and run this script to see the bug and how to resolve it:

```javascript
const pattern = /admin/g; // Global flag active
const str = "admin";

console.log("Run 1 (Expected: true):", pattern.test(str)); // true  (lastIndex is now 5)
console.log("Run 2 (Expected: true):", pattern.test(str)); // false (Starts matching at index 5!)

// Fix 1: Reset lastIndex manually before running the test
pattern.lastIndex = 0;
console.log("Run 3 (After Manual Reset):", pattern.test(str)); // true

// Fix 2: Remove the global /g flag if you only want to validate checks!
const safePattern = /admin/;
console.log("Safe Run 1:", safePattern.test(str)); // true
console.log("Safe Run 2:", safePattern.test(str)); // true
```

---

## Part 6: Lookaround Assertions

**Lookahead Assertions (`(?=...)`)** check if a condition matches *ahead* in the string, without actually consuming characters or moving the search cursor forward. They are ideal for validating complex password requirements:

```javascript
// Rules: At least 8 chars, 1 uppercase letter, 1 lowercase letter, and 1 digit
const strongPasswordPattern = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

console.log("Password 'weak123' valid?", strongPasswordPattern.test("weak123")); // false
console.log("Password 'SecurePass123' valid?", strongPasswordPattern.test("SecurePass123")); // true
```

---

## Part 7: Real-World Application Code

Here is a form validation utility sanitizing inputs and parsing credentials:

```javascript
class FormValidator {
  static cleanEmail(email) {
    // Trim spaces, match standard email structure
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email.trim().toLowerCase());
  }

  static parseDatabaseLog(log) {
    // Extract error code and module name
    const logPattern = /\[ERROR\]\sCode:(\d+)\sModule:(\w+)/;
    const match = logPattern.exec(log);
    
    if (!match) return null;
    
    return {
      code: parseInt(match[1], 10),
      module: match[2]
    };
  }
}

console.log("Email 'mahesh@example.com' valid?", FormValidator.cleanEmail("mahesh@example.com")); // true
console.log("Parsed Log Object:", FormValidator.parseDatabaseLog("[ERROR] Code:500 Module:DATABASE"));
// Output: { code: 500, module: 'DATABASE' }
```

---

## Part 8: Essential Interview Questions & Practice Exercises

### Q1: What is the difference between `match()` and `matchAll()`?
**Answer:** `match()` returns a simple array of full string matches (ignoring capture groups if the `/g` flag is on). `matchAll()` returns an iterator yielding detailed match arrays (including all capture groups) for each match, even with the `/g` flag active.

### Q2: How do you escape special regex characters (like `.`, `?`, or `*`)?
**Answer:** Place a backslash (`\`) before the character to escape its meaning and treat it as a literal character (e.g. `/\./` matches a literal period `.`, whereas `/./` matches any character).

### Practice Exercises:
1.  **Email Validator Sandbox:** Write a regex matching simple email addresses. Confirm it passes standard accounts while rejecting emails missing usernames or domain tags.
2.  **Stateful lastIndex Tracer:** Create a regex with a `/g` flag. Write a loop testing a match string 5 times, printing the value of `.lastIndex` after each check.
3.  **Lookup HTML tags extractor:** Write a regex using lazy quantifiers to extract text values nested inside HTML bold `<b>` tags.
