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

var words = [
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