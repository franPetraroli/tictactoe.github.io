const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

let port = process.env.PORT || 8080;
const maxConnection = 2;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use("/static", express.static(path.join(__dirname, "/static")));

http.listen(port, function () {
  console.log(`listening on ${port}`);
});

let room = [];
//Create the board 3X3
let board = [];
for (i = 0; i < 9; i++) {
  board.push([]);
}

//Create an input for username and button to play online
let player = {};

io.on("connection", function (socket) {
  console.log("a user connected");

  if (room.length === maxConnection) {
    socket.emit("disconnect", "Max 2 players allowed, try again later");
    socket.disconnect();
  }

  socket.on("join", data => {
    player = {
      username: data.username
    };

    //If there are player available set the player the opponent
    if (room.length > 0) {
      if (room.length < 2) {
        //check if the room has only one user and add second one
        room.push(socket.id);
        socket.emit("update", {
          username: data.username,
          symbol: 'O',
          message: "Ready to play, wait for your turn"
        });
        socket.to(room[0]).emit('update', {
          message: 'Your turn now'
        })
        console.log("2 Users ready to play", room);
      } else {
        socket.emit("update", {
          username: data.username,
          message: "Only 2 users are allowed to play at one time, try again later"
        });
      }
    } else {
      //if first push to available players array
      //set hasOpponent to false
      player.hasOpponent = false;
      room.push(socket.id);
      socket.emit("update", {
        username: data.username,
        symbol: 'X',
        message: "Waiting for opponent"
      });
      console.log("room", room);
      console.log("First User ready", room);
    }
  });

  socket.on("playerMove", data => {

    playerId = socket.id === room[0] ? room[0] : room[1];
    otherPlayer = playerId === room[0] ? room[1] : room[0];
    let symbol = socket.id === room[0] ? 'X' : 'O'
    board[data.move] = symbol

    socket.broadcast.emit('move', {
      updateBoard: board,
    });
    socket.broadcast.emit('update', {
      message: 'It\'s your turn'
    });
    socket.emit('update', {
      message: 'Wait for your turn'
    })

  });

  //Create the turn base, let the first player player

  socket.on("disconnect", function () {
    console.log("user disconnected");
    board = new Array(9)
    room = []
  });
});

//Send move to the server and to the opponent
//Remove controls unitil the opponent has played

//Check on every move the status of the game, on game finish remove controls and display the winner