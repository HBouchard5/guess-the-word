const guessedLetters = document.querySelector(".guessed-letters");  //displays all guessed letters
const guessButton = document.querySelector(".guess");       //Guess letter button
const textInput = document.querySelector(".letter");        //Player guess letter input box
const wordInProgress = document.querySelector(".word-in-progress");     //displays game word in progress
const remainingText = document.querySelector(".remaining");     //<p> to display the remaining guess counter
const remainingNumber = document.querySelector("span");     //<span> guess remaining counter
const guessMessage = document.querySelector(".message");    //<p> to display a message after player submits a guess
const playAgain = document.querySelector(".play-again");    //Play Again button

//define global variables
let word = "magnolia";          //define initial word
let guessedLettersArray = [];   //define empty array of guessed letters
let remainingGuesses = 8;       //define number of allowed wrong guesses

//Fetch word from API text file
const getWord = async function() {
    const res = await fetch(
        'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
    );
    const data = await res.text();
    const wordArray = data.split("\n");     //convert text string to array of words
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();   //select a random word
    createCircles(word);    //call function to populate the game word with circle placeholders
    console.log(word.toUpperCase());
};

//function to populate game word with circles as placeholders
const createCircles = function(gameWord) {
    let wordArray = gameWord.split('');
    for(let letter in wordArray) {
        wordArray[letter] = "●";
    }
    let displayWord = wordArray.join("");
    wordInProgress.innerText = displayWord;
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
        guessedLettersArray.push(upperLetter);  //add guess to Array
        showGuessedLetters();       //display updated list of guessed letters
        guessCounter(upperLetter);   //call function to update guesses remaining
        updateWIP(guessedLettersArray); //call function to update WIP
    }
};

//function to display wrongly guessed letters
const showGuessedLetters = function() {
    guessedLetters.innerHTML = "";
    for (let x of guessedLettersArray) {
        const newLI = document.createElement("li"); //create new li for each guessed letter
        newLI.innerHTML = x;
        guessedLetters.appendChild(newLI);      //add each letter to unordered list to display
    }
};

//function to update word in progress with letters to replace circles
const updateWIP = function(guessedArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const mixedArray = [];      //create new array to populate with correct letters and circles

    for (let x of wordArray) {
        if (guessedArray.includes(x) == true) {
            for (let y of guessedArray) {
                if (y == x) {
                    mixedArray.push(y); //update WIP with guessed letter
                }
            }
        } else {
            mixedArray.push("●"); //populate with circle placeholder
        }
    }
    const mixedWord = mixedArray.join("");  //convert WIP array to string
    wordInProgress.innerText = mixedWord;   //display WIP on screen

    wonGame(mixedWord);  //check if the user has won the game yet
};

//function to count remaining guesses
const guessCounter = function(newGuess) {
    const wordUpper = word.toUpperCase();

    //Reduce guess counter if guessed letter is not in the word
    if (wordUpper.includes(newGuess)) {
        guessMessage.innerHTML = `Yes! The letter ${newGuess} is in the word!`;
    } else {
        remainingGuesses -= 1;
        guessMessage.innerHTML = `The word does not contain ${newGuess}.`;
         //Check if 1 or 0 guesses remain, update message with guess counter
        if (remainingGuesses == 0) {
            guessMessage.innerHTML = `Sorry, game over! The word was ${word.toUpperCase()}`;
            remainingNumber.innerHTML = `${remainingGuesses} guesses`;
            startOver();
        } else if (remainingGuesses == 1) {
            remainingNumber.innerHTML = "1 guess";
        } else {
            remainingNumber.innerHTML = `${remainingGuesses} guesses`;
        }
    }
};

//function to check if the user has won the game
const wonGame = function(WIP) {
    const checkWord = word.toUpperCase();
    if (WIP == checkWord) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = "You guessed correct the word! Congrats!";
        startOver();
    } 
};

//call function to get new random word
getWord();

//get user input (guess letter) on button click
guessButton.addEventListener("click", function(e){
    e.preventDefault(); //prevents reloading of webpage after form submission
    
    let inputVal = textInput.value;     //get user input from text box
    guessMessage.innerHTML = "";       //clear the displayed user message
    let userLetter = validateInput(inputVal);  //check that the user input a single letter  
    
    //process guess only if the input is a validated letter
    if (userLetter != undefined) {
        makeGuess(userLetter);
    } 

    //clear text input box
    textInput.value = "";
});

//function to start game over again
const startOver = function() {
    //hide elements from last game
    guessButton.classList.add("hide");
    remainingText.classList.add("hide");
    guessedLetters.classList.add("hide");

    //reveal button to play again
    playAgain.classList.remove("hide");
};

//event handler for Play Again button click
playAgain.addEventListener("click", function(){
    //reset messages and counters
    guessMessage.classList.remove("win");
    guessMessage.innerText = "";
    guessedLettersArray = [];
    guessedLetters.innerText = "";
    remainingGuesses = 8;
    remainingNumber.innerHTML = `${remainingGuesses} guesses`;

    guessButton.classList.remove("hide");       //show the guess button 
    remainingText.classList.remove("hide");     //show the guess counter
    guessedLetters.classList.remove("hide");    //show the guessed letters array
    
    playAgain.classList.add("hide");    //hide the Play Again button

    getWord();      //get new random word
});


