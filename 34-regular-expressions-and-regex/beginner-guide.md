# Beginner's Guide: Regular Expressions (Regex)

Welcome to the beginner's guide to JavaScript Regular Expressions! This guide explains regex syntax, greedy vs. lazy quantifiers, testing vs. extracting matches, resolving the global `lastIndex` matching bug, and writing lookaround password validators.

---

## 📅 Learning Roadmap

*   **Part 1:** What is Regex? (The Text Scanner Analogy)
*   **Part 2:** Character Classes & Anchors
*   **Part 3:** Quantifiers: Greedy vs. Lazy Matching
*   **Part 4:** Regex APIs: test, exec, match, and replace
*   **Part 5:** The Stateful Global `lastIndex` Gotcha (Alternating Test Bug)
*   **Part 6:** Lookaround Assertions (SaaS Password Checker)
*   **Part 7:** Real-World Application Code
*   **Part 8:** Essential Interview Questions & Practice Exercises

---

## Part 1: What is Regex?

A **Regular Expression (Regex)** is a sequence of characters that forms a search pattern. You use it to search, validate, or extract text from strings.

### The Text Scanner Analogy:
Think of Regex as an **advanced text scanner**:
*   Standard Ctrl+F searches for exact words like "error".
*   Regex acts like a **smart scanner** searching for custom rules: *"Find any text that starts with 'ERROR', is followed by a number inside square brackets, and ends with a message."* (e.g. `ERROR[404]`).

In JavaScript, you declare a regex using either literal slashes `/` or the `RegExp` constructor:
```javascript
const literalRegex = /admin/i; // 'i' flag means case-insensitive
const constructorRegex = new RegExp("admin", "i");
```

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

## Part 3: Quantifiers: Greedy vs. Lazy

Quantifiers define **how many times** a character should match:
*   `*` : Matches 0 or more times.
*   `+` : Matches 1 or more times.
*   `?` : Matches 0 or 1 time.
*   `{min,max}` : Matches between min and max times.

### The Greediness gotcha:
By default, quantifiers are **Greedy**—they match as much text as possible:
```javascript
const html = "<div>First</div><div>Second</div>";

// ❌ Greedy: matches from the first <div> all the way to the last </div>
console.log(html.match(/<div>.*<\/div>/)[0]);
// Output: "<div>First</div><div>Second</div>"
```

### The Lazy Fix:
Adding a `?` after a quantifier makes it **Lazy**—it stops matching as soon as it satisfies the rule:
```javascript
// 🟢 Lazy: matches individual block segments separately
console.log(html.match(/<div>.*?<\/div>/g));
// Output: [ "<div>First</div>", "<div>Second</div>" ]
```

---

## Part 4: Regex APIs

JavaScript integrates regex through both `RegExp` methods and `String` methods:

### 1. Testing matches (`RegExp.prototype.test`)
Checks for presence. Returns `true` or `false`:
```javascript
const hasDigits = /\d+/.test("Order #5422"); // true
```

### 2. Extracting details (`RegExp.prototype.exec`)
Extracts matches and capture group parenthesized strings:
```javascript
const ipPattern = /IP:\s([0-9.]+)/;
const log = "Alert: IP: 192.168.1.100";
const result = ipPattern.exec(log);

console.log(result[0]); // "IP: 192.168.1.100" (Full match)
console.log(result[1]); // "192.168.1.100" (First parenthesized capture group!)
```

### 3. String Replacements (`String.prototype.replace`)
Swaps characters using capture group variables (`$1`, `$2`):
```javascript
const name = "Mahesh Kumar";
const swapped = name.replace(/(\w+)\s(\w+)/, "$2, $1");
console.log(swapped); // "Kumar, Mahesh"
```

---

## Part 5: The Stateful Global `lastIndex` Bug

> [!IMPORTANT]
> **If you use the global flag `/g` or sticky flag `/y` in a regex, the pattern object becomes stateful.**
> It remembers the index of the last match in a hidden property called **`lastIndex`**. Subsequent calls start matching from `lastIndex` instead of `0`.

This creates a famous alternating bug when validating strings in loops:
```javascript
const pattern = /admin/g; // Global flag active
const str = "admin";

console.log(pattern.test(str)); // true  (lastIndex goes to 5)
console.log(pattern.test(str)); // false (Starts matching at index 5, fails!)
console.log(pattern.test(str)); // true  (Resets index to 0 on fail, passes!)
```

### How to Fix:
1.  **Remove the `/g` flag** if you are only performing simple validation tests.
2.  Or reset the counter manually before running tests: `pattern.lastIndex = 0;`.

---

## Part 6: Lookaround Assertions

**Lookahead Assertions (`(?=...)`)** check if a condition matches *ahead* in the string, without actually consuming characters or moving the search cursor forward. They are ideal for validating complex password requirements:

```javascript
// At least 8 chars, 1 uppercase letter, 1 lowercase letter, and 1 digit:
const strongPasswordPattern = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

console.log(strongPasswordPattern.test("weak123")); // false
console.log(strongPasswordPattern.test("SecurePass123")); // true
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
