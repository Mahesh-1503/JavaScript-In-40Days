
# Project Guide: Build the Secret Number Guessing Game (Step-by-Step)

Welcome to your JavaScript project! In this guide, you'll learn **how to create a fun number guessing game** from scratch. Even if you're a complete beginner, follow each step and you'll not only build the game, but also understand the logic behind each part.

---

## **What Will You Build?**

A game where:
- The computer picks a random number between 1 and 10.
- The player tries to guess the number.
- The game gives hints if the guess is too high or too low.
- The player can play again after winning.

---

## **Step 1: Define the Range for the Secret Number**

**Why?**  
We need to set the minimum and maximum values the secret number can be.

**How?**
```js
const MIN_NUMBER = 1;
const MAX_NUMBER = 10;
```
- `const` means this value won't change.
- Choose `1` and `10` for this game, but you can pick any two numbers.

---

## **Step 2: Generate a Secret Random Number**

**Why?**  
The game should secretly pick a number that the player will guess.

**How?**
```js
const secretNumber = Math.floor(Math.random() * MAX_NUMBER) + 1;
```
**Breakdown:**
- `Math.random()` gives a number between 0 (inclusive) and 1 (exclusive).
- `Math.random() * MAX_NUMBER` scales it up (e.g., 0 to 10).
- `Math.floor()` rounds it down to the nearest whole number (e.g., 0 to 9).
- Adding `+ 1` shifts the range to 1 to 10.

**Logic Tip:**  
Adjust this formula if you ever want a different min/max range.

---

## **Step 3: Explain the Game to the User**

**Why?**  
Always tell the player what to do!

**How?**
```js
console.log("Welcome to the Number Guessing Game!");
console.log("Try to guess a number between 1 and 10.");
```

---

## **Step 4: Prepare to Receive the Player's Guess**

**Why?**  
We need to get input from the user and store their guess.

**How?**
```js
let guess = null; // Stores the user's guess
let attempts = 0; // Counts how many tries the user takes
```

---

## **Step 5: Ask the Player to Guess Until Correct**

**Why?**  
We want the player to keep guessing until they find the right number.

**How?**
```js
while (guess !== secretNumber) {
  // Steps for each guess go inside this block
}
```

**Logic Tip:**  
- `while` means "keep repeating as long as..."
- We check if the guess is NOT the secret number.

---

## **Step 6: Get and Validate User Input**

**Why?**  
Players might enter something invalid (like letters or out-of-range numbers). We must check the input.

**How?**
```js
const guessPrompt = prompt("Enter your guess: ");
guess = parseInt(guessPrompt);

if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
  console.log(
    `Invalid input! Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`
  );
  continue; // Skips this loop and asks again
}
```

**Logic Tip:**  
- `parseInt` turns a string into a number.
- `isNaN` checks if it's "Not a Number."
- Use `continue` to skip the rest of the loop if input is invalid.

---

## **Step 7: Give the Player Hints**

**Why?**  
Feedback helps the player adjust their next guess.

**How?**
```js
attempts++; // Add one to the attempts

if (guess < secretNumber) {
  console.log("Too Low! Try again.");
} else if (guess > secretNumber) {
  console.log("Too High! Try again.");
} else {
  console.log(
    `🎉 Congrats! You guessed the number in ${attempts} attempts.`
  );
  break; // Ends the loop when correct
}
```

**Logic Tip:**  
- Always increment attempts **after** receiving a valid guess.
- Use `break` to exit the loop when the guess is correct.

---

## **Step 8: Ask to Play Again**

**Why?**  
Let the player enjoy multiple rounds if they wish.

**How?**
```js
const playAgainPrompt = prompt("Do you want to play again? (yes/no)");
const playAgain = playAgainPrompt
  ? playAgainPrompt.toLocaleLowerCase()
  : "no";
if (playAgain === "yes") {
  startSecretNumberGame(); // Calls the game function again
} else {
  console.log("Thanks for playing! See you next time.");
}
```

**Logic Tip:**  
- We use a function for the game so we can restart it easily.
- Always check the user's response in lower case for consistency.

---

## **Step 9: Wrap Everything in a Function**

**Why?**  
A function lets us call the game repeatedly (for "Play Again").

**How?**
```js
function startSecretNumberGame() {
  // All previous steps go here (except the function call)
}
```
- At the end of your code, call the function to start the game:
```js
startSecretNumberGame();
```

---

## **Summary of the Complete Logic**

1. Set the min and max numbers.
2. Generate a random secret number.
3. Tell the player what to do.
4. Loop: Get the guess, check if it’s valid, compare, give hints, count attempts.
5. When correct, congratulate the player.
6. Ask if they want to play again and restart if yes.

---

## **Extra Tips for Beginners**

- **Always check user input!** Don’t trust it to be correct.
- **Use clear variable names** so you remember what each one does.
- **Comment your code** to explain your own thinking.
- **Test your code** by guessing numbers yourself, including wrong inputs.

---

## **Challenge: Make It Your Own!**

- Change the min/max range.
- Customize hints or add more feedback.
- Track and display the best score (fewest attempts).

---

**Congratulations!**  
You now have the logic and understanding to build a Secret Number Guessing Game in JavaScript.  
Keep exploring and happy coding!
