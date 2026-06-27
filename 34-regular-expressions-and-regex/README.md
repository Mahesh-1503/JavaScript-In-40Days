# Day 34: Regular Expressions (The Pattern Detective)

In software development, text manipulation is everywhere. Whether you are validating email signups, extracting security tokens from log streams, or converting text syntax (like Markdown to HTML), standard string methods are not enough. **Regular Expressions (Regex)** provide a powerful, standardized language for finding, matching, and replacing patterns in text.

---

## 1. Mental Model (The Pattern Detective)

Think of a **Regular Expression** as a **Pattern Detective**:
* **The Case (The String):** A massive page of text (e.g., system debug logs).
* **The Clues (The Regex):** You give the detective rules, such as: *"Find a word starting with 'user_', followed by exactly 4 digits, ending with '@amazon.com'"*.
* **The Investigation:** The detective scans character by character. When a sequence satisfies all conditions, the detective reports a **Match** and hands you the captured data.

---

## 2. Visual Thinking (State Machine Matching)

When you run a regex match, the engine walks through the string like a state machine:

```text
Regex Pattern: /\d{3}-\d{4}/ (Match 3 digits, a dash, then 4 digits)
String: "Call 123-4567 today"

Step 1: Scans 'C', 'a', 'l', 'l', ' ' ───> No match.
Step 2: Scans '1' ──────────────────────> Digit! (1/3 digits found)
Step 3: Scans '2' ──────────────────────> Digit! (2/3 digits found)
Step 4: Scans '3' ──────────────────────> Digit! (3/3 digits found)
Step 5: Scans '-' ──────────────────────> Dash! (Separator found)
Step 6: Scans '4', '5', '6', '7' ───────> Four Digits! (4/4 digits found)
Step 7: Match succeeded! Returns: "123-4567"
```

---

## 3. Beginner Explanation: Creating & Running Regex

### 1. Creating a Regex in JavaScript
There are two ways to define a regular expression:
1. **Regex Literal (Preferred):** Wrapped in forward slashes. Compiled once when the script loads.
   ```javascript
   const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/i;
   ```
2. **RegExp Constructor:** Useful when building patterns dynamically at runtime from string variables.
   ```javascript
   const key = "auth_token";
   const tokenRegex = new RegExp(`\\b${key}\\b`, "i"); // Note: Backslashes must be escaped
   ```

### 2. Core Pattern Flags
Flags are appended to the end of a regex to customize search parameters:
* **`g` (Global):** Find all matches rather than stopping at the first match.
* **`i` (Case-insensitive):** Ignore uppercase/lowercase distinctions.
* **`m` (Multiline):** Makes `^` and `$` match start/end of individual lines instead of the whole string.
* **`s` (dotAll):** Allows the wildcard dot (`.`) to match newline characters.

---

## 4. Deep Explanation: Regex Syntax Reference

To master regex, you must understand its special symbols:

### 1. Character Classes
* **`.` (Wildcard):** Matches any character except a newline.
* **`\d` / `\D`:** Matches any decimal digit (`[0-9]`) / Any non-digit.
* **`\w` / `\W`:** Matches any word character (letters, numbers, underscore) / Any non-word character.
* **`\s` / `\S`:** Matches any whitespace character (space, tab, newline) / Any non-whitespace character.
* **`[abc]`:** Character set. Matches any character inside the brackets.
* **`[^abc]`:** Negated set. Matches any character *not* inside the brackets.
* **`[a-z]` / `[A-Z]` / `[0-9]`:** Matches character ranges.

### 2. Quantifiers (Count Rules)
* **`*`:** Matches 0 or more times.
* **`+`:** Matches 1 or more times.
* **`?`:** Matches 0 or 1 time (optional character).
* **`{n}`:** Matches exactly `n` times.
* **`{n,}`:** Matches at least `n` times.
* **`{n,m}`:** Matches between `n` and `m` times.

### 3. Anchors & Boundaries
* **`^`:** Matches the start of the string (or start of a line if `m` flag is active).
* **`$`:** Matches the end of the string.
* **`\b`:** Matches a word boundary (e.g. separates complete words from subparts: `\bcat\b` matches "cat" but not "concat").

### 4. Groups & Alternations
* **`x|y` (Alternation):** Matches either `x` or `y`.
* **`(abc)` (Capturing Group):** Groups characters together for quantifier checks and captures the matched value for extraction/replacement references.
* **`(?:abc)` (Non-Capturing Group):** Groups characters without storing them in memory.
* **Lookarounds (Conditional Assertions):**
  - **`(?=pattern)` (Positive Lookahead):** Assert that a match is followed by `pattern`.
  - **`(?!pattern)` (Negative Lookahead):** Assert that a match is *not* followed by `pattern`.

---

## 5. JavaScript API Reference

### 1. RegExp Object Methods
* **`regex.test(str)`:** Returns `true` if there is a pattern match. Best for validation checks.
* **`regex.exec(str)`:** Returns a detailed result array for a match (or `null`). If the `g` flag is active, successive calls to `exec` walk through the string using the `regex.lastIndex` property to find subsequent matches.

