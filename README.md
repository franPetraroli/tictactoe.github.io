# Tic Tac Toe

### Available at https://frantictactoe.herokuapp.com/
Simple implementation of Tic Tac Toe with the choice to play against the Ai or online with anbother player.

> Technology used:

  - HTML/CSS/Javascript for the front-end
  - Node.js/Express/Socket.io for the back-end
  - Git/Heroku

> Ai approach:
- It's a very simple Ai that after any of your move will check if the computer can close the game, and finish.
- If not will check if the player is about to close the game and try to block it.
- If none of the above case the Ai will randomly place a move on a random cell.

> Multi Player Approcah:

A Node.js/Express app with socket.io integration. 
`Only 2 players can play at the moment at any given time`

When the first user connect, it waits for a second user. When second user apper the backend will pair them together. And player can alternativelly play, during other player turn all control on the board are disabled.

>  TODO
- Implement multigame / multiuser functionalities
- Refactor the code
- Improve the state management on the backend
- Remove bug where the palyer in some instance can place a move on an occupied cell.

