
let butonPlayWMe = document.getElementById("pl");
function buttonPress(){
    let elmnt = document.getElementById("PlayWme"); elmnt.remove(); //remove initial button
}
butonPlayWMe.addEventListener('click',buttonPress);


let plCh = document.getElementById('playerChoice');
let pcCh = document.getElementById('computerChoice');
let txt = document.getElementById('contentsRslt'); 

let scorePlayer = document.getElementById("scoreP");
let scoreComputer = document.getElementById("scoreC");
let imgC, imgP;
let playerSelection, computerSelection;
let buttons = document.querySelectorAll(".playersChoice");
let counter = 0, counter1 = 0;
let scoreP = 0, scoreC = 0;

buttons.forEach((playersChoice) => {
    playersChoice.addEventListener("click", () => {
        let cv = playersChoice.querySelector("img"); 
        playerSelection = cv.alt.toLowerCase();
        
      /*  if (counter1 != 0){
            let elment = document.getElementById("containerMedium"); elment.remove();
        }*/

        [scoreP, scoreC, displayResult] = oneRound(playerSelection, computerSelection);
        
        if (displayResult !== "It's a tie!"){
            counter ++;
        }
        counter1 ++;

        if (counter == 5){
            declareWinner(scoreP, scoreC);
        }

    });
});

let wins = document.getElementById("Winner");
let buts = document.getElementById("tryAgain");
function declareWinner(scoreP, scoreC){

    let winner = "";
    if (scoreP > scoreC){
        winner = 'You are the winner!';
    } else {
        winner = 'I won! &#x1F60A';
    }
    console.log(winner, scoreP, scoreC);

    wins.innerHTML = winner;
    wins.style = 'font-family: "Indie Flower"; font-weight: bold; font-size: 30px; color: #b44800; padding-top: 0px; padding-bottom: 5px; -webkit-text-stroke-width: 0.5px;-webkit-text-stroke-color: #b44800;';

    buts.innerHTML = 'Try Again?';
    buts.style = "font-family: Dancing Script; font-size: 20px; color: #f5cb94; border-radius: 20px; margin: 10px; padding: 5px; margin: 10px; margin-left: 150px; margin-right: 150px;";
}


function whatToDoIfAgain(){
    counter = 0; counter1 = 0;
    scoreP = 0;
    scoreC = 0;
    scorePlayer.innerHTML = 0;
    scoreComputer.innerHTML = 0;
    wins.innerHTML = "";
    buts.innerHTML = "";
    txt.innerHTML = "";
    buts.style = "background-color: #eddab9;"
    plCh.innerHTML = "Your choice";
    pcCh.innerHTML = "PC's choice";
    plCh.style = "color: grey; font-family:'Indie Flower'; font-size: 20px; text-align: center;";
    pcCh.style = "color: grey; font-family:'Indie Flower'; font-size: 20px; text-align: center;";
}
let tryAgain = document.getElementById('tryAgain');
tryAgain.addEventListener('click', whatToDoIfAgain);


function oneRound(playerSelection, computerSelection){
    imgP = choices(playerSelection);
    [computerSelection, imgC] = ComputerPlay();
    [displayResult, scoreP, scoreC] = resultText(playerSelection, computerSelection, scoreP, scoreC);
    createResult(displayResult, imgP, imgC);
    scorePlayer.innerHTML = scoreP;
    scoreComputer.innerHTML = scoreC;
    return [scoreP, scoreC, displayResult];
}

// function for loading img choice
function choices(a){
    let imag;
    imag = 'img/' + a + 'Change.png';
    return imag;
}
// Generates Computer's Choice
function ComputerPlay(){
    let imgC;
    let computerChoice = 2*Math.round(Math.random());
    if (computerChoice == 0){
        computerSelection ='rock';
    }else if (computerChoice == 1){
        computerSelection ='paper';
    }else if (computerChoice == 2){
        computerSelection = 'scissors';
    }
    imgC = choices(computerSelection);
    return [computerSelection, imgC];
}

function resultText(playerSelection,computerSelection, scoreP, scoreC){
    let resLnO = ["Paper wraps around Rock, ", "Scisssors cut Paper, ", "Rock breaks Scissors, "];
    let resLnT = ["you win!", "you lose!", "It's a tie!"];
    let displayResult = "";
    if (playerSelection == "rock"){
        switch(computerSelection){
            case 'rock':
                displayResult = resLnT[2];
                break;
            case 'paper':
                displayResult = resLnO[1]+resLnT[1];
                scoreP +=0; scoreC +=1;
                break;
            case 'scissors':
                displayResult = resLnO[2]+resLnT[0];
                scoreP +=1; scoreC +=0;
                break;
        }
    } else if (playerSelection == "paper"){
        switch(computerSelection){
            case 'rock':
                displayResult = resLnO[0]+resLnT[0];
                scoreP +=1; scoreC +=0;
                break;
            case 'paper':
                displayResult = resLnT[2];
                break;
            case 'scissors':
                displayResult = resLnO[1]+resLnT[1];
                scoreP +=0; scoreC +=1;
                break;
        } 
    } else if (playerSelection == "scissors"){
        switch(computerSelection){
            case 'rock':
                displayResult = resLnO[2]+resLnT[1];
                scoreP +=0; scoreC +=1;
                break;
            case 'paper':
                displayResult = resLnO[1]+resLnT[0];
                scoreP +=1; scoreC +=0;
                break;
            case 'scissors':
                displayResult = resLnT[2];
                break;
        } 
    }
    return [displayResult, scoreP, scoreC];
}
function createResult(displayResult, imagesP, imagesC){
    plCh.innerHTML = '<img src = "'+ imagesP +'" class = "choice1">';
    txt.innerHTML = displayResult;
    pcCh.innerHTML = '<img src = "'+ imagesC +'" class = "choice1">';
    plCh.style = "color: grey; font-family:'Indie Flower'; font-size: 20px;";
    pcCh.style = "color: grey; font-family:'Indie Flower'; font-size: 20px;"; 
}
