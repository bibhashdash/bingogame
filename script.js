const btnNewCard = document.querySelector(".btn-new-card");
const btnStartGame = document.querySelector(".btn-start-game");
const btnShoutLine = document.querySelector(".btn-shout-line");
const bingoCardCell = document.querySelectorAll(".bingo-card-cell");
const displayNextNumber = document.querySelector(".display-next-number");
let array1 = [];
let array2 = [];
btnNewCard.addEventListener("click", function() {
    while (array1.length < 15) {
        let number = Math.floor(Math.random() * 90);
        if (array1.indexOf(number) === -1) {
            array1.push(number);
        }
    }
    for (let i = 0; i < bingoCardCell.length; i++) {
        bingoCardCell[i].textContent = String(array1[i]);
    }
    while (array2.length < 90) {
        let number2 = Math.floor(Math.random() * 90);
        if (array2.indexOf(number2) === -1) {
            array2.push(number2);
        }
    }
});
console.log(array2);

btnStartGame.addEventListener("click", function() {
    let k = 1;
    let array3 = [];
    setInterval(() => {
        if (k === 90) {
            alert("Game Over!");
        } else {
            k++;
            displayNextNumber.textContent = array2[k - 1];
            array3.push(Number(displayNextNumber.textContent));
        }
    }, 3000);
    markTheNumber(array3);
    shoutLine();
});

function markTheNumber(array3) {
    bingoCardCell.forEach(function(item) {
        item.addEventListener("click", function() {
            if (array3.includes(Number(item.textContent))) {
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
            if (tempCounter === 5) {
                document.querySelector(".line-display").classList.remove("hidden");
            }
        }
        tempCounter = 0;
        for (l = 5; l <= 9; l++) {
            if (bingoCardCell[l].classList.contains("marked")) {
                tempCounter++;
            }
            if (tempCounter === 5) {
                document.querySelector(".line-display").classList.remove("hidden");
            }
        }
        tempCounter = 0;
        for (l = 10; l <= 14; l++) {
            if (bingoCardCell[l].classList.contains("marked")) {
                tempCounter++;
            }
            if (tempCounter === 5) {
                document.querySelector(".line-display").classList.remove("hidden");
            }
        }
    });
}