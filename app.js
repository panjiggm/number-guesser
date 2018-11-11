/*
GAME FUNCTION :
- Player must guess a number between 1=a min and max
- Player gets a certain amount of guesses
- Notify player of guesser remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
 */

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message')

// Assign UI min & max
minNum.textContent = min
maxNum.textContent = max

// Play again event Listener
game.addEventListener('mousedown', function(e){
    if (e.target.className === 'play-again') {
        window.location.reload()
    }
})

// Listen for Guess Button
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value)
    
    // validate our input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    // check if won
    if (guess === winningNum) {
        //  Game Over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else {
        // Wrong number
        guessesLeft -= 1
        if(guessesLeft === 0){
            //  Game Over - lost
            gameOver(false, `GAME OVER, you lost! The correct number was ${winningNum}`)
        } else {
            // game continuous - answer wrong
            guessInput.style.borderColor = 'red'
            // Clear input
            guessInput.value = ''
            setMessage(`${guess} is no correct, ${guessesLeft} guesses left`, 'red')
        }
    }
})

// Get Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min
}

function setMessage(msg, color){
    message.style.color = color
    message.textContent = msg
}

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red'
    guessInput.disbled = true
    guessInput.style.borderColor = color   
    setMessage(msg, color)

    // Play Again
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again'
}