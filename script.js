
let butonPlayWMe = document.getElementById("pl");
function buttonPress(){
    let elmnt = document.getElementById("PlayWme"); elmnt.remove(); //remove initial button
}
butonPlayWMe.addEventListener('click',buttonPress);



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
        
        if (counter1 != 0){
            let elment = document.getElementById("containerMedium"); elment.remove();
        }

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
let iTryAgain = document.getElementById('tryAgain');
iTryAgain.addEventListener('click', whatToDoIfAgain);

function declareWinner(scoreP, scoreC){

    let winner = "";
    if (scoreP > scoreC){
        winner = 'You are the winner! Congratulations!';
    } else {
        winner = 'I won! &#x1F60A';
    }
    console.log(winner, scoreP, scoreC);
    let elmnts = document.getElementById("containerMedium"); elmnts.remove()
    let wins = document.getElementById("Wins");
    wins.innerHTML = winner;
  /*  let final = document.createElement("div");
    let attr = document.createAttribute("id");       
    attr.value = "Winner"; 
    final.setAttributeNode(attr);
    final.innerHTML = 
        ''+
    ''
    let Bd = document.querySelector("body");
    Bd.appendChild(final);*/
    let elmnet = document.getElementById("Winner");
    elmnet.style = "z-index: 3;";
}

function whatToDoIfAgain(){
    counter = 0; counter1 = 0;
    scoreP = 0;
    scoreC = 0;
    scorePlayer.innerHTML = 0;
    scoreComputer.innerHTML = 0;
    let elmnet = document.getElementById("Winner");
    elmnet.style = "z-index: -3;";
}


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
    medC = document.createElement('div');
    let att = document.createAttribute("id");       
    att.value = "containerMedium"; 
    medC.setAttributeNode(att);
    medC.innerHTML = '<div id = "playerChoice">'+
    '<img src = "'+ imagesP +'" class = "choice1">'+
'</div>'+
'<div id = "Text">'+
    '<p id = "contentsRslt">' + displayResult + '</id>'+
'</div>'+
'<div id = "computerChoice">'+
    '<img src = "'+ imagesC +'" class = "choice1">'+
'</div>';
    let Bc = document.querySelector(".containerBig2");
    Bc.append(medC); // create body for app
}
