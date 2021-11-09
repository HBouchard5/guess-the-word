const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingText = document.querySelector(".remaining");
const remainingNumber = document.querySelector("span");
const guessMessage = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

//function to populate game word with circles as placeholders
const createCircles = function(gameWord) {
    let wordArray = gameWord.split('');
    for(let letter in wordArray) {
        wordArray[letter] = "●";
    }
    let displayWord = wordArray.join("");
    wordInProgress.innerText = displayWord;
    console.log(displayWord);
};

//call function to populate initial circles
createCircles(word);

//get user input (guess letter) on button click
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    let inputVal = textInput.value;
    console.log(inputVal);
    textInput.value = "";
});



