//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

    //UI Elements
    const game = document.querySelector('#game'),
          minNum = document.querySelector('.min-num'),
          maxNum = document.querySelector('.max-num'),
          guessBtn = document.querySelector('#guess-btn'),
          guessInput = document.querySelector('#guess-input'),
          message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
let guess = parseInt(guessInput.value);

  //Validation
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  } 

  //Check if won
  if (guess === winningNum){
    //Game Over - WIN STATE

    gameOver(true, `${winningNum} is Correct!, You win!`);

  } else {
    //Wrong Number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      //Game Over - LOSE STATE

      gameOver(false ,`Game over, you lost. The correct number was ${winningNum}.`);
    } else {
      //Game continues

      //Change border color
      guessInput.style.borderColor = 'red';
      //Clear Input
      guessInput.value = '';
      //Tell user the number was incorrect
      setMessage(`${guess} is not correct, ${guessesLeft} guesses remaining`, 'red')
    }
  }
});

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  
  //Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);
  //Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}
//Get winning number
function getRandomNum(min, max){
  return Math.floor( Math.random()*(max - min + 1 ) + min);
}

//Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}