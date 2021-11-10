const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingText = document.querySelector(".remaining");
const remainingNumber = document.querySelector("span");
const guessMessage = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLettersArray = [];

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

//function to validate user input as a single letter
const validateInput = function(userInput){
    const acceptedLetter = /[a-zA-Z]/;
    if (userInput == "") { //if string is empty
        guessMessage.innerText = "Please guess one letter";
    } else if (userInput.length > 1) { //if string is more than one letter
        guessMessage.innerText = "Please enter one letter only";
    } else if (userInput.match(acceptedLetter) == null) { //if string is not a letter
        guessMessage.innerText = "Please enter a letter A-Z";
    } else { 
        return userInput;
    }
};

//function to process guessed letter
const makeGuess = function(letter) {
    const upperLetter = letter.toUpperCase();
    if (guessedLettersArray.includes(upperLetter) == true) {
        guessMessage.innerHTML = "Letter has been guessed. Try again";
    } else {
        guessedLettersArray.push(upperLetter);
    }
    console.log(guessedLettersArray);
};

//call function to populate initial circles
createCircles(word);

//get user input (guess letter) on button click
guessButton.addEventListener("click", function(e){
    e.preventDefault(); //prevents reloading of webpage after form submission
    
    let inputVal = textInput.value;     //get user input from text box
    guessMessage.innerHTML = "";       //clear the displayed user message
    let userLetter = validateInput(inputVal);  //check that the user input a single letter
    console.log(userLetter);  
    
    //process guess only if the input is a validated letter
    if (userLetter != undefined) {
        makeGuess(userLetter);
    } 

    //clear text input box
    textInput.value = "";
});



