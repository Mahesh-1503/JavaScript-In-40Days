# Beginner's Guide: Bitwise Operators & Bit Manipulation

Hey there, future bits engineer! 👋 Welcome to your hands-on guide to JavaScript Bitwise Operators and Bit Manipulation. Today, we are going to explore how computers see numbers in binary switches, shift bits around, and build a blazing fast permission access system using bitmasks.

---

## 📂 How to Learn This Folder

To get the most out of your bitwise experiments, follow this sequence:
1.  **Step 1:** Read this guide (`beginner-guide.md`) to understand the light switch analogies and bitmask states.
2.  **Step 2:** Copy the code blocks in this guide, paste them into a file (like `test-bits.js`), and run them with `node test-bits.js` in your terminal to see it compute.
3.  **Step 3:** Open and read [04-bitwise-operators-and-bit-manipulation/README.md](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/04-bitwise-operators-and-bit-manipulation/README.md) to review binary masks, permissions flags, and shifting math.

---

## Part 1: Understanding Binary First

Computers do not understand decimal numbers (like `13` or `42`) directly. Instead, they store everything in **Binary** (bits of `0` and `1`).

### The Light Switch Analogy
Think of a **bit** as a single **wall light switch**:
*   `0` means **OFF** (no current flows).
*   `1` means **ON** (current flows).

If you align 4 light switches side-by-side, each switch represents a power of 2, starting from the right:

| Switch 4 (Value: 8) | Switch 3 (Value: 4) | Switch 2 (Value: 2) | Switch 1 (Value: 1) |
| :---: | :---: | :---: | :---: |
| OFF (`0`) | OFF (`0`) | OFF (`0`) | OFF (`0`) |

By turning different combinations of switches **ON**, we can represent any decimal number:

*   **Decimal 1:** `0001` (Only the `1` switch is ON)
*   **Decimal 2:** `0010` (Only the `2` switch is ON)
*   **Decimal 3:** `0011` (The `2` and `1` switches are ON: $2 + 1 = 3$)
*   **Decimal 4:** `0100` (Only the `4` switch is ON)
*   **Decimal 5:** `0101` (The `4` and `1` switches are ON: $4 + 1 = 5$)

#### Representing Decimal 13 in Binary:
To find 13, look at the values of our switches: **8, 4, 2, 1**.
*   We turn ON the **8** switch (Leaves $13 - 8 = 5$ remaining).
*   We turn ON the **4** switch (Leaves $5 - 4 = 1$ remaining).
*   We keep the **2** switch OFF.
*   We turn ON the **1** switch (Leaves $1 - 1 = 0$ remaining).

```text
Switch Values:   8   4   2   1
Switch States:   1   1   0   1  ──> 1101 in binary!
```
Therefore, Decimal **13** is stored inside your computer as binary `1101`.

---

## Part 2: Why Learn Bit Manipulation?

Normally, if you want to store a list of user settings, you declare multiple variables:
```javascript
let canRead = true;
let canWrite = false;
let isAdmin = true;
let canDelete = false;
```
This requires declaring four separate variables in memory. 

Using bit manipulation, we can pack all four Boolean flags into a **single binary number**:
```text
State: [ isAdmin ] [ canDelete ] [ canWrite ] [ canRead ]
Bits:       1            0             0           1    ──> 1001 (Decimal 9)
```
Instead of managing four variables, you store the number `9` in a single slot. This is extremely fast and saves memory.

### Where is this used?
*   **Operating Systems:** Managing file read/write permissions (like Unix `chmod`).
*   **Databases & Game Engines:** High-performance index states and flag grids.
*   **Networking & Buffers:** Parsing data streams packet-by-packet.

---

## Part 3: The 7 Bitwise Operators

Bitwise operators perform logic calculations on individual zeros and ones of a binary number.

### 1. AND (`&`)
*   *Analogy:* **Two-key safety deposit box.** Both keys must be turned to ON (`1`) for the box to open. If only one key is turned, the box stays closed (`0`).

| Bit A | Bit B | A & B |
| :---: | :---: | :---: |
| 1 | 1 | **1** |
| 1 | 0 | **0** |
| 0 | 1 | **0** |
| 0 | 0 | **0** |

#### Example: `5 & 3`
```text
Decimal 5:  0 1 0 1
Decimal 3:  0 0 1 1
─────────────────── (Compare column-by-column)
   Result:  0 0 0 1 ──> Decimal 1!
```
```javascript
console.log(5 & 3); // 1
```

---

### 2. OR (`|`)
*   *Analogy:* **A gate with two unlock cards.** If *either* card is tapped (toggled to `1`), the gate opens. It only closes if both cards are missing (`0`).

