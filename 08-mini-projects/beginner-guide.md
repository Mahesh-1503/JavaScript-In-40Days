# Beginner's Guide: JavaScript Mini-Projects

Welcome to the beginner's guide to JS mini-projects! In this section, we apply variables, comparison operators, loops, and functions to build two real games: **Rock Paper Scissors (RPS)** and **Secret Number Guessing**.

---

## 📅 Learning Roadmap

*   **Part 1:** Interactive Programs: The User-Machine Loop
*   **Part 2:** Capturing & Sanitizing User Inputs
*   **Part 3:** Understanding Randomness in JavaScript (`Math.random()`)
*   **Part 4:** Building Rock Paper Scissors (Step-by-Step)
*   **Part 5:** Building the Secret Number Game (Step-by-Step)
*   **Part 6:** Production Scopes: Input Validation & Recursion Replays
*   **Part 7:** Practice Exercises & Game Enhancements

---

## Part 1: Interactive Programs: The User-Machine Loop

Up to this point, our code has run static logs. Now, we build **interactive programs** where the computer and the human user interact:

```text
  Human Input (via Prompt) ──► Game Evaluation (Logic Trees)
             ▲                             │
             │                             ▼
      Play Again? ◄──────────────── Console Output
```

---

## Part 2: Capturing & Sanitizing User Inputs

Users enter data in unpredictable ways. They might type `"ROCK "`, `"Rock"`, or `"rOcK"`. Our code must clean (sanitize) this data first.

### 1. Capturing with `prompt()`
The `prompt()` function pauses execution and displays a popup input box. **It always returns a String** (or `null` if the user clicks cancel).
```javascript
const userInput = prompt("Enter your choice:");
```

### 2. Sanitizing Strings
Convert strings to lowercase and trim empty spaces so comparisons match reliably:
```javascript
const cleanedInput = userInput.trim().toLowerCase(); // Removes padding spaces and forces lowercase
```

### 3. Parsing Numbers and Handling `NaN` (Not-a-Number)
Since `prompt()` returns strings, we must convert numeric inputs (like `"7"`) to numbers using `parseInt()`:
```javascript
const guessPrompt = prompt("Enter a number:");
const guess = parseInt(guessPrompt); // Converts "7" to number 7
```
If the user types text (like `"seven"`), `parseInt()` fails and returns `NaN`. We validate this state using `isNaN()` before running math:
```javascript
if (isNaN(guess)) {
  console.log("Invalid Input! Please enter a real digit number.");
}
```

---

## Part 3: Understanding Randomness (`Math.random()`)

Computer choices must feel random. JavaScript provides `Math.random()` to generate pseudo-random numbers.

### The Mathematics of Random Ranges:
1.  **Step 1:** `Math.random()` returns a decimal float between `0` (inclusive) and `1` (exclusive):
    $$0 \le x < 1$$
2.  **Step 2:** Multiply by your desired **range width** ($R$). If we want numbers from 1 to 3, our width is 3:
    $$\text{Math.random()} \times 3 \implies 0 \le x < 3$$
3.  **Step 3:** Round down to the nearest whole integer using `Math.floor()`. This returns values in:
    $$\{0, 1, 2\}$$
4.  **Step 4:** Shift the range to match your minimum boundary ($+1$):
    $$\{0+1, 1+1, 2+1\} \implies \{1, 2, 3\}$$

#### Formula:
```javascript
// Random Integer between MIN and MAX:
const randomInt = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
```

#### Example 1: Rock-Paper-Scissors randomizer (1 to 3):
```javascript
const randomNumber = Math.floor(Math.random() * 3) + 1; // Generates 1, 2, or 3
```

#### Example 2: Guessing Game randomizer (1 to 10):
```javascript
const secretNumber = Math.floor(Math.random() * 10) + 1; // Generates 1 to 10
```

---

## Part 4: Building Rock Paper Scissors (Step-by-Step)

*   *Goal:* The human plays against the computer.
*   *Rules:* Rock breaks Scissors. Scissors cuts Paper. Paper covers Rock.

### File Reference: [rps.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/08-mini-projects/rps/rps.js)