### 2. String Object Methods using Regex
* **`str.match(regex)`:** Returns an array of matches (or `null`).
* **`str.matchAll(regex)`:** Returns an iterator of detailed match structures (requires `g` flag).
* **`str.replace(regex, replacement)`:** Replaces matched patterns. Supports capture group variables like `$1`, `$2` in the replacement string.
* **`str.split(regex)`:** Splits a string into an array using a regex pattern as the delimiter.

---

## 6. Real Production Examples

### Example 1: Email Validation Gatekeeper
```javascript
function validateEmail(email) {
  // Pattern: [Username] @ [domain] . [top-level domain (2+ letters)]
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

console.log(validateEmail("user.name@domain.co.in")); // true
console.log(validateEmail("invalid-email@domain"));     // false
```

### Example 2: Log Stream Security Masker (Capture Groups)
Finds and replaces sensitive API key patterns in debug logs.
```javascript
const debugLog = "Connecting to Stripe API with key=sk_live_99A22BB and client_id=123";
const maskPattern = /(key=)sk_live_[a-zA-Z0-9]{7}/g;

// Replaces the matched key while keeping the prefix ($1 references key=)
const maskedLog = debugLog.replace(maskPattern, "$1[MASKED_KEY]");
console.log(maskedLog);
// Output: "Connecting to Stripe API with key=[MASKED_KEY] and client_id=123"
```

### Example 3: Markdown to HTML Link Converter
Converts `[Google](https://google.com)` links to `<a href="https://google.com">Google</a>`.
```javascript
function convertLinks(markdownText) {
  // Capture group 1: Text inside brackets
  // Capture group 2: URL inside parentheses
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  return markdownText.replace(linkPattern, '<a href="$2">$1</a>');
}

const md = "Visit [GitHub](https://github.com) or [Google](https://google.com).";
console.log(convertLinks(md));
// Output: "Visit <a href="https://github.com">GitHub</a> or <a href="https://google.com">Google</a>."
```

---

## 7. Progressive Coding: Noob vs. Pro

### Trimming Whitespace
* 🔴 **Noob:** Manually slicing characters in loop lines to trim strings:
  ```javascript
  function naiveTrim(str) {
    let start = 0, end = str.length - 1;
    while(str[start] === " ") start++;
    while(str[end] === " ") end--;
    return str.slice(start, end + 1);
  }
  ```
* 🟢 **Pro:** Replacing whitespace at borders using Regex anchors:
  ```javascript
  function regexTrim(str) {
    return str.replace(/^\s+|\s+$/g, "");
  }
  ```

---

## 8. Common Mistakes & Pitfalls

### The Stateful Global Regex Bug
If a regex has the global (`g`) flag active, it retains state. The `regex.lastIndex` property keeps track of where the last match ended. Subsequent `.test()` runs on the same regex instance start searching from `lastIndex` rather than the start of the string, causing alternating `true` and `false` evaluations!

```javascript
const pattern = /admin/g;
const username = "admin";

console.log(pattern.test(username)); // true (lastIndex is now 5)
console.log(pattern.test(username)); // false (starts searching at index 5, fails!)
// Fix: Reset lastIndex to 0, or instantiate regex inside functions without 'g' for single validations.
pattern.lastIndex = 0;
```

---

## 9. Interview Prep: FAANG & Top-Tier Questions

### Question 1: What is the difference between greedy and lazy matching?
**Answer:**
* **Greedy matching (Default):** The quantifier matches as many characters as possible. For example, `/<.+>/` matched against `<div>hello</div>` will return the entire string `<div>hello</div>`.
* **Lazy matching:** Adding a `?` suffix makes the quantifier match the smallest possible string. `/<.+?>/` matched against `<div>hello</div>` returns only `<div>`.

### Question 2: Explain how RegExp.lastIndex works.
**Answer:**
`lastIndex` is a read/write integer property of regular expressions that specifies the index at which to start the next match. It is only set and utilized when the regex instance uses the global `g` or sticky `y` flag. Methods like `.exec()` and `.test()` read this property, run the search, and update `lastIndex` to point to the index immediately following the match.

---

## 10. Homework (Job-Ready Assignments)

### Assignment 1: Password Strength Validator
Write a validation function that checks if a password satisfies the following constraints using regex lookarounds:
* At least 8 characters long.
* Contains at least one uppercase letter.
* Contains at least one lowercase letter.
* Contains at least one digit.
* Contains at least one special character (e.g. `@`, `$`, `!`, `%`, `*`, `?`, `&`).

### Assignment 2: Phone Number Extractor
Write a function that extracts international phone numbers from a text blob, supporting formats: `+1234567890`, `+1 (234) 567-8901`, `123-456-7890`, and `123.456.7890`.

### Assignment 3: CSV Row Parser
Write a script that parses a CSV row string into an array of values, accounting for commas within quotation marks (e.g. `1, "Burger, Large", 4.99` splits into `["1", "Burger, Large", "4.99"]`).
