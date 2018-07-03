//Get all the box element from doument
const grid = document.querySelector("#grid");
const boxes = document.querySelectorAll("div");
const result = document.querySelector(".result");
const aiBtn = document.querySelector("#ai");

//HARDCODED SYMBOL TO START
let symbol = "X";

aiBtn.addEventListener("click", resetGrid);
//Assign event listener to boxes
function newGame() {
  grid.addEventListener("click", main);
}

function main() {
  if (event.target.className === "box" && event.target.textContent === "") {
    event.target.textContent = symbol;
    game();
    if (result.textContent === "") {
      setTimeout(ai, 200);
      game();
    }
  }
}

// ai()

//Game Logic
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

function winOrLose(symbol) {
  if (symbol === "O") {
    result.textContent = "You Lost";
    console.log("you lost");
    //Remove event listner and prevent ai
    grid.removeEventListener("click", main);
  } else {
    result.textContent = "You are the winner";
    console.log("you win");
    //prevent ai to move
    grid.removeEventListener("click", main);
  }
}

function resetGrid() {
  boxes.forEach(box => {
    box.textContent = "";
    result.textContent = "";
    newGame();
  });
}

newGame();

// function ai() {
//   let aiSymbol = symbol === "X" ? "O" : "X";
//   //Check for all the empty boxes
//   let empty = [];
//   boxes.forEach(box => {
//     if (box.textContent === "") {
//       //box is empty push to array
//       empty.push(box);
//     }
//   });
//   if (empty.length === 0) {
//     return;
//   }

//   let random = Math.floor(Math.random() * empty.length);
//   empty[random].textContent = aiSymbol;

//   //Check if you have 2 adiacent cell if yes protect that cell
//   //if not check if ai has 2 adiacent cell if yes block that cell and win
//   //if not place randomly
// }
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

function checkForGridFull() {
  let empty = [];
  if (empty.length === 0) {
    return true;
  }
}

function checkForDefense() {
  //Check every rows for 2 player symbol
  checkRows();
  //Check for every columns for 2 player symbol
  checkCols();
  //Check diagonal for 2 player symbol
  checkDiag();
}

function checkForAttack() {
  //Check every rows for 2 player symbol
  checkRows();
  //Check for every columns for 2 player symbol
  checkCols();
  //Check diagonal for 2 player symbol
  checkDiag();
}

function checkRows(ps) {
  let rows = [0, 3, 6];
  for (let i of rows) {
    if (
      boxes[i].textContent === ps &&
      boxes[i + 1].textContent === ps &&
      boxes[i + 2].textContent === ""
    ) {
      // console.log(i + 2);
      return i + 2;
    } else if (
      boxes[i].textContent === ps &&
      boxes[i + 2].textContent === ps &&
      boxes[i + 1].textContent === ""
    ) {
      // console.log(i + 1);
      return i + 1;
    } else if (
      boxes[i + 1].textContent === ps &&
      boxes[i + 2].textContent === ps &&
      boxes[i].textContent === ""
    ) {
      // console.log(i);
      return i;
    }
  }
}

function checkCols(ps) {
  let cols = [0, 1, 2];
  for (let i of cols) {
    if (
      boxes[i].textContent === ps &&
      boxes[i + 3].textContent === ps &&
      boxes[i + 6].textContent === ""
    ) {
      // console.log(i + 2);
      return i + 6;
    } else if (
      boxes[i].textContent === ps &&
      boxes[i + 6].textContent === ps &&
      boxes[i + 3].textContent === ""
    ) {
      // console.log(i + 1);
      return i + 3;
    } else if (
      boxes[i + 3].textContent === ps &&
      boxes[i + 6].textContent === ps &&
      boxes[i].textContent === ""
    ) {
      // console.log(i);
      return i;
    }
  }
}

function checkDiag(ps) {
  if (
    boxes[0].textContent === ps &&
    boxes[4].textContent === ps &&
    boxes[8].textContent === ""
  ) {
    return 8;
  } else if (
    boxes[0].textContent === ps &&
    boxes[4].textContent === "" &&
    boxes[8].textContent === ps
  ) {
    return 4;
  } else if (
    boxes[0].textContent === "" &&
    boxes[4].textContent === ps &&
    boxes[8].textContent === ps
  ) {
    return 0;
  }

  let diag2 = 2;
  if (
    boxes[diag2].textContent === ps &&
    boxes[diag2 + 2].textContent === ps &&
    boxes[diag2 + 4].textContent === ""
  ) {
    return diag2 + 4;
  } else if (
    boxes[diag2].textContent === ps &&
    boxes[diag2 + 2].textContent === "" &&
    boxes[diag2 + 4].textContent === ps
  ) {
    return diag2 + 2;
  } else if (
    boxes[diag2].textContent === "" &&
    boxes[diag2 + 2].textContent === ps &&
    boxes[diag2 + 4].textContent === ps
  ) {
    return diag2;
  }
}

function ai() {
  let aiSymbol = symbol === "X" ? "O" : "X";
  let result;
  //Check for all the empty boxes
  let empty = [];
  boxes.forEach(box => {
    if (box.textContent === "") {
      //box is empty push to array
      empty.push(box);
    }
  });
  if (empty.length === 0) {
    return;
  }
  if (checkRows("X")) {
    result = checkRows("X");
    boxes[result].textContent = aiSymbol;
  } else if (checkCols("X")) {
    result = checkCols("X");
    boxes[result].textContent = aiSymbol;
    // console.log(checkCols("X"));
  } else if (checkDiag("X")) {
    result = checkDiag("X");
    console.log(checkDiag("X"));

    boxes[result].textContent = aiSymbol;
  } else {
    result = Math.floor(Math.random() * empty.length);
    empty[result].textContent = aiSymbol;
  }
}