### Step-by-Step Code Structure:
```javascript
function rockPaperScissorsGame() {
  console.log("Starting Rock, Paper, Scissors!");
  
  // 1. Get and sanitize human input
  const promptInput = prompt("Enter Rock, Paper, or Scissors:");
  if (!promptInput) return; // Exit if cancelled
  const userChoice = promptInput.trim().toLowerCase();

  // 2. Generate computer choice (1 = rock, 2 = paper, 3 = scissors)
  let computerChoice;
  const rand = Math.floor(Math.random() * 3) + 1;
  if (rand === 1) computerChoice = "rock";
  else if (rand === 2) computerChoice = "paper";
  else computerChoice = "scissors";

  console.log(`You selected: ${userChoice}`);
  console.log(`Computer selected: ${computerChoice}`);

  // 3. Compare Choices
  if (userChoice === computerChoice) {
    console.log("It's a tie!");
  } 
  // User winning conditions
  else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log("🎉 You Win!");
  } 
  // Computer winning conditions
  else if (
    (userChoice === "rock" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "rock")
  ) {
    console.log("💻 Computer Wins!");
  } 
  // Invalid inputs handle
  else {
    console.log("We did not understand your input.");
  }

  // 4. Play Again (Recursion)
  const playAgainPrompt = prompt("Do you want to play again? (yes/no)");
  const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";

  if (playAgain === "yes") {
    rockPaperScissorsGame(); // Recursive loop call
  } else {
    console.log("Thanks for playing!");
  }
}
```

---

## Part 5: Building the Secret Number Game (Step-by-Step)

*   *Goal:* Human guesses a random target number between 1 and 10.
*   *Hints:* Computer tells user if their guess is "Too High" or "Too Low".
*   *Attempts:* Counts and displays the total number of guesses.

### File Reference: [secret-number.js](file:///f:/40-Days%20JavaScript/JavaScript-In-40Days/08-mini-projects/secret-number/secret-number.js)

### Step-by-Step Code Structure:
```javascript
const MIN_NUMBER = 1;
const MAX_NUMBER = 10;

function startSecretNumberGame() {
  // 1. Generate random target number
  const secretNumber = Math.floor(Math.random() * MAX_NUMBER) + 1;
  let attempts = 0;
  let guess = null;

  console.log(`Guess the number between ${MIN_NUMBER} and ${MAX_NUMBER}!`);

  // 2. Loop until correct guess
  while (guess !== secretNumber) {
    const guessPrompt = prompt("Enter your guess:");
    guess = parseInt(guessPrompt);

    // Guard Clause: Validate range & NaN
    if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
      console.log(`Invalid! Enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
      continue; // Skip rest of loop iteration
    }

    attempts++;

    // Give Hint or win
    if (guess < secretNumber) {
      console.log("Too Low! Try again.");
    } else if (guess > secretNumber) {
      console.log("Too High! Try again.");
    } else {
      console.log(`🎉 Congrats! You found it in ${attempts} attempts.`);
      break; // Exit game loop
    }
  }

  // 3. Play Again
  const playAgainPrompt = prompt("Do you want to play again? (yes/no)");
  const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";
  
  if (playAgain === "yes") {
    startSecretNumberGame(); // Restart game
  } else {
    console.log("Thanks for playing!");
  }
}
```

---

## Part 6: Production Scopes: Input Validation & Recursion Replays

When building user-interactive features, professional developers prioritize **robust error handling** to prevent app crashes:

### 1. Guard Clauses (Defense First)
Don't write nested checks for errors. Put exit checks at the top of loops using `continue` or `return`:
```javascript
if (isNaN(guess)) {
  console.log("Error: Not a number.");
  continue; // Skip calculations immediately
}
```

### 2. Recursion for Game Loops
Instead of wrapping the entire game in a messy outer loop, call the game function inside itself (recursion) when restarting:
```javascript
if (playAgain === "yes") {
  startSecretNumberGame(); // Starts a clean new stack frame
}
```

---

## Part 7: Practice Exercises & Game Enhancements

Ready to expand these games? Try implementing these challenges:

1.  **Max Guess Limit:** Modify the Guessing Game to restrict the user to a maximum of 5 attempts. If they fail, display "Game Over!" and show the secret number.
2.  **Point Score Keeper:** Keep a global score variable that persists across replayed games (e.g. `userScore`, `computerScore`). Increment score counters at the end of each round.
3.  **Rock Paper Scissors Lizard Spock:** Expand the comparison trees in Rock Paper Scissors to include *Lizard* and *Spock* options (popularized by The Big Bang Theory):
    *   *Scissors* cuts *Paper* covers *Rock* crushes *Lizard* poisons *Spock* smashes *Scissors* decapitates *Lizard* eats *Paper* disproves *Spock* vaporizes *Rock* crushes *Scissors*.
4.  **Standard Deviation Range randomizer:** Create a random range constructor that accepts negative offsets (e.g., random numbers between `-10` and `+10`).
