/**
 * Day 03b: Bitwise Operators & Bit Manipulation Demo
 * Context: SaaS Systems & Admin Tools
 * 
 * Run this file using Node.js:
 * node 03b-bitwise-operators-and-bit-manipulation/demo.js
 */

console.log("==============================================================");
console.log("💡 DAY 03b: BITWISE OPERATORS & BIT MANIPULATION DEMO");
console.log("==============================================================\n");

// ==========================================
// 1. BASIC OPERATORS
// ==========================================
console.log("--- 1. Basic Operators ---");
{
  const a = 5; // Binary: 0101
  const b = 3; // Binary: 0011

  console.log(`a = 5 (${(a).toString(2).padStart(4, "0")})`);
  console.log(`b = 3 (${(b).toString(2).padStart(4, "0")})`);
  console.log(`a & b (AND) : ${a & b} (${(a & b).toString(2).padStart(4, "0")})`); // 1 (0001)
  console.log(`a | b (OR)  : ${a | b} (${(a | b).toString(2).padStart(4, "0")})`); // 7 (0111)
  console.log(`a ^ b (XOR) : ${a ^ b} (${(a ^ b).toString(2).padStart(4, "0")})`); // 6 (0110)
  console.log(`~a    (NOT) : ${~a} (${(~a).toString(2)})`); // -6 (Two's complement)
  console.log("");
}

// ==========================================
// 2. SHIFT OPERATORS
// ==========================================
console.log("--- 2. Shift Operators ---");
{
  const num = 5; // Binary: 0101
  console.log(`num = 5 (${(num).toString(2).padStart(8, "0")})`);
  console.log(`num << 1 (Left Shift)  : ${num << 1} (${(num << 1).toString(2).padStart(8, "0")})`); // 10 (00001010)
  console.log(`num >> 1 (Right Shift) : ${num >> 1} (${(num >> 1).toString(2).padStart(8, "0")})`); // 2 (00000010)
  
  const negativeNum = -5;
  // Sign-propagating right shift preserves the negative sign (fills 1s on left)
  console.log(`-5 >> 1  (Signed Right Shift)   : ${negativeNum >> 1}`); // -3
  // Zero-fill right shift loses the negative sign, creating a large positive number
  console.log(`-5 >>> 1 (Unsigned Right Shift) : ${negativeNum >>> 1}\n`); // 2147483645
}

// ==========================================
// 3. SAAS WORKSPACE PERMISSIONS GATE
// ==========================================
console.log("--- 3. SaaS Workspace Permissions Gate ---");
{
  const READ_DOCS = 1 << 0;   // 0001 (1)
  const WRITE_DOCS = 1 << 1;  // 0010 (2)
  const INVITE_USER = 1 << 2; // 0100 (4)
  const BILLING_MGT = 1 << 3; // 1000 (8)

  // Initialize a user with READ and WRITE access (0001 | 0010 -> 0011 -> Decimal 3)
  let userMask = READ_DOCS | WRITE_DOCS;
  console.log(`User initialized permissions: ${userMask} (binary: ${userMask.toString(2).padStart(4, "0")})`);

  // 1. Check if user has WRITE_DOCS
  const canWrite = (userMask & WRITE_DOCS) === WRITE_DOCS;
  console.log(`  -> Can write documents? ${canWrite}`);

  // 2. Check if user has INVITE_USER
  const canInvite = (userMask & INVITE_USER) === INVITE_USER;
  console.log(`  -> Can invite users? ${canInvite}`);

  // 3. Grant INVITE_USER (Bitwise OR)
  userMask |= INVITE_USER;
  console.log(`User granted invite access: ${userMask} (binary: ${userMask.toString(2).padStart(4, "0")})`);
  console.log(`  -> Can invite users now? ${(userMask & INVITE_USER) === INVITE_USER}`);

  // 4. Revoke WRITE_DOCS (Bitwise AND with Bitwise NOT)
  userMask &= ~WRITE_DOCS;
  console.log(`User revoked write access: ${userMask} (binary: ${userMask.toString(2).padStart(4, "0")})`);
  console.log(`  -> Can write documents now? ${(userMask & WRITE_DOCS) === WRITE_DOCS}`);

  // 5. Toggle BILLING_MGT (Bitwise XOR)
  userMask ^= BILLING_MGT;
  console.log(`User toggled billing access (ON): ${userMask} (binary: ${userMask.toString(2).padStart(4, "0")})`);
  userMask ^= BILLING_MGT;
  console.log(`User toggled billing access (OFF): ${userMask} (binary: ${userMask.toString(2).padStart(4, "0")})\n`);
}