| Bit A | Bit B | A \| B |
| :---: | :---: | :---: |
| 1 | 1 | **1** |
| 1 | 0 | **1** |
| 0 | 1 | **1** |
| 0 | 0 | **0** |

#### Example: `5 | 3`
```text
Decimal 5:  0 1 0 1
Decimal 3:  0 0 1 1
─────────────────── (At least one 1)
   Result:  0 1 1 1 ──> Decimal 7!
```
```javascript
console.log(5 | 3); // 7
```

---

### 3. XOR (`^` - Exclusive OR)
*   *Analogy:* **A two-way staircase light switch.** If the two switches are in **different** positions (one up, one down), the light turns ON (`1`). If they are in the **same** position (both up or both down), the light turns OFF (`0`).

| Bit A | Bit B | A ^ B |
| :---: | :---: | :---: |
| 1 | 1 | **0** (Same) |
| 1 | 0 | **1** (Different) |
| 0 | 1 | **1** (Different) |
| 0 | 0 | **0** (Same) |

#### Example: `5 ^ 3`
```text
Decimal 5:  0 1 0 1
Decimal 3:  0 0 1 1
─────────────────── (Different bits = 1)
   Result:  0 1 1 0 ──> Decimal 6!
```
```javascript
console.log(5 ^ 3); // 6
```

#### Important XOR Math Rules:
```text
a ^ a = 0 (Any number XORed with itself is zero)
a ^ 0 = a (Any number XORed with zero remains unchanged)
```

---

### 4. NOT (`~`)
*   *Analogy:* **An Inverter / Opposite Day.** Flipping every light switch to its opposite position (`0` becomes `1`, and `1` becomes `0`).
*   *Formula:* `~x = -(x + 1)`

```javascript
console.log(~5);  // -6
console.log(~0);  // -1
console.log(~-1); // 0
```

---

### 5. Left Shift (`<<`)
*   *Analogy:* **Conveyor Belt shift to the Left.** Slide all bits to the left by `n` spots, filling empty spaces on the right with zeros.
*   **Rule:** Every left shift by 1 **multiplies the number by 2**.

#### Example: `5 << 1`
```text
Decimal 5 in binary:       0 1 0 1
Shift left by 1 spot:    1 0 1 0 ──> Decimal 10!
```
```javascript
console.log(5 << 1); // 10
console.log(5 << 2); // 20
```

---

### 6. Right Shift (`>>`)
*   *Analogy:* **Conveyor Belt shift to the Right.** Slide all bits to the right by `n` spots. The bits on the far right fall off the conveyor belt and disappear.
*   **Rule:** Every right shift by 1 **divides the number by 2** (rounded down).

#### Example: `20 >> 1`
```text
Decimal 20 in binary:    1 0 1 0 0
Shift right by 1 spot:     1 0 1 0 ──> Decimal 10!
```
```javascript
console.log(20 >> 1); // 10
console.log(20 >> 2); // 5
```

---

### 7. Unsigned Right Shift (`>>>`)
Similar to Right Shift, but always fills empty spaces on the far left with **zeros** (ignoring the negative sign bit). Used primarily for processing positive numbers in raw binary arrays or buffer streams.

```javascript
console.log(-5 >>> 1); // 2147483645 (Large positive integer representation)
```

---

## Part 4: Permission Systems in Real Software

Here is how real permission managers (like AWS or Linux file systems) configure user roles in one number:

```javascript
const READ    = 1 << 0; // 0001 (Decimal 1)
const WRITE   = 1 << 1; // 0010 (Decimal 2)
const INVITE  = 1 << 2; // 0100 (Decimal 4)
const BILLING = 1 << 3; // 1000 (Decimal 8)
```

### 1. Assign Permissions (Bitwise OR `|`)
```javascript
let userRole = READ | WRITE; // 0001 | 0010 -> 0011 (Decimal 3)
```

### 2. Check Permissions (Bitwise AND `&`)
Check if the user has the `WRITE` flag:
```javascript
const canWrite = (userRole & WRITE) === WRITE;
console.log(canWrite); // true
```

### 3. Add a Permission (Bitwise OR `|=`)
```javascript
userRole |= INVITE; // Add INVITE flag (userRole is now 0111)
```

### 4. Remove a Permission (Bitwise AND with NOT `&= ~`)
```javascript
userRole &= ~WRITE; // Clear WRITE flag (userRole is now 0101)
```

### 5. Toggle a Permission (Bitwise XOR `^=`)
```javascript
userRole ^= BILLING; // Turn on BILLING if off, or turn off if on
```

---

## Part 5: Bitwise Magic Tricks

Developers use these bitwise shortcuts to write high-performance calculations:

### 1. Fast Even or Odd Check
Instead of `% 2`, check the rightmost bit. If it is `0`, the number is even:
```javascript
function isEven(n) {
  return (n & 1) === 0;
}
console.log(isEven(8)); // true
console.log(isEven(7)); // false
```

