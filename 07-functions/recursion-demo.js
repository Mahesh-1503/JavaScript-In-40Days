// ==========================================
// DAY 07 COMPLEMENTARY SCRIPT: RECURSION DEMO
// ==========================================

// 1. SIMPLE MATHEMATICAL RECURSION: FACTORIAL
// Computes n! = n * (n-1) * (n-2) * ... * 1
function factorial(n, depth = 0) {
  const indent = "  ".repeat(depth);
  console.log(`${indent}➜ Entering factorial(${n})`);
  
  // Base Case
  if (n <= 1) {
    console.log(`${indent}◀ Reached Base Case: factorial(1) = 1`);
    return 1;
  }
  
  // Recursive Step
  const result = n * factorial(n - 1, depth + 1);
  console.log(`${indent}◀ Exiting factorial(${n}) = ${result}`);
  return result;
}

console.log("--- 1. Mathematical Recursion ---");
const fact5 = factorial(5);
console.log("Final Result of factorial(5):", fact5);


// 2. FIBONACCI SEQUENCE WITH DEPTH LOGGING
// Computes the n-th Fibonacci number: fib(n) = fib(n-1) + fib(n-2)
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log("\n--- 2. Fibonacci Sequence ---");
console.log("Fibonacci number at position 6: %d", fibonacci(6)); // 8 (0, 1, 1, 2, 3, 5, 8)


// 3. TESTING CALL STACK LIMIT (STACK OVERFLOW PREVENTER)
function triggerStackOverflow(counter) {
  // Missing base case
  return triggerStackOverflow(counter + 1);
}

console.log("\n--- 3. Call Stack Limit Demonstration ---");
try {
  triggerStackOverflow(1);
} catch (error) {
  console.error("Caught expected Stack Overflow:");
  console.error("Error Name: %s", error.name);
  console.error("Error Message: %s", error.message);
}


// 4. NESTED FOLDER PLAYLIST CRAWLER
const playlistLibrary = {
  name: "Root",
  tracks: ["track_101"],
  subfolders: [
    {
      name: "Chill Beats",
      tracks: ["track_202", "track_203"],
      subfolders: []
    },
    {
      name: "Gym Workout",
      tracks: ["track_301"],
      subfolders: [
        {
          name: "Metal Cardio",
          tracks: ["track_404"],
          subfolders: []
        }
      ]
    }
  ]
};

function collectAllTracks(folder) {
  let list = [...folder.tracks];
  for (const sub of folder.subfolders) {
    list = list.concat(collectAllTracks(sub));
  }
  return list;
}

console.log("\n--- 4. Hierarchical Directory/Folder Crawling ---");
const songs = collectAllTracks(playlistLibrary);
console.log("All collected Track IDs:", songs);