// ==========================================
// 4. HEX / RGB COLOR CHANNEL PARSER
// ==========================================
console.log("--- 4. Hex / RGB Color Channel Parser ---");
{
  function hexToRgb(hex) {
    const num = parseInt(hex.replace("#", ""), 16);
    return {
      r: (num >> 16) & 0xFF,
      g: (num >> 8) & 0xFF,
      b: num & 0xFF
    };
  }

  function rgbToHex(r, g, b) {
    const packed = (r << 16) | (g << 8) | b;
    return "#" + packed.toString(16).padStart(6, "0").toUpperCase();
  }

  const hexColor = "#FF5733";
  const rgb = hexToRgb(hexColor);
  console.log(`Hex: ${hexColor} parsed to RGB: R=${rgb.r}, G=${rgb.g}, B=${rgb.b}`);

  const packedHex = rgbToHex(rgb.r, rgb.g, rgb.b);
  console.log(`RGB R=${rgb.r}, G=${rgb.g}, B=${rgb.b} packed back to Hex: ${packedHex}\n`);
}

// ==========================================
// 5. ELITE BIT MANIPULATION TRICKS & TIPS
// ==========================================
console.log("--- 5. Elite Bit Manipulation Tricks & Tips ---");
{
  // Trick 1: Even/Odd Parity Check (n & 1)
  const checkParity = (n) => ((n & 1) === 0 ? "Even" : "Odd");
  console.log(`Parity check: 42 is ${checkParity(42)}, 99 is ${checkParity(99)}`);

  // Trick 2: In-place Variable Swap (XOR Swap)
  let x = 15;
  let y = 30;
  console.log(`Before Swap: x=${x}, y=${y}`);
  x ^= y;
  y ^= x;
  x ^= y;
  console.log(`After Swap : x=${x}, y=${y}`);

  // Trick 3: Fast Truncation / Floor (n | 0 or ~~n)
  const val = 124.95;
  console.log(`Truncating decimal of 124.95: ${val | 0}`); // 124
  console.log(`Double NOT rounding of 124.95: ${~~val}`); // 124

  // Trick 4: Opposite Signs check (XOR of values results in a negative sign bit)
  const hasOppositeSigns = (num1, num2) => (num1 ^ num2) < 0;
  console.log(`Opposite sign check: 10 & -20? ${hasOppositeSigns(10, -20)}`); // true
  console.log(`Opposite sign check: -10 & -20? ${hasOppositeSigns(-10, -20)}`); // false

  // Trick 5: Power of 2 Check (n & (n - 1) === 0)
  const isPowerOfTwo = (n) => n > 0 && (n & (n - 1)) === 0;
  console.log(`Is 64 a power of 2? ${isPowerOfTwo(64)}`); // true
  console.log(`Is 68 a power of 2? ${isPowerOfTwo(68)}`); // false

  // Trick 6: Counting set bits (Hamming Weight via Kernighan's Algorithm)
  function countSetBits(n) {
    let count = 0;
    let original = n;
    while (n > 0) {
      n = n & (n - 1);
      count++;
    }
    return count;
  }
  console.log(`Number of set bits in 29 (binary ${(29).toString(2)}): ${countSetBits(29)}`); // 4 set bits

  // Trick 7: XOR cipher obfuscation
  const sensitiveToken = "sk_live_stripe_9944";
  const key = 103; // Secret byte
  const encrypted = xorCipher(sensitiveToken, key);
  const decrypted = xorCipher(encrypted, key);

  function xorCipher(text, keyByte) {
    let output = "";
    for (let i = 0; i < text.length; i++) {
      output += String.fromCharCode(text.charCodeAt(i) ^ keyByte);
    }
    return output;
  }
  console.log(`Encrypted Token: "${encrypted}" (hex: ${Buffer.from(encrypted).toString("hex")})`);
  console.log(`Decrypted Token: "${decrypted}"\n`);
}

console.log("==============================================================");
console.log("🟢 BITWISE OPERATORS VERIFICATION COMPLETE!");
console.log("==============================================================");
