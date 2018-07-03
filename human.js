function playHuman() {
  resetGrid();
  symbol1 = player1.value;
  symbol2 = player2.value;
  newGame("human");
}

function mainHuman() {
  symbol = symbol === player1.value ? player2.value : player1.value;
  if (event.target.className === "box" && event.target.textContent === "") {
    event.target.textContent = symbol;
  }
  game();
}