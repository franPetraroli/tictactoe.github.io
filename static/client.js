const socket = io.connect();
const buttons = document.querySelectorAll('.box')
const remoteBtn = document.querySelector('#remote')

remoteBtn.addEventListener("click", playRemote);
let mark = ''


buttons.forEach(button => {
  button.addEventListener('click', playerMove)
})
// let title = document.querySelector('#welcome')
// let test = document.querySelector('#move')

socket.on("connect", function () {
  console.log('hello');
});
//What Send
function join() {
  let input = document.querySelector('#username').value
  console.log(input);

  socket.emit('join', {
    username: input
  })
}

function playerMove() {
  let result = Array.from(buttons).indexOf(event.target)
  socket.emit('playerMove', {
    move: result
  })
  // console.log(event.target);

}


//What receive
socket.on('update', (data) => {
  // console.log(data)
  document.querySelector('#welcome').textContent = 'Welcome ' + data.username
  if (data.message) {
    if (data.message === 'Wait for your turn') {
      removeAllEventListener()
    } else if (data.message === 'It\'s your turn') {
      addAllEventListener()
    }

    document.querySelector('#alert').textContent = data.message
  }

  if (data.symbol) {
    mark = data.symbol
  }
})

socket.on('move', (data) => {
  updateBoard(data.updateBoard)
})

function updateBoard(data) {
  //for each element in the board update according to the data
  for (let i = 0; i < buttons.length; i++) {
    if (data[i] !== '') {
      buttons[i].textContent = data[i]
    }
  }
}


function playRemote() {
  resetGrid();
  // mark = '' //from server
  newGame("human");
}

function mainHuman() {
  // symbol = symbol === player1.value ? player2.value : player1.value;
  if (event.target.className === "box" && event.target.textContent === "") {
    event.target.textContent = mark;
  }
  game();
}

function removeAllEventListener() {
  buttons.forEach(button => {
    button.removeEventListener('click', playerMove)
  })
  grid.removeEventListener("click", mainHuman)
}

function addAllEventListener() {
  buttons.forEach(button => {
    button.addEventListener('click', playerMove)
  })
  grid.addEventListener("click", mainHuman)
}

//block control after trun and change display mesg