function getRandNum(max){
    return Math.floor(Math.random() * max);
}

function capitalize(word){
    let lowerCaseWord = word.toLowerCase();

    let firstLetter = word[0].toUpperCase();

    let restOfWord = lowerCaseWord.slice(1);
    let capitalizedWord = firstLetter.concat("",restOfWord);
    return capitalizedWord;
}

function disablePlay(){

    for(const button of buttons){
        button.removeEventListener('click', playRound);
    }
}

function getComputerPlay(){
    let choices = ["rock", "paper","scissors"];
    let maxIndex = choices.length;
    let chosenIndex = getRandNum(maxIndex);
    let chosenPlay = choices[chosenIndex];
    return chosenPlay;
}

function showComputerPlay(choice){

    let imageSource = null;
    let choiceText = undefined;
    switch(choice){
        case "rock":{
            imageSource = "resources/images/rock.png";
            choiceText = "Rock";
        }
        break;

        case "paper":{
            imageSource = "resources/images/paper.png";
            choiceText = "Paper";
        }
        break;

        case "scissors":{
            imageSource = "resources/images/scissors.png";
            choiceText = "Scissors";
        }
        break;
    }

    const computerChoiceDiv = document.querySelector("#computer-choice");
    const oldImage = computerChoiceDiv.firstElementChild;
    const oldParagraph = computerChoiceDiv.lastElementChild;

    const newImage = document.createElement("img");
    newImage.setAttribute("src",imageSource);

    const newParagraph = document.createElement("p");
    newParagraph.innerText = choiceText;

    computerChoiceDiv.replaceChild(newImage, oldImage);
    computerChoiceDiv.replaceChild(newParagraph, oldParagraph);
}



function declareOutcome(outcome, playerSelection, computerSelection){
    let outcomeMessage = undefined;
    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);

    
    switch(outcome){
        case "loss":{
            computerScore++;
            roundNumber++;
            outcomeMessage = `You lost! ${computerSelection} beats ${playerSelection}!`;
        }
        break;

        case "tie":{
            roundNumber++;
            outcomeMessage = `It's a ${playerSelection} tie!`;
        }
        break;

        case "win":{
            playerScore++;
            roundNumber++;
            outcomeMessage = `You won! ${playerSelection} beats ${computerSelection}!`;
        }
        break;

        case "fail":{
            outcomeMessage = `${playerSelection} was an invalid submission.`;
        }
        break;

        default:{
            outcomeMessage = "Something went wrong"
        }
    }

    const resultDiv = document.querySelector("#display-area");
    const newParagraph = document.createElement("p");
    newParagraph.innerText = outcomeMessage;

    const oldInfo = resultDiv.firstChild;
    resultDiv.replaceChild(newParagraph, oldInfo);

    if(roundNumber == 5){
        finishGame();
    }
}

function compareChoices(playerSelection, computerSelection){

    switch(playerSelection){
        case "rock":{
            if(computerSelection === "rock"){
                outcome = "tie";
            } else if(computerSelection == "paper"){
                outcome ="loss";
            } else if(computerSelection =="scissors"){
                outcome = "win";
            }
        }
        break;

        case "paper":{
            if(computerSelection === "paper"){
                outcome = "tie";
            } else if(computerSelection === "scissors"){
                outcome = "loss";
            } else if(computerSelection === "rock"){
                outcome = "win";
            }
        }
        break;

        case "scissors":{
            if(computerSelection === "scissors"){
                outcome = "tie";
            } else if(computerSelection === "rock"){
                outcome = "loss";
            } else if (computerSelection === "paper"){
                outcome = "win";
            }
        }
        break;

        default:
        outcome = "fail";
    }

    console.log(outcome);
    return outcome;

}

function updateRound(){
    //get span
    //set innerhtml to string of round
    const roundSpan = document.querySelector("#round-number");

    roundNumber === 0 ? roundSpan.innerText = "-" : roundSpan.innerText = roundNumber.toString();
}

function playRound(){
    for(let button of buttons){
        button.classList = "faded";
    }

    this.classList.toggle("faded");
    this.classList.toggle("selected-play");
    const playerSelection = this.getAttribute("id");
    const computerSelection = getComputerPlay();
    showComputerPlay(computerSelection);

    console.log(playerSelection,computerSelection);
    console.log(typeof playerSelection, typeof computerSelection);

    const outcome = compareChoices(playerSelection, computerSelection);

    declareOutcome(outcome, playerSelection, computerSelection);

    updateRound();
}

function finishGame(){
    disablePlay();
    let winner = getGameWinner(playerScore, computerScore);
    declareGameWinner(winner);

    tryAgainButton.classList.toggle("hidden");
}

function getGameWinner(playerScore, computerScore){

    if(playerScore > computerScore){
        return "player";
    } else if(playerScore < computerScore){
        return "computer";
    } else if (playerScore === computerScore){
        return "tie";
    }
    
}

function declareGameWinner(result){

    let winningMessage = undefined;
    
    switch(result){
        case "player":
            winningMessage = "You won against the computer! Yay!";
            break;

        case "computer": 
            winningMessage = "The computer won this time!";
            break;

        case "tie": 
            winningMessage = "You tied with the computer but didn't win this time!";
    }

    const playerScoreString = "You Scored: " + playerScore.toString();
    const computerScoreString = "Computer Scored: " + computerScore.toString();

    const playerScoreDiv = document.querySelector("#player-score");
    playerScoreDiv.innerText = playerScoreString;

    const computerScoreDiv = document.querySelector("#computer-score");
    computerScoreDiv.innerText = computerScoreString;

    const winnerMessageDiv = document.querySelector("#winner-message");
    winnerMessageDiv.innerText = winningMessage;

}

function resetGame(){
    console.log("resetting Everything");

    const resultDiv = document.querySelector("#display-area");
    const resultParagraph = resultDiv.firstElementChild;
    resultParagraph.innerText = "";

    const playerScoreDiv = document.querySelector("#player-score");
    playerScoreDiv.innerText = "";

    const computerScoreDiv = document.querySelector("#computer-score");
    computerScoreDiv.innerText = "";

    const winnerMessageDiv = document.querySelector("#winner-message");
    winnerMessageDiv.innerText = "";

    tryAgainButton.classList.toggle("hidden");

    for(const button of buttons){
        button.addEventListener('click', playRound);
    }

    for(const button of buttons){
        button.classList="faded";
    }
    roundNumber = 0;
    playerScore = 0;
    computerScore = 0;

    const computerChoiceDiv = document.querySelector("#computer-choice");
    const computerChoiceIcon = computerChoiceDiv.firstChild;
    const computerChoiceText = computerChoiceDiv.lastElementChild;

    computerChoiceIcon.setAttribute("src","");
    computerChoiceText.innerText = "";
    updateRound();
}

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");


const buttons = [rockButton, paperButton, scissorsButton];

for(const button of buttons){
    button.addEventListener('click', playRound);
}

const tryAgainButton = document.querySelector("#try-again");
tryAgainButton.addEventListener('click', resetGame);