### 2. Fast Floor Integer Conversion
Truncates decimals quickly (equivalent to `Math.floor()` for positive numbers):
```javascript
console.log(12.99 | 0); // 12
console.log(~~42.15);   // 42
```

### 3. Swapping Variables Without a Third Variable
```javascript
let a = 5;
let b = 10;

a ^= b;
b ^= a;
a ^= b;

console.log(a, b); // 10, 5
```

### 4. Opposite Signs Checker
```javascript
function hasOppositeSigns(a, b) {
  return (a ^ b) < 0;
}
console.log(hasOppositeSigns(10, -20)); // true
console.log(hasOppositeSigns(10, 20));  // false
```

### 5. Power of Two Checker
If a number is a power of 2, it contains exactly one `1` in binary. Subtracting `1` turns all subsequent bits to `1` (e.g., `8` is `1000`, `7` is `0111`).
```javascript
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(15)); // false
```

---

## Part 6: Real-World Production Examples

### Example 1: RGB Color Mask Parser
In graphics software (like Figma or Canvas), color values are stored in a single 24-bit integer. We extract individual Red, Green, and Blue channels using shifts and masks:
```javascript
function parseHexColor(hexNumber) {
  // hexNumber is a 24-bit representation (e.g., 0xFF5733)
  const red   = (hexNumber >> 16) & 255;
  const green = (hexNumber >> 8) & 255;
  const blue  = hexNumber & 255;

  return { red, green, blue };
}

console.log(parseHexColor(0xFF5733)); // { red: 255, green: 87, blue: 51 }
```

### Example 2: XOR Cipher (Text Obfuscation)
Encrypts and decrypts simple save data strings using XOR symmetric keys:
```javascript
function xorCipher(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    // XOR characters charCode
    result += String.fromCharCode(text.charCodeAt(i) ^ key);
  }
  return result;
}

const key = 42;
const encrypted = xorCipher("SecretMessage", key);
console.log("Encrypted:", encrypted);

const decrypted = xorCipher(encrypted, key);
console.log("Decrypted:", decrypted); // "SecretMessage"
```

---

## Part 7: Essential Interview Questions

### Q1: Solve "Find Single Number" in a duplicate array.
*   *Problem:* Given a non-empty array of integers where every element appears twice except for one, find that single one.
*   *Solution:* Use XOR. Since `x ^ x = 0`, duplicate numbers cancel each other out, leaving only the unique number:
```javascript
function findSingleNumber(nums) {
  return nums.reduce((acc, curr) => acc ^ curr, 0);
}
console.log(findSingleNumber([2, 1, 4, 2, 1])); // 4
```

### Q2: Count set bits (Brian Kernighan's Algorithm).
*   *Problem:* Count how many `1`s are present in a binary representation.
*   *Solution:* Subtracting `1` from a number flips all the bits after the rightmost set bit. Doing `n & (n - 1)` clears that rightmost `1`. We loop until `n` becomes `0`:
```javascript
function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    n = n & (n - 1); // Clears rightmost set bit
    count++;
  }
  return count;
}
console.log(countSetBits(29)); // 4 (29 is 11101 in binary)
```

---

## Part 8: Practice Exercises & Cheat Sheet

### Practice Exercises
1.  **Parity Evaluator:** Write a function checking if an input integer is even or odd using bitwise AND (`&`).
2.  **Bitwise Multiplier:** Multiply any positive number by 8 using left shift (`<<`).
3.  **Role Manager CLI:** Implement a mock command-line access controller supporting flags toggling.
4.  **Bitwise Integer Truncater:** Truncate decimals of float arrays using bitwise OR (`|`).
5.  **Power of Two validator:** Build a parser check resolving if integers are powers of 2.
6.  **RGB Color Assembler:** Combine individual red, green, and blue integer values (0-255) into a single 24-bit color integer.

### Quick Reference Cheat Sheet
| Task | Bitwise Operator Syntax |
| :--- | :--- |
| **Check Even/Odd** | `(x & 1) === 0` |
| **Multiply by 2** | `x << 1` |
| **Divide by 2** | `x >> 1` |
| **Clear rightmost set bit** | `x & (x - 1)` |
| **Check Power of Two** | `x > 0 && (x & (x - 1)) === 0` |
| **Reset/Cancel duplicate** | `x ^ x` (Resolves to 0) |
| **Set specific bit `i`** | `x | (1 << i)` |
| **Clear specific bit `i`** | `x & ~(1 << i)` |
| **Toggle specific bit `i`** | `x ^ (1 << i)` |
| **Check specific bit `i`** | `(x & (1 << i)) !== 0` |
