//Get all the box element from doument
const grid = document.querySelector("#grid");
const boxes = document.querySelectorAll("div");
const result = document.querySelector(".result");
const aiBtn = document.querySelector("#ai");
const playerBtn = document.querySelector("#human");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
// const test = document.querySelector("#test");

//HARDCODED SYMBOL TO START
let symbol = 'X'
let opponent = null;

aiBtn.addEventListener("click", playAi);
playerBtn.addEventListener("click", playHuman);

/**
 * Assign event listener to boxes
 * @param {player}
 * @return void
 */
function newGame(player) {
  if (player === "human") {
    opponent = "human";
    grid.removeEventListener("click", mainAi);
    grid.addEventListener("click", mainHuman);
  } else if (player === "ai") {
    opponent = "ai";
    grid.removeEventListener("click", mainHuman);
    grid.addEventListener("click", mainAi);
  }
}
/**
 * Game Logic, check for winning combination
 * @return void
 */
function game() {
  //Check every rows
  let rows = [0, 3, 6];
  rows.forEach(i => {
    if (
      boxes[i].textContent !== "" &&
      boxes[i].textContent === boxes[i + 1].textContent &&
      boxes[i].textContent === boxes[i + 2].textContent
    ) {
      winOrLose(boxes[i].textContent);
    }
  });
  //Check every col
  let cols = [0, 1, 2];
  cols.forEach(c => {
    if (
      boxes[c].textContent !== "" &&
      boxes[c].textContent === boxes[c + 3].textContent &&
      boxes[c].textContent === boxes[c + 6].textContent
    ) {
      winOrLose(boxes[c].textContent);
    }
  });
  //Check diagonal
  let diag1 = 0;
  if (
    boxes[diag1].textContent !== "" &&
    boxes[diag1].textContent === boxes[diag1 + 4].textContent &&
    boxes[diag1].textContent === boxes[diag1 + 8].textContent
  ) {
    winOrLose(boxes[diag1].textContent);
  }
  let diag2 = 2;
  if (
    boxes[diag2].textContent !== "" &&
    boxes[diag2].textContent === boxes[diag2 + 2].textContent &&
    boxes[diag2].textContent === boxes[diag2 + 4].textContent
  ) {
    winOrLose(boxes[diag2].textContent);
  }
}

/**
 * WinLose function wrapper
 * @param {symbol}
 * @return void
 */
function winOrLose(symbol) {
  if (opponent === "ai") {
    console.log(opponent);

    if (symbol === player2.value) {
      result.textContent = "You Lost";
      //Remove event listner and prevent ai
      grid.removeEventListener("click", mainAi);
    } else {
      result.textContent = "You are the winner";
      //prevent ai to move
      grid.removeEventListener("click", mainAi);
    }
  } else if (opponent === "human") {
    console.log(opponent);

    if (symbol === player2.value) {
      result.textContent = `Player --- ${player2.value} --- won the game`;
      //Remove event listner and prevent ai
      grid.removeEventListener("click", mainHuman);
    } else {
      result.textContent = `Player --- ${player1.value}  --- won the game`;
      //prevent ai to move
      grid.removeEventListener("click", mainHuman);
    }
  }
}

/**
 * Reset Grid
 * @return void
 */
function resetGrid() {
  boxes.forEach(box => {
    box.textContent = "";
    result.textContent = "";
  });
}

/**
 * Ai place move on random cell
 * @return random index within empty boxes
 */
function aiRandomCell() {
  let empty = [];
  let result;
  boxes.forEach(box => {
    if (box.textContent === "") {
      //box is empty push to array
      empty.push(box);
    }
  });
  return (result = Math.floor(Math.random() * empty.length));
}


/**
 * Check if grid is full game end
 * @return true/false
 */
function checkForGridFull() {
  let empty = [];
  if (empty.length === 0) {
    return true;
  }
}