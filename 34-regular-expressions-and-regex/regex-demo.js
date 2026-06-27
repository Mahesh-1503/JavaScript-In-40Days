// ==========================================
// DAY 34 COMPLEMENTARY SCRIPT: REGULAR EXPRESSIONS
// ==========================================

console.log("--- 1. Basic Matching & Testing (test vs exec) ---");
const usernameInput = "admin_user_99";
const loginInput = "guest_user";

// Literal Regex: matches word boundaries, starts with admin_, followed by alphanumeric
const adminCheck = /^\badmin_[a-zA-Z0-9_]+\b$/;

console.log("adminCheck.test('admin_user_99'):", adminCheck.test(usernameInput)); // true
console.log("adminCheck.test('guest_user'):", adminCheck.test(loginInput));       // false

// RegExp.prototype.exec() detailed extraction
const logBlob = "ALERT: Unauthorized access detected from IP: 192.168.1.105 on port 8080";
const ipPattern = /IP:\s([0-9.]+)\son\sport\s(\d+)/;
const execResult = ipPattern.exec(logBlob);

console.log("execResult array:", execResult);
console.log("Captured IP ($1):", execResult[1]); // "192.168.1.105"
console.log("Captured Port ($2):", execResult[2]); // "8080"


console.log("\n--- 2. String integration: match, matchAll, and replace ---");
const logBlobMultiple = "ERROR[404]: File Not Found. ERROR[500]: Database Timeout. ERROR[403]: Forbidden.";
const errorPattern = /ERROR\[(\d+)\]:\s([a-zA-Z\s]+)/g; // global flag active

// A. String.prototype.match
const basicMatches = logBlobMultiple.match(errorPattern);
console.log("match() results array:", basicMatches); // Array of matches without capture groups

// B. String.prototype.matchAll (iterating details)
console.log("matchAll() results iteration:");
for (const match of logBlobMultiple.matchAll(errorPattern)) {
  console.log(`  -> Code: ${match[1]}, Message: '${match[2].trim()}'`);
}

// C. String.prototype.replace with capture group variables ($1, $2)
const logTemplate = "System failure in module: CORE. Details: ERROR[500]: DB_FAIL";
// Swap places of Code and Details during replacement
const reformattedLog = logTemplate.replace(/ERROR\[(\d+)\]:\s(\w+)/, "CODE=$1 MESSAGE=$2");
console.log("Reformatted String:\n  ", reformattedLog);


console.log("\n--- 3. Greedy vs Lazy Quantifiers ---");
const htmlString = "<div>First Block</div><div>Second Block</div>";

// Greedy matching (matches as much as possible)
const greedyPattern = /<div>.*<\/div>/;
console.log("Greedy match:", htmlString.match(greedyPattern)[0]); 
// Output: <div>First Block</div><div>Second Block</div>

// Lazy matching (adding ? makes it match the minimum possible)
const lazyPattern = /<div>.*?<\/div>/g;
console.log("Lazy matches (Array):", htmlString.match(lazyPattern));
// Output: [ '<div>First Block</div>', '<div>Second Block</div>' ]


console.log("\n--- 4. The Stateful Global lastIndex Bug ---");
const namePattern = /arun/g; // global flag
const testName = "arun";

console.log("Run 1 (lastIndex=0):", namePattern.test(testName)); // true
console.log("lastIndex value after Run 1:", namePattern.lastIndex); // 4

console.log("Run 2 (lastIndex=4):", namePattern.test(testName)); // false (starts checking at index 4!)
console.log("lastIndex value after Run 2:", namePattern.lastIndex); // 0 (resets on fail)

console.log("Run 3 (lastIndex=0):", namePattern.test(testName)); // true (works again!)

// Fix: Reset lastIndex manually before validating strings with global patterns
namePattern.lastIndex = 0;
console.log("Run 4 after manual reset:", namePattern.test(testName)); // true


console.log("\n--- 5. Real-World Lookaround Password Strength Validator ---");
// Lookahead constraints:
// (?=.{8,})          - At least 8 characters
// (?=.*[A-Z])        - At least 1 uppercase letter
// (?=.*[a-z])        - At least 1 lowercase letter
// (?=.*\d)           - At least 1 digit
// (?=.*[!@#$%^&*])   - At least 1 special char
const strongPasswordPattern = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/;

function validatePassword(pwd) {
  return strongPasswordPattern.test(pwd);
}

console.log("validatePassword('weak123') =>", validatePassword("weak123")); // false
console.log("validatePassword('SecurePass123!') =>", validatePassword("SecurePass123!")); // true
