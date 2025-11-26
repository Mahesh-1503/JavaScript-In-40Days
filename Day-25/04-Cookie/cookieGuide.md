# JavaScript Cookies

Self-learning notes by Pothu Mahesh Kumar

---

## 1. JavaScript Cookies

Cookies store small pieces of data in the browser.

You use cookies for things like

- Remembering login session id
- Remembering site theme choice
- Remembering cart id

Real life example

- Think of a cloakroom token

  - You give your bag
  - Staff gives you a small token
  - Next time you show the token
  - Staff identifies you and returns the bag

- Cookie acts like that token for the website

Browser stores cookies as name value pairs.

Example name value

- `userId=12345`
- `theme=dark`

### Full example: set and read a cookie

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Basic Cookie Example</title>
  </head>
  <body>
    <h1>Basic Cookie Demo</h1>

    <button id="setCookieBtn">Set User Cookie</button>
    <button id="readCookieBtn">Read Cookies</button>

    <pre id="output"></pre>

    <script>
      const setCookieBtn = document.getElementById("setCookieBtn");
      const readCookieBtn = document.getElementById("readCookieBtn");
      const output = document.getElementById("output");

      setCookieBtn.addEventListener("click", function () {
        document.cookie = "userName=Mahesh";
        output.textContent = "Cookie set: userName=Mahesh";
      });

      readCookieBtn.addEventListener("click", function () {
        const allCookies = document.cookie;
        output.textContent = "All cookies: " + allCookies;
      });
    </script>
  </body>
</html>
```

Key points

- `document.cookie = "userName=Mahesh"` writes a cookie
- `document.cookie` returns all cookies for the current page as one string

### Tasks for this concept

1. Create a button that sets cookie `studentName` with your name and shows a message.
2. Create a second button that reads `document.cookie` and shows it in a `<div>`.
3. Set a cookie `language=JavaScript` and verify it appears in the browser developer tools Application → Cookies.
4. Refresh the page and read `document.cookie` again to see that cookies stay after reload.
5. Create a function `setSimpleCookie(name, value)` that sets `document.cookie = name + "=" + value` and test it with two different names.

---

## 2. Cookie Attributes

Attributes are extra settings that go with a cookie string.

Format

`name=value; attribute1=value1; attribute2=value2`

Common attributes

- `expires`
- `max-age`
- `path`
- `secure`
- `SameSite`

Real life example

- On a visiting card

  - Name and phone are like cookie name and value
  - Address, job title, branch are like attributes
  - They describe more about the same person

### Important attributes

1. `expires`

- Sets expiry date and time
- After that date browser removes the cookie

Example

`expires=Tue, 31 Dec 2025 23:59:59 GMT`

2. `max-age`

- Sets life in seconds
- `max-age=3600` means one hour

3. `path`

- Controls where in the site the cookie is visible
- `path=/` means whole site
- `path=/admin` means only under `/admin` pages

4. `secure`

- Cookie only goes over HTTPS

5. `SameSite`

- Limits cookie sending in cross site requests
- Safer against some attack types
- Common values

  - `Lax`
  - `Strict`
  - `None` (often with `secure`)

### Full example: cookie with attributes

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Cookie Attributes Example</title>
  </head>
  <body>
    <h1>Cookie Attributes Demo</h1>

    <button id="setAttrCookieBtn">Set Cookie With Attributes</button>
    <button id="showCookiesBtn">Show Cookies</button>

    <pre id="output"></pre>

    <script>
      const setAttrCookieBtn = document.getElementById("setAttrCookieBtn");
      const showCookiesBtn = document.getElementById("showCookiesBtn");
      const output = document.getElementById("output");

      setAttrCookieBtn.addEventListener("click", function () {
        const date = new Date();
        date.setDate(date.getDate() + 7);

        const expires = "expires=" + date.toUTCString();

        document.cookie = "theme=dark; " + expires + "; " + "path=/";

        output.textContent =
          "Cookie set:\n" + "theme=dark\n" + expires + "\npath=/";
      });

      showCookiesBtn.addEventListener("click", function () {
        output.textContent = "All cookies:\n" + document.cookie;
      });
    </script>
  </body>
</html>
```

What this does

- Creates a date 7 days from now
- Builds an `expires` string
- Sets cookie `theme=dark` with expiry and path

Real life link

- App remembers dark mode for one week with this cookie

### Tasks for this concept

1. Set a cookie `userRole=student` that expires in 3 days and applies to entire site `path=/`.
2. Create a helper `setCookieWithExpiry(name, value, days)` that builds `expires` date and sets cookie.
3. Use `max-age=60` to set a cookie that lives for 1 minute and test its behavior.
4. Observe how `path=/test` alters cookie visibility by checking it on two different paths in your local test project.
5. Write a short comment block in your code listing when you will pick `expires` vs `max-age` in your own projects.

---

## 3. Cookies with Multiple Names

