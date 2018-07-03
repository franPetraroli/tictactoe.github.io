function mainHuman() {
  symbol = symbol === "X" ? "O" : "X";
  if (event.target.className === "box" && event.target.textContent === "") {
    event.target.textContent = symbol;
  }
  game();
}

function playHuman() {
  resetGrid();
  newGame("human");
}