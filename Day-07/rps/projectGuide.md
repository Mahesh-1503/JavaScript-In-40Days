
# Project Guide: Building the Rock, Paper, Scissors Game (`rps.js`)

Welcome to your step-by-step guide to building a Rock 🪨, Paper 🧻, Scissors ✂️ game in JavaScript! This guide is designed for beginners. By following these steps, you will build the complete logic for the game and understand each part.

---

## 🌟 Step 1: Understand the Game Rules

Before we start coding, let's be clear about how the game works:

- There are three choices: Rock, Paper, and Scissors.
- Rock beats Scissors (Rock crushes Scissors).
- Paper beats Rock (Paper covers Rock).
- Scissors beats Paper (Scissors cut Paper).
- If both players choose the same, it's a tie.
- The game is played between a human (user) and the computer.

---

## 🌟 Step 2: Prepare Your Environment

1. **Create a folder:**  
   Make a folder called `rps` inside your `Day-07` directory.
2. **Create a file:**  
   Inside the `rps` folder, create a file named `rps.js`.
3. **Open the file in your code editor.**

---

## 🌟 Step 3: Plan the Game Structure

Think about how the game will flow:

1. Show a welcome message.
2. Ask the user to enter their choice (Rock, Paper, or Scissors).
3. Generate a random choice for the computer.
4. Compare both choices to determine the winner.
5. Show the result (win, lose, or tie).
6. Ask the user if they want to play again.
7. Repeat or end the game based on the user's answer.

---

## 🌟 Step 4: Write the Game Function

Let's start by wrapping our game logic in a function. This makes it easy to repeat the game if the user wants to play again.

```js
function rockPaperScissorsGame() {
  // All our game code will go inside this function
}
```

---

## 🌟 Step 5: Show a Welcome Message

Inside the function, greet the user with a message so they know the game has started:

```js
console.log("Getting Started With the Rock 🪨, Paper 🧻, or Scissors ✂️ Game");
```

---

## 🌟 Step 6: Get the User's Choice

Ask the user to enter their choice. Use `prompt()` to get input (works in browsers):

```js
const userChoicePrompt = prompt("Enter Rock 🪨, Paper 🧻, or Scissors ✂️");
const userChoice = userChoicePrompt.toLowerCase();
```
*Tip: `.toLowerCase()` allows us to compare choices without worrying about uppercase/lowercase.*

---

## 🌟 Step 7: Generate the Computer's Choice

Let the computer randomly pick rock, paper, or scissors.

```js
let computerChoice;
const randomNumber = Math.floor(Math.random() * 3) + 1;

if (randomNumber === 1) {
  computerChoice = "rock";
} else if (randomNumber === 2) {
  computerChoice = "paper";
} else {
  computerChoice = "scissors";
}
```

- `Math.random()` gives a random number between 0 and 1.
- Multiply by 3 and add 1 to get 1, 2, or 3.
- Use `if...else` to assign the computer's choice.

---

## 🌟 Step 8: Show Both Choices

Display what each player chose:

```js
console.log("User selected", userChoice);
console.log("Computer selected", computerChoice);
```

---

## 🌟 Step 9: Decide the Winner

Now use `if...else` to compare choices and figure out who won.

```js
if (
  (userChoice === "rock" && computerChoice === "scissors") ||
  (userChoice === "paper" && computerChoice === "rock") ||
  (userChoice === "scissors" && computerChoice === "paper")
) {
  console.log("You the User WIN, yay!!!!");
} else if (userChoice === computerChoice) {
  console.log("The Game is a Tie");
} else if (
  (userChoice === "rock" && computerChoice === "paper") ||
  (userChoice === "paper" && computerChoice === "scissors") ||
  (userChoice === "scissors" && computerChoice === "rock")
) {
  console.log("Oh Ho... Computer Wins!!!!");
} else {
  console.log("Please check the input, We didn't understand it.");
}
```

- First `if` checks if the user wins.
- Second `if` checks for a tie.
- Third `if` checks if the computer wins.
- Last `else` handles invalid input.

---

## 🌟 Step 10: Ask to Play Again

After showing the result, ask the user if they want to play again:

```js
const playAgainPrompt = prompt("Do You Want to Play Again? (yes/no)");
const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";

if (playAgain === "yes") {
  rockPaperScissorsGame(); // Call the function again to restart
} else {
  console.log("Thanks for Playing! See you Next Time");
}
```

---

## 🌟 Step 11: Start the Game

Outside the function, make sure to start the game by calling your function:

```js
rockPaperScissorsGame();
```

---

## 🌟 Step 12: Test the Game

1. Open your file in a browser environment that supports `prompt()`.  
   *Note: If using Node.js, prompt won't work unless you use extra modules. Use browser console for best beginner experience!*
2. Try entering "rock", "paper", or "scissors" and see how the game responds.
3. Test different scenarios: win, lose, tie, and invalid input.
4. Try playing again and quitting.

---

## 🌟 Step 13: Celebrate!

Congratulations 🎉!  
You have built a complete Rock, Paper, Scissors game in JavaScript.  
Feel free to customize it with emojis, colors, or even scores!

---

## 🌟 Bonus Tips

- You can improve the game by validating user input before comparing.
- Try keeping track of how many times you or the computer win.
- Add more features as you learn!

---

**Keep practicing and happy coding!**
