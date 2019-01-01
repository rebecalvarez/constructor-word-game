var Word = require("./Word");
// prompt a user to enter letter package
var inquirer = require('inquirer');
// package to give game color
var clc = require('cli-color');
//npm package that converts text to drawing
var figlet = require('figlet');
//package to verify if the character is a letter or not
var isLetter = require('is-letter');
// package that creates boxes in the terminal
var boxen = require('boxen');
//Pre-defined color for correct guess
var correct = clc.green.bold;
//Pre-defined color for correct guess
var incorrect = clc.red.bold;
// color for the game text;
var gameTextColor = clc.yellowBright;
//Pre-defined color for startgamewords
var startGameMenu = clc.cyanBright;

var userGuessedCorrectly = false;

var wordList = [
    "noel",
    "advent",
    "angels",
    "bells",
    "happy",
    "holiday",
    "star",
    "holy",
    "jolly",
    "lights",
    "lists",
    "merry",
    "miracle",
    "party"
  ];

  var randomWord;
  var someWord;

  var wins = 0;
  var losses = 0;
  var guessesRemaining = 10;

  // variable that holds the letter entered by user

  var userGuess = '';

// Holds letter already guessed by the user
var lettersGuessedList = '';
var lettersGuessedArray = [];

// Number of underscores/slots that have been filled in with a letter
// When game starts or is reset, this value should be 0
var slotsFilledIn = 0;

// When user enters game convert "Christmas Word Guess" text characters to drawings using figlet npm package;
figlet('Christmas Word Game', function(err, data){
  if(err){
    console.log("Something went wrong ...");
    console.dir(err);
    return;
  }
  console.log(correct(data));
  //Welcome Screen text
  console.log(startGameMenu('                                  Welcome to Christmas Word Guess Game'));


  var howToPlay = 
  "==========================================================================================================" + "\r\n" +
  "                                                How to play" + "\r\n" +
  "==========================================================================================================" + "\r\n" +
  "When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter." + "\r\n" +
  "Keep guessing letters. When you guess a letter, your choice is either correct or incorrect." + "\r\n" +
  "If incorrect, the letter you guessed does not appear in the word." + "\r\n" + 
  "For every incorrect guess, the number of guesses remaining decrease by 1." + "\r\n" +
  "If correct, the letter you guessed appears in the word." + "\r\n" +
  "If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\r\n" +
  "If you run out of guesses before the entire word is revealed, you lose. Game over." + "\r\n" +
  "===========================================================================================================" + "\r\n" +
  "                You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
  "===========================================================================================================" 
  console.log(gameTextColor(howToPlay));
 //Ask user if they are ready to play.
  confirmStart();


});

function confirmStart(){
  var readyToStartGame =[
    {
      type: 'text',
      name: 'playerName',
      message: 'What is your name?'
    },
    {
      type: 'text',
      name: 'readyToPlay',
      message: 'are you ready to play?',
      defailt: true
    }

  ];
  inquirer.prompt(readyToStartGame).then(answers => {
    // if the user confirms they want to play, start a game.
    if (answers.readyToPlay){
      console.log(gameTextColor('Great! Welcome, '+ answers.playerName + ". Let's being ..."));
      startGame();
    } 
    else {
      console.log(gameTextColor("Good Bye, "+ answers.playerName + ". Come back Soon!"));
      return;
    }
  });
}

// Start Game Function

function startGame(){
  // reset number of guesses remaining when user starts a new game.
  guessesRemaining = 10;
  // pick a random word from the list
  chooseRandomWord();
  // when game is reset empty out list of already guessed letters.
  lettersGuessedList ="";
  lettersGuessedArray = [];

}

function chooseRandomWord(){
  randomWord = wordList[Math.floor(Math.random()* wordList.length)].toUpperCase();
  // set the random word chosen to someWord
  someWord = new Word(randomWord);
  //Tell the user how many letetrs are in the word.
  console.log(gameTextColor('Your word contains ' + randomWord.length + ' Letters.'));
  console.log(gameTextColor('WORD TO GUESS: '));

  // use the Word constructor in Word.js to split the word and generate letters.
  someWord.splitWord();
  someWord.generateLetters();
  guessLetter();
}

// Function that will prompt the user to enter a letter. This letter is the user's guess

