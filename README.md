# Constructor Word Game with Node
## <a name="about-this-project"></a> About this project
This project is a command line version of a Word guessing game. This is a command line version using Javascript constructor functions to create letter and word objects, the inquirer npm package to prompt users to guess a letter, and Node.js to run the Javascript code from the command line. 

### <a name="dependencies"></a> Install the dependencies
<p>The following npm packages are dependencies to the project. You must install these packages in the project root directory to be able to play this Word Guess game from the command line.</p>

<pre>npm install</pre>
<ul>
	<li>inquirer npm package (https://www.npmjs.com/package/twitter) - used to prompt users for a letter throughout the game.</li>
	<li>cli-color npm package (https://www.npmjs.com/package/cli-color) - used to add color to the game.</li>
  	<li>figlet npm package (https://www.npmjs.com/package/figlet) - used to convert text into ASCII art - drawings made out of text characters.</li>
  	<li>is-letter npm package (https://www.npmjs.com/package/is-letter) - used for form valiation. This package is used to check if the value the user enters is a letter (for example, "a") or not a letter (for example, "aba").</li>
  	<li>boxen npm package (https://www.npmjs.com/package/boxen) - used to create boxes in terminal.</li>
</ul>
<p>Version information for each of these packages is available in the package.json file in the project root directory.</p>

## <a name="demo"></a> Demo
Video demo: https://www.youtube.com/watch?v=mgBTgJYXmkc

  ____ _          _     _                        __        __            _    ____
  / ___| |__  _ __(_)___| |_ _ __ ___   __ _ ___  \ \      / /__  _ __ __| |  / ___| __ _ _ __ ___   ___
 | |   | '_ \| '__| / __| __| '_ ` _ \ / _` / __|  \ \ /\ / / _ \| '__/ _` | | |  _ / _` | '_ ` _ \ / _ \
 | |___| | | | |  | \__ \ |_| | | | | | (_| \__ \   \ V  V / (_) | | | (_| | | |_| | (_| | | | | | |  __/
  \____|_| |_|_|  |_|___/\__|_| |_| |_|\__,_|___/    \_/\_/ \___/|_|  \__,_|  \____|\__,_|_| |_| |_|\___|

                                  Welcome to Christmas Word Guess Game
                                            by Rebeca Dodero
==========================================================================================================
                                                How to play
==========================================================================================================
• When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter.
• Keep guessing letters. When you guess a letter, your choice is either correct or incorrect.
• If incorrect, the letter you guessed does not appear in the word.
• For every incorrect guess, the number of guesses remaining decrease by 1.
• If correct, the letter you guessed appears in the word.
• If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win.
• If you run out of guesses before the entire word is revealed, you lose. Game over.
===========================================================================================================
                You can exit the game at any time by pressing Ctrl + C on your keyboard.
===========================================================================================================
? What is your name?
