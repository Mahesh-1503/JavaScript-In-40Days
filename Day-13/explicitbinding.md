## What is Explicit Binding?

In JavaScript, **explicit binding** means you can tell a function what `this` should refer to when it runs. You do this using the methods: `call`, `apply`, and `bind`.

---

## Why Do We Need Explicit Binding?

Sometimes, a function needs access to an object’s properties using `this`. But when you call that function, `this` might not point to the right object. **Explicit binding** lets you control what `this` refers to.

---

## 1. `call` Method

- **Use:** Calls a function with a specified `this` and arguments passed one by one.
- **Syntax:** `func.call(thisArg, arg1, arg2, ...)`

**Example:**

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Alice" };

greet.call(person, "Hello", "!"); // Output: Hello, Alice!
```

**Explanation:**

- `greet` is called.
- `this` inside `greet` will refer to `person`.
- Arguments `"Hello"` and `"!"` are passed individually.

---

## 2. `apply` Method

- **Use:** Calls a function with a specified `this` and arguments passed as an array.
- **Syntax:** `func.apply(thisArg, [arg1, arg2, ...])`

**Example:**

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Bob" };

greet.apply(person, ["Hi", "?"]); // Output: Hi, Bob?
```

**Explanation:**

- `greet` is called.
- `this` refers to `person`.
- Arguments are passed as an array: `["Hi", "?"]`.

---

## 3. `bind` Method

- **Use:** Returns a new function, where `this` is bound to the given object. Arguments can be preset or passed when calling the new function.
- **Syntax:** `func.bind(thisArg, arg1, arg2, ...)`

**Example:**

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Carol" };

const greetCarol = greet.bind(person, "Hey"); // Only "Hey" is preset

greetCarol("!"); // Output: Hey, Carol!
```

**Explanation:**

- `bind` returns a new function (`greetCarol`).
- `this` inside this new function is always `person`.
- "Hey" is preset as an argument. When calling, you provide the rest ("!").

---

## Summary Table

| Method | What it does                        | How to pass arguments  | When to use                     |
| ------ | ----------------------------------- | ---------------------- | ------------------------------- |
| call   | Calls function, sets `this`         | Individually           | Immediate invocation            |
| apply  | Calls function, sets `this`         | As an array            | Immediate invocation, many args |
| bind   | Returns a new function, sets `this` | Individually or preset | Delayed invocation              |

---

## Visual Summary

```javascript
// call
greet.call(obj, a, b); // runs immediately

// apply
greet.apply(obj, [a, b]); // runs immediately

// bind
const boundFunc = greet.bind(obj, a);
boundFunc(b); // runs later
```

---

## Real World Use Case

Suppose you have a function that works for any person object:

```javascript
function introduce() {
  console.log("My name is " + this.name);
}

const student = { name: "David" };
introduce.call(student); // Output: My name is David
```

---

**Key Point:**

- Use `call` or `apply` when you want to invoke the function immediately with a specific `this`.
- Use `bind` when you want a new function with `this` fixed to a specific object (to use later).
