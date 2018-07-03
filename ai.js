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

    boxes[result].textContent = aiSymbol;
  } else {
    result = Math.floor(Math.random() * empty.length);
    empty[result].textContent = aiSymbol;
  }
}

function mainAi() {
  if (event.target.className === "box" && event.target.textContent === "") {
    event.target.textContent = symbol;
    game();
    if (result.textContent === "") {
      setTimeout(ai, 200);
      game();
    }
  }
}