A site holds multiple cookies.

Each cookie has its own `name=value` pair.

`document.cookie` returns all of them in one string separated by semicolons.

Example string

`"userName=Mahesh; theme=dark; cartId=xyz123"`

Real life example

- Think of a student record file

  - There is a page for personal details
  - A page for marks
  - A page for fees

- Each page is different
- All belong to the same student
- Same site, multiple cookies

You set each cookie by assigning `document.cookie` again.

### Full example: multiple cookies and parsing

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Multiple Cookies Example</title>
  </head>
  <body>
    <h1>Multiple Cookies Demo</h1>

    <button id="setMultiBtn">Set Multiple Cookies</button>
    <button id="readByNameBtn">Read Cookie By Name</button>

    <label>
      Cookie name:
      <input type="text" id="cookieNameInput" placeholder="e.g. userName" />
    </label>

    <pre id="output"></pre>

    <script>
      const setMultiBtn = document.getElementById("setMultiBtn");
      const readByNameBtn = document.getElementById("readByNameBtn");
      const cookieNameInput = document.getElementById("cookieNameInput");
      const output = document.getElementById("output");

      function setBaseCookies() {
        document.cookie = "userName=Mahesh; path=/";
        document.cookie = "theme=dark; path=/";
        document.cookie = "cartId=abc123; path=/";
      }

      function getCookieByName(name) {
        const valuePart = document.cookie
          .split(";")
          .map(function (cookie) {
            return cookie.trim();
          })
          .find(function (cookie) {
            return cookie.startsWith(name + "=");
          });

        if (!valuePart) {
          return null;
        }

        return valuePart.split("=")[1];
      }

      setMultiBtn.addEventListener("click", function () {
        setBaseCookies();
        output.textContent = "Multiple cookies set.\n" + document.cookie;
      });

      readByNameBtn.addEventListener("click", function () {
        const name = cookieNameInput.value;
        const value = getCookieByName(name);

        if (value === null) {
          output.textContent = "Cookie not found: " + name;
        } else {
          output.textContent = "Cookie " + name + " = " + value;
        }
      });
    </script>
  </body>
</html>
```

Key ideas

- Each `document.cookie = "name=value"` adds or updates a single cookie
- `document.cookie` returns all cookies as one string
- You split and search to read a specific one

### Tasks for this concept

1. Set three cookies
   `studentId`, `studentName`, `courseName` then print `document.cookie`.
2. Write a generic function `getCookie(name)` that returns the value of that cookie or `null`.
3. Use `getCookie` to display a welcome message `"Welcome back, [studentName]"` if `studentName` cookie exists.
4. Log the total count of cookies by counting entries after splitting on `";"`.
5. Think of one small project idea where you use 3 different cookies and note those cookie names and purposes in comments.

---

## 4. Deleting Cookies

Browser removes a cookie when its life ends.

You cannot directly delete with a built in delete function.

To delete, you set the same cookie name with

- Expiry date in the past
  or
- `max-age=0`

Real life example

- Hostel issues a gate pass
- When student returns, staff marks the pass expired
- Pass still on record, but no longer valid

### Full example: set and delete cookie

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Delete Cookie Example</title>
  </head>
  <body>
    <h1>Delete Cookie Demo</h1>

    <button id="setBtn">Set testCookie</button>
    <button id="deleteBtn">Delete testCookie</button>
    <button id="showBtn">Show All Cookies</button>

    <pre id="output"></pre>

    <script>
      const setBtn = document.getElementById("setBtn");
      const deleteBtn = document.getElementById("deleteBtn");
      const showBtn = document.getElementById("showBtn");
      const output = document.getElementById("output");

      setBtn.addEventListener("click", function () {
        document.cookie = "testCookie=Hello; path=/";
        output.textContent = "Cookie set: testCookie=Hello";
      });

      deleteBtn.addEventListener("click", function () {
        document.cookie =
          "testCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        output.textContent = "Cookie delete request sent for testCookie.";
      });

      showBtn.addEventListener("click", function () {
        output.textContent = "All cookies now:\n" + document.cookie;
      });
    </script>
  </body>
</html>
```

Alternative with `max-age`

```javascript
document.cookie = "testCookie=; max-age=0; path=/";
```

Important

- Use same name and same path when deleting
- Otherwise browser treats it as a different cookie

### Tasks for this concept

1. Create a `setLoginCookie()` function that sets `loggedIn=true` with some expiry.
2. Create `deleteLoginCookie()` that deletes `loggedIn` by setting expiry in past.
3. Add two buttons
   one calls `setLoginCookie`, the other calls `deleteLoginCookie`, and show current `document.cookie` after each action.
4. Write a helper `eraseCookie(name)` that builds the correct delete string with `expires` in the past and `path=/`.
5. Use `eraseCookie` to clear `theme`, `userName`, and `cartId` cookies in one click of a “Clear all app cookies” button.