function guessLetter(){
  // keep prompting user to enter a letter if there are slots that still need to be filled in
  //or if there are sitll guesses reamining.
  if(slotsFilledIn < someWord.letters.length || guessesRemaining > 0){
    inquirer.prompt([
      {
        name: 'letter',
        message: "Guess a letter:",
        // Checks if the value of a character is a letter
        validate: function(value){
          if(isLetter(value)){
            return true;
          }
          else {
            return false;
          }
        }
      }
    ]).then(function(guess){
      // Convert all letters guessed by the user to upper case
      guess.letter.toUpperCase();
      console.log(gameTextColor("You guessed :" + guess.letter.toUpperCase()));
      //Assume correct to be false at this point.
      userGuessedCorrectly =false;
      // need to find if letter was already guessed by the user. If guessed notify the user to enter another letter.
      //user shouldn't continue with game if they guess the same letter more than once.
      if (lettersGuessedArray.indexOf(guess.letter.toUpperCase()) > -1){
        //if user already guessed a letter, run inquirer again to prompt them to enter a different letter.
        console.log(gameTextColor('You already guessed that letter. Enter another one.'));
        console.log(gameTextColor('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
        guessLetter();
      }
      else if (lettersGuessedArray.indexOf(guess.letter.toUpperCase()) === -1){
        //add letter to list of already guessed letters
        lettersGuessedList = lettersGuessedList.concat(" " + guess.letter.toUpperCase());
        lettersGuessedArray.push(guess.letter.toUpperCase());
        // show letters already guessed to user.
        console.log(boxen(gameTextColor("Letters already guessed: ")+ lettersGuessedList, {padding: 1}));

        // loop through all the letters in the word
        // determine if the letter that was guessed matches one of the letters in the word.
        for (i = 0; i < someWord.letters.length; i++){
          if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterGuessedCorrectly === false){
            someWord.letters[i].letterGuessedCorrectly = true;
            //set userguessedCorrectly to true
            userGuessedCorrectly = true;
            someWord.underscores[i] = guess.letter.toUpperCase();
            // Increment the number of slots/underscores filled in with letters by 1
            slotsFilledIn++
          }
        }
         console.log(gameTextColor('WORD TO GUESS: '));
         someWord.splitWord();
         someWord.generateLetters();

         // if user guessed correctly ...
         if (userGuessedCorrectly){
           // Tell user they are Correct(letter is in the word they are trying to guess)
           console.log(correct('CORRECT! '));
           console.log(gameTextColor("==========================================================================================================="));
           // after each letter guess, check if the user won or lost.
           checkIfUserWon();
         }// else if user guessed incorrectly...
         else {
           //Tell user they are INCORRECT (letter is not in the word)
           console.log(incorrect('INCORRECT! '));
           // Decrease number of guesses remaining by 1 and display number of guesses remaining
           guessesRemaining--;
           console.log(gameTextColor("You have " + guessesRemaining + " guesses left."));
           console.log(gameTextColor("==========================================================================================================="));
           // after each letter guess, check if the user won or lost.
           checkIfUserWon();
         }
      }
    });
  }
}

// This function will check if the user won or lost after user guesses a letter.

function checkIfUserWon(){
  if (guessesRemaining === 0){
    console.log(gameTextColor("==========================================================================================================="));
    console.log(incorrect("YOU LOST! DON'T BE LIKE MR. SCROOGE!"));
    console.log(gameTextColor("The correct word was: "+ randomWord));
    //increment loses by 1
    losses++;
    //Display wins and losses totals
    console.log(gameTextColor('Wins: '+wins));
    console.log(gameTextColor('Losses: '+losses));
    console.log(gameTextColor("==========================================================================================================="));
    // ask if the user wants to play again?
    playAgain();
  }
  //else if the number of slots are filled with a letter equals the number of letters in the word, the user won.
  else if(slotsFilledIn === someWord.letters.length){
    console.log(gameTextColor("==========================================================================================================="));
    console.log(gameTextColor('YOU WON! MERRY CHRISTMAS!'));
    //INCREMENT wins by 1
    wins++;
    // show total wins and loses
    console.log(gameTextColor('Wins: '+wins));
    console.log(gameTextColor('Losses: '+losses));
    console.log(gameTextColor("==========================================================================================================="));
        // ask if the user wants to play again?
        playAgain();
  }
  else {
    // if user did not win or lose after a guess, keep running inquirer.
    guessLetter("");
  }
}
// this is a function that will ask  the user if  he wants to play again

function playAgain(){
  var playGameAgain =[
    {
      type: "confirm",
      name: 'playAgain',
      message: 'Do you want to play again?',
      default: true
    }
  ];
  inquirer.prompt(playGameAgain).then(userWantsTo =>{
    if(userWantsTo.playAgain){
      //Empty out the array that contains the letters already guessed.
      lettersGuessedList="";
      lettersGuessedArray= [];
      // set number of slots filled in with letters back to zero.
      slotsFilledIn = 0;
      console.log(gameTextColor("Wonderful! Welcome back!. Let's begin..."));
      //start a new game
      startGame();
    }
    else{
      // if user doesn't want to play again, exit game.
      console.log(gameTextColor("Good bye! Come back soon."));
      return;
    }
  });
}




