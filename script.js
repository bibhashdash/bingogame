// const btnExpandBox = document.querySelector(".btn-expand-box");
// const bigGreyBox = document.querySelector(".big-grey-box");

// btnExpandBox.addEventListener("click", function() {
//     bigGreyBox.classList.toggle("expanded");
// });

const btnStartGame = document.querySelector(".btn-start-game");
const btnNextNumber = document.querySelector(".btn-next-number");
const bingoCardCell = document.querySelectorAll(".bingo-card-cell");
const displayNextNumber = document.querySelector(".display-next-number");

btnStartGame.addEventListener("click", function() {
    let array1 = [];
    let j = 0;

    while (j < 15) {
        let x = Math.floor(Math.random() * 90);
        if (!array1.includes(x)) {
            array1[j] = x;
            j++;
        } else {
            x = Math.floor(Math.random() * 90);
        }
    }

    for (let i = 0; i < bingoCardCell.length; i++) {
        bingoCardCell[i].textContent = String(array1[i]);
    }
});

let array2 = [];
let k = 0;
btnNextNumber.addEventListener("click", function() {
    let y = Math.floor(Math.random() * 90);
    if (!array2.includes(y)) {
        displayNextNumber.textContent = String(y);
        array2.push(y);
        k++;
    } else {
        y = Math.floor(Math.random() * 90);
    }
});

bingoCardCell.forEach(function(item) {
    item.addEventListener("click", function() {
        if (array2.includes(Number(item.textContent))) {
            item.classList.add("marked");
        } else {
            alert("No cheatin!");
        }
    });
});