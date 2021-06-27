const btnNewGame = document.querySelector(".btn-new-game");
const btnStartGame = document.querySelector(".btn-start-game");
const btnShoutLine = document.querySelector(".btn-shout-line");
const btnResetGame = document.querySelector(".btn-reset-game");
const bingoCardCell = document.querySelectorAll(".bingo-card-cell");
const displayNextNumber = document.querySelector(".display-next-number");

// declare an array to store the player's card numbers
let playerCardArray = [];

// declare an array to store the numbers 0-90 but in a randomised order
let calloutArray = [];

//Play a new game
btnNewGame.addEventListener("click", function() {
    //first randomise 15 numbers for the player's card
    while (playerCardArray.length < 16) {
        let cardRandomNumber = Math.floor(Math.random() * 90);
        if (playerCardArray.indexOf(cardRandomNumber) === -1) {
            playerCardArray.push(cardRandomNumber);
        }
    }

    //display the 15 randomised numbers on the player's card grid
    for (let i = 0; i < bingoCardCell.length; i++) {
        bingoCardCell[i].textContent = String(playerCardArray[i]);
    }

    //then generate a random order of numbers between 0 and 90 and push it to the calloutArray.
    while (calloutArray.length < 90) {
        let calloutRandomNumber = Math.floor(Math.random() * 90);
        if (calloutArray.indexOf(calloutRandomNumber) === -1) {
            calloutArray.push(calloutRandomNumber);
        }
    }
});

//start playing the game
btnStartGame.addEventListener("click", function() {
    //declare a variable to use as a counter. Can be used later as a 'score' counter.
    let calloutCounter = 1;

    //declare an array to store all the numbers that have been called out
    let calloutnumbersbinArray = [];

    //call out the numbers every 3 seconds
    setInterval(() => {
        if (calloutCounter === 90) {
            alert("Game Over!");
        } else {
            calloutCounter++;

            // display the number that's been 'called out'
            displayNextNumber.textContent = calloutArray[calloutCounter - 1];

            // put the 'called out' number in the bin array.
            calloutnumbersbinArray.push(Number(displayNextNumber.textContent));
        }
    }, 3000);

    // async functions used to mark the card and check if player has achieved a line or not.

    // to mark the card, send the bin type array as an argument to check if player is marking a number that's been called out.
    markTheNumber(calloutnumbersbinArray);

    // shout line function when player clicks the "line!!!" button
    shoutLine();
    resetGameFunction();
    // const checkReset = resetGameFunction();
    // if (!checkReset) {
    //     clearInterval(playGame);
    // }
});

function resetGameFunction() {
    btnResetGame.addEventListener("click", function() {
        // for (let i = 0; i < bingoCardCell.length; i++) {
        //     bingoCardCell[i].textContent = " ";
        // }
        // playerCardArray = [];
        // displayNextNumber.textContent = " ";
        // calloutArray = [];
        // calloutCounter = 1;
        // calloutnumbersbinArray = [];
        location.reload();
    });
    return false;
}

// markTheNumber function places an event listener on each cell on the player's card.
function markTheNumber(calloutnumbersbinArray) {
    bingoCardCell.forEach(function(item) {
        item.addEventListener("click", function() {
            // check if the clicked cell on player's card is part of the bin type array
            if (calloutnumbersbinArray.includes(Number(item.textContent))) {
                // change the cell background to light blue
                item.classList.add("marked");
            } else {
                alert("No cheatin!");
            }
        });
    });
}

function shoutLine() {
    btnShoutLine.addEventListener("click", function() {
        let tempCounter = 0;
        for (l = 0; l <= 4; l++) {
            if (bingoCardCell[l].classList.contains("marked")) {
                tempCounter++;
            }
            displaySuccessMessage(tempCounter);
        }
        tempCounter = 0;
        for (l = 5; l <= 9; l++) {
            if (bingoCardCell[l].classList.contains("marked")) {
                tempCounter++;
            }
            displaySuccessMessage(tempCounter);
        }
        tempCounter = 0;
        for (l = 10; l <= 14; l++) {
            if (bingoCardCell[l].classList.contains("marked")) {
                tempCounter++;
            }
            displaySuccessMessage(tempCounter);
        }
    });
}

function displaySuccessMessage(tempCounter) {
    if (tempCounter === 5) {
        document.querySelector(".line-display").classList.remove("hidden");
    }
}