// Set up initial variables
let secretNumber;
let round = 1;
let roundsWon = 0;

// Function to start a new round
function newRound() {
  // Generate a random number between 1 and 10 as the secret number
  secretNumber = Math.floor(Math.random() * 10) + 1;
  // Update round number display
  document.getElementById('round').innerText = round;
}

// Function to check the guess
function checkGuess() {
  const guess = parseInt(document.getElementById('guess').value);
  const message = document.getElementById('message');
  
  if (isNaN(guess) || guess < 1 || guess > 10) {
    message.innerText = 'Please enter a valid number between 1 and 10';
  } else {
    if (guess === secretNumber) {
      message.innerText = 'Congratulations! You guessed the correct number!';
      roundsWon++;
    } else {
      message.innerText = `Wrong guess! The correct number was ${secretNumber}.`;
    }
    
    // If 10 rounds are complete, show game outcome
    if (round === 10) {
      if (roundsWon >= 3) {
        message.innerText += ' You won the game!';
      } else {
        message.innerText += ' You lost the game!';
      }
      // Disable guess input and button
      document.getElementById('guess').disabled = true;
      document.getElementById('guessBtn').disabled = true;
    } else {
      // Move to the next round
      round++;
      newRound();
    }
  }
}

// Event listener for guess button click
document.getElementById('guessBtn').addEventListener('click', checkGuess);

// Start the first round
newRound();
