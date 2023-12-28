let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let mainContainer = document.querySelector(".main");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let initialPage = document.querySelector(".initial-container");
let playBtn = document.querySelector(".play-game");

let turnO = true; //player X , Player O
let count = 0;
let playerA = "";
let playerB = "";

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const playGame = () => {
    mainContainer.style.display = 'none';
    playBtn.addEventListener("click", () => {
        playerA = document.getElementById('playerA').value;
        playerB = document.getElementById('playerB').value;
        initialPage.style.display = "none";
        mainContainer.style.display = 'block';
    });

}
playGame();

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {  //player O
            box.innerText = "O";
            box.style.color = "#aaaaaa"
            turnO = false;
        }
        else {   //Player X
            box.innerText = "X";
            box.style.color = "#000"
            turnO = true;
        }
        count++;
        box.disabled = true;

        checkWinner();
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    count = 0;
    msgContainer.classList.add("hide");
    mainContainer.style.display = 'block';
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner === "O" ? playerA : playerB}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = 'Oops, its a draw ';
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                mainContainer.style.display = 'none';
            }
            else if (count === 9) {
                showDraw();
                mainContainer.style.display = 'none';
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);